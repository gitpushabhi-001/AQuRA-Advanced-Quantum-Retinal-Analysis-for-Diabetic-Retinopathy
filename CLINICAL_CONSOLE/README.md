# AuraScan.XAI — Hybrid Quantum Medical Image Analysis Platform

A full-stack medical-grade web application for disease prediction and Explainable AI (XAI), powered by a **Hybrid Quantum PyTorch Model** (CNN U-Net Encoder + PennyLane 4-Qubit Variational Quantum Circuit).

Designed for clinical demonstration, research validation, and hackathon evaluation.

---

## 🌟 Key Features

### 1. Medical-Grade Frontend (React & Tailwind CSS)
- **Image-Centric Upload Zone**: Drag-and-drop support for **JPEG, PNG, and DICOM** medical scans. Strictly excludes text symptom forms.
- **1-Click Clinical Benchmark Cases**: Built-in benchmark presets (*Normal Healthy Retina*, *Moderate NPDR*, *Severe Proliferative DR*) for immediate one-click evaluation.
- **Framer Motion Scanning Animations**: High-tech laser grid sweep, quantum tensor pipeline stage ticker, and pulsing qubit nodes to mask backend latency with an authentic AI feel.
- **Dynamic XAI Dashboard**:
  - **Grad-CAM Activation Heatmaps**: Interactive colormaps (*Jet*, *Viridis*, *Inferno*), layer toggle, and real-time opacity slider.
  - **Pathological Bounding Boxes**: Microaneurysms, Hemorrhages, Hard Exudates, Cotton Wool Spots, and Neovascularization with confidence tags, hover cards, and category filters.
  - **Composite Overlay & Side-by-Side Split View**: Compare raw fundus imagery against localized AI activation maps.
- **Medical Reasoning Block**: Diagnostic classification, model confidence gauge, ICD-10 categorization, biomarker matrix, and ophthalmologist recommendations.
- **PennyLane Quantum Telemetry**: Real-time visualization of Pauli-Z expectation values $\langle Z_0 \rangle \dots \langle Z_3 \rangle$, circuit depth, entanglement entropy, and hybrid quantum advantage.
- **Diagnostic Report Modal**: Clinical summary view with instant **Print / Save as PDF** capability.
- **Historical Scans Drawer**: Slide-over panel backed by database persistence.
- **Dark / Light Mode**: Medical monitor-grade aesthetic with deep slate and vibrant cyan/teal accents.

### 2. Plug-and-Play Backend Architecture (FastAPI & PyTorch)
- **FastAPI Core**: High-performance, asynchronous REST API with Swagger documentation (`/docs`).
- **Simulation Mode**: Generates realistic, biologically grounded XAI heatmaps, lesion bounding boxes, quantum telemetry, and clinical narratives out-of-the-box.
- **Drop-in Weights Injection Hook**: Pre-configured architecture for `UNetEncoder`, `QuantumLayer`, and `HybridModel`.
- **Database Persistence**: SQLAlchemy supporting SQLite (`backend/medical_scans.db`) and PostgreSQL (`DATABASE_URL`).

---

## 🚀 Quick Start Guide

### Prerequisites
- Python 3.10+
- Node.js 18+ and npm

### 1. Start the FastAPI Backend
```bash
# In the root directory:
pip install -r backend/requirements.txt

# Run the backend server (runs on http://127.0.0.1:8000)
python backend/run.py
```
*API Swagger Documentation is available at:* `http://127.0.0.1:8000/docs`

### 2. Start the React Frontend
```bash
# Navigate to the frontend directory:
cd frontend

# Install packages (if not already installed):
npm install

# Start Vite development server:
npm run dev
```
*The web application is now live at:* `http://localhost:5173`

---

## 🧠 PyTorch Model Integration Hook

When you are ready to use your trained PyTorch model:

1. Save your model state dictionary as: **`quantum_dr_model.pth`**
2. Place the `.pth` file into the designated weights folder:
   ```
   backend/app/ml/weights/quantum_dr_model.pth
   ```
3. The backend model service (`backend/app/services/model_service.py`) will automatically detect the file, load the weights, and transition from **Simulation Mode** to **Live PyTorch Inference**:
   ```python
   # ==============================================================================
   # USER MODEL WEIGHTS INJECTION HOOK:
   # ==============================================================================
   device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
   loaded_model = HybridModel().to(device)
   loaded_model.quantum.to("cpu")
   loaded_model.load_state_dict(
       torch.load('quantum_dr_model.pth', map_location=device, weights_only=True)
   )
   loaded_model.eval()
   # ==============================================================================
   ```

