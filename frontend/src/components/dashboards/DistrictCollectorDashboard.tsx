'use client';

import React from 'react';
import { Activity, Shield, MapPin, Radio, Megaphone } from 'lucide-react';

interface DashboardProps {
  regionName?: string;
  stateName?: string;
}

export const DistrictCollectorDashboard: React.FC<DashboardProps> = ({
  regionName = 'Cuttack & Mahanadi Basin',
  stateName = 'Odisha'
}) => {
  return (
    <div className="space-y-5">
      <div className="glass-panel p-4 rounded-xl border border-cyan-500/40 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            District Magistrate & Collector Command Room — Cuttack District
          </h2>
          <p className="text-xs text-slate-400">Local Evacuation Orders, Curfew Directives, and Emergency Resource Authorization.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 rounded-lg bg-red-600 text-white font-bold text-xs shadow-glow-red flex items-center gap-1.5">
            <Megaphone className="w-3.5 h-3.5" />
            Broadcast Emergency Alert SMS to District
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-3.5 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400">Tehsils Affected</div>
          <div className="text-xl font-black text-white mt-1">3 of 8 Tehsils</div>
        </div>
        <div className="glass-card p-3.5 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400">Active Rescue Operations</div>
          <div className="text-xl font-black text-emerald-400 mt-1">14 Squads Active</div>
        </div>
        <div className="glass-card p-3.5 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400">Shelter Food Stock Status</div>
          <div className="text-xl font-black text-cyan-400 mt-1">10 Days Remaining</div>
        </div>
        <div className="glass-card p-3.5 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400">Power Grid Status</div>
          <div className="text-xl font-black text-amber-400 mt-1">Substation 4 Shut Off</div>
        </div>
      </div>
    </div>
  );
};
