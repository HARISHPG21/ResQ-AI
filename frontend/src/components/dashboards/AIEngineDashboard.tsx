'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Cpu, TrendingUp, AlertTriangle, Target, Brain, ChevronRight, Zap } from 'lucide-react';

const DETECTION_QUEUE = [
  { id: 'INC-2847', location: 'Mahanadi Bank Sector 11', type: 'Flood + Survivors', priority: 'CRITICAL', confidence: 94.2, status: 'Dispatched' },
  { id: 'INC-2831', location: 'Jobra Barrage', type: 'Medical Emergency', priority: 'HIGH', confidence: 89.1, status: 'Under Review' },
  { id: 'INC-2819', location: 'Link Road Bridge', type: 'Road Blocked', priority: 'MEDIUM', confidence: 78.5, status: 'Pending' },
  { id: 'INC-2805', location: 'SCB Hospital Approach', type: 'Traffic Collapse', priority: 'HIGH', confidence: 85.3, status: 'Dispatched' },
  { id: 'INC-2798', location: 'Cuttack Railway Station', type: 'Crowd Emergency', priority: 'LOW', confidence: 65.0, status: 'Resolved' },
];

const PRIORITY_COLOR: Record<string, string> = {
  CRITICAL: 'bg-red-500/20 text-red-400 border-red-500/50',
  HIGH: 'bg-orange-500/20 text-orange-400 border-orange-500/50',
  MEDIUM: 'bg-amber-500/20 text-amber-400 border-amber-500/50',
  LOW: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50',
};

