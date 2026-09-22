import os
from pathlib import Path
from pydantic import BaseModel
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent

# Securely load environment variables from backend/.env at runtime
dotenv_path = (BASE_DIR / ".env").resolve()
if dotenv_path.is_file():
    load_dotenv(dotenv_path=dotenv_path)
else:
    load_dotenv()


class Settings(BaseModel):
    PROJECT_NAME: str = "AuraScan - Hybrid Quantum Medical AI"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Environment Variables
    API_KEY: str = os.getenv("API_KEY", "your_api_key_here")
    DEBUG: bool = os.getenv("DEBUG", "True").lower() in ("true", "1", "yes", "t")

    # Storage & Model Paths (Dynamically Resolved)
    BASE_DIR: Path = BASE_DIR
    UPLOAD_DIR: Path = BASE_DIR / "uploads"
    MODELS_DIR: Path = BASE_DIR / "models"
    DEFAULT_MODEL_FILE: str = "QUANTUM_MODEL.pth"
    WEIGHTS_DIR: Path = BASE_DIR / "app" / "ml" / "weights"
    DEFAULT_WEIGHTS_FILE: str = "quantum_dr_model.pth"
    
    @property
    def MODEL_PATH(self) -> Path:
        """
        Dynamically resolves the path to models/QUANTUM_MODEL.pth using pathlib,
        ensuring robust cross-platform execution without path errors.
        """
        custom_path = os.getenv("MODEL_PATH")
        if custom_path:
            return Path(custom_path).resolve()
            
        # Primary target: backend/models/QUANTUM_MODEL.pth
        primary = (self.MODELS_DIR / self.DEFAULT_MODEL_FILE).resolve()
        if primary.is_file():
            return primary
            
        # Cross-platform fallback search paths
        candidates = [
            (self.BASE_DIR / "models" / "QUANTUM_MODEL.pth").resolve(),
            (Path.cwd() / "backend" / "models" / "QUANTUM_MODEL.pth").resolve(),
            (Path.cwd() / "models" / "QUANTUM_MODEL.pth").resolve(),
            (self.BASE_DIR / "app" / "ml" / "weights" / "quantum_dr_model.pth").resolve(),
        ]
        for candidate in candidates:
            if candidate.is_file():
                return candidate
                
        return primary

    @property
    def WEIGHTS_PATH(self) -> Path:
        """Alias pointing to dynamically resolved model path."""
        return self.MODEL_PATH
        
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
    # Will be True by default if model weights file is not present
    @property
    def IS_SIMULATION_MODE(self) -> bool:
        force_sim = os.getenv("FORCE_SIMULATION", "false").lower() in ("true", "1")
        if force_sim:
            return True
        return not self.MODEL_PATH.is_file()

settings = Settings()

# Ensure required directories exist cross-platform
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
os.makedirs(settings.MODELS_DIR, exist_ok=True)
os.makedirs(settings.WEIGHTS_DIR, exist_ok=True)
