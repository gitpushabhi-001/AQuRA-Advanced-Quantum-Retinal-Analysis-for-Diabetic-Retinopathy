import os
from pathlib import Path
from pydantic import BaseModel

BASE_DIR = Path(__file__).resolve().parent.parent

class Settings(BaseModel):
    PROJECT_NAME: str = "AuraScan - Hybrid Quantum Medical AI"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Storage & Model Paths
    BASE_DIR: Path = BASE_DIR
    UPLOAD_DIR: Path = BASE_DIR / "uploads"
    WEIGHTS_DIR: Path = BASE_DIR / "app" / "ml" / "weights"
    DEFAULT_WEIGHTS_FILE: str = "quantum_dr_model.pth"
    
    @property
    def WEIGHTS_PATH(self) -> Path:
        return self.WEIGHTS_DIR / self.DEFAULT_WEIGHTS_FILE
        
    # Database Configuration (PostgreSQL / SQLite fallback)
    DATABASE_URL: str = os.getenv("DATABASE_URL", f"sqlite:///{BASE_DIR}/medical_scans.db")
    MONGODB_URL: str = os.getenv("MONGODB_URL", "")
    
    # Server Settings
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", 8000))
    CORS_ORIGINS: list[str] = ["*"]
    
    # Quantum Settings
    N_QUBITS: int = 4
    Q_DEPTH: int = 4
    
    # Simulation Mode
    # Will be True by default if quantum_dr_model.pth is not present
    @property
    def IS_SIMULATION_MODE(self) -> bool:
        force_sim = os.getenv("FORCE_SIMULATION", "false").lower() in ("true", "1")
        if force_sim:
            return True
        return not self.WEIGHTS_PATH.exists()

settings = Settings()

# Ensure directories exist
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
os.makedirs(settings.WEIGHTS_DIR, exist_ok=True)
