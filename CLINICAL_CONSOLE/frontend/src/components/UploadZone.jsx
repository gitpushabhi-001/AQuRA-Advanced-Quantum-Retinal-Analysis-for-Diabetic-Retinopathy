import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, Sparkles, AlertCircle, FileCheck2, ShieldCheck, ArrowUpRight, Cpu, Eye, CheckCircle, Flame } from 'lucide-react';
import { SAMPLE_CASES } from '../data/sampleCases';

export const UploadZone = ({ onImageSelect, darkMode, isAnalyzing }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAnalyzing) setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (isAnalyzing) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcess(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcess(e.target.files[0]);
    }
  };

  const validateAndProcess = (file) => {
    setErrorMsg(null);
    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.dcm', '.dicom'];
    const fileName = file.name.toLowerCase();
    const isValid = validExtensions.some(ext => fileName.endsWith(ext)) || file.type.startsWith('image/');

    if (!isValid) {
      setErrorMsg('Unsupported format. Please upload JPEG, PNG, or DICOM medical image files.');
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setErrorMsg('File exceeds maximum size limit (25MB).');
      return;
    }

    onImageSelect(file, file.name);
  };

  const handleSampleClick = async (sample) => {
    if (isAnalyzing) return;
    setErrorMsg(null);

    try {
      const res = await fetch(sample.imageUrl);
      const blob = await res.blob();
      const file = new File([blob], sample.filename, { type: 'image/jpeg' });
      onImageSelect(file, sample.filename, sample);
    } catch (err) {
      console.error('Failed to load sample image:', err);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-5xl mx-auto space-y-10"
    >
      
      {/* Expansive Hero Drag & Drop Zone */}
      <div className="glow-border-wrapper shadow-2xl">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !isAnalyzing && fileInputRef.current?.click()}
          className={`glow-border-inner relative p-10 sm:p-16 transition-all duration-300 cursor-pointer text-center overflow-hidden ${
            isDragging
              ? 'bg-cyan-950/40 shadow-[0_0_50px_rgba(0,242,254,0.3)] scale-[1.01]'
              : darkMode
                ? 'bg-slate-950/90 hover:bg-slate-900/80 backdrop-blur-2xl'
                : 'bg-white/95 hover:bg-cyan-50/50 backdrop-blur-2xl'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp,.dcm,.dicom"
            className="hidden"
            onChange={handleFileInput}
            disabled={isAnalyzing}
          />

          {/* Ambient Lighting Orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />

          {/* Background Matrix Grid Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: 'radial-gradient(rgba(6, 182, 212, 0.5) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          />

          <div className="relative flex flex-col items-center space-y-6">
            
            {/* Holographic Radar / Orbital Rings Center */}
            <div className="relative flex items-center justify-center w-28 h-28">
              
              {/* Outer Rotating Dashed Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/40 animate-spin-slow" />
              
              {/* Pulsing Quantum Ring */}
              <div className="absolute inset-2 rounded-full border border-teal-400/30 quantum-ring" />

              {/* Glowing Center Badge */}
              <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-teal-500/20 to-indigo-500/20 border border-cyan-400/50 shadow-neon-cyan backdrop-blur-md group-hover:scale-105 transition-transform duration-300">
                <UploadCloud className="w-10 h-10 text-cyan-400" />
              </div>

              {/* Crosshair accents */}
              <span className="absolute -top-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="absolute -bottom-1 w-2 h-2 rounded-full bg-teal-400" />
            </div>

            {/* Typography & Guidance */}
            <div className="space-y-2 max-w-xl">
              <h3 className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-display ${darkMode ? 'text-white' : 'text-gray-950'}`}>
                Drop Medical Image to <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">Analyze Pathologies</span>
              </h3>
              <p className={`text-sm sm:text-base leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Strictly image-centric workflow. Accepts high-resolution retinal fundus, optical scans, or DICOM series.
              </p>
            </div>

            {/* Supported Formats Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              {[
                { name: 'JPEG / JPG', desc: 'Retinal Fundus' },
                { name: 'PNG', desc: 'Lossless Medical' },
                { name: 'DICOM (.dcm)', desc: 'Clinical Standard' }
              ].map((fmt) => (
                <span
                  key={fmt.name}
                  className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                    darkMode
                      ? 'bg-slate-900/80 border-cyan-500/25 text-cyan-300 shadow-sm'
                      : 'bg-white border-cyan-400/40 text-gray-800 shadow-sm'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <strong>{fmt.name}</strong>
                  <span className="text-gray-400 text-[10px]">({fmt.desc})</span>
                </span>
              ))}
            </div>

            {/* Clinical Trust Footnote */}
            <div className="flex items-center space-x-2 text-xs text-gray-400 pt-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Zero-Storage Client Security • Hybrid Quantum Latent Co-Processor</span>
            </div>

          </div>

          {/* Error message */}
          {errorMsg && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center justify-center space-x-2 shadow-lg"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Premium Benchmark Evaluation Cards (Hackathon Evaluator Showcase) */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className={`text-sm font-bold uppercase tracking-wider font-display ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                1-Click Clinical Benchmark Presets
              </h4>
              <p className="text-xs text-gray-400">Instant demonstration cases for judges & ophthalmology review</p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-cyan-400 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            Instant Test Mode
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SAMPLE_CASES.map((sample) => {
            const isMild = sample.badgeColor === 'emerald';
            const isMod = sample.badgeColor === 'amber';
            const isSev = sample.badgeColor === 'rose';

            return (
              <motion.div
                key={sample.id}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSampleClick(sample);
                }}
                className={`relative group rounded-2xl p-4 border transition-all duration-300 cursor-pointer overflow-hidden ${
                  darkMode
                    ? 'bg-slate-900/60 hover:bg-slate-850 border-slate-800 hover:border-cyan-400/50 shadow-lg'
                    : 'bg-white hover:bg-cyan-50/30 border-gray-200 hover:border-cyan-400 shadow-md'
                }`}
              >
                {/* Colored Top Accent Light */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                  isMild ? 'from-emerald-400 to-teal-400' :
                  isMod ? 'from-amber-400 to-orange-400' : 'from-rose-500 to-purple-500'
                }`} />

                <div className="flex items-start space-x-3.5">
                  {/* High-Resolution Thumbnail with Lens Effect */}
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-700/60 shrink-0 shadow-inner group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all">
                    <img
                      src={sample.imageUrl}
                      alt={sample.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Eye className="w-5 h-5 text-white drop-shadow" />
                    </div>
                  </div>

                  {/* Specimen Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase border ${
                        isMild ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                        isMod ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                        'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      }`}>
                        {sample.category}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>

                    <h5 className={`font-bold text-sm mt-1 truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {sample.title}
                    </h5>

                    <p className="text-[11px] text-gray-400 line-clamp-2 mt-0.5 leading-relaxed">
                      {sample.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Trigger Footer */}
                <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                  <span className="text-gray-400 font-mono text-[10px]">{sample.filename}</span>
                  <span className="font-bold text-cyan-400 flex items-center space-x-1 group-hover:underline">
                    <span>Load Specimen</span>
                    <span>→</span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

    </motion.div>
  );
};
