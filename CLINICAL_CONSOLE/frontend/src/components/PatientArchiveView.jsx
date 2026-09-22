import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  ShieldCheck, 
  Download, 
  Eye, 
  FileText, 
  Calendar, 
  AlertTriangle, 
  Database,
  RefreshCw
} from 'lucide-react';
import archiveBg from '../assets/image_e7bea0.jpg';

export const PatientArchiveView = ({
  historyList = [],
  onSelectScan,
  onOpenReport,
  onRefresh,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [highRiskOnly, setHighRiskOnly] = useState(false);

  // Ensure body receives background properties to fit perfectly at any zoom level without distortion
  useEffect(() => {
    const originalBodyBg = document.body.style.backgroundImage;
    const originalBodySize = document.body.style.backgroundSize;
    const originalBodyPos = document.body.style.backgroundPosition;
    const originalBodyRepeat = document.body.style.backgroundRepeat;
    const originalBodyAttachment = document.body.style.backgroundAttachment;

    document.body.style.backgroundImage = `url(${archiveBg}), url('/image_e7bea0.jpg')`;
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

  // Keyboard shortcut Ctrl+K to focus search input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('patient-search-input')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter list based on search and high risk toggle
  const filteredList = useMemo(() => {
    return historyList.filter((item) => {
      const matchesSearch = 
        !searchQuery ||
        item.scan_uuid?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.filename?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.severity_name?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRisk = highRiskOnly ? (item.severity_grade >= 2) : true;

      return matchesSearch && matchesRisk;
    });
  }, [historyList, searchQuery, highRiskOnly]);

  // Export history to JSON
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(historyList, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `quantum_dr_patient_archive_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div 
      className="space-y-6 animate-fadeIn pb-12 patient-archive-wrapper"
      style={{
        backgroundImage: `url(${archiveBg}), url('/image_e7bea0.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      
      {/* 1. Header with HIPAA Compliance Badge & Clinical Subtitle */}
      <section 
        className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 overflow-hidden rounded-2xl border border-teal-100/90 p-6 shadow-surgical glass-card-clinical"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-teal-700 font-mono">
            PATIENT MANAGEMENT & RECORDS
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5 font-sans">
            Patient Archive — Clinical EHR
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Secure longitudinal records, fundus imaging archive, and AI-powered diagnostic screening history.
          </p>
        </div>

        {/* HIPAA Compliance Badge */}
        <div className="relative z-10 rounded-xl bg-teal-50/80 border border-teal-200/80 px-4 py-3 flex items-center gap-3.5 max-w-md backdrop-blur-xs">
          <div className="w-9 h-9 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800">HIPAA & GDPR Clinical Encryption</h4>
            <p className="text-[11px] text-slate-600 leading-snug">
              Patient data is encrypted at rest and accessible exclusively by credentialed clinicians.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Filter & Search Action Bar */}
      <section 
        className="border border-teal-100/90 rounded-2xl p-4 shadow-surgical flex flex-col md:flex-row items-center justify-between gap-3 glass-card-clinical"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        
        {/* Left: Search Bar & High Risk Filter */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto flex-1">
          
          {/* Search with Ctrl+K */}
          <div className="relative w-full sm:max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              id="patient-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Scan ID, Filename, or Condition..."
              className="w-full pl-10 pr-18 py-2 bg-slate-50/90 border border-slate-200 rounded-xl text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all shadow-inner"
            />
            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-semibold text-slate-400 bg-white border border-slate-200 rounded shadow-xs">
                Ctrl + K
              </kbd>
            </div>
          </div>

          {/* High-Risk Filter Toggle */}
          <button
            type="button"
            onClick={() => setHighRiskOnly(!highRiskOnly)}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap shadow-xs ${
              highRiskOnly
                ? 'bg-rose-600 text-white border-rose-600'
                : 'bg-rose-50/90 border-rose-200 text-rose-800 hover:bg-rose-100/90'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${highRiskOnly ? 'bg-white' : 'bg-rose-500 animate-ping'}`} />
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Filter: High-Risk Only</span>
          </button>

          {/* Refresh Database */}
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="p-2 rounded-xl border border-slate-200 bg-white/80 hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              title="Refresh database records"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Right: Export Archive */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={handleExportJSON}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white/90 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs transition-colors cursor-pointer floating-elevation"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Records (JSON)</span>
          </button>
        </div>

      </section>

      {/* 3. Longitudinal EHR Data Table */}
      <section 
        className="border border-teal-100/90 rounded-2xl shadow-surgical overflow-hidden glass-card-clinical"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        
        {filteredList.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">No Patient Records Match Query</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search criteria or conduct a new diagnostic screening from the workspace.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80 font-mono text-[11px] uppercase tracking-wider text-slate-500">
                  <th className="py-3 px-4 font-semibold">Scan ID</th>
                  <th className="py-3 px-4 font-semibold">Patient File</th>
                  <th className="py-3 px-4 font-semibold">Timestamp</th>
                  <th className="py-3 px-4 font-semibold">Classification</th>
                  <th className="py-3 px-4 font-semibold">Quantum Certainty</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filteredList.map((item) => {
                  const isHighRisk = item.severity_grade >= 2;
                  const formattedDate = item.created_at 
                    ? new Date(item.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                    : 'Recent Encounter';

                  return (
                    <tr 
                      key={item.scan_uuid || item.id}
                      className="hover:bg-teal-50/30 transition-colors group"
                    >
                      {/* Scan ID with Icon */}
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-teal-600" />
                          <span>{item.scan_uuid?.slice(0, 10) || `SCAN-${item.id}`}</span>
                        </div>
                      </td>

                      {/* Patient File / Filename */}
                      <td className="py-3.5 px-4">
                        <div>
                          <span className="font-semibold text-slate-900 block truncate max-w-[200px]">
                            {item.filename || 'Fundus_Examination.jpg'}
                          </span>
                          <span className="font-mono text-[10px] text-slate-400">
                            {item.lesion_count !== undefined ? `${item.lesion_count} Lesions Isolated` : 'Calibrated'}
                          </span>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{formattedDate}</span>
                        </div>
                      </td>

                      {/* Classification Badge */}
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold font-mono border ${
                          item.predicted_label === 'NO_DR'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : isHighRisk
                              ? 'bg-rose-50 text-rose-800 border-rose-200'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            item.predicted_label === 'NO_DR' ? 'bg-emerald-500' : isHighRisk ? 'bg-rose-500' : 'bg-amber-500'
                          }`} />
                          <span>{item.severity_name || (item.predicted_label === 'NO_DR' ? 'No DR' : 'DR Detected')}</span>
                        </span>
                      </td>

                      {/* Quantum Certainty Progress */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2 max-w-[120px]">
                          <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                item.predicted_label === 'NO_DR' ? 'bg-emerald-500' : 'bg-teal-600'
                              }`}
                              style={{ width: `${Math.round(item.confidence * 100)}%` }}
                            />
                          </div>
                          <span className="font-mono text-[11px] font-bold text-slate-800">
                            {Math.round(item.confidence * 100)}%
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onSelectScan(item.scan_uuid)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100/80 border border-teal-200 text-teal-800 text-[11px] font-semibold transition-colors cursor-pointer"
                            title="Load in Dual-Viewer Workspace"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Inspect</span>
                          </button>

                          <button
                            onClick={async () => {
                              await onSelectScan(item.scan_uuid);
                              onOpenReport();
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-[11px] font-semibold transition-colors cursor-pointer"
                            title="Open Diagnostic Report"
                          >
                            <FileText className="w-3 h-3" />
                            <span>Report</span>
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

      </section>

    </div>
  );
};
