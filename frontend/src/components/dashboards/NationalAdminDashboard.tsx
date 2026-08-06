'use client';

import React, { useState } from 'react';
import { ShieldAlert, AlertCircle, Users, Activity, Layers, ArrowUpRight, FileText, CheckCircle } from 'lucide-react';

interface DashboardProps {
  regionName?: string;
  stateName?: string;
}

export const NationalAdminDashboard: React.FC<DashboardProps> = ({
  regionName = 'Cuttack & Mahanadi Basin',
  stateName = 'Odisha'
}) => {
  const [emergencyDeclared, setEmergencyDeclared] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 5000);
  };

  const handleDeclareEmergency = () => {
    setEmergencyDeclared(true);
    showToast(`🚨 NATIONAL EMERGENCY DECLARED for ${regionName} (${stateName}) — All NDRF Battalions & Air Force Squadrons Mobilized`);
  };

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert Banner */}
      {toast && (
        <div className="bg-red-500/15 border border-red-500/40 rounded-xl px-4 py-3 flex items-center gap-2 text-red-400 text-xs font-bold shadow-lg animate-pulse">
          <CheckCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="glass-panel p-5 rounded-2xl border border-red-500/30 bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-900 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-red-400 font-extrabold text-xs uppercase tracking-wider">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
            National Disaster Management Authority (NDMA) — Situation Room
          </div>
          <h2 className="text-xl font-black text-white mt-1">Country-Wide Disaster Operations Command Center</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Active Regional Command: <span className="text-cyan-400 font-bold">{regionName} ({stateName})</span> • Monitoring 3 Active National Emergencies
          </p>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button
            onClick={handleDeclareEmergency}
            className={`px-4 py-2 rounded-xl font-extrabold text-xs shadow-glow-red transition flex items-center gap-2 cursor-pointer outline-none ${
              emergencyDeclared
                ? 'bg-red-700 text-white border border-red-400'
                : 'bg-red-600 hover:bg-red-500 text-white'
            }`}
          >
            <AlertCircle className="w-4 h-4" />
            {emergencyDeclared ? 'National Emergency Active ✓' : 'Declare National Emergency'}
          </button>

          <button
            onClick={handleExportPDF}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs transition flex items-center gap-2 shadow-glow-emerald cursor-pointer outline-none"
          >
            <FileText className="w-4 h-4 fill-slate-950" />
            <span>Export NDMA Briefing PDF</span>
          </button>
        </div>
      </div>

      {/* Key National Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Total Affected Citizens</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white">1,48,200</div>
          <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" />
            12,400 Rescued in Last 24 Hours
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>NDRF Battalions Deployed</span>
            <ShieldAlert className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">32 Teams</div>
          <div className="text-[10px] text-slate-400">1,280 Personnel on Active Duty</div>
        </div>

        <div className="glass-card p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Active Danger Zones</span>
            <AlertCircle className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-2xl font-black text-red-400">18 Critical Zones</div>
          <div className="text-[10px] text-slate-400">Includes {regionName}</div>
        </div>

        <div className="glass-card p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>National Response Time</span>
            <Activity className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">8.4 Minutes</div>
          <div className="text-[10px] text-emerald-400 font-bold">⚡ 65% Faster Dispatch</div>
        </div>
      </div>
    </div>
  );
};
