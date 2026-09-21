# AQuRA-Advanced-Quantum-Retinal-Analysis-for-Diabetic-Retinopathy
"AQuRA is a hybrid Quantum Machine Learning (QML) framework for high-precision, early detection of Diabetic Retinopathy. By leveraging quantum feature mapping and entanglement, it captures complex spatial patterns in retinal images that classical CNNs often miss.


### 🚀 Project Overview

**The Problem Statement**
Diabetic Retinopathy (DR) can lead to permanent blindness if not caught early. We realized that traditional deep learning models (like standard CNNs) often miss the tiny, complex micro-aneurysms in early-stage scans, and they require a massive amount of computing power to train effectively.

**Our Solution: AQuRA**
To fix this, we built AQuRA—a Hybrid Quantum Machine Learning (QML) framework. Instead of relying purely on standard deep learning, we bridged classical feature extraction with quantum computing. Here is how the pipeline actually works under the hood:

*   **Gaussian Calibration & U-Net (The Eyes):** First, we process the retinal images using Gaussian Calibration to clean up noise and highlight subtle clinical features like blood leaks. Then, a lightweight U-Net inspired CNN extracts these spatial features and compresses them into a condensed vector.
*   **Variational Quantum Circuit (The Brain):** Here is where the real breakthrough happens. We pass that compressed data into a 4-qubit Variational Quantum Circuit (VQC). By leveraging quantum principles like superposition and entanglement, the model maps the data into a high-dimensional space to find hidden patterns that a classical AI simply cannot see.
*   **Mixed Precision Training (The Speed Hack):** Quantum simulations are notoriously heavy and slow. To solve this, we implemented Mixed Precision Training (running calculations in FP16 while storing weights in FP32). This drastically cuts down the computational load.

### 🏆 Key Results

*   **Outstanding Accuracy:** By combining Gaussian calibration with the quantum VQC layer, the model hit 97% accuracy with a 0.97 F1-Score on our test data.
*   **Rapid Training:** Thanks to the mixed precision setup, the entire hybrid model trains in just 15.35 minutes on a single GPU.
*   **Reliability:** Our evaluation metrics and confusion matrix show minimal false positives, proving the model is highly stable and precise for real-world data.


### ⚖️ Classical (Federated CNN) vs. AQuRA (Hybrid Quantum)

Here is the direct technical and performance comparison between our classical baseline model and the proposed AQuRA quantum framework:

| Feature | Classical Baseline (Federated CNN) | AQuRA (Hybrid Quantum AI) |
| :--- | :--- | :--- |
| **Core Architecture** | 3-block CNN (8→16→32) + Flatten + Dense(32) classification head. | U-Net Encoder + 4-qubit Variational Quantum Circuit (VQC). |
| **Training Ecosystem** | Decentralized Federated Learning (3 Clients, 10 Rounds) tuned by Multi-Agent Optuna. | Centralized single-GPU training utilizing the PennyLane quantum simulator. |
| **Feature Mapping** | Standard mathematical convolutions and pooling. | Uses Quantum Entanglement (CNOT gates) and Rotation gates (RY) to map complex patterns. |
| **Model Accuracy** | Achieves 94.91% Validation Accuracy. | Achieves an outstanding **97.00% Accuracy**. |
| **F1-Score** | 94.91% (Weighted). | **0.97** (Proving high precision across classes). |
| **Training Time** | Highly lightweight; completes in **5.70 minutes**. | Computationally heavier due to quantum circuits; completes in **15.35 minutes**. |

**The Quantum Advantage:** 
While the Federated CNN provides a fast and privacy-preserving baseline, it halts at an accuracy of ~94.91%. By replacing standard dense layers with a Variational Quantum Circuit, AQuRA successfully maps features into a high-dimensional quantum space, capturing hidden micro-aneurysm patterns and pushing the diagnostic accuracy to a superior 97%.


# AQuRA: Advanced Quantum Retinal Analysis for Diabetic Retinopathy

### ⚖️ Classical (Federated CNN) vs. AQuRA (Hybrid Quantum)

Here is the direct technical and performance comparison between our classical baseline model and the proposed AQuRA quantum framework:

| Feature | Classical Baseline (Federated CNN) | AQuRA (Hybrid Quantum AI) |
| :--- | :--- | :--- |
| **Core Architecture** | 3-block CNN (8→16→32) + Flatten + Dense(32) classification head. | U-Net Encoder + 4-qubit Variational Quantum Circuit (VQC). |
| **Training Ecosystem** | Decentralized Federated Learning (3 Clients, 10 Rounds) tuned by Multi-Agent Optuna. | Centralized single-GPU training utilizing the PennyLane quantum simulator. |
| **Feature Mapping** | Standard mathematical convolutions and pooling. | Uses Quantum Entanglement (CNOT gates) and Rotation gates (RY) to map complex patterns. |
| **Model Accuracy** | Achieves 94.91% Validation Accuracy. | Achieves an outstanding **97.00% Accuracy**. |
| **F1-Score** | 0.9491 (Weighted). | **0.9700** (Proving high precision across classes). |
| **Training Time** | Highly lightweight; completes in **5.70 minutes**. | Computationally heavier due to quantum circuits; completes in **15.35 minutes**. |

