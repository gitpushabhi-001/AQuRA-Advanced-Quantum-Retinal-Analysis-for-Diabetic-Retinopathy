import os
import time
from pathlib import Path
from PIL import Image
import numpy as np

from backend.app.config import settings
from backend.app.models.hybrid_quantum import (
    HybridModel,
    TORCH_AVAILABLE,
    PENNYLANE_AVAILABLE
)
from backend.app.services.xai_service import xai_service

# Torch imports if present
if TORCH_AVAILABLE:
    # pyrefly: ignore [missing-import]
    import torch
    # pyrefly: ignore [missing-import]
    import torchvision.transforms as transforms
else:
    torch = None
    transforms = None


class ModelService:
    """
    Plug-and-Play Model Inference Service.
    Automatically handles switching between Live PyTorch/PennyLane Model
    and High-Fidelity Simulation Mode depending on weights file presence.
    """

    def __init__(self):
        self.model = None
        self.device = None
        self.is_loaded = False
        self.weights_path = settings.WEIGHTS_PATH
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
            print("[ModelService] PyTorch not available in current environment. Running in SIMULATION MODE.")

    def try_load_weights(self) -> bool:
        """
        ========================================================================
        USER MODEL WEIGHTS INJECTION HOOK:
        Checks for 'quantum_dr_model.pth' and initializes the HybridModel.
        ========================================================================
        """
        if not TORCH_AVAILABLE:
            return False

        if not self.weights_path.exists():
            print(f"[ModelService] Weights file not found at: {self.weights_path}")
            print("[ModelService] Running in SIMULATION MODE. Place 'quantum_dr_model.pth' to activate live model.")
            return False

        try:
            print(f"[ModelService] Loading trained PyTorch weights from: {self.weights_path}")
            
            # Instantiate architecture
            self.model = HybridModel().to(self.device)
            # Quantum circuit executes on CPU interface
            self.model.quantum.to("cpu")
            
            # ==================================================================
            # USER INJECTION HOOK:
            # torch.load('quantum_dr_model.pth')
            # ==================================================================
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
            print("[ModelService] Successfully loaded trained Quantum DR Model! Live inference ACTIVE.")
            return True
        except Exception as e:
            print(f"[ModelService] Error loading model weights: {e}")
            print("[ModelService] Reverting to SIMULATION MODE.")
            self.is_loaded = False
            return False

    def predict(self, image: Image.Image):
        """
        Perform disease prediction on medical image.
        Returns: (label, confidence, severity_grade, severity_name, boxes, heatmap, telemetry, reasoning, is_simulation)
        """
        start_time = time.time()
        
        # Check if live weights are active
        if self.is_loaded and TORCH_AVAILABLE and self.model is not None:
            try:
                # Preprocess image
                input_tensor = self.transform(image).unsqueeze(0).to(self.device)
                with torch.no_grad():
                    outputs = self.model(input_tensor)
                    probabilities = torch.softmax(outputs, dim=1).cpu().numpy()[0]
                    predicted_idx = int(np.argmax(probabilities))
                    confidence = float(probabilities[predicted_idx])
                    predicted_class = "DR" if predicted_idx == 1 else "NO_DR"

                # Generate aligned XAI visualization and reasoning
                out = xai_service.generate_xai_output(
                    image,
                    predicted_class=predicted_class,
                    confidence_override=confidence
                )
                
                return (*out, False)  # is_simulation = False
            except Exception as e:
                print(f"[ModelService] Live inference error: {e}. Falling back to simulation mode.")

        # Default Simulation Mode
        out = xai_service.generate_xai_output(image)
        return (*out, True)  # is_simulation = True


model_service = ModelService()
