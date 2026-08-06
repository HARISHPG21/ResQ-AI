'use client';

import React, { useState } from 'react';
import { ShieldCheck, MapPin, Compass, PhoneCall, LifeBuoy, CheckCircle, Navigation, Anchor } from 'lucide-react';

interface NDRFDashboardProps {
  regionName?: string;
  stateName?: string;
}

export const NDRFDashboard: React.FC<NDRFDashboardProps> = ({
  regionName = 'Uttarkashi & Bhagirathi Valley',
  stateName = 'Uttarakhand'
}) => {
  const [deployedBoat, setDeployedBoat] = useState(false);
  const [navigating, setNavigating] = useState(false);
  const [inc1Status, setInc1Status] = useState<'PENDING' | 'IN_PROGRESS' | 'RESCUED'>('PENDING');
  const [inc2Status, setInc2Status] = useState<'PENDING' | 'IN_PROGRESS' | 'RESCUED'>('PENDING');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4500);
  };

  const handleDeployBoat = () => {
    setDeployedBoat(true);
    showToast(`🚤 Inflatable Motor Boat #04 Deployed to Sector 11 — Squad Delta (ETA: 6 mins)`);
  };

  const handleNavigate = () => {
    setNavigating(true);
    showToast(`🧭 PostGIS Safe Path Loaded — Distance: 3.4 km • Hazard Avoidance Dijkstra Active`);
  };

  return (
    <div className="space-y-5">
      {/* Toast Alert Banner */}
      {toast && (
        <div className="bg-emerald-500/15 border border-emerald-500/40 rounded-xl px-4 py-3 flex items-center gap-2 text-emerald-400 text-xs font-bold shadow-lg animate-pulse">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Unit Banner */}
      <div className="glass-panel p-4 rounded-xl border border-emerald-500/40 flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div>
          <h2 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            3rd NDRF Battalion Tactical Rescue Terminal — Squad Delta
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Active Zone: <span className="text-cyan-400 font-bold">{regionName} ({stateName})</span> • Live Victim Pinpointing &amp; PostGIS Boat Routing
          </p>
        </div>

        <button
          onClick={handleDeployBoat}
          disabled={deployedBoat}
          className={`px-4 py-2 rounded-xl font-extrabold text-xs flex items-center gap-2 transition cursor-pointer outline-none shadow-glow-emerald ${
            deployedBoat
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 cursor-default'
              : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950'
          }`}
        >
          <LifeBuoy className={`w-4 h-4 ${deployedBoat ? '' : 'animate-spin'}`} />
          {deployedBoat ? 'Boat #04 Deployed ✓' : 'Deploy Inflatable Motor Boat #04'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Victim Priority Rescue Queue */}
        <div className="glass-card p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
            <span className="font-extrabold text-slate-200 uppercase tracking-wider">Priority Rescue Dispatch Queue</span>
            <span className="bg-red-500/20 text-red-400 border border-red-500/40 px-2 py-0.5 rounded-full text-[10px] font-extrabold">
              2 High Priority
            </span>
          </div>

          {/* Incident 1 */}
          <div className="bg-slate-900/80 p-3 rounded-xl border border-red-500/30 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-red-400">#01 Rooftop Trapped Group (40 People)</span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                YOLO: 94%
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Location: <span className="font-bold text-white">Sector 11 River Bank</span> (GPS: 20.4700° N, 85.8850° E)
            </p>
            <div className="flex items-center justify-between pt-1">
              <div className="flex gap-2">
                <button
                  onClick={handleNavigate}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-[11px] font-extrabold flex items-center gap-1 cursor-pointer outline-none transition"
                >
                  <Navigation className="w-3 h-3" />
                  {navigating ? 'Path Loaded' : 'Navigate PostGIS Safe Path'}
                </button>
                <button
                  onClick={() => {
                    setInc1Status(inc1Status === 'PENDING' ? 'IN_PROGRESS' : 'RESCUED');
                    showToast(inc1Status === 'PENDING' ? '✅ Incident #01 marked IN PROGRESS — Squad Alpha assigned' : '🎉 Incident #01 marked RESCUED — All 40 citizens safe');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-extrabold cursor-pointer outline-none transition ${
                    inc1Status === 'IN_PROGRESS'
                      ? 'bg-amber-500 text-slate-950'
                      : inc1Status === 'RESCUED'
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {inc1Status === 'PENDING' && 'Mark In Progress'}
                  {inc1Status === 'IN_PROGRESS' && 'In Progress ⏳ (Click to Rescue)'}
                  {inc1Status === 'RESCUED' && 'Rescued ✓'}
                </button>
              </div>
            </div>
          </div>

          {/* Incident 2 */}
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-amber-400">#02 Submerged Vehicle (1 Driver)</span>
              <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded">
                YOLO: 89%
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Location: <span className="font-bold text-white">Barrage Approach Road</span>
            </p>
            <div className="flex justify-end pt-1">
              <button
                onClick={() => {
                  setInc2Status(inc2Status === 'PENDING' ? 'IN_PROGRESS' : 'RESCUED');
                  showToast(inc2Status === 'PENDING' ? '✅ Incident #02 marked IN PROGRESS — Diver team dispatched' : '🎉 Incident #02 driver rescued safely');
                }}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-extrabold cursor-pointer outline-none transition ${
                  inc2Status === 'IN_PROGRESS'
                    ? 'bg-amber-500 text-slate-950'
                    : inc2Status === 'RESCUED'
                    ? 'bg-cyan-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {inc2Status === 'PENDING' && 'Mark In Progress'}
                {inc2Status === 'IN_PROGRESS' && 'In Progress ⏳ (Click to Rescue)'}
                {inc2Status === 'RESCUED' && 'Rescued ✓'}
              </button>
            </div>
          </div>
        </div>

        {/* Squad Status & Deployments */}
        <div className="glass-card p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
            <span className="font-extrabold text-slate-200 uppercase tracking-wider">Active Squad Deployments</span>
            <span className="text-[10px] text-emerald-400 font-bold">4 Squads Operational</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div>
                <div className="font-bold text-white">Squad Alpha (12 Divers)</div>
                <div className="text-[10px] text-slate-400">Eq: 2 Inflatable Boats + Scuba gear</div>
              </div>
              <span className="text-emerald-400 font-extrabold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">En Route to Sector 11</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div>
                <div className="font-bold text-white">Squad Bravo (8 Medical Responders)</div>
                <div className="text-[10px] text-slate-400">Eq: Trauma Kits + Oxygen Tanks</div>
              </div>
              <span className="text-cyan-400 font-extrabold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">At Relief Camp 1</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div>
                <div className="font-bold text-white">Squad Charlie (6 Drone Operators)</div>
                <div className="text-[10px] text-slate-400">Eq: 3 Thermal Drones + Lifebuoy drops</div>
              </div>
              <span className="text-indigo-400 font-extrabold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/30">Airborne Over Zone</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div>
                <div className="font-bold text-white">Squad Delta (10 Rescue Techs)</div>
                <div className="text-[10px] text-slate-400">Eq: High-capacity water pumps</div>
              </div>
              <span className="text-amber-400 font-extrabold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">On Standby</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