function AnimatedBar({ value, max = 100, color }: { value: number; max?: number; color: string }) {
  const pct = (value / max) * 100;
  return (
    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-1000 ${color}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// SVG Donut Gauge
function Gauge({ value, color, label }: { value: number; color: string; label: string }) {
  const r = 30, circ = 2 * Math.PI * r;
  const filled = (value / 100) * circ;
  return (
    <svg width="80" height="80" viewBox="0 0 80 80">
      <circle cx="40" cy="40" r={r} fill="none" stroke="#1e293b" strokeWidth="8" />
      <circle cx="40" cy="40" r={r} fill="none" stroke={color} strokeWidth="8"
        strokeDasharray={`${filled} ${circ}`} strokeDashoffset={circ / 4}
        strokeLinecap="round" style={{ transition: 'stroke-dasharray 1.5s ease' }} />
      <text x="40" y="44" textAnchor="middle" fill={color} fontSize="14" fontWeight="bold">{value}%</text>
      <text x="40" y="56" textAnchor="middle" fill="#94a3b8" fontSize="8">{label}</text>
    </svg>
  );
}

// SVG Line chart for flood risk forecast
function RiskLineChart() {
  const pts = [45, 55, 68, 78, 88, 92, 94];
  const w = 280, h = 80, pad = 10;
  const xStep = (w - pad * 2) / (pts.length - 1);
  const yScale = (v: number) => h - pad - ((v / 100) * (h - pad * 2));
  const d = pts.map((v, i) => `${i === 0 ? 'M' : 'L'}${pad + i * xStep},${yScale(v)}`).join(' ');
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L${pad + (pts.length - 1) * xStep},${h} L${pad},${h} Z`} fill="url(#riskGrad)" />
      <path d={d} fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((v, i) => (
        <circle key={i} cx={pad + i * xStep} cy={yScale(v)} r="3" fill="#ef4444" />
      ))}
      <line x1={pad} y1={yScale(80)} x2={w - pad} y2={yScale(80)} stroke="#f59e0b" strokeDasharray="4,3" strokeWidth="1" />
      <text x={w - pad - 30} y={yScale(80) - 4} fill="#f59e0b" fontSize="8">Alert: 80%</text>
    </svg>
  );
}

interface AIEngineDashboardProps {
  regionName?: string;
  stateName?: string;
}

export const AIEngineDashboard: React.FC<AIEngineDashboardProps> = ({
  regionName = 'Cuttack & Mahanadi Basin',
  stateName = 'Odisha'
}) => {
  const [victims, setVictims] = useState(12);
  const [buildings, setBuildings] = useState(47);
  const [floodRisk] = useState(92);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setTick(t => t + 1);
      if (Math.random() > 0.7) setVictims(v => v + (Math.random() > 0.5 ? 1 : 0));
      if (Math.random() > 0.6) setBuildings(b => b + (Math.random() > 0.5 ? 1 : 0));
    }, 3000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="space-y-5">
      {/* AI Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="glass-card border border-red-500/30 rounded-xl p-4 space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><Target className="w-3.5 h-3.5 text-red-400" />Victims Detected</div>
          <div className="text-3xl font-black text-red-400">{victims}</div>
          <div className="text-[11px] text-slate-400">Confidence: <span className="text-emerald-400 font-bold">94.2%</span></div>
          <AnimatedBar value={94.2} color="bg-red-500" />
        </div>

        <div className="glass-card border border-orange-500/30 rounded-xl p-4 space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5 text-orange-400" />Buildings Damaged</div>
          <div className="text-3xl font-black text-orange-400">{buildings}</div>
          <div className="text-[11px] text-slate-400">Confidence: <span className="text-emerald-400 font-bold">87.5%</span></div>
          <AnimatedBar value={87.5} color="bg-orange-500" />
        </div>

        <div className="glass-card border border-blue-500/30 rounded-xl p-4 flex flex-col items-center justify-center space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Flood Risk</div>
          <Gauge value={floodRisk} color="#3b82f6" label="HIGH" />
        </div>

        <div className="glass-card border border-red-600/40 rounded-xl p-4 space-y-2 flex flex-col justify-between">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-red-400" />Incident Priority</div>
          <div className="text-2xl font-black text-red-400 animate-pulse">CRITICAL</div>
          <div className="text-[11px] text-slate-400">NDRF Dispatch: <span className="text-emerald-400 font-bold">Active</span></div>
          <div className="w-2 h-2 rounded-full bg-red-500 animate-ping mx-auto"></div>
        </div>
      </div>

      {/* YOLOv11 Detection + Flood Risk Forecast */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* YOLOv11 Visual Detection */}
        <div className="glass-card border border-slate-700 rounded-xl p-4 space-y-3">
          <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-400" /> YOLOv11 Aerial Detection Feed
          </h4>
          <div className="relative w-full h-48 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl overflow-hidden border border-slate-700">
            {/* Simulated aerial image with scan lines */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6,182,212,0.1) 2px, rgba(6,182,212,0.1) 4px)' }} />
            <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-xs">DRONE_DELTA_01 · LIVE FEED</div>
            {/* Bounding boxes */}
            <div className="absolute border-2 border-red-500 rounded" style={{ top: '20%', left: '15%', width: '20%', height: '25%' }}>
              <span className="absolute -top-5 left-0 text-[9px] bg-red-600 text-white px-1 rounded whitespace-nowrap">Victim #1 (94.2%)</span>
            </div>
            <div className="absolute border-2 border-red-500 rounded" style={{ top: '45%', left: '55%', width: '18%', height: '22%' }}>
              <span className="absolute -top-5 left-0 text-[9px] bg-red-600 text-white px-1 rounded whitespace-nowrap">Victim #2 (89.1%)</span>
            </div>
            <div className="absolute border-2 border-orange-500 rounded" style={{ top: '60%', left: '25%', width: '30%', height: '20%' }}>
              <span className="absolute -top-5 left-0 text-[9px] bg-orange-600 text-white px-1 rounded whitespace-nowrap">Bldg Damage (87.5%)</span>
            </div>
            {/* HUD */}
            <div className="absolute top-2 right-2 text-[10px] font-mono text-cyan-400 bg-slate-950/70 px-2 py-1 rounded space-y-0.5">
              <div>ALT: 120m</div><div>CONF: 94.2%</div>
            </div>
            <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span className="text-[10px] text-red-400 font-bold">YOLOv11 LIVE</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2">
              <div className="font-black text-red-400 text-lg">{victims}</div>
              <div className="text-slate-400">Victims</div>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-2">
              <div className="font-black text-orange-400 text-lg">{buildings}</div>
              <div className="text-slate-400">Buildings</div>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-2">
              <div className="font-black text-emerald-400 text-lg">90.3%</div>
              <div className="text-slate-400">Avg Conf.</div>
            </div>
          </div>
        </div>

        {/* Flood Risk Forecast */}
        <div className="glass-card border border-slate-700 rounded-xl p-4 space-y-3">
          <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-400" /> XGBoost 6-Hour Flood Risk Forecast
          </h4>
          <RiskLineChart />
          <div className="flex justify-between text-[10px] text-slate-500 px-2">
            {['Now', '1h', '2h', '3h', '4h', '5h', '6h'].map(t => <span key={t}>{t}</span>)}
          </div>
          <div className="flex items-center gap-3 text-xs mt-2">
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-red-400 inline-block"></span>Flood Risk</span>
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 border-t border-dashed border-amber-400 inline-block"></span>Alert Threshold (80%)</span>
          </div>

          {/* AI Summary */}
          <div className="bg-slate-900/60 border border-indigo-500/30 rounded-xl p-3 space-y-1.5 mt-2">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-400">
              <Brain className="w-3.5 h-3.5" /> Gemini AI Analysis Summary
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              XGBoost flood prediction model forecasts <span className="text-red-400 font-bold">92% risk probability</span> in the Mahanadi Basin. YOLOv11 has detected <span className="text-amber-400 font-bold">{victims} survivors</span> across {buildings} damaged structures. Recommend immediate NDRF deployment with 3 rescue boats to Sector 11 — window before peak flood: <span className="text-cyan-400 font-bold">~2.4 hours</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Model Performance */}
      <div className="glass-card border border-slate-700 rounded-xl p-4 space-y-3">
        <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider">AI Model Performance Metrics</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'YOLOv11 mAP@0.5', value: 94.2, color: 'bg-indigo-500' },
            { label: 'SAM 2.0 IoU Score', value: 89.1, color: 'bg-blue-500' },
            { label: 'XGBoost AUC-ROC', value: 96.0, color: 'bg-emerald-500' },
          ].map(m => (
            <div key={m.label} className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-400"><span>{m.label}</span><span className="font-bold text-white">{m.value}%</span></div>
              <AnimatedBar value={m.value} color={m.color} />
            </div>
          ))}
        </div>
      </div>

      {/* Incident Priority Queue */}
      <div className="glass-card border border-slate-700 rounded-xl p-4 space-y-3">
        <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" /> AI Incident Priority Queue
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs min-w-[500px]">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800">
                {['ID', 'Location', 'Type', 'Priority', 'AI Confidence', 'Status', 'Action'].map(h => (
                  <th key={h} className="text-left py-2 px-2 font-bold uppercase tracking-wider text-[10px]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {DETECTION_QUEUE.map(row => (
                <tr key={row.id} className="hover:bg-slate-800/30 transition">
                  <td className="py-2 px-2 font-mono text-cyan-400 font-bold">{row.id}</td>
                  <td className="py-2 px-2 text-slate-300">{row.location}</td>
                  <td className="py-2 px-2 text-slate-300">{row.type}</td>
                  <td className="py-2 px-2"><span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${PRIORITY_COLOR[row.priority]}`}>{row.priority}</span></td>
                  <td className="py-2 px-2"><div className="flex items-center gap-2"><span className="text-emerald-400 font-bold">{row.confidence}%</span><AnimatedBar value={row.confidence} color="bg-emerald-500" /></div></td>
                  <td className="py-2 px-2 text-slate-400">{row.status}</td>
                  <td className="py-2 px-2"><button className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5 cursor-pointer">View <ChevronRight className="w-3 h-3"/></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
