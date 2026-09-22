from typing import List, Optional
from pydantic import BaseModel, Field

class BoundingBox(BaseModel):
    id: str
    label: str
    # Normalized coordinates: [ymin, xmin, ymax, xmax] between 0.0 and 1.0
    box: List[float] = Field(..., description="[ymin, xmin, ymax, xmax]")
    confidence: float
    description: str
    severity: str = "moderate"
    color: str = "#EF4444"

class HeatmapData(BaseModel):
    overlay_base64: str
    grid_resolution: List[int] = [224, 224]
    peak_activation: float = 0.96
    coverage_percentage: float = 14.8

class QubitMetric(BaseModel):
    qubit_index: int
    expectation_value: float
    bloch_theta: float
    bloch_phi: float

class QuantumTelemetry(BaseModel):
    circuit_depth: int = 4
    qubit_count: int = 4
    entanglement_entropy: float = 0.884
    quantum_advantage_metric: float = 1.38
    qubit_states: List[QubitMetric]
    inference_latency_ms: float

class Biomarker(BaseModel):
    name: str
    status: str
    clinical_significance: str

class ClinicalReasoning(BaseModel):
    summary: str
    detailed_analysis: str
    biomarkers: List[Biomarker]
    recommended_action: str
    urgency_level: str
    icd_code: str

class PredictionResponse(BaseModel):
    scan_uuid: str
    filename: str
    image_url: Optional[str] = None
    predicted_label: str
    confidence: float
    severity_grade: int
    severity_name: str
    is_simulation: bool
    bounding_boxes: List[BoundingBox]
    heatmap: HeatmapData
    quantum_telemetry: QuantumTelemetry
    clinical_reasoning: ClinicalReasoning
    timestamp: str

class ScanHistorySummary(BaseModel):
    id: int
    scan_uuid: str
    filename: str
    predicted_label: str
    confidence: float
    severity_grade: int
    severity_name: str
    lesion_count: int
    created_at: str
