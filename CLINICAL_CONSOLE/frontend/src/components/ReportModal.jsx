import React from 'react';
import { X, Printer, Download, ShieldCheck, Activity, Eye, FileText, CheckCircle2 } from 'lucide-react';

export const ReportModal = ({ isOpen, onClose, result }) => {
  if (!isOpen || !result) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-teal-100 dark:border-slate-800 shadow-2xl overflow-hidden text-slate-800 dark:text-slate-100">
        
        {/* Top Control Bar (Hidden when printing) */}
        <div className="p-4 border-b border-teal-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/90 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-teal-700 dark:text-teal-400" />
            <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white font-sans">
              Quantum-DR Diagnostic Summary EHR Report
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-teal-700 hover:bg-teal-800 text-white transition-colors cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Document Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 print:p-0">
          
          {/* Clinical Letterhead */}
          <div className="border-b-2 border-teal-700 dark:border-teal-500 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight text-teal-800 dark:text-teal-300 font-sans">
                  QUANTUM-DR CLINICAL DIAGNOSTICS
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Hybrid Quantum-Classical Retinal Decision Support Center • PennyLane 4-Qubit VQC
                </p>
              </div>
            </div>
            <div className="text-right text-xs font-mono text-slate-500 dark:text-slate-400">
              <div>UUID: {result.scan_uuid?.slice(0, 13) || 'SCAN-7741-B'}</div>
              <div>DATE: {new Date(result.timestamp || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
            </div>
          </div>

          {/* Patient / Scan Metadata Block */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-xs font-mono">
            <div>
              <span className="text-slate-400 dark:text-slate-500 block text-[10px]">SCAN TARGET</span>
              <strong className="text-slate-900 dark:text-white">{result.filename}</strong>
            </div>
            <div>
              <span className="text-slate-400 dark:text-slate-500 block text-[10px]">AI ENGINE</span>
              <strong className="text-teal-700 dark:text-teal-400">CNN ResNet + 4-Qubit</strong>
            </div>
            <div>
              <span className="text-slate-400 dark:text-slate-500 block text-[10px]">ICD-10 CODE</span>
              <strong className="text-slate-900 dark:text-white">{result.clinical_reasoning?.icd_code || 'E11.319'}</strong>
            </div>
            <div>
              <span className="text-slate-400 dark:text-slate-500 block text-[10px]">TRIAGE STATUS</span>
              <strong className="text-rose-700 dark:text-rose-400">{result.clinical_reasoning?.urgency_level || 'EVALUATED'}</strong>
            </div>
          </div>

          {/* Primary Finding */}
          <div className={`p-4 rounded-xl border space-y-2 ${
            result.predicted_label === 'NO_DR' 
              ? 'bg-emerald-50/70 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200' 
              : 'bg-rose-50/70 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800 text-rose-950 dark:text-rose-200'
          }`}>
            <span className="text-[10px] font-bold uppercase tracking-wider font-mono opacity-75">
              Diagnostic Finding
            </span>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">
                {result.severity_name} (Grade {result.severity_grade})
              </h2>
              <span className="text-xl font-bold font-mono">
                Model Certainty: {(result.confidence * 100).toFixed(1)}%
              </span>
            </div>
            <p className="text-xs leading-relaxed opacity-90 font-sans">
              {result.clinical_reasoning?.summary}
            </p>
          </div>

          {/* Pathological Lesions Identified */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-700 dark:text-slate-300">
              Identified Lesion Markers ({result.bounding_boxes?.length || 0})
            </h3>
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-mono text-[10px]">
                  <tr>
                    <th className="p-2.5">Lesion Classification</th>
                    <th className="p-2.5">Severity</th>
                    <th className="p-2.5">Model Confidence</th>
                    <th className="p-2.5">Pathological Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                  {result.bounding_boxes && result.bounding_boxes.length > 0 ? (
                    result.bounding_boxes.map((b) => (
                      <tr key={b.id}>
                        <td className="p-2.5 font-bold text-teal-800 dark:text-teal-300 font-sans">{b.label}</td>
                        <td className="p-2.5 uppercase text-[10px] text-slate-700 dark:text-slate-300">{b.severity}</td>
                        <td className="p-2.5 text-slate-700 dark:text-slate-300">{(b.confidence * 100).toFixed(0)}%</td>
                        <td className="p-2.5 text-slate-600 dark:text-slate-400 font-sans">{b.description}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="p-3 text-center text-slate-400 dark:text-slate-500 font-sans">
                        No pathological lesions or microaneurysms detected in fundus photography.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommended Action */}
          <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300 font-mono">
              Actionable Clinical Protocol
            </span>
            <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300 font-sans">
              {result.clinical_reasoning?.recommended_action}
            </p>
          </div>

          {/* Doctor Sign-off & Medical Legal Disclaimer */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-xs">
            <div className="text-[10px] text-slate-500 dark:text-slate-400 max-w-sm font-sans">
              * Quantum-DR Hybrid Quantum AI is an investigative clinical decision-support scaffold.
              Final diagnostic certification must be confirmed by a licensed ophthalmologist or retina specialist.
            </div>
            <div className="text-right border-t border-slate-300 dark:border-slate-700 pt-2 min-w-[180px]">
              <span className="text-[11px] font-mono block text-slate-500 dark:text-slate-400">Attending Physician / Specialist</span>
              <span className="text-xs font-bold block mt-3 text-teal-800 dark:text-teal-400">Dr. Signature: __________________</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
