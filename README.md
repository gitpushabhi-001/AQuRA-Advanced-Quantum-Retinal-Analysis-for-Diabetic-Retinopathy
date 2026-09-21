# AQuRA-Advanced-Quantum-Retinal-Analysis-for-Diabetic-Retinopathy
"AQuRA is a hybrid Quantum Machine Learning (QML) framework for high-precision, early detection of Diabetic Retinopathy. By leveraging quantum feature mapping and entanglement, it captures complex spatial patterns in retinal images that classical CNNs often miss.


🚀 Project Overview
The Problem Statement
Diabetic Retinopathy (DR) can lead to permanent blindness if not caught early. We realized that traditional deep learning models (like standard CNNs) often miss the tiny, complex micro-aneurysms in early-stage scans, and they require a massive amount of computing power to train effectively.

Our Solution: AQuRA
To fix this, we built AQuRA—a Hybrid Quantum Machine Learning (QML) framework. Instead of relying purely on standard deep learning, we bridged classical feature extraction with quantum computing. Here is how the pipeline actually works under the hood:

Gaussian Calibration & U-Net (The Eyes): First, we process the retinal images using Gaussian Calibration to clean up noise and highlight subtle clinical features like blood leaks. Then, a lightweight U-Net inspired CNN extracts these spatial features and compresses them into a condensed vector.

Variational Quantum Circuit (The Brain): Here is where the real breakthrough happens. We pass that compressed data into a 4-qubit Variational Quantum Circuit (VQC). By leveraging quantum principles like superposition and entanglement, the model maps the data into a high-dimensional space to find hidden patterns that a classical AI simply cannot see.

Mixed Precision Training (The Speed Hack): Quantum simulations are notoriously heavy and slow. To solve this, we implemented Mixed Precision Training (running calculations in FP16 while storing weights in FP32). This drastically cuts down the computational load.

🏆 Key Results

Outstanding Accuracy: By combining Gaussian calibration with the quantum VQC layer, the model hit 97% accuracy with a 0.97 F1-Score on our test data.

Rapid Training: Thanks to the mixed precision setup, the entire hybrid model trains in just 15.35 minutes on a single GPU.

Reliability: Our evaluation metrics and confusion matrix show minimal false positives, proving the model is highly stable and precise for real-world data.
