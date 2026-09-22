import React from 'react';
import { X, History, Clock, FileCheck2, ArrowRight, Database } from 'lucide-react';

export const HistoryDrawer = ({
  isOpen,
  onClose,
  historyList = [],
  onSelectScan,
  darkMode,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className={`w-full max-w-md h-full flex flex-col border-l shadow-2xl transition-colors ${
        darkMode ? 'bg-gray-950 border-gray-800 text-white' : 'bg-white border-gray-200 text-gray-900'
      }`}>
        
        {/* Header */}
        <div className="p-5 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">Scan History Database</h3>
              <p className="text-xs text-gray-400">Persisted Scans & XAI Diagnostics</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scan List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {historyList.length === 0 ? (
            <div className="h-48 flex flex-col items-center justify-center text-center text-gray-400 space-y-2">
              <History className="w-8 h-8 opacity-40" />
              <p className="text-sm font-medium">No scans recorded yet</p>
              <p className="text-xs text-gray-500">Upload an image to trigger the first prediction.</p>
            </div>
          ) : (
            historyList.map((item) => (
              <div
                key={item.scan_uuid || item.id}
                onClick={() => {
                  onSelectScan(item.scan_uuid);
                  onClose();
                }}
                className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer group ${
                  darkMode
                    ? 'bg-gray-900/60 hover:bg-gray-800/80 border-gray-800 hover:border-cyan-500/50'
                    : 'bg-gray-50 hover:bg-cyan-50/50 border-gray-200 hover:border-cyan-400'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1 min-w-0 flex-1">
                    <span className="font-bold text-xs truncate block text-cyan-400 group-hover:text-cyan-300">
                      {item.filename}
                    </span>
                    <p className={`text-xs font-semibold ${
                      item.predicted_label === 'NO_DR' ? 'text-emerald-400' : 'text-amber-400'
                    }`}>
                      {item.severity_name}
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0 ml-2">
                    {(item.confidence * 100).toFixed(1)}%
                  </span>
                </div>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-800/60 text-[11px] text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{item.created_at ? new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recent'}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-cyan-400 font-medium group-hover:translate-x-1 transition-transform">
                    <span>Re-examine</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800 text-xs text-gray-400 flex items-center justify-between">
          <span>Total Records: {historyList.length}</span>
          <span className="font-mono text-cyan-400">SQLite / PostgreSQL</span>
        </div>

      </div>
    </div>
  );
};
