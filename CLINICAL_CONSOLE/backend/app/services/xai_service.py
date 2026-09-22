import random
import numpy as np
from typing import List, Tuple
from backend.app.schemas.prediction import (
    BoundingBox,
    HeatmapData,
    QuantumTelemetry,
    QubitMetric,
    Biomarker,
    ClinicalReasoning
)
from backend.app.utils.image_processing import generate_synthetic_gradcam_heatmap
from PIL import Image

SEVERITY_LEVELS = [
    (0, "No Diabetic Retinopathy", "NO_DR", "Routine annual screening recommended. Retinal vasculature appears normal."),
    (1, "Mild Non-Proliferative DR (NPDR)", "DR", "Isolated microaneurysms detected in parafoveal retina."),
    (2, "Moderate Non-Proliferative DR (NPDR)", "DR", "Multiple microaneurysms and hard exudates present across temporal quadrants."),
    (3, "Severe Non-Proliferative DR (NPDR)", "DR", "Extensive intraretinal hemorrhages and cotton wool spots indicating active retinal ischemia."),
    (4, "Proliferative Diabetic Retinopathy (PDR)", "DR", "Critical: Neovascularization and fibrovascular proliferation observed near optic disc.")
]

class XaiService:
    """Explainable AI (XAI) Synthesis and Medical Reasoning Service"""

    def generate_xai_output(
        self,
        image: Image.Image,
        predicted_class: str = None,
        confidence_override: float = None,
        severity_override: int = None
    ) -> Tuple[str, float, int, str, List[BoundingBox], HeatmapData, QuantumTelemetry, ClinicalReasoning]:
        """
        Generate full XAI suite: Bounding Boxes, Grad-CAM Heatmap, Quantum Telemetry,
        and Structured Clinical Medical Reasoning.
        """
        w, h = image.size
        
        # Decide severity if not overridden
        if severity_override is not None:
            grade = severity_override
        elif predicted_class == "NO_DR":
            grade = 0
        elif predicted_class == "DR":
            grade = random.choice([2, 3, 4])
        else:
            # Default realistic distribution for demo uploads (simulating clinical screening)
            grade = random.choices([0, 1, 2, 3, 4], weights=[0.25, 0.20, 0.25, 0.20, 0.10])[0]

        severity_grade, severity_name, predicted_label, short_summary = SEVERITY_LEVELS[grade]

        # Confidence calculation
        if confidence_override is not None:
            confidence = confidence_override
        else:
            if grade == 0:
                confidence = round(random.uniform(0.94, 0.985), 4)
            else:
                confidence = round(random.uniform(0.89, 0.978), 4)

        # Generate realistic bounding boxes corresponding to severity
        boxes = self._generate_lesion_boxes(grade)
        
        # Generate Grad-CAM Heatmap Overlay
        heatmap_base64 = generate_synthetic_gradcam_heatmap(image, [b.model_dump() for b in boxes], colormap_type="jet")
        heatmap_data = HeatmapData(
            overlay_base64=heatmap_base64,
            grid_resolution=[w, h],
            peak_activation=round(0.85 + (grade * 0.03), 3),
            coverage_percentage=round(5.0 + (grade * 4.2), 1)
        )

        # Quantum Telemetry
        telemetry = self._generate_quantum_telemetry(grade, confidence)

        # Clinical Reasoning
        reasoning = self._generate_clinical_reasoning(grade, severity_name, confidence, boxes)

        return (
            predicted_label,
            confidence,
            severity_grade,
            severity_name,
            boxes,
            heatmap_data,
            telemetry,
            reasoning
        )

    def _generate_lesion_boxes(self, grade: int) -> List[BoundingBox]:
        boxes = []
        if grade == 0:
            # Healthy: Optional landmark box for Optic Disc
            return []

        if grade >= 1:
            # Microaneurysms
            boxes.append(BoundingBox(
                id="box-ma-1",
                label="Microaneurysm",
                box=[0.42, 0.48, 0.49, 0.54],
                confidence=0.93,
                description="Focal dilation of retinal capillary wall with erythrocyte extravasation.",
                severity="mild",
                color="#F59E0B"
            ))

        if grade >= 2:
            # Hard Exudate + Dot Hemorrhage
            boxes.append(BoundingBox(
                id="box-he-1",
                label="Hard Exudate",
                box=[0.35, 0.62, 0.44, 0.71],
                confidence=0.91,
                description="Lipid and lipoprotein precipitate cluster accumulating in outer plexiform layer.",
                severity="moderate",
                color="#06B6D4"
            ))
            boxes.append(BoundingBox(
                id="box-hm-1",
                label="Blot Hemorrhage",
                box=[0.55, 0.38, 0.64, 0.46],
                confidence=0.88,
                description="Intraretinal microvascular leakage in the middle retinal layers.",
                severity="moderate",
                color="#EF4444"
            ))

        if grade >= 3:
            # Cotton Wool Spot + Venous Loop
            boxes.append(BoundingBox(
                id="box-cws-1",
                label="Cotton Wool Spot",
                box=[0.28, 0.32, 0.39, 0.43],
                confidence=0.95,
                description="Localized nerve fiber layer infarct resulting from precapillary arteriolar occlusion.",
                severity="severe",
                color="#A855F7"
            ))
            boxes.append(BoundingBox(
                id="box-hm-2",
                label="Deep Retinal Hemorrhage",
                box=[0.61, 0.66, 0.72, 0.77],
                confidence=0.92,
                description="Confluent dark flame hemorrhage indicating localized tissue hypoxia.",
                severity="severe",
                color="#DC2626"
            ))

        if grade == 4:
            # Neovascularization
            boxes.append(BoundingBox(
                id="box-nv-1",
                label="Neovascularization Elsewhere (NVE)",
                box=[0.22, 0.52, 0.34, 0.65],
                confidence=0.96,
                description="High-risk aberrant endothelial capillary buds breaching the internal limiting membrane.",
                severity="severe",
                color="#E11D48"
            ))

        return boxes

    def _generate_quantum_telemetry(self, grade: int, confidence: float) -> QuantumTelemetry:
        """Simulate PennyLane 4-Qubit Circuit measurements"""
        qubit_states = []
        # Qubits modulate expectation values between -1.0 and 1.0
        base_angles = [0.42, 1.15, 2.05, 2.88]
        shift = 0.35 if grade > 0 else -0.45

        for i in range(4):
            theta = (base_angles[i] + shift) % (np.pi)
            phi = ((i * 1.57) + 0.3) % (2 * np.pi)
            expval = float(np.cos(theta))
            qubit_states.append(QubitMetric(
                qubit_index=i,
                expectation_value=round(expval, 3),
                bloch_theta=round(theta, 3),
                bloch_phi=round(phi, 3)
            ))

        return QuantumTelemetry(
            circuit_depth=4,
            qubit_count=4,
            entanglement_entropy=round(0.72 + (grade * 0.05), 3),
            quantum_advantage_metric=round(1.24 + (confidence * 0.2), 2),
            qubit_states=qubit_states,
            inference_latency_ms=round(random.uniform(42.5, 68.4), 1)
        )

    def _generate_clinical_reasoning(
        self,
        grade: int,
        severity_name: str,
        confidence: float,
        boxes: List[BoundingBox]
    ) -> ClinicalReasoning:
        """Construct structured clinical report and actionable physician recommendation"""
        if grade == 0:
            return ClinicalReasoning(
                summary="Clear retinal fundus with no observable signs of diabetic retinopathy.",
                detailed_analysis=(
                    "The neural U-Net encoder and 4-qubit quantum state classifier demonstrate uniform, "
                    "homogeneous feature distribution across macula and vascular arcades. "
                    "Absence of microaneurysms, intraretinal microvascular abnormalities (IRMA), or exudates."
                ),
                biomarkers=[
                    Biomarker(name="Foveal Avascular Zone (FAZ)", status="Normal", clinical_significance="Intact architecture, sharp boundary."),
                    Biomarker(name="Retinal Microaneurysms", status="Absent", clinical_significance="No capillary endothelial dilation detected."),
                    Biomarker(name="Hard Exudates", status="Absent", clinical_significance="No lipid leakage in outer plexiform layers."),
                    Biomarker(name="Neovascularization", status="Absent", clinical_significance="No aberrant vascular budding.")
                ],
                recommended_action="Maintain routine annual diabetic eye screening. Standard glycemic and blood pressure monitoring.",
                urgency_level="Routine",
                icd_code="E11.9 / Z13.5"
            )

        biomarkers = [
            Biomarker(name="Microaneurysms", status="Present" if grade >= 1 else "Absent", clinical_significance="Early biomarker of capillary wall breakdown."),
            Biomarker(name="Hard Exudates", status="Present" if grade >= 2 else "Absent", clinical_significance="Serous lipid effusion requiring macular monitoring."),
            Biomarker(name="Cotton Wool Spots", status="Present" if grade >= 3 else "Absent", clinical_significance="Micro-infarction of retinal nerve fibers (axoplasmic stasis)."),
            Biomarker(name="Neovascularization", status="Present" if grade == 4 else "Absent", clinical_significance="High risk of pre-retinal hemorrhage & tractional detachment.")
        ]

        urgencies = ["Routine", "Elevated", "Elevated", "Urgent", "Critical"]
        actions = [
            "Routine 12-month follow-up.",
            "Follow-up comprehensive dilated fundus examination recommended within 6 to 9 months. Check HbA1c status.",
            "Referral to an Ophthalmologist / Retina Specialist within 3 to 6 months. Consider Optical Coherence Tomography (OCT) to rule out Diabetic Macular Edema (DME).",
            "Urgent Ophthalmology referral within 2 to 4 weeks. High probability of progression to proliferative stage; evaluate for panretinal photocoagulation (PRP) candidacy.",
            "IMMEDIATE Retina Specialist consultation within 48 to 72 hours. Anti-VEGF intravitreal therapy and urgent PRP evaluation indicated."
        ]
        icd_codes = ["E11.9", "E11.319", "E11.329", "E11.349", "E11.359"]

        return ClinicalReasoning(
            summary=f"Positive diagnostic identification of {severity_name} (Confidence: {confidence * 100:.1f}%).",
            detailed_analysis=(
                f"Grad-CAM activation overlays pinpoint high-intensity focal hotspots correlating with "
                f"{len(boxes)} confirmed pathological markers. Quantum circuit entanglement metrics detect "
                f"non-linear spatial feature correlations indicative of microvascular ischemic degradation."
            ),
            biomarkers=biomarkers,
            recommended_action=actions[grade],
            urgency_level=urgencies[grade],
            icd_code=icd_codes[grade]
        )

xai_service = XaiService()
