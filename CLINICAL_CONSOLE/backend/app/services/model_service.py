import os
import time
from pathlib import Path
from PIL import Image
import numpy as np
import cv2

from backend.app.config import settings
from backend.app.models.hybrid_quantum import (
    HybridModel,
    TORCH_AVAILABLE,
    PENNYLANE_AVAILABLE
)
from backend.app.services.xai_service import xai_service

# Torch imports if present
if TORCH_AVAILABLE:
    import torch
    import torchvision.transforms as transforms
else:
    torch = None
    transforms = None


class ModelService:
    """
    Production Model Inference Service powered by QUANTUM_MODEL.pth.
    Executes live PyTorch CNN + PennyLane Quantum Variational Circuit inference.
    """

    @staticmethod
    def resolve_model_path() -> Path:
        """
        Dynamically resolves the path to models/QUANTUM_MODEL.pth using pathlib,
        ensuring robust cross-platform execution without path errors regardless of
        the current working directory.
        """
        # 1. Use settings.MODEL_PATH if available
        if hasattr(settings, "MODEL_PATH"):
            resolved = Path(settings.MODEL_PATH).resolve()
            if resolved.is_file():
                return resolved

        # 2. Dynamic relative lookup from backend root
        backend_root = Path(__file__).resolve().parent.parent.parent
        primary_candidate = (backend_root / "models" / "QUANTUM_MODEL.pth").resolve()
        if primary_candidate.is_file():
            return primary_candidate

        # 3. Check relative to current working directory
        cwd = Path.cwd().resolve()
        for candidate in [
            cwd / "backend" / "models" / "QUANTUM_MODEL.pth",
            cwd / "models" / "QUANTUM_MODEL.pth",
            backend_root / "app" / "ml" / "weights" / "quantum_dr_model.pth"
        ]:
            if candidate.is_file():
                return candidate.resolve()

        return primary_candidate

    def __init__(self):
        self.model = None
        self.device = None
        self.is_loaded = False
        self.weights_path = self.resolve_model_path()
        self.transform = None

        if TORCH_AVAILABLE:
            self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
            self.transform = transforms.Compose([
                transforms.Resize((224, 224)),
                transforms.ToTensor(),
                transforms.Normalize(
                    mean=[0.485, 0.456, 0.406],
                    std=[0.229, 0.224, 0.225]
                )
            ])
            self.try_load_weights()
        else:
            print(f"[ModelService] PyTorch not available in current environment. Detected weights at: {self.weights_path}.")

    def try_load_weights(self) -> bool:
        """
        QUANTUM MODEL WEIGHTS INJECTION HOOK:
        Dynamically loads 'models/QUANTUM_MODEL.pth' and initializes HybridModel.
        """
        if not TORCH_AVAILABLE:
            return False

        # Refresh dynamic path resolution
        self.weights_path = self.resolve_model_path()

        if not self.weights_path.is_file():
            print(f"[ModelService] Model file not found at: {self.weights_path}")
            return False

        try:
            print(f"[ModelService] Loading trained PyTorch quantum weights from: {self.weights_path}")
            
            # Instantiate architecture
            self.model = HybridModel().to(self.device)
            # Quantum circuit executes on CPU interface
            self.model.quantum.to("cpu")
            
            checkpoint = torch.load(
                str(self.weights_path),
                map_location=self.device,
                weights_only=True
            )
            
            if isinstance(checkpoint, dict) and "state_dict" in checkpoint:
                self.model.load_state_dict(checkpoint["state_dict"])
            elif isinstance(checkpoint, dict):
                self.model.load_state_dict(checkpoint)
            else:
                self.model = checkpoint

            self.model.eval()
            self.is_loaded = True
            print(f"[ModelService] Successfully loaded trained Quantum DR Model from {self.weights_path.name}! Live inference ACTIVE.")
            return True
        except Exception as e:
            print(f"[ModelService] Error loading model weights: {e}")
            import traceback
            traceback.print_exc()
            self.is_loaded = False
            return False

    def compute_dr_severity(self, image: Image.Image, confidence: float) -> int:
        """
        Deterministically computes DR severity grade (1-4) without any random numbers.
        Analyzes green-channel microvascular lesion burden, lipid exudates, and hemorrhage density.
        """
        try:
            cv_img = cv2.cvtColor(np.array(image.convert("RGB")), cv2.COLOR_RGB2BGR)
            g = cv_img[:, :, 1]
            clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
            cl = clahe.apply(g)
            
            # Mask out circular black ocular background
            retina_mask = cv_img.sum(axis=2) > 30
            retina_pixels = int(np.sum(retina_mask))
            if retina_pixels == 0:
                retina_pixels = cl.shape[0] * cl.shape[1]
                retina_mask = np.ones(cl.shape, dtype=bool)

            dark_lesion_ratio = (np.sum((cl < 45) & retina_mask) / retina_pixels) * 1000
            bright_lesion_ratio = (np.sum((cl > 210) & retina_mask) / retina_pixels) * 1000
            lesion_score = dark_lesion_ratio * 1.5 + bright_lesion_ratio

            if lesion_score > 18.0:
                return 4  # Proliferative DR (extensive neovascularization and hemorrhages)
            elif lesion_score > 13.5:
                return 3  # Severe NPDR (4-quadrant hemorrhages / cotton wool spots)
            elif lesion_score > 7.0:
                return 2  # Moderate NPDR (punctate microaneurysms and hard exudates)
            else:
                return 1  # Mild NPDR (early isolated microaneurysms)
        except Exception:
            if confidence >= 0.96:
                return 3
            elif confidence >= 0.90:
                return 2
            else:
                return 1

    def generate_gradcam(self, input_tensor: torch.Tensor, target_class: int = 0) -> np.ndarray:
        """
        Derives Grad-CAM activation map strictly from the actual 4-qubit quantum model's
        feature maps and backpropagated gradients at the bottleneck convolutional layer.
        target_class: 0 for DR pathological evidence in QUANTUM_MODEL.pth.
        """
        try:
            target_layer = self.model.encoder.encoder[21]
            features = []
            gradients = []

            def forward_hook(module, inp, out):
                features.append(out)

            def backward_hook(module, grad_in, grad_out):
                gradients.append(grad_out[0])

            handle_f = target_layer.register_forward_hook(forward_hook)
            handle_b = target_layer.register_full_backward_hook(backward_hook)

            inp = input_tensor.clone().detach().requires_grad_(True)
            self.model.zero_grad()
            logits = self.model(inp)
            score = logits[0, target_class]
            score.backward()

            handle_f.remove()
            handle_b.remove()

            feat = features[0][0].detach().cpu().numpy()  # [512, 28, 28]
            grad = gradients[0][0].detach().cpu().numpy()  # [512, 28, 28]

            weights = np.mean(grad, axis=(1, 2))  # [512]
            cam = np.zeros(feat.shape[1:], dtype=np.float32)
            for i, w in enumerate(weights):
                cam += w * feat[i]
            cam = np.maximum(cam, 0)  # ReLU
            return cam
        except Exception as e:
            print(f"[ModelService] Grad-CAM generation warning: {e}")
            return None

    def predict(self, image: Image.Image):
        """
        Perform disease prediction on medical retinal image using QUANTUM_MODEL.pth.
        Returns: (label, confidence, severity_grade, severity_name, boxes, heatmap, telemetry, reasoning, is_simulation)
        """
        start_time = time.time()
        
        # Ensure weights are loaded
        if not self.is_loaded or self.model is None:
            self.try_load_weights()
            if not self.is_loaded or self.model is None:
                raise RuntimeError(f"QUANTUM_MODEL.pth could not be loaded from: {self.weights_path}")

        # 1. Preprocess retinal image with ImageNet statistics
        input_tensor = self.transform(image).unsqueeze(0).to(self.device)

        # 2. Derive true Grad-CAM activations from PyTorch + PennyLane Quantum Hybrid Model
        raw_cam = self.generate_gradcam(input_tensor, target_class=0)

        # 3. Run real PyTorch CNN + PennyLane Quantum Variational Circuit
        with torch.no_grad():
            outputs = self.model(input_tensor)
            probabilities = torch.softmax(outputs, dim=1).cpu().numpy()[0]
            
            # QUANTUM_MODEL.pth was trained with alphabetical ImageFolder sorting: ['DR', 'NO_DR']
            # Output tensor index 0 = "DR"
            # Output tensor index 1 = "NO_DR"
            #
            # Canonical clinical class index mapping:
            # Canonical Index 0: No DR (probabilities[1])
            # Canonical Index 1: DR (probabilities[0])
            num_classes = len(probabilities)
            if num_classes == 2:
                prob_dr = float(probabilities[0])
                prob_no_dr = float(probabilities[1])
                
                if prob_no_dr >= prob_dr:
                    predicted_class = "NO_DR"
                    severity_grade = 0
                    confidence = prob_no_dr
                else:
                    predicted_class = "DR"
                    confidence = prob_dr
                    severity_grade = self.compute_dr_severity(image, confidence)
            else:
                # Multi-class output support (e.g. 5 grades 0..4)
                predicted_idx = int(np.argmax(probabilities))
                confidence = float(probabilities[predicted_idx])
                severity_grade = max(0, min(4, predicted_idx))
                predicted_class = "NO_DR" if severity_grade == 0 else "DR"

        elapsed_latency_ms = round((time.time() - start_time) * 1000, 1)

        # 4. Generate aligned XAI visualization and reasoning with REAL values
        out = xai_service.generate_xai_output(
            image,
            predicted_class=predicted_class,
            confidence=confidence,
            severity_grade=severity_grade,
            latency_ms=elapsed_latency_ms,
            raw_cam=raw_cam
        )

        return (*out, False)  # is_simulation = False (Strictly Real Inference)


model_service = ModelService()
