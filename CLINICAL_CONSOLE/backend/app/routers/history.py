from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.app.database import get_db
from backend.app.models.db_models import ScanHistory
from backend.app.schemas.prediction import ScanHistorySummary, PredictionResponse
from backend.app.utils.image_processing import image_to_base64
from PIL import Image
import os

router = APIRouter(tags=["History"])

@router.get("/history", response_model=List[ScanHistorySummary])
@router.get("/api/v1/history", response_model=List[ScanHistorySummary])
def get_scan_history(limit: int = 30, db: Session = Depends(get_db)):
    """Retrieve list of past medical scans for historical review"""
    records = db.query(ScanHistory).order_by(ScanHistory.created_at.desc()).limit(limit).all()
    results = []
    for r in records:
        d = r.to_dict()
        results.append(ScanHistorySummary(
            id=d["id"],
            scan_uuid=d["scan_uuid"],
            filename=d["filename"],
            predicted_label=d["predicted_label"],
            confidence=d["confidence"],
            severity_grade=d["severity_grade"],
            severity_name=d["severity_name"],
            lesion_count=len(d["lesions"]),
            created_at=d["created_at"] or ""
        ))
    return results

@router.get("/history/{scan_uuid}")
@router.get("/api/v1/history/{scan_uuid}")
def get_scan_detail(scan_uuid: str, db: Session = Depends(get_db)):
    """Retrieve full details and image of a specific past scan"""
    record = db.query(ScanHistory).filter(ScanHistory.scan_uuid == scan_uuid).first()
    if not record:
        raise HTTPException(status_code=404, detail="Scan not found")
        
    data = record.to_dict()
    
    # Reload original image if file exists
    image_url = None
    if os.path.exists(record.stored_path):
        try:
            img = Image.open(record.stored_path).convert("RGB")
            image_url = image_to_base64(img)
        except Exception:
            image_url = None

    data["image_url"] = image_url
    return data
