import sys
import os
from io import BytesIO
from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_root():
    res = client.get("/")
    print("GET / ->", res.status_code, res.json())
    assert res.status_code == 200

def test_health():
    res = client.get("/health")
    print("GET /health ->", res.status_code, res.json())
    assert res.status_code == 200

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
    print("=== Testing FastAPI Backend Scaffolding ===")
    test_root()
    test_health()
    test_predict()
    test_history()
    print("=== All Backend Tests Passed Successfully! ===")
