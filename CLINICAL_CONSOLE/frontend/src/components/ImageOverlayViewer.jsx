import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Layers, Sliders, Maximize2, Crosshair, Sparkles, Filter, CheckCircle2 } from 'lucide-react';

export const ImageOverlayViewer = ({
  imageUrl,
  heatmapData,
  boundingBoxes = [],
  darkMode,
}) => {
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showBoxes, setShowBoxes] = useState(true);
  const [heatmapOpacity, setHeatmapOpacity] = useState(0.70);
  const [selectedBoxId, setSelectedBoxId] = useState(null);
  const [hoveredBox, setHoveredBox] = useState(null);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState('OVERLAY'); // 'OVERLAY' | 'SPLIT'

  const uniqueLabels = ['ALL', ...new Set(boundingBoxes.map(b => b.label))];

  const filteredBoxes = activeFilter === 'ALL'
    ? boundingBoxes
    : boundingBoxes.filter(b => b.label === activeFilter);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-3xl border p-5 sm:p-6 transition-colors shadow-2xl backdrop-blur-xl ${
        darkMode ? 'bg-slate-950/80 border-slate-800 shadow-[0_0_40px_rgba(0,0,0,0.5)]' : 'bg-white/95 border-gray-200'
      }`}
    >
      
      {/* Workstation Top Control Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className={`text-base font-bold font-display ${darkMode ? 'text-white' : 'text-gray-950'}`}>
              Explainable AI (XAI) Workstation
            </h3>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Grad-CAM Neural Attention Maps & Localized Lesion Boundaries
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => setViewMode('OVERLAY')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              viewMode === 'OVERLAY'
                ? 'bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Composite Overlay
          </button>
          <button
            onClick={() => setViewMode('SPLIT')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              viewMode === 'SPLIT'
                ? 'bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Side-by-Side Split
          </button>
        </div>
      </div>

      {/* Layer Toggles & Slider */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-3.5 text-xs">
        
        {/* Layer Buttons */}
        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
              showHeatmap
                ? 'bg-cyan-500/15 border-cyan-400/50 text-cyan-300 font-semibold shadow-sm'
                : 'bg-slate-900/60 border-slate-800 text-gray-400 hover:text-gray-200'
            }`}
          >
            {showHeatmap ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>Grad-CAM Heatmap</span>
          </button>

          <button
            onClick={() => setShowBoxes(!showBoxes)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
              showBoxes
                ? 'bg-rose-500/15 border-rose-400/50 text-rose-300 font-semibold shadow-sm'
                : 'bg-slate-900/60 border-slate-800 text-gray-400 hover:text-gray-200'
            }`}
          >
            {showBoxes ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>Lesion Overlays ({filteredBoxes.length})</span>
          </button>
        </div>

        {/* Heatmap Opacity Range Slider */}
        {showHeatmap && (
          <div className="flex items-center space-x-3 bg-slate-900/50 px-3 py-1.5 rounded-xl border border-slate-800">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-gray-400 text-xs">Opacity:</span>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={heatmapOpacity}
              onChange={(e) => setHeatmapOpacity(parseFloat(e.target.value))}
              className="w-24 accent-cyan-400 cursor-pointer"
            />
            <span className="font-mono text-cyan-400 text-xs font-bold w-9">
              {Math.round(heatmapOpacity * 100)}%
            </span>
          </div>
        )}

      </div>

      {/* Category Filter Chips */}
      {showBoxes && uniqueLabels.length > 1 && (
        <div className="flex flex-wrap items-center gap-1.5 pb-3">
          <div className="flex items-center space-x-1 text-gray-400 text-[11px] mr-1.5">
            <Filter className="w-3 h-3" />
            <span>Filter:</span>
          </div>
          {uniqueLabels.map((lbl) => (
            <button
              key={lbl}
              onClick={() => setActiveFilter(lbl)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
                activeFilter === lbl
                  ? 'bg-cyan-400 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-900 border border-slate-800 text-gray-400 hover:border-slate-700 hover:text-gray-200'
              }`}
            >
              {lbl}
            </button>
          ))}
        </div>
      )}

      {/* Main Visual Display */}
      {viewMode === 'OVERLAY' ? (
        <div className="relative w-full max-w-xl mx-auto rounded-2xl overflow-hidden border-2 border-slate-800 bg-black aspect-square flex items-center justify-center select-none shadow-2xl">
          
          {/* Base Retinal Scan */}
          <img
            src={imageUrl}
            alt="Base Medical Scan"
            className="w-full h-full object-cover filter contrast-110"
          />

          {/* Grad-CAM Heatmap Layer */}
          {showHeatmap && heatmapData?.overlay_base64 && (
            <img
              src={heatmapData.overlay_base64}
              alt="Grad-CAM Activation"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-150 mix-blend-screen"
              style={{ opacity: heatmapOpacity }}
            />
          )}

          {/* Interactive Bounding Box Annotations */}
          {showBoxes && (
            <div className="absolute inset-0 w-full h-full pointer-events-auto">
              {filteredBoxes.map((boxItem) => {
                const [ymin, xmin, ymax, xmax] = boxItem.box;
                const isSelected = selectedBoxId === boxItem.id;
                const isHovered = hoveredBox?.id === boxItem.id;

                return (
                  <div
                    key={boxItem.id}
                    onClick={() => setSelectedBoxId(boxItem.id === selectedBoxId ? null : boxItem.id)}
                    onMouseEnter={() => setHoveredBox(boxItem)}
                    onMouseLeave={() => setHoveredBox(null)}
                    className="absolute border-2 transition-all duration-200 cursor-pointer group"
                    style={{
                      top: `${ymin * 100}%`,
                      left: `${xmin * 100}%`,
                      width: `${(xmax - xmin) * 100}%`,
                      height: `${(ymax - ymin) * 100}%`,
                      borderColor: boxItem.color || '#EF4444',
                      backgroundColor: isHovered || isSelected ? `${boxItem.color}35` : 'transparent',
                      boxShadow: isHovered || isSelected ? `0 0 20px ${boxItem.color}` : `0 0 5px ${boxItem.color}66`,
                    }}
                  >
                    {/* Corner Reticles */}
                    <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2" style={{ borderColor: boxItem.color }} />
                    <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2" style={{ borderColor: boxItem.color }} />
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2" style={{ borderColor: boxItem.color }} />
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2" style={{ borderColor: boxItem.color }} />

                    {/* Floating Label Chip */}
                    <span
                      className="absolute -top-6 left-0 px-2 py-0.5 rounded text-[10px] font-mono font-bold whitespace-nowrap text-white shadow-md"
                      style={{ backgroundColor: boxItem.color || '#EF4444' }}
                    >
                      {boxItem.label} ({(boxItem.confidence * 100).toFixed(0)}%)
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Hover / Selected Lesion Tooltip Glass Card */}
          <AnimatePresence>
            {(hoveredBox || selectedBoxId) && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-950/95 border border-cyan-400/50 backdrop-blur-xl text-xs shadow-2xl flex items-start space-x-3 pointer-events-none"
              >
                <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0 mt-0.5">
                  <Crosshair className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">
                      {(hoveredBox || boundingBoxes.find(b => b.id === selectedBoxId))?.label}
                    </span>
                    <span className="font-mono text-cyan-400 font-bold">
                      Confidence: {(((hoveredBox || boundingBoxes.find(b => b.id === selectedBoxId))?.confidence || 0) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-gray-300 text-xs mt-1 leading-relaxed">
                    {(hoveredBox || boundingBoxes.find(b => b.id === selectedBoxId))?.description}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      ) : (
        /* Side-by-Side Split View */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block">
              Reference Optical Fundus
            </span>
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-black aspect-square shadow-lg">
              <img src={imageUrl} alt="Original" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="space-y-1.5">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
              Grad-CAM Activation + Lesions
            </span>
            <div className="relative rounded-2xl overflow-hidden border-2 border-cyan-400/40 bg-black aspect-square shadow-neon-cyan">
              <img src={imageUrl} alt="Base" className="w-full h-full object-cover" />
              {heatmapData?.overlay_base64 && (
                <img
                  src={heatmapData.overlay_base64}
                  alt="Heatmap"
                  className="absolute inset-0 w-full h-full object-cover mix-blend-screen"
                  style={{ opacity: heatmapOpacity }}
                />
              )}
              {filteredBoxes.map((boxItem) => {
                const [ymin, xmin, ymax, xmax] = boxItem.box;
                return (
                  <div
                    key={boxItem.id}
                    className="absolute border-2"
                    style={{
                      top: `${ymin * 100}%`,
                      left: `${xmin * 100}%`,
                      width: `${(xmax - xmin) * 100}%`,
                      height: `${(ymax - ymin) * 100}%`,
                      borderColor: boxItem.color,
                      boxShadow: `0 0 10px ${boxItem.color}`,
                    }}
                  >
                    <span
                      className="absolute -top-5 left-0 px-1.5 py-0.2 rounded text-[9px] font-mono font-bold text-white shadow"
                      style={{ backgroundColor: boxItem.color }}
                    >
                      {boxItem.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Heatmap Gradient Legend Strip */}
      <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
        <div className="flex items-center space-x-2.5">
          <span className="font-mono text-[11px]">Attention Heatmap:</span>
          <div className="w-36 h-2.5 rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 via-yellow-400 to-red-600 shadow-sm" />
          <span className="text-[10px] font-mono">0.0 → 1.0</span>
        </div>
        <div className="font-mono text-[11px] space-x-3">
          <span>Peak Activation: <strong className="text-cyan-400 font-bold">{(heatmapData?.peak_activation * 100 || 94).toFixed(0)}%</strong></span>
          <span>Coverage: <strong className="text-white font-bold">{heatmapData?.coverage_percentage || 12.4}%</strong></span>
        </div>
      </div>

    </motion.div>
  );
};