**The Quantum Advantage:** 
While the Federated CNN provides a fast and privacy-preserving baseline, it halts at an accuracy of ~94.91%. By replacing standard dense layers with a Variational Quantum Circuit, AQuRA successfully maps features into a high-dimensional quantum space, capturing hidden micro-aneurysm patterns and pushing the diagnostic accuracy to a superior 97%.

---

## 🛠️ Code Details & Architecture Specifications

### 1. Hybrid Quantum Architecture (AQuRA)
* **Script / Notebook:** `QUANTUM RETINAL MODEL.ipynb`
* **Frameworks:** PyTorch, PennyLane (`lightning.qubit` device)
* **Data Preprocessing & Augmentation:**
  * Gaussian-filtered retinal fundus images resized to `224 × 224 × 3`.
  * Spatial augmentations: Random Horizontal & Vertical Flips, Random Rotation (20°), ColorJitter (brightness=0.3, contrast=0.3), and Random Affine transformations.
  * ImageNet channel normalization (`mean=[0.485, 0.456, 0.406]`, `std=[0.229, 0.224, 0.225]`).
* **Classical Feature Extractor (U-Net Inspired Encoder):**
  * 4-block CNN encoder utilizing `BatchNorm2d`, `ReLU`, and `MaxPool2d(2)`.
  * Bottleneck layer: `Conv2d(256, 512)` followed by `AdaptiveAvgPool2d((1, 1))`.
  * Projection Head compressing 512-dimensional features into a 16-dimensional vector.
* **Quantum Variational Circuit (VQC Layer):**
  * 4 Qubits (Depth 4) initialized with Hadamard (`H`) gates to create uniform superposition.
  * Entangling Circuit: Nearest-neighbor `CNOT` ladders paired with trainable `RY(weights)` rotation gates.
  * Expectation values evaluated using `PauliZ` observables, mapped via a Linear classification head to binary output.
* **Training Hyperparameters & Optimizations:**
  * **Optimizer:** AdamW (`lr=3e-4`, `weight_decay=1e-4`) with `CosineAnnealingLR` scheduler.
  * **Loss Function:** Weighted Cross-Entropy Loss with label smoothing (0.05) for class imbalance.
  * **Acceleration:** PyTorch AMP (`autocast` + `GradScaler`).
  * **Epochs:** 30
  * **Total Training Time:** 15.35 minutes on GPU.
  * **Model Weight File:** Saved as `quantum_dr_model.pth`.

---

### 2. Classical Baseline Architecture (Agentic Federated CNN)
* **Script / Notebook:** `CNN+MIXED+XLA+FLA+Agentic.ipynb`
* **Frameworks:** TensorFlow 2.21, Keras, Optuna, Scikit-Learn
* **Agentic Hyperparameter Optimization (Optuna):**
  * Autonomous multi-agent coordination (Exploration, Exploitation, and Conservative agents).
  * **Best Discovered Parameters:** Learning Rate = `7.352e-5`, Dropout = `0.368`, Batch Size = `16`.
* **CNN Network Architecture:**
  * 3-Stage Conv2D Block (8 → 16 → 32 filters) with `BatchNormalization` & `MaxPooling2D`.
  * Classification Head: `Flatten` → `Dense(32)` → `Dropout(0.368)` → `Dense(2, softmax)`.
* **Federated Learning Strategy & Runtime Accelerators:**
  * **Federated Averaging (FedAvg):** 3 partitioned local client nodes trained across 10 global communication rounds (5 local epochs/client).
  * **XLA Compilation:** Accelerated linear algebra JIT compilation enabled (`jit_compile=True`).
  * **Precision Policy:** Keras global mixed precision (`mixed_float16`) with `LossScaleOptimizer`.
  * **Total Training Time:** 5.70 minutes.
  * **Model Weight File:** Saved as `final_federated_cnn_model.keras`.

---

### 💻 Tech Stack & Tools
*   **Deep Learning Frameworks:** TensorFlow, Keras, PyTorch
*   **Quantum Machine Learning:** PennyLane
*   **Hyperparameter Optimization:** Optuna (Multi-Agent framework)
*   **Image Processing & Visualization:** OpenCV, Scikit-learn, Matplotlib, Seaborn
*   **Federated Learning Environment:** Local Multi-Client Partitioning

---

### ⚙️ Installation & How to Run

**1. Clone the Repository:**
```bash
git clone [https://github.com/your-username/AQuRA-Quantum-Retinal-Analysis.git](https://github.com/your-username/AQuRA-Quantum-Retinal-Analysis.git)
cd AQuRA-Quantum-Retinal-Analysis

pip install torch torchvision pennylane tensorflow keras optuna opencv-python scikit-learn seaborn matplotlib psutil pynvml
