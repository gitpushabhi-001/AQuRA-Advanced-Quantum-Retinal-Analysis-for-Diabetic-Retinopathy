import React from 'react';
import { Cpu, Zap, Activity, GitBranch, Gauge } from 'lucide-react';

export const QuantumTelemetry = ({ telemetry, isSimulation, darkMode }) => {
  if (!telemetry) return null;

  const {
    circuit_depth = 4,
    qubit_count = 4,
    entanglement_entropy = 0.884,
    quantum_advantage_metric = 1.38,
    qubit_states = [],
    inference_latency_ms = 48.2
  } = telemetry;

  return (
    <div className={`rounded-2xl border p-6 space-y-6 transition-colors shadow-lg ${
      darkMode ? 'bg-gray-900/80 border-gray-800' : 'bg-white border-gray-200'
    }`}>
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h3 className={`text-base font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              PennyLane Quantum Circuit Telemetry
            </h3>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            4-Qubit Variational Quantum Classifier (VQC) • Lightning.Qubit Device
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            {circuit_depth} Entangling Layers
          </span>
          <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20">
            Latency: {inference_latency_ms}ms
          </span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className={`p-3 rounded-xl border ${darkMode ? 'bg-gray-950/60 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
          <div className="text-[10px] uppercase font-mono text-gray-400">Total Qubits</div>
          <div className="text-xl font-bold font-mono text-cyan-400 mt-1">{qubit_count} Wires</div>
          <div className="text-[10px] text-gray-400 mt-0.5">All-to-All CNOT</div>
        </div>

        <div className={`p-3 rounded-xl border ${darkMode ? 'bg-gray-950/60 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
          <div className="text-[10px] uppercase font-mono text-gray-400">Circuit Depth</div>
          <div className="text-xl font-bold font-mono text-cyan-400 mt-1">{circuit_depth} Layers</div>
          <div className="text-[10px] text-gray-400 mt-0.5">RY(θ) Rotations</div>
        </div>

        <div className={`p-3 rounded-xl border ${darkMode ? 'bg-gray-950/60 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
          <div className="text-[10px] uppercase font-mono text-gray-400">Von Neumann Entropy</div>
          <div className="text-xl font-bold font-mono text-purple-400 mt-1">{entanglement_entropy}</div>
          <div className="text-[10px] text-gray-400 mt-0.5">Quantum Entanglement</div>
        </div>

        <div className={`p-3 rounded-xl border ${darkMode ? 'bg-gray-950/60 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
          <div className="text-[10px] uppercase font-mono text-gray-400">Hybrid Advantage</div>
          <div className="text-xl font-bold font-mono text-emerald-400 mt-1">{quantum_advantage_metric}x</div>
          <div className="text-[10px] text-gray-400 mt-0.5">Feature Separation</div>
        </div>
      </div>

      {/* 4-Qubit State Vector Expectation Gauges */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className={`font-mono font-bold uppercase ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Pauli-Z Expectation Operators ⟨Zᵢ⟩ ∈ [-1.0, 1.0]
          </span>
          <span className="text-gray-400 font-mono text-[11px]">Measurement Basis: Z</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {qubit_states.map((q) => {
            // Normalize expectation value from [-1, 1] to percentage [0%, 100%]
            const normalizedPercent = Math.round(((q.expectation_value + 1.0) / 2.0) * 100);
            return (
              <div
                key={q.qubit_index}
                className={`p-3 rounded-xl border space-y-2 ${
                  darkMode ? 'bg-gray-950/40 border-gray-800' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-cyan-400">Wire Qubit #{q.qubit_index}</span>
                  <span className="text-gray-300 font-bold">
                    ⟨Z⟩ = {q.expectation_value > 0 ? `+${q.expectation_value}` : q.expectation_value}
                  </span>
                </div>

                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-purple-500 transition-all duration-500"
                    style={{ width: `${normalizedPercent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-gray-400">
                  <span>θ: {q.bloch_theta} rad</span>
                  <span>φ: {q.bloch_phi} rad</span>
                  <span>State: |ψ{q.qubit_index}⟩</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hybrid Architecture Flow Diagram */}
      <div className={`p-4 rounded-xl border space-y-2 text-xs font-mono ${
        darkMode ? 'bg-gray-950/70 border-gray-800 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-700'
      }`}>
        <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
          Hybrid Processing Topology:
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
            Medical Scan (224x224x3)
          </span>
          <span>→</span>
          <span className="px-2 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            CNN U-Net Encoder
          </span>
          <span>→</span>
          <span className="px-2 py-1 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
            16-D Bottleneck
          </span>
          <span>→</span>
          <span className="px-2 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
            PennyLane 4-Qubit Circuit
          </span>
          <span>→</span>
          <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Softmax (NO_DR / DR)
          </span>
        </div>
      </div>

    </div>
  );
};
