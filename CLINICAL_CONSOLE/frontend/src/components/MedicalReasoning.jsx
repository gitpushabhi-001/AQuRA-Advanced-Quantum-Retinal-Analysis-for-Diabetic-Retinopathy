import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, CheckCircle2, AlertTriangle, AlertOctagon, Info, ArrowRight, ShieldCheck, FileCheck, Bookmark } from 'lucide-react';

const SEVERITY_STAGES = [
  { grade: 0, label: "No DR", desc: "Healthy Retina" },
  { grade: 1, label: "Mild", desc: "Microaneurysms" },
  { grade: 2, label: "Moderate", desc: "Exudates & Hemorrhages" },
  { grade: 3, label: "Severe", desc: "Cotton Wool Spots" },
  { grade: 4, label: "PDR", desc: "Neovascularization" },
];

export const MedicalReasoning = ({
  predictedLabel,
  confidence,
  severityGrade,
  severityName,
  clinicalReasoning,
  darkMode,
}) => {
  const isHealthy = predictedLabel === 'NO_DR' || severityGrade === 0;

  const getUrgencyColor = (urgency) => {
    switch (urgency?.toLowerCase()) {
      case 'routine':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'elevated':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'urgent':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
      case 'critical':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/40 shadow-neon-rose animate-pulse';
      default:
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`rounded-3xl border p-6 sm:p-7 space-y-6 transition-colors shadow-2xl backdrop-blur-xl ${
        darkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white/95 border-gray-200'
      }`}
    >
      
      {/* Clinical Card Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Stethoscope className="w-4 h-4" />
            </div>
            <h3 className={`text-base font-bold font-display ${darkMode ? 'text-white' : 'text-gray-950'}`}>
              Clinical Diagnostic Report
            </h3>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            ICD-10 Categorization & Hybrid Quantum Reasoning Engine
          </p>
        </div>

        {/* ICD-10 & Urgency Badges */}
        <div className="flex items-center space-x-2">
          {clinicalReasoning?.icd_code && (
            <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-slate-900 text-cyan-300 border border-slate-800">
              ICD-10: {clinicalReasoning.icd_code}
            </span>
          )}
          <span className={`px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider border ${getUrgencyColor(clinicalReasoning?.urgency_level)}`}>
            {clinicalReasoning?.urgency_level || 'EVALUATED'}
          </span>
        </div>
      </div>

      {/* Disease Progression Ladder (Interactive Timeline Visualizer) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-gray-400">
          <span>Diabetic Retinopathy Stage Scale:</span>
          <span className="text-cyan-400 font-bold">GRADE {severityGrade} OF 4</span>
        </div>

        <div className="grid grid-cols-5 gap-1.5 pt-1">
          {SEVERITY_STAGES.map((s) => {
            const isCurrent = s.grade === severityGrade;
            const isPast = s.grade < severityGrade;

            return (
              <div
                key={s.grade}
                className={`p-2 rounded-xl border text-center transition-all ${
                  isCurrent
                    ? s.grade === 0
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-neon-teal scale-105'
                      : s.grade >= 3
                        ? 'bg-rose-500/20 border-rose-400 text-rose-300 shadow-neon-rose scale-105'
                        : 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-sm scale-105'
                    : isPast
                      ? 'bg-slate-900/80 border-slate-800 text-gray-400 opacity-60'
                      : 'bg-slate-900/30 border-slate-800/50 text-gray-500 opacity-40'
                }`}
              >
                <div className="text-[10px] font-mono font-bold uppercase">{s.label}</div>
                <div className="text-[9px] mt-0.5 truncate hidden sm:block">{s.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Primary Diagnosis Banner with Glow */}
      <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg ${
        isHealthy 
          ? 'bg-emerald-950/20 border-emerald-500/30 shadow-emerald-950/30' 
          : severityGrade >= 3 
            ? 'bg-rose-950/20 border-rose-500/40 shadow-rose-950/30' 
            : 'bg-amber-950/20 border-amber-500/30 shadow-amber-950/30'
      }`}>
        <div className="space-y-1">
          <div className="flex items-center space-x-2.5">
            {isHealthy ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
            ) : severityGrade >= 3 ? (
              <AlertOctagon className="w-6 h-6 text-rose-400 shrink-0 animate-pulse" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0" />
            )}
            <h4 className={`text-xl font-black tracking-tight font-display ${darkMode ? 'text-white' : 'text-gray-950'}`}>
              {severityName}
            </h4>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">
            {clinicalReasoning?.summary}
          </p>
        </div>

        {/* Confidence Gauge readout */}
        <div className="sm:text-right shrink-0 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
          <div className="text-[10px] uppercase tracking-wider text-gray-400 font-mono">
            Model Confidence
          </div>
          <div className="text-3xl font-black font-mono text-cyan-400 mt-0.5">
            {(confidence * 100).toFixed(1)}%
          </div>
          <div className="w-28 h-1.5 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-teal-400"
              style={{ width: `${Math.min(confidence * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Explainable AI Narrative Block */}
      <div className="space-y-2">
        <h5 className={`text-xs font-bold uppercase tracking-wider font-mono flex items-center space-x-1.5 ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
          <Info className="w-3.5 h-3.5" />
          <span>Diagnostic Evidence Narrative</span>
        </h5>
        <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
          darkMode ? 'bg-slate-900/60 border-slate-800 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-700'
        }`}>
          {clinicalReasoning?.detailed_analysis}
        </div>
      </div>

      {/* Biomarker Indicator Matrix */}
      {clinicalReasoning?.biomarkers && clinicalReasoning.biomarkers.length > 0 && (
        <div className="space-y-2.5">
          <h5 className={`text-xs font-bold uppercase tracking-wider font-mono ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Pathological Retinal Biomarkers
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {clinicalReasoning.biomarkers.map((bm) => (
              <div
                key={bm.name}
                className={`p-3 rounded-xl border flex items-start justify-between text-xs ${
                  darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="space-y-0.5">
                  <span className={`font-semibold block ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {bm.name}
                  </span>
                  <span className="text-[11px] text-gray-400 block">
                    {bm.clinical_significance}
                  </span>
                </div>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold shrink-0 ml-2 ${
                  bm.status === 'Present'
                    ? 'bg-rose-500/15 text-rose-400 border border-rose-500/40'
                    : bm.status === 'Normal' || bm.status === 'Absent'
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/40'
                      : 'bg-amber-500/15 text-amber-400 border border-amber-500/40'
                }`}>
                  {bm.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actionable Clinical Recommendation */}
      <div className={`p-4 rounded-2xl border space-y-2 ${
        darkMode ? 'bg-cyan-950/30 border-cyan-500/40 shadow-sm' : 'bg-cyan-50/80 border-cyan-300'
      }`}>
        <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
          <ArrowRight className="w-4 h-4" />
          <span>Actionable Clinical Recommendation</span>
        </div>
        <p className={`text-xs leading-relaxed font-medium ${darkMode ? 'text-cyan-100' : 'text-gray-800'}`}>
          {clinicalReasoning?.recommended_action}
        </p>
      </div>

    </motion.div>
  );
};
