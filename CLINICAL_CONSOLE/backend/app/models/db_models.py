import json
from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, Text, DateTime
from backend.app.database import Base

class ScanHistory(Base):
    __tablename__ = "scan_histories"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    scan_uuid = Column(String(64), unique=True, index=True)
    filename = Column(String(255), nullable=False)
    file_size = Column(Integer, default=0)
    file_type = Column(String(64), default="image/jpeg")
    image_hash = Column(String(64), index=True)
    stored_path = Column(String(512), nullable=False)
    
    # Prediction Results
    predicted_label = Column(String(32), nullable=False)  # "NO_DR" | "DR"
    confidence = Column(Float, nullable=False)
    severity_grade = Column(Integer, default=0)           # 0 to 4
    severity_name = Column(String(64), default="No Diabetic Retinopathy")
    
    # JSON Payload Blobs
    lesions_json = Column(Text, default="[]")
    quantum_metrics_json = Column(Text, default="{}")
    clinical_reasoning_json = Column(Text, default="{}")
    
    created_at = Column(DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "scan_uuid": self.scan_uuid,
            "filename": self.filename,
            "file_size": self.file_size,
            "file_type": self.file_type,
            "image_hash": self.image_hash,
            "predicted_label": self.predicted_label,
            "confidence": self.confidence,
            "severity_grade": self.severity_grade,
            "severity_name": self.severity_name,
            "lesions": json.loads(self.lesions_json) if self.lesions_json else [],
            "quantum_metrics": json.loads(self.quantum_metrics_json) if self.quantum_metrics_json else {},
            "clinical_reasoning": json.loads(self.clinical_reasoning_json) if self.clinical_reasoning_json else {},
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
