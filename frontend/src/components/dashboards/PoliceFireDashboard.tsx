'use client';

import React, { useState } from 'react';
import { Flame, AlertTriangle, ShieldAlert, CheckCircle, Navigation, ShieldCheck, TrafficCone } from 'lucide-react';

interface PoliceFireDashboardProps {
  regionName?: string;
  stateName?: string;
}

export const PoliceFireDashboard: React.FC<PoliceFireDashboardProps> = ({
  regionName = 'Uttarkashi & Bhagirathi Valley',
  stateName = 'Uttarakhand'
}) => {
  const [closureOrderIssued, setClosureOrderIssued] = useState(false);
  const [perimeterEnforced, setPerimeterEnforced] = useState(true);
  const [road1Status, setRoad1Status] = useState<'CLOSED' | 'DIVERTED' | 'CLEAR'>('CLOSED');
  const [road2Status, setRoad2Status] = useState<'CLOSED' | 'DIVERTED' | 'CLEAR'>('DIVERTED');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4500);
  };

  const handleClosureOrder = () => {
    setClosureOrderIssued(true);
    showToast(`🚨 Official Road Closure Order Issued for ${regionName} Arterial Flyover — PostGIS Diversion Active`);
  };

  return (
    <div className="space-y-5">
      {/* Toast Banner */}
      {toast && (
        <div className="bg-orange-500/15 border border-orange-500/40 rounded-xl px-4 py-3 flex items-center gap-2 text-orange-400 text-xs font-bold shadow-lg animate-pulse">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Terminal Header */}
      <div className="glass-panel p-4 rounded-xl border border-orange-500/40 flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div>
          <h2 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            Police &amp; Fire Department Traffic Control Terminal
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Active Zone: <span className="text-cyan-400 font-bold">{regionName} ({stateName})</span> • Road Blockages, Fire Boundaries &amp; Diversion Control
          </p>
        </div>

        <button
          onClick={handleClosureOrder}
          className={`px-4 py-2 rounded-xl font-extrabold text-xs flex items-center gap-2 transition cursor-pointer outline-none shadow-glow-red ${
            closureOrderIssued
              ? 'bg-red-500/20 text-red-400 border border-red-500/40 cursor-default'
              : 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white'
          }`}
        >
          <TrafficCone className="w-4 h-4" />
          {closureOrderIssued ? 'Road Closure Order Issued ✓' : 'Issue Road Closure Order'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Active Fire & Gas Leak Perimeters */}
        <div className="glass-card p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
            <span className="font-extrabold text-slate-200 uppercase tracking-wider">Active Fire &amp; Gas Leak Perimeters</span>
            <span className="bg-orange-500/20 text-orange-400 border border-orange-500/40 px-2 py-0.5 rounded-full text-[10px] font-extrabold">
              HIGH WARNING
            </span>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-orange-500/30 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="font-extrabold text-orange-400 text-sm">Industrial Gas Leak &amp; Fire Perimeter</div>
              <span className="text-[10px] font-mono text-red-400 font-bold bg-red-500/10 px-2 py-0.5 rounded">
                MQ-2: 480 PPM
              </span>
            </div>
            <p className="text-slate-300">
              Sensor Node #04: High toxic smoke concentration detected. Evacuation radius: <b className="text-white">500 Meters Enforced</b>.
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <span className="text-[11px] text-slate-400">3 Fire Tenders Deployed</span>
              <button
                onClick={() => {
                  setPerimeterEnforced(!perimeterEnforced);
                  showToast(perimeterEnforced ? '⚠️ Perimeter safety lock relaxed' : '🛡️ 500m Evacuation Perimeter Lock ENFORCED by Police');
                }}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-extrabold cursor-pointer outline-none transition ${
                  perimeterEnforced ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {perimeterEnforced ? 'Perimeter Enforced ✓' : 'Enforce 500m Radius'}
              </button>
            </div>
          </div>
        </div>

        {/* Submerged & Blocked Arterial Roads */}
        <div className="glass-card p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
            <span className="font-extrabold text-slate-200 uppercase tracking-wider">Submerged &amp; Blocked Arterial Roads</span>
            <span className="text-[10px] text-slate-400 font-bold">2 Major Arteries Affected</span>
          </div>

          <div className="space-y-2 text-xs">
            {/* Road 1 */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">NH-16 Approach Flyover</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border ${
                  road1Status === 'CLOSED' ? 'bg-red-500/20 text-red-400 border-red-500/40' :
                  road1Status === 'DIVERTED' ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' :
                  'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                }`}>
                  {road1Status === 'CLOSED' ? 'CLOSED (2.1m Water)' : road1Status === 'DIVERTED' ? 'DIVERTED' : 'CLEAR & PASSABLE'}
                </span>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => { setRoad1Status('CLOSED'); showToast('⛔ NH-16 Flyover marked CLOSED'); }}
                  className="px-2 py-1 rounded text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-red-400"
                >
                  Close
                </button>
                <button
                  onClick={() => { setRoad1Status('DIVERTED'); showToast('↩️ NH-16 Traffic DIVERTED to Secondary Route'); }}
                  className="px-2 py-1 rounded text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-amber-400"
                >
                  Divert
                </button>
                <button
                  onClick={() => { setRoad1Status('CLEAR'); showToast('✅ NH-16 Flyover marked CLEAR'); }}
                  className="px-2 py-1 rounded text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-emerald-400"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Road 2 */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">Ring Road Ghat 3</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border ${
                  road2Status === 'CLOSED' ? 'bg-red-500/20 text-red-400 border-red-500/40' :
                  road2Status === 'DIVERTED' ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' :
                  'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                }`}>
                  {road2Status === 'CLOSED' ? 'CLOSED' : road2Status === 'DIVERTED' ? 'DIVERTED VIA SH-12' : 'CLEAR & PASSABLE'}
                </span>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => { setRoad2Status('CLOSED'); showToast('⛔ Ring Road Ghat 3 marked CLOSED'); }}
                  className="px-2 py-1 rounded text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-red-400"
                >
                  Close
                </button>
                <button
                  onClick={() => { setRoad2Status('DIVERTED'); showToast('↩️ Ring Road Ghat 3 DIVERTED via SH-12'); }}
                  className="px-2 py-1 rounded text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-amber-400"
                >
                  Divert
                </button>
                <button
                  onClick={() => { setRoad2Status('CLEAR'); showToast('✅ Ring Road Ghat 3 marked CLEAR'); }}
                  className="px-2 py-1 rounded text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-emerald-400"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
