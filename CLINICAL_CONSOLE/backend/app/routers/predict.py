import os
import uuid
import json
from datetime import datetime
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from sqlalchemy.orm import Session

from backend.app.config import settings
from backend.app.database import get_db
from backend.app.models.db_models import ScanHistory
from backend.app.schemas.prediction import PredictionResponse
from backend.app.services.model_service import model_service
from backend.app.utils.image_processing import (
    load_image_from_bytes,
    compute_image_hash,
    image_to_base64
)

router = APIRouter(tags=["Prediction"])

ALLOWED_MIME_TYPES = {
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/bmp",
    "application/dicom",
    "application/octet-stream"
}

@router.post("/predict", response_model=PredictionResponse)
@router.post("/api/v1/predict", response_model=PredictionResponse)
async def predict_medical_image(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Predict disease from medical image upload (JPEG, PNG, DICOM).
    Returns XAI Grad-CAM heatmap, bounding boxes, quantum telemetry, and clinical reasoning.
    """
    if not file:
        raise HTTPException(status_code=400, detail="No file provided")

    # Read uploaded file bytes
    try:
        contents = await file.read()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to read upload: {str(e)}")

    if len(contents) == 0:
        raise HTTPException(status_code=400, detail="Uploaded file is empty")

    # Compute SHA-256 hash
    image_hash = compute_image_hash(contents)
    scan_uuid = str(uuid.uuid4())

    # Save original image to disk
    ext = os.path.splitext(file.filename)[1] if file.filename else ".jpg"
    if not ext:
        ext = ".jpg"
    saved_filename = f"{scan_uuid}{ext}"
    saved_path = settings.UPLOAD_DIR / saved_filename
    
    with open(saved_path, "wb") as f:
        f.write(contents)

    # Load into PIL Image
    pil_image = load_image_from_bytes(contents)
    original_base64 = image_to_base64(pil_image)

    # Execute Model Prediction & XAI Generation
    (
        predicted_label,
        confidence,
        severity_grade,
        severity_name,
        boxes,
        heatmap_data,
        quantum_telemetry,
        clinical_reasoning,
        is_simulation
    ) = model_service.predict(pil_image)

    # Persist to Database for Historical Review
    db_record = ScanHistory(
        scan_uuid=scan_uuid,
        filename=file.filename or "medical_scan.jpg",
        file_size=len(contents),
        file_type=file.content_type or "image/jpeg",
        image_hash=image_hash,
        stored_path=str(saved_path),
        predicted_label=predicted_label,
        confidence=confidence,
        severity_grade=severity_grade,
        severity_name=severity_name,
        lesions_json=json.dumps([b.model_dump() for b in boxes]),
        quantum_metrics_json=json.dumps(quantum_telemetry.model_dump()),
        clinical_reasoning_json=json.dumps(clinical_reasoning.model_dump()),
        created_at=datetime.utcnow()
    )
    db.add(db_record)
    db.commit()
    db.refresh(db_record)

    return PredictionResponse(
        scan_uuid=scan_uuid,
        filename=file.filename or "medical_scan.jpg",
        image_url=original_base64,
        predicted_label=predicted_label,
        confidence=confidence,
        severity_grade=severity_grade,
        severity_name=severity_name,
        is_simulation=is_simulation,
        bounding_boxes=boxes,
        heatmap=heatmap_data,
        quantum_telemetry=quantum_telemetry,
        clinical_reasoning=clinical_reasoning,
        timestamp=db_record.created_at.isoformat()
    )
