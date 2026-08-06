'use client';

import React from 'react';
import { TrendingUp, BarChart2, PieChart, Clock, Users, Home } from 'lucide-react';

// ── Data ─────────────────────────────────────────────────────────────
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const REPORTED =  [45, 78, 112, 145, 168, 184, 195];
const RESOLVED =  [20, 50,  80, 110, 138, 160, 178];
const DISTRICT_INCIDENTS = [
  { name: 'Cuttack', val: 195, color: '#ef4444' },
  { name: 'Kendrapara', val: 142, color: '#f97316' },
  { name: 'Puri', val: 118, color: '#f59e0b' },
  { name: 'Jagatsinghpur', val: 98, color: '#8b5cf6' },
  { name: 'Bhubaneswar', val: 64, color: '#3b82f6' },
  { name: 'Khordha', val: 42, color: '#10b981' },
];
const RESPONSE_BINS = [
  { label: '0-5 min', val: 12 }, { label: '5-10 min', val: 38 },
  { label: '10-15 min', val: 55 }, { label: '15-20 min', val: 34 },
  { label: '20-30 min', val: 22 }, { label: '>30 min', val: 8 },
];
const CASUALTY_SLICES = [
  { label: 'Rescued', pct: 72, color: '#10b981' },
  { label: 'Hospitalised', pct: 18, color: '#f59e0b' },
  { label: 'Missing', pct: 7, color: '#6366f1' },
  { label: 'Fatalities', pct: 3, color: '#ef4444' },
];
const SHELTER_RINGS = [
  { name: 'Central High School', pct: 64, color: '#3b82f6' },
  { name: 'Ravenshaw Ground', pct: 91, color: '#ef4444' },
  { name: 'Stadium Camp', pct: 47, color: '#10b981' },
  { name: 'Municipal Camp', pct: 78, color: '#f59e0b' },
];

