import sys
import os
from io import BytesIO
from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi.testclient import TestClient
from backend.app.main import app
from backend.app.config import settings

client = TestClient(app)

def test_env_and_config():
    print("--- Testing Environment Variables & Model Path Resolution ---")
    print("  Loaded API_KEY:", settings.API_KEY)
    print("  Loaded DEBUG:", settings.DEBUG)
    print("  Resolved MODEL_PATH:", settings.MODEL_PATH)
    print("  MODEL_PATH is_file:", settings.MODEL_PATH.is_file())
    
    assert settings.API_KEY == "your_api_key_here", f"Expected API_KEY to be 'your_api_key_here', got {settings.API_KEY}"
    assert settings.DEBUG is True, f"Expected DEBUG to be True, got {settings.DEBUG}"
    assert settings.MODEL_PATH.name == "QUANTUM_MODEL.pth", f"Expected model file name 'QUANTUM_MODEL.pth', got {settings.MODEL_PATH.name}"
    assert settings.MODEL_PATH.is_file(), f"Expected QUANTUM_MODEL.pth to exist at {settings.MODEL_PATH}"
    print("  [PASS] Environment variables and model path resolved successfully!")

def test_root():
    res = client.get("/")
    print("GET / ->", res.status_code, res.json())
    assert res.status_code == 200
    data = res.json()
    assert data.get("weights_present") is True
    assert data.get("model_file") == "QUANTUM_MODEL.pth"
    assert data.get("debug") is True

def test_health():
    res = client.get("/health")
    print("GET /health ->", res.status_code, res.json())
    assert res.status_code == 200
    data = res.json()
    assert data.get("weights_present") is True
    assert "QUANTUM_MODEL.pth" in data.get("weights_path", "")

def test_predict():
    # Create test synthetic retinal image in memory
    img = Image.new("RGB", (256, 256), color=(140, 45, 25))
    buf = BytesIO()
    img.save(buf, format="JPEG")
    buf.seek(0)
    
    files = {"file": ("test_retina.jpg", buf, "image/jpeg")}
    res = client.post("/predict", files=files)
    print("POST /predict ->", res.status_code)
    data = res.json()
    print("  Predicted Label:", data.get("predicted_label"))
    print("  Confidence:", data.get("confidence"))
    print("  Severity:", data.get("severity_name"))
    print("  Bounding Boxes count:", len(data.get("bounding_boxes", [])))
    print("  Heatmap presence:", len(data.get("heatmap", {}).get("overlay_base64", "")) > 0)
    print("  Quantum Telemetry Qubits:", len(data.get("quantum_telemetry", {}).get("qubit_states", [])))
    print("  Clinical Reasoning Summary:", data.get("clinical_reasoning", {}).get("summary"))
    assert res.status_code == 200

def test_history():
    res = client.get("/history")
    print("GET /history ->", res.status_code, f"Items: {len(res.json())}")
    assert res.status_code == 200

if __name__ == "__main__":
    print("=== Testing FastAPI Backend Scaffolding with Dotenv & Dynamic Quantum Model ===")
    test_env_and_config()
    test_root()
    test_health()
    test_predict()
    test_history()
    print("=== All Backend Tests Passed Successfully! ===")
