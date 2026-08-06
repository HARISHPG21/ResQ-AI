'use client';

import React from 'react';
import { Building2, Landmark, CheckCircle, AlertTriangle } from 'lucide-react';

interface DashboardProps {
  regionName?: string;
  stateName?: string;
}

export const StateAdminDashboard: React.FC<DashboardProps> = ({
  regionName = 'Cuttack & Mahanadi Basin',
  stateName = 'Odisha'
}) => {
  return (
    <div className="space-y-5">
      <div className="glass-panel p-4 rounded-xl border border-amber-500/30 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-400" />
            State Disaster Management Authority (SDMA) - Odisha State Command
          </h2>
          <p className="text-xs text-slate-400">Monitoring 4 Alert Districts: Cuttack, Puri, Kendrapara, Jagatsinghpur.</p>
        </div>
        <div className="bg-amber-500/20 text-amber-400 border border-amber-500/40 px-3 py-1 rounded-lg text-xs font-bold">
          State Alert Status: ORANGE HIGH WATCH
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-4 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400">District Wise Evacuation</div>
          <div className="text-xl font-bold text-white mt-1">Cuttack: 82% Evacuated</div>
          <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
            <div className="bg-cyan-500 h-full w-[82%]"></div>
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400">State SDRF Funds Allocated</div>
          <div className="text-xl font-bold text-emerald-400 mt-1">₹ 45.0 Crores</div>
          <div className="text-[10px] text-slate-400 mt-1">Direct Grant Released to 4 District Collectors</div>
        </div>

        <div className="glass-card p-4 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400">Helicopter Air-Drop Squads</div>
          <div className="text-xl font-bold text-white mt-1">6 IAF Helicopters</div>
          <div className="text-[10px] text-cyan-400 font-semibold mt-1">Food Packets Dropped: 18,500</div>
        </div>
      </div>
    </div>
  );
};
