import React from 'react';
import { Eye, FileText, Bell, Activity, Database, Cpu, LayoutDashboard } from 'lucide-react';

export const Navbar = ({
  activeView = 'workspace',
  setActiveView,
  backendStatus = null,
  onOpenReport,
  hasActiveResult = false,
  notificationCount = 3,
  onOpenNotifications,
}) => {
  const navItems = [
    { id: 'overview', label: 'Clinical Overview', icon: LayoutDashboard },
    { id: 'workspace', label: 'Diagnostic Screening', icon: Eye },
    { id: 'archive', label: 'Patient Archive', icon: Database },
    { id: 'diagnostics', label: 'System Diagnostics', icon: Cpu },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-teal-100/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActiveView('workspace')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-700 to-teal-500 flex items-center justify-center text-white shadow-md shadow-teal-700/20 group-hover:scale-105 transition-transform duration-200">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-slate-900 font-sans">
                  Quantum-DR
                </span>
                <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200/60 uppercase tracking-widest">
                  v4.2
                </span>
              </div>
              <p className="text-[11px] text-teal-700 font-medium leading-none mt-0.5">
                AI for Healthier Sight • Clinical Decision Support
              </p>
            </div>
          </button>

          {/* Center Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 pl-4 border-l border-slate-200/80">
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'text-slate-600 hover:text-teal-800 hover:bg-teal-50/70'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Status Controls */}
        <div className="flex items-center gap-3">
          
          {/* Diagnostic Report Quick Button */}
          {hasActiveResult && (
            <button
              onClick={onOpenReport}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 hover:bg-teal-100/80 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              title="View full medical report"
            >
              <FileText className="w-3.5 h-3.5 text-teal-700" />
              <span className="hidden sm:inline">EHR Report</span>
            </button>
          )}

          {/* Backend Status Live Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-[11px]">
              {backendStatus?.status === 'healthy' 
                ? (backendStatus.is_simulation_mode ? 'Backend Active (QPU Sim)' : 'Backend Active (Live QPU)')
                : 'Backend Active'}
            </span>
          </div>

          {/* Notification Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors focus:outline-none"
            title="3 pending diagnostic notifications"
            type="button"
          >
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold font-mono flex items-center justify-center ring-2 ring-white leading-none">
                {notificationCount}
              </span>
            )}
          </button>
        </div>

      </div>

      {/* Mobile Nav Drawer */}
      <div className="md:hidden flex items-center justify-around border-t border-teal-100/60 bg-white/95 px-2 py-2">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-md text-[11px] font-semibold ${
                isActive ? 'text-teal-700 bg-teal-50' : 'text-slate-500'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
