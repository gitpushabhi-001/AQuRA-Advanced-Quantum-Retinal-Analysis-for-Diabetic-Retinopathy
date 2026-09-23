import os
import sys
from pathlib import Path

# Ensure root directory (containing 'backend') and backend directory are in sys.path
# This ensures imports succeed regardless of whether working directory is
# CLINICAL_CONSOLE or CLINICAL_CONSOLE/backend on Render / Docker / local environments.
_CURRENT_FILE = Path(__file__).resolve()
_APP_DIR = _CURRENT_FILE.parent           # .../backend/app
_BACKEND_DIR = _APP_DIR.parent           # .../backend
_PARENT_DIR = _BACKEND_DIR.parent         # .../CLINICAL_CONSOLE

for _path in [str(_PARENT_DIR), str(_BACKEND_DIR), str(_APP_DIR)]:
    if _path not in sys.path:
        sys.path.insert(0, _path)

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

# Securely initialize and load environment variables at runtime
load_dotenv()

from backend.app.config import settings
from backend.app.database import init_db
from backend.app.routers.predict import router as predict_router
from backend.app.routers.history import router as history_router
from backend.app.services.model_service import model_service
from backend.app.models.hybrid_quantum import TORCH_AVAILABLE, PENNYLANE_AVAILABLE

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    debug=settings.DEBUG,
    description="Full-Stack Medical Image Analysis API powered by Hybrid Quantum PyTorch (CNN U-Net + PennyLane)"
)

# CORS Configuration - Bypass CORS restrictions
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Startup event: initialize DB schema
@app.on_event("startup")
def on_startup():
    init_db()
    print(f"[{settings.PROJECT_NAME}] Database initialized successfully. Debug mode: {settings.DEBUG}")

# Include Routers
app.include_router(predict_router)
app.include_router(history_router)

@app.get("/")
def root():
    return {
        "status": "online",
        "project": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "debug": settings.DEBUG,
        "simulation_mode": settings.IS_SIMULATION_MODE,
        "weights_present": settings.MODEL_PATH.is_file(),
        "model_file": settings.MODEL_PATH.name,
        "docs_url": "/docs"
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "debug": settings.DEBUG,
        "pytorch_available": TORCH_AVAILABLE,
        "pennylane_available": PENNYLANE_AVAILABLE,
        "model_loaded": model_service.is_loaded,
        "is_simulation_mode": settings.IS_SIMULATION_MODE,
        "weights_path": str(settings.MODEL_PATH),
        "weights_present": settings.MODEL_PATH.is_file(),
        "database": "sqlite/postgresql",
        "n_qubits": settings.N_QUBITS,
        "q_depth": settings.Q_DEPTH
    }
