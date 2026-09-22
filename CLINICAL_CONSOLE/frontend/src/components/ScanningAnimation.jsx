import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Zap, Activity, Scan, Layers, Binary, Radio, ShieldAlert } from 'lucide-react';

const PIPELINE_STAGES = [
  { id: 1, title: "Tensor Ingestion", log: "[0.12s] Normalizing 224x224x3 Tensor with ImageNet Mean & Std...", icon: Scan, progress: 18 },
  { id: 2, title: "CNN U-Net Encoder", log: "[0.64s] Executing Conv2d + BatchNorm2d + MaxPool (512 Feature Channels)...", icon: Layers, progress: 38 },
  { id: 3, title: "Latent Compression", log: "[1.15s] Compressing AdaptiveAvgPool to 16-Dimensional Quantum Vector...", icon: Binary, progress: 54 },
  { id: 4, title: "PennyLane Superposition", log: "[1.68s] Initializing 4 Qubit Wires: Applying Hadamard H^(⊗4) gates...", icon: Cpu, progress: 72 },
  { id: 5, title: "Quantum Entanglement", log: "[2.12s] Executing Depth-4 CNOT Ladder & Parameterized RY(θ) Rotations...", icon: Zap, progress: 88 },
  { id: 6, title: "XAI Synthesis", log: "[2.65s] Measuring Pauli-Z Expectations & Synthesizing Grad-CAM Heatmaps...", icon: Activity, progress: 98 },
];

