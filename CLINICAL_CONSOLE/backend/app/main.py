import os
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

# CORS Configuration - Explicitly allow Vite frontend on port 5173 and all localhost/127.0.0.1 origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "*"
    ],
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1)(:\d+)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
