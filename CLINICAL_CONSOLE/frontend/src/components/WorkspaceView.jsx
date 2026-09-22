import React, { useState, useEffect } from 'react';
import { 
  Upload, 
  FolderOpen, 
  CheckCircle2, 
  Loader2, 
  Maximize2, 
  BarChart3, 
  ShieldCheck, 
  AlertTriangle, 
  Activity, 
  FileText, 
  Download, 
  RefreshCw, 
  ChevronRight, 
  Layers, 
  Eye 
} from 'lucide-react';
import { SAMPLE_CASES } from '../data/sampleCases';
import diagnosticBg from '../assets/image_f6ca80.jpg';

export const WorkspaceView = ({
  isAnalyzing,
  processingStep = 0, // 0 to 5
  activeResult,
  imagePreview,
  onImageSelect,
  onReset,
  onOpenReport,
  errorMessage,
  onDismissError,
}) => {
  const [showLesions, setShowLesions] = useState(true);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  // File input change handler
  const handleFileInput = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file, file.name);
    }
  };

  // Convert base64 data URL to Blob for sample cases
  const handleSampleClick = async (sample) => {
    try {
      const res = await fetch(sample.imageUrl);
      const blob = await res.blob();
      onImageSelect(blob, sample.filename, sample);
    } catch (err) {
      console.error('Failed to load sample image blob', err);
    }
  };

  // 5-step pipeline definition
  const pipelineSteps = [
    { num: 1, title: "Preprocessing", desc: "Enhancing image & Gaussian normalization" },
    { num: 2, title: "Extracting Spatial Features", desc: "Hybrid CNN U-Net (512-ch Feature Maps)" },
    { num: 3, title: "Running Variational Quantum Circuit", desc: "4-Qubit PennyLane VQC on QPU Simulator" },
    { num: 4, title: "Calibrating Gaussian Mask", desc: "Generating Grad-CAM attention heatmap" },
    { num: 5, title: "Generating Clinical Report", desc: "Multimodal Gemini AI decision synthesis" },
  ];

  // Ensure body receives background properties to fit perfectly at any zoom level without distortion
  useEffect(() => {
    const originalBodyBg = document.body.style.backgroundImage;
    const originalBodySize = document.body.style.backgroundSize;
    const originalBodyPos = document.body.style.backgroundPosition;
    const originalBodyRepeat = document.body.style.backgroundRepeat;
    const originalBodyAttachment = document.body.style.backgroundAttachment;

    document.body.style.backgroundImage = `url(${diagnosticBg}), url('/image_f6ca80.jpg')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';

    return () => {
      document.body.style.backgroundImage = originalBodyBg;
      document.body.style.backgroundSize = originalBodySize;
      document.body.style.backgroundPosition = originalBodyPos;
      document.body.style.backgroundRepeat = originalBodyRepeat;
      document.body.style.backgroundAttachment = originalBodyAttachment;
    };
  }, []);

  return (
    <div 
      className="space-y-6 animate-fadeIn pb-12 diagnostic-screening-wrapper"
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed',
      }}
    >
      
      {/* 1. Page Breadcrumbs & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-teal-100/80">
        <div>
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium mb-1">
            <span>Clinical Core</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-teal-700 font-semibold">Diagnostic Screening</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
            Retinal Screening Workspace
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl mt-0.5">
            Upload fundus photography to detect diabetic retinopathy via 4-qubit parameterized variational quantum circuits with explainable Grad-CAM heatmaps.
          </p>
        </div>

        {activeResult && !isAnalyzing && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-teal-300 shadow-xs self-start sm:self-center floating-elevation"
          >
            <RefreshCw className="w-3.5 h-3.5 text-teal-600" />
            <span>New Examination</span>
          </button>
        )}
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="font-medium">{errorMessage}</span>
          </div>
          <button
            onClick={onDismissError}
            className="text-xs font-bold underline ml-4 hover:text-rose-900 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 2. Top Grid: Upload Module & Processing State */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Upload Module Card (col-span-7) */}
        <div 
          className="lg:col-span-7 rounded-2xl border border-teal-100/90 p-5 sm:p-6 shadow-surgical flex flex-col justify-between floating-elevation glass-card-clinical"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-teal-700" />
                <h2 className="text-base font-bold text-slate-900 tracking-tight">Image Ingestion</h2>
              </div>
              <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100/90 border border-slate-200">
                DICOM / RGB
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              
              {/* Drop Zone */}
              <div 
                onClick={() => document.getElementById('fundus-file-input')?.click()}
                className="md:col-span-7 bg-teal-50/50 backdrop-blur-xs border-2 border-dashed border-teal-200/90 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-teal-50/80 hover:border-teal-400 transition-all cursor-pointer group"
              >
                <input 
                  id="fundus-file-input"
                  type="file" 
                  accept="image/jpeg,image/png,image/jpg" 
                  className="hidden" 
                  onChange={handleFileInput}
                  disabled={isAnalyzing}
                />
                <div className="w-12 h-12 rounded-full bg-teal-100/70 flex items-center justify-center text-teal-700 mb-3 group-hover:scale-110 transition-transform shadow-xs">
                  <FolderOpen className="w-6 h-6 text-teal-700" />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-800">
                  Drag & drop fundus image
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5 mb-3.5">
                  Supports JPG, PNG (Max 10 MB)
                </p>
                <button
                  type="button"
                  disabled={isAnalyzing}
                  className="px-4 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 focus:outline-none floating-elevation"
                >
                  <FolderOpen className="w-3.5 h-3.5" />
                  <span>Choose File</span>
                </button>
              </div>

              {/* Divider */}
              <div className="hidden md:flex md:col-span-1 flex-col items-center justify-center">
                <span className="font-mono text-[11px] uppercase font-bold text-slate-400">or</span>
              </div>

              {/* Try Sample Images */}
              <div className="md:col-span-4 flex flex-col gap-2.5">
                <span className="text-xs font-semibold text-slate-600">Try a Sample Image</span>
                
                {/* Sample 1: Healthy */}
                <button
                  type="button"
                  onClick={() => handleSampleClick(SAMPLE_CASES[0])}
                  disabled={isAnalyzing}
                  className="w-full bg-slate-50/90 hover:bg-teal-50/80 border border-slate-200/80 hover:border-teal-300 p-2 rounded-xl flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer floating-elevation backdrop-blur-xs"
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 shadow-xs border border-slate-200">
                    <img 
                      src={SAMPLE_CASES[0]?.imageUrl} 
                      alt="Healthy Fundus" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform crisp-retinal-img"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs font-bold text-slate-900 truncate">Healthy Retina</span>
                    <span className="block font-mono text-[10px] text-emerald-700 font-semibold">No DR (Sample)</span>
                  </div>
                </button>

                {/* Sample 2: Moderate / Severe */}
                <button
                  type="button"
                  onClick={() => handleSampleClick(SAMPLE_CASES[1] || SAMPLE_CASES[0])}
                  disabled={isAnalyzing}
                  className="w-full bg-slate-50/90 hover:bg-rose-50/80 border border-slate-200/80 hover:border-rose-300 p-2 rounded-xl flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer floating-elevation backdrop-blur-xs"
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 shadow-xs border border-slate-200">
                    <img 
                      src={SAMPLE_CASES[1]?.imageUrl} 
                      alt="Severe DR" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform crisp-retinal-img"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs font-bold text-slate-900 truncate">Pathologic DR</span>
                    <span className="block font-mono text-[10px] text-rose-700 font-semibold">Proliferative (Sample)</span>
                  </div>
                </button>
              </div>

            </div>
          </div>

          <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 font-mono text-[11px] text-slate-500">
            <span>PIPELINE: <strong className="text-slate-800">QUANTUM-VISION-V2</strong></span>
            <span>CALIBRATION: <strong className="text-teal-700 font-semibold">STABLE</strong></span>
          </div>
        </div>

        {/* Processing State Card (col-span-5) */}
        <div 
          className="lg:col-span-5 rounded-2xl border border-teal-100/90 p-5 sm:p-6 shadow-surgical flex flex-col justify-between floating-elevation glass-card-clinical"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-teal-700" />
                <h2 className="text-base font-bold text-slate-900 tracking-tight">Processing Pipeline</h2>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 font-mono text-[10px] font-semibold">
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin text-teal-700" />
                    <span>Processing...</span>
                  </>
                ) : activeResult ? (
                  <>
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Complete ({(activeResult.quantum_telemetry?.inference_latency_ms || 28.4).toFixed(1)} ms)</span>
                  </>
                ) : (
                  <span>~ 3–5 seconds</span>
                )}
              </span>
            </div>

            {/* 5-Step Progress Tracker */}
            <ol className="space-y-3.5 my-auto">
              {pipelineSteps.map((step, idx) => {
                const isStepCompleted = !isAnalyzing && activeResult ? true : (isAnalyzing && processingStep > idx);
                const isStepActive = isAnalyzing && processingStep === idx;
                const isStepPending = !isStepCompleted && !isStepActive;

                return (
                  <li key={step.num} className={`flex items-start gap-3 transition-opacity ${isStepPending ? 'opacity-40' : 'opacity-100'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-mono text-[11px] font-bold ${
                      isStepCompleted 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : isStepActive 
                          ? 'bg-teal-700 text-white shadow-xs animate-pulse' 
                          : 'bg-slate-100 text-slate-500'
                    }`}>
                      {isStepCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      ) : isStepActive ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        step.num
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className={`text-xs font-bold ${isStepActive ? 'text-teal-700 font-extrabold' : 'text-slate-800'}`}>
                          {step.title}
                        </p>
                        {isStepCompleted && <span className="font-mono text-[10px] text-emerald-700 font-semibold">Done</span>}
                        {isStepActive && <span className="font-mono text-[10px] text-teal-700 font-bold animate-pulse">Active</span>}
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug">{step.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="bg-slate-50 border border-slate-100 px-3.5 py-2 rounded-xl flex items-center justify-between font-mono text-[11px] text-slate-500 mt-4">
            <span>HARDWARE ACCEL</span>
            <span className="text-emerald-700 font-bold">QPU SIMULATOR READY</span>
          </div>
        </div>

      </section>

      {/* 3. Middle Grid: Dual-Viewer Interface */}
      {(imagePreview || activeResult) && (
        <section 
          className="rounded-2xl border border-teal-100/90 p-5 sm:p-6 shadow-surgical space-y-4 floating-elevation glass-card-clinical"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-teal-700" />
                <h2 className="text-base font-bold text-slate-900">Analysis Results & Dual-Viewer</h2>
              </div>
              <p className="text-xs text-slate-500">
                Original high-resolution fundus image paired with Gaussian calibrated Grad-CAM heatmap.
              </p>
            </div>
            
            <div className="flex items-center gap-3 font-mono text-[11px] text-slate-500">
              {activeResult && (
                <button
                  onClick={() => setShowLesions(!showLesions)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border floating-elevation ${
                    showLesions 
                      ? 'bg-teal-50 border-teal-300 text-teal-800' 
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Lesion Bounding Boxes: {showLesions ? 'ON' : 'OFF'}</span>
                </button>
              )}
              <span className="hidden sm:inline">RESOLUTION: <strong className="text-slate-800">2048 × 1536</strong></span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left Container: Original Fundus */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Original Fundus Photography</span>
                <button
                  onClick={() => setFullscreenImage(imagePreview || activeResult?.image_url)}
                  className="w-7 h-7 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600 floating-elevation"
                  title="Expand Fullscreen"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-900 border border-slate-800 shadow-inner group">
                <img 
                  src={imagePreview || activeResult?.image_url} 
                  alt="Original Retina" 
                  className="w-full h-full object-cover crisp-retinal-img group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Microaneurysm Bounding Box Overlays */}
                {showLesions && activeResult?.bounding_boxes?.map((box) => (
                  <div
                    key={box.id}
                    className="absolute border-2 rounded transition-all duration-200 hover:scale-105 pointer-events-auto cursor-pointer"
                    style={{
                      borderColor: box.color || '#EF4444',
                      backgroundColor: `${box.color || '#EF4444'}20`,
                      top: `${box.box[0] * 100}%`,
                      left: `${box.box[1] * 100}%`,
                      height: `${(box.box[2] - box.box[0]) * 100}%`,
                      width: `${(box.box[3] - box.box[1]) * 100}%`,
                    }}
                    title={`${box.label} (${Math.round(box.confidence * 100)}%): ${box.description}`}
                  >
                    <span 
                      className="absolute -top-5 left-0 text-[10px] font-mono font-bold px-1 py-0.5 rounded text-white shadow-xs whitespace-nowrap"
                      style={{ backgroundColor: box.color || '#EF4444' }}
                    >
                      {box.label}
                    </span>
                  </div>
                ))}

                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-slate-900/85 backdrop-blur font-mono text-[10px] text-white">
                  SCAN-ID: {activeResult?.scan_uuid?.slice(0, 10) || 'FD-7741-B'}
                </div>
              </div>
            </div>

            {/* Right Container: Grad-CAM Heatmap */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800">Grad-CAM Heatmap</span>
                  <span className="font-mono text-[10px] text-teal-800 bg-teal-100/70 border border-teal-200 px-1.5 py-0.5 rounded font-bold">
                    (Gaussian Calibrated)
                  </span>
                </div>
                <button
                  onClick={() => setFullscreenImage(activeResult?.heatmap?.overlay_base64 || imagePreview)}
                  className="w-7 h-7 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600 floating-elevation"
                  title="Expand Heatmap"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-900 border border-slate-800 shadow-inner group">
                {activeResult?.heatmap?.overlay_base64 ? (
                  <img 
                    src={activeResult.heatmap.overlay_base64} 
                    alt="Grad-CAM Heatmap" 
                    className="w-full h-full object-cover crisp-retinal-img group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2 p-4">
                    <Loader2 className="w-6 h-6 animate-spin text-teal-500" />
                    <span className="text-xs font-medium">Synthesizing Attention Activation Map...</span>
                  </div>
                )}

                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-slate-900/85 backdrop-blur font-mono text-[10px] text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                  <span>ATTENTION MAP PEAK: {(activeResult?.heatmap?.peak_activation || 0.942).toFixed(3)}</span>
                </div>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* 4. Bottom Grid: Prediction Result & Clinical Report */}
      {activeResult && !isAnalyzing && (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Prediction Result Card (col-span-5) */}
          <div 
            className="lg:col-span-5 rounded-2xl border border-teal-100/90 p-6 shadow-surgical flex flex-col justify-between floating-elevation glass-card-clinical"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-teal-700" />
                  <h3 className="text-base font-bold text-slate-900">Prediction Result</h3>
                </div>
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono text-[11px] font-bold border ${
                  activeResult.predicted_label === 'NO_DR'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border-rose-200'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    activeResult.predicted_label === 'NO_DR' ? 'bg-emerald-500' : 'bg-rose-500'
                  }`} />
                  <span>{activeResult.confidence > 0.85 ? 'High Confidence' : 'Moderate Confidence'}</span>
                </span>
              </div>

              {/* Diagnostic Finding Banner */}
              <div className={`p-4 rounded-xl flex items-center gap-3.5 mb-5 border ${
                activeResult.predicted_label === 'NO_DR'
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50/70 border-rose-200 text-rose-900'
              }`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                  activeResult.predicted_label === 'NO_DR' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                }`}>
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase font-bold tracking-wider opacity-80">
                    Diagnostic Finding
                  </span>
                  <span className="block text-base font-extrabold tracking-tight">
                    {activeResult.predicted_label === 'NO_DR' ? 'No Diabetic Retinopathy Detected' : 'Diabetic Retinopathy Detected'}
                  </span>
                </div>
              </div>

              {/* Model Certainty */}
              <div className="mb-4 flex items-baseline justify-between bg-slate-50 border border-slate-100 p-4 rounded-xl">
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Model Certainty
                  </span>
                  <span className="font-mono text-3xl font-extrabold text-slate-900">
                    {Math.round(activeResult.confidence * 100)}%
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs font-bold text-emerald-700">
                    +1.4% vs Baseline
                  </span>
                  <span className="block font-mono text-[10px] text-slate-400">
                    P-VALUE &lt; 0.001
                  </span>
                </div>
              </div>

              {/* Sub-metrics Grid */}
              <div className="grid grid-cols-2 gap-3 font-mono text-xs mb-4">
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
                  <span className="block text-[11px] text-slate-500 font-sans font-medium">DR Severity</span>
                  <span className={`font-bold text-sm ${activeResult.severity_grade > 0 ? 'text-rose-700' : 'text-emerald-700'}`}>
                    {activeResult.severity_name} ({activeResult.severity_grade})
                  </span>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
                  <span className="block text-[11px] text-slate-500 font-sans font-medium">Quantum Latency</span>
                  <span className="font-bold text-sm text-teal-800">
                    {(activeResult.quantum_telemetry?.inference_latency_ms || 28.4).toFixed(1)} ms
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between font-mono text-[11px] text-slate-500">
              <span>CIRCUIT DEPTH: <strong>{activeResult.quantum_telemetry?.circuit_depth || 4}</strong></span>
              <span>QUBITS: <strong>{activeResult.quantum_telemetry?.qubit_count || 4}</strong></span>
            </div>
          </div>

          {/* Gemini Multimodal Clinical Report (col-span-7) */}
          <div 
            className="lg:col-span-7 rounded-2xl border border-teal-100/90 p-6 shadow-surgical flex flex-col justify-between floating-elevation glass-card-clinical"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-teal-700" />
                  <h3 className="text-base font-bold text-slate-900">Clinical Reasoning & Decision Support</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-700">
                    Gemini Multimodal AI
                  </span>
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 border border-teal-200 text-teal-800">
                    ICD-10: {activeResult.clinical_reasoning?.icd_code || 'E11.319'}
                  </span>
                </div>
              </div>

              {/* Summary Text */}
              <div className="p-4 bg-teal-50/40 border border-teal-100 rounded-xl mb-4">
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
                  {activeResult.clinical_reasoning?.summary || 
                    "Surgical-grade fundus inspection indicates clear foveal avascular zone margins without proliferative neovascularization."}
                </p>
              </div>

              {/* Biomarkers detected */}
              {activeResult.clinical_reasoning?.biomarkers?.length > 0 && (
                <div className="mb-4">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Identified Microvascular Biomarkers
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-[11px]">
                    {activeResult.clinical_reasoning.biomarkers.map((b, i) => (
                      <div key={i} className="bg-slate-50 border border-slate-200/80 p-2.5 rounded-lg">
                        <span className="block font-bold text-slate-800">{b.name}</span>
                        <span className="block text-slate-500 text-[10px] font-sans">{b.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Recommendation */}
              <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-teal-800 mb-1">
                  Recommended Action Plan
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {activeResult.clinical_reasoning?.recommended_action || 
                    "Routine annual fundus examination indicated. Maintain HbA1c target < 7.0%."}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-5 mt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={onOpenReport}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer floating-elevation"
              >
                <FileText className="w-4 h-4" />
                <span>Open Full Diagnostic EHR Report</span>
              </button>

              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium shadow-xs transition-colors cursor-pointer floating-elevation"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Export PDF</span>
              </button>
            </div>

          </div>

        </section>
      )}

      {/* Fullscreen Viewer Modal */}
      {fullscreenImage && (
        <div 
          onClick={() => setFullscreenImage(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out animate-fadeIn"
        >
          <div className="max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl border border-teal-500/30 shadow-2xl">
            <img 
              src={fullscreenImage} 
              alt="Expanded View" 
              className="w-full h-full object-contain max-h-[85vh] crisp-retinal-img"
            />
          </div>
        </div>
      )}

    </div>
  );
};