// ── SVG Charts ────────────────────────────────────────────────────────
function LineChart() {
  const W = 320, H = 90, PAD = 24;
  const xStep = (W - PAD * 2) / (DAYS.length - 1);
  const maxV = Math.max(...REPORTED);
  const yS = (v: number) => H - PAD - (v / maxV) * (H - PAD * 2);
  const line = (arr: number[]) => arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${PAD + i * xStep},${yS(v)}`).join(' ');
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="lgRep" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ef4444" stopOpacity="0.3"/><stop offset="100%" stopColor="#ef4444" stopOpacity="0"/></linearGradient>
        <linearGradient id="lgRes" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10b981" stopOpacity="0.3"/><stop offset="100%" stopColor="#10b981" stopOpacity="0"/></linearGradient>
      </defs>
      <path d={`${line(REPORTED)} L${PAD+(DAYS.length-1)*xStep},${H} L${PAD},${H} Z`} fill="url(#lgRep)" />
      <path d={`${line(RESOLVED)} L${PAD+(DAYS.length-1)*xStep},${H} L${PAD},${H} Z`} fill="url(#lgRes)" />
      <path d={line(REPORTED)} fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d={line(RESOLVED)} fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {DAYS.map((d, i) => <text key={d} x={PAD + i * xStep} y={H - 2} textAnchor="middle" fill="#64748b" fontSize="8">{d}</text>)}
    </svg>
  );
}

function HorizontalBar() {
  const maxV = DISTRICT_INCIDENTS[0].val;
  const W = 280, H = 140, barH = 14, gap = 8, pad = 70;
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      {DISTRICT_INCIDENTS.map((d, i) => {
        const y = i * (barH + gap) + 8;
        const bW = ((d.val / maxV) * (W - pad - 30));
        return (
          <g key={d.name}>
            <text x={pad - 4} y={y + barH - 3} textAnchor="end" fill="#94a3b8" fontSize="9">{d.name}</text>
            <rect x={pad} y={y} width={bW} height={barH} fill={d.color} rx="3" opacity="0.85" />
            <text x={pad + bW + 4} y={y + barH - 3} fill={d.color} fontSize="9" fontWeight="bold">{d.val}</text>
          </g>
        );
      })}
    </svg>
  );
}

function ResponseHist() {
  const maxV = Math.max(...RESPONSE_BINS.map(b => b.val));
  const W = 280, H = 80, barW = 34, gap = 8, pad = 10;
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      <defs><linearGradient id="histG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6366f1" stopOpacity="0.9"/><stop offset="100%" stopColor="#6366f1" stopOpacity="0.4"/></linearGradient></defs>
      {RESPONSE_BINS.map((b, i) => {
        const x = pad + i * (barW + gap);
        const bH = (b.val / maxV) * (H - 24);
        return (
          <g key={b.label}>
            <rect x={x} y={H - 18 - bH} width={barW} height={bH} fill="url(#histG)" rx="3" />
            <text x={x + barW / 2} y={H - 3} textAnchor="middle" fill="#64748b" fontSize="7">{b.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

function DonutChart() {
  const cx = 60, cy = 60, r = 45, stroke = 22;
  let cum = 0;
  const circ = 2 * Math.PI * r;
  return (
    <svg width="130" height="120" viewBox="0 0 130 120">
      {CASUALTY_SLICES.map(s => {
        const dash = (s.pct / 100) * circ;
        const offset = circ - (cum / 100) * circ;
        cum += s.pct;
        return (
          <circle key={s.label} cx={cx} cy={cy} r={r} fill="none" stroke={s.color} strokeWidth={stroke}
            strokeDasharray={`${dash} ${circ - dash}`} strokeDashoffset={offset}
            style={{ transition: 'stroke-dasharray 1.2s ease' }} />
        );
      })}
      <text x={cx} y={cy + 5} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">72%</text>
      <text x={cx} y={cy + 17} textAnchor="middle" fill="#94a3b8" fontSize="8">Rescued</text>
      <g transform="translate(125,5)">
        {CASUALTY_SLICES.map((s, i) => (
          <g key={s.label} transform={`translate(0,${i * 16})`}>
            <rect width="8" height="8" fill={s.color} rx="2" />
            <text x="12" y="8" fill="#94a3b8" fontSize="8">{s.label} {s.pct}%</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

function ProgressRing({ pct, color, name }: { pct: number; color: string; name: string }) {
  const r = 28, circ = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="70" height="70" viewBox="0 0 70 70">
        <circle cx="35" cy="35" r={r} fill="none" stroke="#1e293b" strokeWidth="7" />
        <circle cx="35" cy="35" r={r} fill="none" stroke={color} strokeWidth="7"
          strokeDasharray={`${(pct / 100) * circ} ${circ}`}
          strokeDashoffset={circ / 4} strokeLinecap="round" />
        <text x="35" y="39" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">{pct}%</text>
      </svg>
      <div className="text-[10px] text-slate-400 text-center leading-tight w-16">{name}</div>
    </div>
  );
}

interface DashboardProps {
  regionName?: string;
  stateName?: string;
}

// ── Component ─────────────────────────────────────────────────────────
export const AnalyticsDashboard: React.FC<DashboardProps> = ({
  regionName = 'Cuttack & Mahanadi Basin',
  stateName = 'Odisha'
}) => (
  <div className="space-y-5">
    {/* KPI Row */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {[
        { icon: <TrendingUp className="w-4 h-4 text-red-400" />, label: 'Total Incidents', value: '1,284', sub: '↑ 12% this week' },
        { icon: <Clock className="w-4 h-4 text-cyan-400" />, label: 'Avg Response', value: '8.4 min', sub: '⚡ 65% faster' },
        { icon: <Users className="w-4 h-4 text-emerald-400" />, label: 'Total Rescued', value: '1,48,200', sub: 'Across 4 states' },
        { icon: <Home className="w-4 h-4 text-purple-400" />, label: 'Active Shelters', value: '47', sub: '12,400 capacity' },
      ].map(k => (
        <div key={k.label} className="glass-card border border-slate-700 rounded-xl p-4 space-y-1">
          <div className="flex items-center gap-2">{k.icon}<span className="text-[11px] font-bold text-slate-400">{k.label}</span></div>
          <div className="text-2xl font-black text-white">{k.value}</div>
          <div className="text-[11px] text-slate-500">{k.sub}</div>
        </div>
      ))}
    </div>

    {/* Incident Trends + District Bar */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="glass-card border border-slate-700 rounded-xl p-4 space-y-3">
        <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-2"><TrendingUp className="w-4 h-4 text-red-400" />Incident Trends (7 Days)</h4>
        <LineChart />
        <div className="flex gap-4 text-[11px]">
          <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-red-400 inline-block"></span>Reported</span>
          <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-emerald-400 inline-block"></span>Resolved</span>
        </div>
      </div>

      <div className="glass-card border border-slate-700 rounded-xl p-4 space-y-3">
        <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-2"><BarChart2 className="w-4 h-4 text-blue-400" />District Comparison</h4>
        <HorizontalBar />
      </div>
    </div>

    {/* Response Time + Casualties + Shelter Rings */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="glass-card border border-slate-700 rounded-xl p-4 space-y-3">
        <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider">Response Time Distribution</h4>
        <ResponseHist />
        <div className="text-[10px] text-slate-500 text-center">Response time ranges (minutes)</div>
      </div>

      <div className="glass-card border border-slate-700 rounded-xl p-4 space-y-3">
        <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-2"><PieChart className="w-4 h-4 text-amber-400" />Casualty Breakdown</h4>
        <DonutChart />
      </div>

      <div className="glass-card border border-slate-700 rounded-xl p-4 space-y-3">
        <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider">Shelter Occupancy</h4>
        <div className="grid grid-cols-2 gap-3">
          {SHELTER_RINGS.map(s => <ProgressRing key={s.name} pct={s.pct} color={s.color} name={s.name} />)}
        </div>
      </div>
    </div>
  </div>
);
