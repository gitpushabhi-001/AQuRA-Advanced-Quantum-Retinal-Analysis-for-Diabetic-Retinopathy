import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { WorkspaceView } from './components/WorkspaceView';
import { PatientArchiveView } from './components/PatientArchiveView';
import { SystemDiagnosticsView } from './components/SystemDiagnosticsView';
import { ClinicalOverviewView } from './components/ClinicalOverviewView';
import { ReportModal } from './components/ReportModal';
import { predictImage, getScanHistory, getScanDetail, checkBackendHealth } from './services/api';
import { Bell, X, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export function App() {
  // Navigation View: 'overview' | 'workspace' | 'archive' | 'diagnostics'
  const [activeView, setActiveView] = useState('workspace');
  
  // Pipeline & Diagnostic State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0); // 0 to 4
  const [imagePreview, setImagePreview] = useState(null);
  const [activeResult, setActiveResult] = useState(null);
  
  // EHR & System History
  const [historyList, setHistoryList] = useState([]);
  const [backendStatus, setBackendStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  
  // Modals
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Initial load: fetch health and scan history
  useEffect(() => {
    loadHealthAndHistory();
  }, []);

  const loadHealthAndHistory = async () => {
    try {
      const health = await checkBackendHealth();
      setBackendStatus(health);
    } catch (err) {
      console.warn('Backend currently unreachable. Will retry on demand.');
    }

    try {
      const hist = await getScanHistory();
      setHistoryList(hist || []);
    } catch (err) {
      console.warn('Could not load history yet.');
    }
  };

  // Image submission and 5-step pipeline progression
  const handleImageSelect = async (fileOrBlob, filename) => {
    setErrorMessage(null);
    setIsAnalyzing(true);
    setProcessingStep(0);
    setActiveResult(null);

    // Create preview URL
    const previewUrl = URL.createObjectURL(fileOrBlob);
    setImagePreview(previewUrl);

    // Make sure we're on the workspace view
    setActiveView('workspace');

    // Simulate pipeline progression for clinician visualization
    const stepInterval = setInterval(() => {
      setProcessingStep((prev) => (prev < 4 ? prev + 1 : prev));
    }, 700);

    // Ensure at least 3.2s so the user sees all 5 steps of the quantum pipeline execute
    const minDelay = new Promise((resolve) => setTimeout(resolve, 3200));

    try {
      const [response] = await Promise.all([
        predictImage(fileOrBlob, filename),
        minDelay
      ]);

      clearInterval(stepInterval);
      setProcessingStep(5);
      setActiveResult(response);
      setIsAnalyzing(false);

      // Celebrate if healthy
      if (response.predicted_label === 'NO_DR') {
        confetti({
          particleCount: 45,
          spread: 55,
          origin: { y: 0.65 }
        });
      }

      // Refresh scan history
      const updatedHist = await getScanHistory();
      setHistoryList(updatedHist || []);
    } catch (err) {
      clearInterval(stepInterval);
      console.error('Prediction failed:', err);
      setIsAnalyzing(false);
      setErrorMessage(
        err.response?.data?.detail || 
        'Analysis failed. Ensure the FastAPI backend server is active on port 8000.'
      );
    }
  };

  // Load a historical scan from the archive
  const handleSelectHistoryScan = async (scanUuid) => {
    try {
      const detail = await getScanDetail(scanUuid);
      setActiveResult(detail);
      setImagePreview(detail.image_url);
      setActiveView('workspace');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Failed to load scan details:', err);
      setErrorMessage('Could not load detailed record for scan ' + scanUuid);
    }
  };

  const handleReset = () => {
    setActiveResult(null);
    setImagePreview(null);
    setErrorMessage(null);
    setProcessingStep(0);
  };

  return (
    <div 
      className="min-h-screen clinical-overview-wrapper text-slate-800 antialiased flex flex-col font-sans selection:bg-teal-100 selection:text-teal-900 relative"
      style={{
        backgroundImage: "url('/image_e7bea0.jpg'), url('/image_f6ca80.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >

      {/* Top Clinical Navigation Bar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        backendStatus={backendStatus}
        onOpenReport={() => setIsReportOpen(true)}
        hasActiveResult={!!activeResult}
        notificationCount={3}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
      />

      {/* Main View Container */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 pb-12 flex-1">
        
        {activeView === 'overview' && (
          <ClinicalOverviewView
            onLaunchWorkspace={() => setActiveView('workspace')}
            onOpenArchive={() => setActiveView('archive')}
            setActiveView={setActiveView}
            historyCount={historyList.length}
          />
        )}

        {activeView === 'workspace' && (
          <WorkspaceView
            isAnalyzing={isAnalyzing}
            processingStep={processingStep}
            activeResult={activeResult}
            imagePreview={imagePreview}
            onImageSelect={handleImageSelect}
            onReset={handleReset}
            onOpenReport={() => setIsReportOpen(true)}
            errorMessage={errorMessage}
            onDismissError={() => setErrorMessage(null)}
          />
        )}

        {activeView === 'archive' && (
          <PatientArchiveView
            historyList={historyList}
            onSelectScan={handleSelectHistoryScan}
            onOpenReport={() => setIsReportOpen(true)}
            onRefresh={loadHealthAndHistory}
          />
        )}

        {activeView === 'diagnostics' && (
          <SystemDiagnosticsView
            backendStatus={backendStatus}
            activeResult={activeResult}
          />
        )}

      </main>

      {/* EHR Diagnostic Report Modal */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        result={activeResult}
      />

      {/* Clinical Notifications Modal */}
      {isNotificationsOpen && (
        <div 
          onClick={() => setIsNotificationsOpen(false)}
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-start justify-end p-4 sm:p-6 animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-white rounded-2xl border border-teal-100 shadow-2xl overflow-hidden mt-12"
          >
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-teal-700" />
                <h3 className="font-bold text-xs text-slate-800">Clinical Telemetry Alerts</h3>
              </div>
              <button 
                onClick={() => setIsNotificationsOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="divide-y divide-slate-100 p-2 text-xs">
              <div className="p-3 hover:bg-teal-50/40 rounded-xl transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900">Quantum Hardware Ready</span>
                  <span className="font-mono text-[10px] text-emerald-700">Live</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  PennyLane default.qubit 4-qubit circuit simulator calibrated with CZ-ring topology.
                </p>
              </div>

              <div className="p-3 hover:bg-teal-50/40 rounded-xl transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900">Longitudinal EHR Sync</span>
                  <span className="font-mono text-[10px] text-slate-400">10m ago</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Historical diagnostic scan database synchronized with SQLite store.
                </p>
              </div>

              <div className="p-3 hover:bg-teal-50/40 rounded-xl transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900">Multimodal AI Online</span>
                  <span className="font-mono text-[10px] text-indigo-700">Gemini 2.5</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Clinical decision support reasoning pipeline active for automated EHR reports.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