export const ScanningAnimation = ({ imagePreview, darkMode }) => {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [logs, setLogs] = useState([]);
  const [qubitValues, setQubitValues] = useState([0.72, -0.45, 0.89, -0.12]);

  useEffect(() => {
    const stageInterval = setInterval(() => {
      setCurrentStageIdx((prev) => {
        const next = Math.min(prev + 1, PIPELINE_STAGES.length - 1);
        setLogs((currentLogs) => {
          if (!currentLogs.includes(PIPELINE_STAGES[next].log)) {
            return [...currentLogs, PIPELINE_STAGES[next].log];
          }
          return currentLogs;
        });
        return next;
      });
    }, 450);

    // Dynamic Qubit value flicker animation
    const qubitTimer = setInterval(() => {
      setQubitValues([
        (Math.sin(Date.now() / 250) * 0.9).toFixed(3),
        (Math.cos(Date.now() / 280) * 0.85).toFixed(3),
        (Math.sin(Date.now() / 320) * 0.95).toFixed(3),
        (Math.cos(Date.now() / 210) * 0.78).toFixed(3),
      ]);
    }, 120);

    return () => {
      clearInterval(stageInterval);
      clearInterval(qubitTimer);
    };
  }, []);

  const activeStage = PIPELINE_STAGES[currentStageIdx];
  const CurrentIcon = activeStage.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-4xl mx-auto space-y-6 py-2"
    >
      
      {/* High-Tech HUD Scanner Card */}
      <div className={`relative rounded-3xl overflow-hidden border shadow-2xl p-6 sm:p-8 backdrop-blur-2xl ${
        darkMode 
          ? 'bg-slate-950/90 border-cyan-500/30 shadow-[0_0_50px_rgba(0,242,254,0.15)]' 
          : 'bg-white/95 border-cyan-400/50 shadow-[0_0_40px_rgba(0,242,254,0.2)]'
      }`}>
        
        {/* Top Holographic Navigation Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20 text-xs font-mono">
          <div className="flex items-center space-x-2.5 text-cyan-400">
            <Radio className="w-4 h-4 animate-pulse text-cyan-400" />
            <span className="font-bold tracking-widest uppercase">
              Hybrid Quantum Tensor Coprocessor Active
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-gray-400 font-mono">STATUS: INFERRING</span>
          </div>
        </div>

        {/* Center Scanner Stage */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-6 items-center">
          
          {/* Target Retinal Scan Display with Laser Scanner */}
          <div className="md:col-span-6 flex flex-col items-center">
            <div className="relative w-72 h-72 rounded-2xl overflow-hidden border-2 border-cyan-400/60 bg-black shadow-[0_0_35px_rgba(0,242,254,0.25)] flex items-center justify-center">
              
              {/* Medical Image */}
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Analyzing Target"
                  className="w-full h-full object-cover filter contrast-125"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-slate-900 to-black" />
              )}

              {/* Holographic Circular Reticle */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-48 h-48 rounded-full border border-cyan-400/30 border-dashed animate-spin-slow" />
                <div className="w-32 h-32 rounded-full border border-teal-400/25 quantum-ring" />
              </div>

              {/* Sweeping Laser Beam */}
              <div className="hologram-scanline" />

              {/* Top & Bottom Coordinate HUD Tags */}
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-cyan-400 border border-cyan-500/30">
                CAM: 224x224
              </div>
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-teal-400 border border-teal-500/30">
                λ: 532nm
              </div>

              {/* Target Corner Crosshairs */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
            </div>

            <p className="text-xs font-mono text-gray-400 mt-3 flex items-center space-x-1.5">
              <span>Scanning Latent Focal Planes</span>
              <span className="animate-pulse">...</span>
            </p>
          </div>

          {/* Real-time Quantum Telemetry & Stage Visualizer */}
          <div className="md:col-span-6 space-y-5">
            
            {/* Active Stage Card */}
            <div className={`p-4 rounded-2xl border transition-all ${
              darkMode ? 'bg-slate-900/80 border-cyan-500/30' : 'bg-cyan-50/80 border-cyan-300'
            }`}>
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-400/40">
                  <CurrentIcon className="w-6 h-6 animate-pulse" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                    Stage {activeStage.id} of {PIPELINE_STAGES.length}
                  </div>
                  <h4 className={`text-base font-bold truncate ${darkMode ? 'text-white' : 'text-gray-950'}`}>
                    {activeStage.title}
                  </h4>
                </div>
              </div>

              {/* Animated Progress Bar */}
              <div className="mt-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 mb-1">
                  <span>Inference Pipeline</span>
                  <span className="text-cyan-400 font-bold">{activeStage.progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-500"
                    initial={{ width: '15%' }}
                    animate={{ width: `${activeStage.progress}%` }}
                    transition={{ ease: "easeOut", duration: 0.3 }}
                  />
                </div>
              </div>
            </div>

            {/* Live 4-Qubit State Vector Monitor */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-gray-400">
                <span>PennyLane 4-Qubit Register:</span>
                <span className="text-cyan-400 font-bold">DEVICE: LIGHTNING.QUBIT</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {['Q₀ (FAZ Arc)', 'Q₁ (Capillary)', 'Q₂ (Exudate)', 'Q₃ (Aneurysm)'].map((label, idx) => (
                  <div
                    key={label}
                    className={`p-2 rounded-xl border font-mono text-xs flex items-center justify-between ${
                      darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-gray-200'
                    }`}
                  >
                    <span className="text-gray-400 text-[10px]">{label}</span>
                    <span className="font-bold text-cyan-400 text-[11px]">
                      ⟨Z⟩={qubitValues[idx]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Neural Execution Terminal Console */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">
                Tensor Log Stream:
              </span>
              <div className={`h-24 overflow-y-auto p-2.5 rounded-xl font-mono text-[10px] space-y-1 border ${
                darkMode ? 'bg-black/80 border-slate-800 text-cyan-300' : 'bg-slate-900 border-slate-700 text-cyan-300'
              }`}>
                {logs.map((log, i) => (
                  <div key={i} className="leading-tight">
                    <span className="text-teal-400">› </span>
                    <span>{log}</span>
                  </div>
                ))}
                <div className="text-gray-500 animate-pulse">_</div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </motion.div>
  );
};
