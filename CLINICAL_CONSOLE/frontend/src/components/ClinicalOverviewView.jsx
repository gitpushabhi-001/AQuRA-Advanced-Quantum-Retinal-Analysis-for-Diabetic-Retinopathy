import React, { useEffect } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  Upload, 
  Activity, 
  Database, 
  Sliders, 
  Zap, 
  Lock, 
  Link as LinkIcon
} from 'lucide-react';
import clinicalBg from '../assets/image_e7bea0.jpg';

export const ClinicalOverviewView = ({ 
  onLaunchWorkspace, 
  onOpenArchive, 
  setActiveView 
}) => {
  return (
    <div className="w-full space-y-8 animate-fadeIn">
      
      {/* 1. Hero Section: Two-Column (Left: Text & Controls, Right: Eye Anatomy Diagram) */}
      <section className="relative overflow-hidden rounded-3xl border border-teal-100/80 dark:border-slate-800 p-6 sm:p-10 shadow-surgical mb-8 bg-white/90 dark:bg-slate-900/85 backdrop-blur-md transition-colors duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Narrative & Primary CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-5">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-slate-800/90 border border-teal-200/60 dark:border-teal-800/80 text-[11px] font-bold text-teal-800 dark:text-teal-300 tracking-wider uppercase shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>CLINICAL DECISION SUPPORT SYSTEM</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.12] font-sans">
              <span className="block text-base sm:text-lg font-black uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400 mb-2 font-mono">
                AQURA
              </span>
              Next-Generation <br />
              <span className="text-teal-700 dark:text-teal-400">Retinal Analysis</span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed font-normal">
              Real-time diabetic retinopathy detection accelerated via 4-Qubit Variational Quantum Circuits & Explainable AI.
            </p>

            {/* Primary Action Button */}
            <div className="pt-1">
              <button
                onClick={onLaunchWorkspace}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#005049] hover:bg-[#003d38] dark:bg-teal-600 dark:hover:bg-teal-500 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all transform active:scale-95 duration-150 cursor-pointer group floating-elevation"
              >
                <span>Launch Clinical Console</span>
                <ArrowRight className="w-4 h-4 text-white transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Three Stat Badges in a Row */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              {/* Badge 1: PennyLane lightning qubit */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-teal-100/90 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-xs">
                <div className="w-4 h-4 rounded-full border border-teal-600 dark:border-teal-400 flex items-center justify-center text-[8px] text-teal-600 dark:text-teal-400 font-bold">
                  Q
                </div>
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-100">PennyLane</span>
                  <span className="text-[9px] text-slate-500 dark:text-slate-400 font-mono">lightning qubit</span>
                </div>
              </div>

              {/* Badge 2: Latency */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-teal-100/90 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-xs">
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-100">Lat:</span>
                  <span className="text-[9px] text-slate-500 dark:text-slate-400 font-mono">18ms</span>
                </div>
              </div>

              {/* Badge 3: HIPAA Encrypted */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-teal-100/90 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-xs">
                <Lock className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-100">HIPAA</span>
                  <span className="text-[9px] text-slate-500 dark:text-slate-400 font-mono">Encrypted</span>
                </div>
              </div>
            </div>

            {/* Motivational Tagline */}
            <div className="pt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <LinkIcon className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span className="font-semibold text-slate-700 dark:text-slate-200">Early Detection. Brighter Tomorrows.</span>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <span className="font-mono text-[10px] tracking-wider text-teal-800 dark:text-teal-300 uppercase font-bold">
                AI • CLINICAL TRUST • BETTER CARE
              </span>
            </div>
          </div>

          {/* Right Column: High-Fidelity Eye Anatomy Illustration with Callouts */}
          <div className="lg:col-span-6 flex items-center justify-center py-2">
            <div className="relative w-full max-w-[560px] aspect-[4/3] rounded-2xl overflow-hidden bg-white/40 dark:bg-slate-800/40 p-2 border border-teal-100/50 dark:border-slate-700/50 flex items-center justify-center group">
              <img 
                src="/stitch_assets/eye_anatomy_diagram.png" 
                alt="Clinical Eye Anatomy Diagram" 
                className="w-full h-full object-contain select-none crisp-retinal-img transform group-hover:scale-[1.01] transition-transform duration-300"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 2. Lower Main Grid: Clinical Workflow Modules (Left) + Live Telemetry Snapshot (Right) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Clinical Workflow Modules (col-span-7) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
              Clinical Workflow Modules
            </h2>
            <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-white/90 dark:bg-slate-800/90 text-[#00685f] dark:text-teal-300 border border-teal-200/60 dark:border-slate-700 backdrop-blur-sm shadow-xs">
              4 Available
            </span>
          </div>

          {/* 2x2 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Card 1: Scan Analysis */}
            <div 
              onClick={onLaunchWorkspace}
              className="rounded-2xl border border-teal-100/90 dark:border-slate-800 p-5 shadow-surgical hover:shadow-surgical-lg hover:border-teal-300 dark:hover:border-teal-700 transition-all duration-200 cursor-pointer flex flex-col justify-between group bg-white/90 dark:bg-slate-900/85 backdrop-blur-md floating-elevation"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#e3f7f2] dark:bg-teal-950/80 flex items-center justify-center text-teal-700 dark:text-teal-300">
                    <Upload className="w-5 h-5 text-[#00685f] dark:text-teal-300" />
                  </div>
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#e3f7f2] dark:bg-teal-950/80 text-[#00685f] dark:text-teal-300 uppercase tracking-wider">
                    PRIMARY WORKFLOW
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                  Scan Analysis
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  Upload fundus photography for instantaneous quantum-accelerated microaneurysm and exudate grading.
                </p>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-teal-700 dark:text-teal-400 group-hover:translate-x-0.5 transition-transform">
                <span>Direct DICOM / TIFF Upload</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 2: XAI Vision */}
            <div 
              onClick={onLaunchWorkspace}
              className="rounded-2xl border border-teal-100/90 dark:border-slate-800 p-5 shadow-surgical hover:shadow-surgical-lg hover:border-teal-300 dark:hover:border-teal-700 transition-all duration-200 cursor-pointer flex flex-col justify-between group bg-white/90 dark:bg-slate-900/85 backdrop-blur-md floating-elevation"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#fae8f5] dark:bg-purple-950/80 flex items-center justify-center text-purple-700 dark:text-purple-300">
                    <Activity className="w-5 h-5 text-[#86198f] dark:text-purple-300" />
                  </div>
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#fae8f5] dark:bg-purple-950/80 text-[#86198f] dark:text-purple-300 uppercase tracking-wider">
                    EXPLAINABLE AI
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">
                  XAI Vision
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  Gaussian-calibrated Grad-CAM heatmaps and Gemini-synthesized lesion rationales to eliminate black-box risk.
                </p>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-purple-700 dark:text-purple-400 group-hover:translate-x-0.5 transition-transform">
                <span>Gradient Saliency & Attribution</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 3: Patient Archive */}
            <div 
              onClick={onOpenArchive}
              className="rounded-2xl border border-teal-100/90 dark:border-slate-800 p-5 shadow-surgical hover:shadow-surgical-lg hover:border-teal-300 dark:hover:border-teal-700 transition-all duration-200 cursor-pointer flex flex-col justify-between group bg-white/90 dark:bg-slate-900/85 backdrop-blur-md floating-elevation"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#e3f7f2] dark:bg-teal-950/80 flex items-center justify-center text-teal-700 dark:text-teal-300">
                    <Database className="w-5 h-5 text-[#00685f] dark:text-teal-300" />
                  </div>
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#e3f7f2] dark:bg-teal-950/80 text-[#00685f] dark:text-teal-300 uppercase tracking-wider">
                    EHR DATABASE
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                  Patient Archive
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  Secure longitudinal screening records, retinopathy progression curves, and encrypted clinical records.
                </p>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-teal-700 dark:text-teal-400 group-hover:translate-x-0.5 transition-transform">
                <span>1,420+ Cohort Records</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 4: Settings & Config */}
            <div 
              onClick={() => setActiveView ? setActiveView('diagnostics') : null}
              className="rounded-2xl border border-teal-100/90 dark:border-slate-800 p-5 shadow-surgical hover:shadow-surgical-lg hover:border-teal-300 dark:hover:border-teal-700 transition-all duration-200 cursor-pointer flex flex-col justify-between group bg-white/90 dark:bg-slate-900/85 backdrop-blur-md floating-elevation"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#edf3ff] dark:bg-blue-950/80 flex items-center justify-center text-blue-700 dark:text-blue-300">
                    <Sliders className="w-5 h-5 text-[#1e40af] dark:text-blue-300" />
                  </div>
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#edf3ff] dark:bg-blue-950/80 text-[#1e40af] dark:text-blue-300 uppercase tracking-wider">
                    SYSTEM CONFIG
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                  Settings & Config
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  Configure Gemini multimodal tokens, VQC circuit depth, entanglement gates, and STAT triage cutoffs.
                </p>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-blue-700 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform">
                <span>VQC Hyperparameters</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Live Telemetry & Cohort Snapshot (col-span-5) */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-teal-100/90 dark:border-slate-800 p-6 shadow-surgical bg-white/90 dark:bg-slate-900/85 backdrop-blur-md floating-elevation transition-colors duration-300">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Live Telemetry & Cohort Snapshot
              </h3>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-800/90 text-[#00685f] dark:text-teal-300 font-mono text-[11px] font-bold border border-teal-200/50 dark:border-slate-700 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Synchronized</span>
              </span>
            </div>

            {/* Subheader Cohort info */}
            <div className="mb-6 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-sans">Active Trial: Cohort DR-04</span>
                <span className="px-2 py-0.5 rounded bg-blue-50/90 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-mono text-[10px] font-bold border border-blue-100 dark:border-blue-800">DME</span>
                <span className="px-2 py-0.5 rounded bg-pink-50/90 dark:bg-pink-950/80 text-pink-700 dark:text-pink-300 font-mono text-[10px] font-bold border border-pink-100 dark:border-pink-800">PDR</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                Multi-center validation across 5 clinical ophthalmology hubs
              </p>
            </div>

            {/* Confidence Metric & Progress Bar */}
            <div className="p-4 rounded-xl border border-slate-200/70 dark:border-slate-700/80 mb-6 space-y-3 bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-xs">
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400 font-sans">Acc:</span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
                    95.32%
                  </span>
                </div>
                <div className="text-right">
                  <span className="block text-xs font-bold text-slate-800 dark:text-slate-200 font-sans">Quantum VQC Confidence</span>
                  <span className="font-mono text-[10px] text-slate-400 dark:text-slate-400">4.66% Classical Fallback</span>
                </div>
              </div>

              {/* Two-Tone Progress Bar */}
              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex">
                <div className="h-full bg-[#00685f] dark:bg-teal-500 rounded-l-full" style={{ width: '95.32%' }} />
                <div className="h-full bg-teal-200 dark:bg-teal-800 rounded-r-full" style={{ width: '4.68%' }} />
              </div>

              {/* Sub Telemetry metrics */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                <div>
                  <span className="block text-slate-400 dark:text-slate-400">Active Qubits:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-100">|0000⟩</span>
                  <span className="block text-[10px] text-slate-400 dark:text-slate-400 mt-0.5">Noise: &lt; 0.002</span>
                </div>
                <div className="text-right">
                  <span className="block text-slate-400 dark:text-slate-400">Entanglement:</span>
                  <span className="font-bold text-teal-800 dark:text-teal-300">CZ-Ring Topology</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Card Footer */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Hardware Noise Calibrated</span>
            </div>
            <span>Session: AQC-9961</span>
          </div>

        </div>

      </section>

    </div>
  );
};
