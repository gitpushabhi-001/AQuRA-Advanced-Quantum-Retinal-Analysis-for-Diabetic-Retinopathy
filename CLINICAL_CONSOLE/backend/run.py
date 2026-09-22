import uvicorn
import os
import sys
from dotenv import load_dotenv

# Ensure project root is in sys.path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(BASE_DIR))

# Securely load environment variables from backend/.env
load_dotenv(os.path.join(BASE_DIR, ".env"))

if __name__ == "__main__":
    from backend.app.config import settings
    uvicorn.run(
        "backend.app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG
    )
