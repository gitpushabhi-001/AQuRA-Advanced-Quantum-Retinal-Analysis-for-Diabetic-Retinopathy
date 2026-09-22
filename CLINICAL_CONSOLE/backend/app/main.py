from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from backend.app.config import settings
from backend.app.database import init_db
from backend.app.routers.predict import router as predict_router
from backend.app.routers.history import router as history_router
from backend.app.services.model_service import model_service
from backend.app.models.hybrid_quantum import TORCH_AVAILABLE, PENNYLANE_AVAILABLE

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Full-Stack Medical Image Analysis API powered by Hybrid Quantum PyTorch (CNN U-Net + PennyLane)"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Startup event: initialize DB schema
@app.on_event("startup")
def on_startup():
    init_db()
    print(f"[{settings.PROJECT_NAME}] Database initialized successfully.")

# Include Routers
app.include_router(predict_router)
app.include_router(history_router)

@app.get("/")
def root():
    return {
        "status": "online",
        "project": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "simulation_mode": settings.IS_SIMULATION_MODE,
        "weights_present": settings.WEIGHTS_PATH.exists(),
        "docs_url": "/docs"
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "pytorch_available": TORCH_AVAILABLE,
        "pennylane_available": PENNYLANE_AVAILABLE,
        "model_loaded": model_service.is_loaded,
        "is_simulation_mode": settings.IS_SIMULATION_MODE,
        "weights_path": str(settings.WEIGHTS_PATH),
        "database": "sqlite/postgresql",
        "n_qubits": settings.N_QUBITS,
        "q_depth": settings.Q_DEPTH
    }