---

## 📁 Repository Structure

```
DISEASE PREDICTION/
├── backend/
│   ├── app/
│   │   ├── config.py                 # Paths, database URL, and settings
│   │   ├── database.py               # SQLAlchemy database session & engine
│   │   ├── main.py                   # FastAPI application with CORS & health check
│   │   ├── models/
│   │   │   ├── db_models.py          # ScanHistory database table
│   │   │   └── hybrid_quantum.py     # UNetEncoder, QuantumLayer, HybridModel & weights hook
│   │   ├── routers/
│   │   │   ├── predict.py            # POST /predict multipart image upload
│   │   │   └── history.py            # GET /history for persisted scan reviews
│   │   ├── schemas/
│   │   │   └── prediction.py         # Pydantic schemas (BoundingBox, Heatmap, Telemetry)
│   │   ├── services/
│   │   │   ├── model_service.py      # Weights loader & inference manager
│   │   │   └── xai_service.py        # Heatmap generator & clinical reasoning engine
│   │   └── utils/
│   │       └── image_processing.py   # Grad-CAM colormaps & format handling
│   ├── app/ml/weights/               # Place 'quantum_dr_model.pth' here
│   ├── uploads/                      # Uploaded medical scans storage
│   ├── requirements.txt              # Backend dependencies
│   ├── test_backend.py               # Automated backend verification test suite
│   └── run.py                        # Uvicorn launcher
├── frontend/
│   ├── index.html                    # Entry HTML with medical metadata
│   ├── vite.config.js                # Vite configuration with backend proxy
│   ├── tailwind.config.js            # Clinical styling tokens & keyframes
│   ├── postcss.config.js
│   └── src/
│       ├── App.jsx                   # Main layout and workflow coordinator
│       ├── main.jsx                  # React DOM entry
│       ├── index.css                 # Glassmorphic panels & scan animation styles
│       ├── components/
│       │   ├── Navbar.jsx            # Brand header, mode toggle & backend status
│       │   ├── UploadZone.jsx        # Drag-and-drop zone (JPEG/PNG/DICOM) & presets
│       │   ├── ScanningAnimation.jsx # Framer Motion laser & quantum tensor animation
│       │   ├── ImageOverlayViewer.jsx# Interactive XAI canvas with heatmaps & boxes
│       │   ├── MedicalReasoning.jsx  # Structured clinical findings & recommendations
│       │   ├── QuantumTelemetry.jsx  # 4-Qubit Pauli-Z expectation & entropy meters
│       │   ├── HistoryDrawer.jsx     # Slide-over past scans history
│       │   └── ReportModal.jsx       # Printable/Exportable medical diagnostic report
│       ├── data/
│       │   └── sampleCases.js        # Benchmark retinal cases for 1-click evaluation
│       └── services/
│           └── api.js                # Axios client for /predict and /history
└── README.md
```

---

## 🛡️ API Endpoints Summary

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/predict` | Ingests multipart image; returns XAI heatmaps, bounding boxes, quantum telemetry & clinical reasoning. |
| `GET` | `/history` | Returns paginated list of past scans stored in the database. |
| `GET` | `/history/{scan_uuid}` | Returns full details and base64 imagery of a specific historical scan. |
| `GET` | `/health` | Returns backend readiness, device status, and simulation mode flag. |
| `GET` | `/docs` | Interactive Swagger OpenAPI UI. |

---

## 🔬 Explainable AI (XAI) & Quantum Architecture

1. **U-Net CNN Feature Extraction**: A 4-stage convolutional encoder reduces $224 \times 224 \times 3$ medical images down to a 16-dimensional dense latent bottleneck vector.
2. **PennyLane Quantum Co-Processing**:
   - 4 Qubit register initialized in equal superpositions using Hadamard gates $H^{\otimes 4}$.
   - Classical latent features encoded as parameterized single-qubit rotations $RY(\theta_i)$.
   - 4 entangling layers comprising CNOT ladders $\mathrm{CNOT}(i, i+1)$ interleaved with variational $RY$ gates.
   - Pauli-Z expectation values $\langle Z_i \rangle = \langle \psi | Z_i | \psi \rangle$ measured and mapped to class logits.
3. **Dual XAI Localization**:
   - **Grad-CAM Attention**: Identifies high-energy activation regions contributing to the classification.
   - **Pathological Bounding Boxes**: Automatically detects and bounds localized lesions (microaneurysms, hemorrhages, hard exudates, cotton wool spots, neovascularization).
