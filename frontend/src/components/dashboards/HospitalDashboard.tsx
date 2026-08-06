'use client';

import React from 'react';
import { Hospital, HeartPulse, Activity, Ambulance } from 'lucide-react';

interface DashboardProps {
  regionName?: string;
  stateName?: string;
}

export const HospitalDashboard: React.FC<DashboardProps> = ({
  regionName = 'Cuttack & Mahanadi Basin',
  stateName = 'Odisha'
}) => {
  return (
    <div className="space-y-5">
      <div className="glass-panel p-4 rounded-xl border border-pink-500/40 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Hospital className="w-5 h-5 text-pink-500" />
            SCB Medical College & Hospital Emergency Control
          </h2>
          <p className="text-xs text-slate-400">ICU Bed Occupancy, Trauma Ambulance Dispatch & Oxygen Stock Monitoring.</p>
        </div>
        <button className="px-3 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs shadow-glow-cyan flex items-center gap-1">
          <Ambulance className="w-3.5 h-3.5" />
          Dispatch Trauma Ambulance #02
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-3.5 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400">Available ICU Beds</div>
          <div className="text-2xl font-black text-pink-400 mt-1">24 / 50</div>
        </div>
        <div className="glass-card p-3.5 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400">General Trauma Beds</div>
          <div className="text-2xl font-black text-white mt-1">110 / 300</div>
        </div>
        <div className="glass-card p-3.5 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400">Oxygen Cylinders Stock</div>
          <div className="text-2xl font-black text-emerald-400 mt-1">350 Units</div>
        </div>
        <div className="glass-card p-3.5 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400">O-Negative Blood Units</div>
          <div className="text-2xl font-black text-amber-400 mt-1">20 Units</div>
        </div>
      </div>
    </div>
  );
};
