'use client';

import React, { useState } from 'react';
import { Cloud, Wind, Droplets, Eye, Thermometer, AlertTriangle, MapPin, Navigation } from 'lucide-react';

const FORECAST = [
  { day: 'Today', icon: '⛈️', high: 31, low: 26, rain: 95, wind: 62 },
  { day: 'Thu', icon: '🌧️', high: 29, low: 25, rain: 88, wind: 55 },
  { day: 'Fri', icon: '🌧️', high: 28, low: 24, rain: 80, wind: 48 },
  { day: 'Sat', icon: '⛅', high: 30, low: 25, rain: 55, wind: 38 },
  { day: 'Sun', icon: '⛅', high: 32, low: 26, rain: 40, wind: 30 },
  { day: 'Mon', icon: '🌤️', high: 33, low: 27, rain: 25, wind: 22 },
  { day: 'Tue', icon: '☀️', high: 35, low: 28, rain: 10, wind: 18 },
];

const HOURLY_RAIN = [85, 90, 95, 92, 88, 84, 78, 70, 65, 58, 50, 42];
const WIND_SPEED = [55, 60, 62, 58, 65, 70, 68, 62, 58, 55, 50, 48, 45, 43, 48, 52, 58, 62, 65, 60, 55, 50, 48, 45];

const DISTRICTS = [
  { name: 'Cuttack', temp: 31, rain: '142mm', wind: '62 km/h', alert: 'RED', alertColor: 'bg-red-500/20 text-red-400 border-red-500/40' },
  { name: 'Puri', temp: 30, rain: '118mm', wind: '74 km/h', alert: 'RED', alertColor: 'bg-red-500/20 text-red-400 border-red-500/40' },
  { name: 'Kendrapara', temp: 29, rain: '98mm', wind: '58 km/h', alert: 'ORANGE', alertColor: 'bg-orange-500/20 text-orange-400 border-orange-500/40' },
  { name: 'Bhubaneswar', temp: 32, rain: '64mm', wind: '42 km/h', alert: 'YELLOW', alertColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' },
  { name: 'Jagatsinghpur', temp: 30, rain: '112mm', wind: '66 km/h', alert: 'ORANGE', alertColor: 'bg-orange-500/20 text-orange-400 border-orange-500/40' },
  { name: 'Khordha', temp: 31, rain: '55mm', wind: '38 km/h', alert: 'YELLOW', alertColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' },
  { name: 'Ganjam', temp: 29, rain: '78mm', wind: '48 km/h', alert: 'ORANGE', alertColor: 'bg-orange-500/20 text-orange-400 border-orange-500/40' },
  { name: 'Balasore', temp: 30, rain: '88mm', wind: '52 km/h', alert: 'ORANGE', alertColor: 'bg-orange-500/20 text-orange-400 border-orange-500/40' },
];

const STATES = ['Odisha', 'Assam', 'Kerala', 'Uttarakhand', 'West Bengal', 'Maharashtra'];

function RainBarChart() {
  const maxVal = 100;
  const w = 300, h = 70, barW = 18, gap = 6, pad = 10;
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="rainGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      {HOURLY_RAIN.map((v, i) => {
        const x = pad + i * (barW + gap);
        const barH = ((v / maxVal) * (h - pad * 2));
        const y = h - pad - barH;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={barH} fill="url(#rainGrad)" rx="3" />
            {i % 3 === 0 && <text x={x + barW / 2} y={h - 1} textAnchor="middle" fill="#64748b" fontSize="7">{i + 1}h</text>}
          </g>
        );
      })}
    </svg>
  );
}

function WindLineChart() {
  const pts = WIND_SPEED;
  const w = 300, h = 60, pad = 10;
  const max = Math.max(...pts), min = Math.min(...pts);
  const xStep = (w - pad * 2) / (pts.length - 1);
  const yScale = (v: number) => h - pad - ((v - min) / (max - min)) * (h - pad * 2);
  const d = pts.map((v, i) => `${i === 0 ? 'M' : 'L'}${pad + i * xStep},${yScale(v)}`).join(' ');
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="windGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L${pad + (pts.length - 1) * xStep},${h} L${pad},${h} Z`} fill="url(#windGrad)" />
      <path d={d} fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1={pad} y1={yScale(65)} x2={w - pad} y2={yScale(65)} stroke="#ef4444" strokeDasharray="4,3" strokeWidth="1" />
      <text x={w - pad - 50} y={yScale(65) - 3} fill="#ef4444" fontSize="8">Storm: 65 km/h</text>
    </svg>
  );
}

interface WeatherDashboardProps {
  regionName?: string;
  stateName?: string;
}

export const WeatherDashboard: React.FC<WeatherDashboardProps> = ({
  regionName = 'Cuttack & Mahanadi Basin',
  stateName = 'Odisha'
}) => {
  const [selectedState, setSelectedState] = useState('Odisha');

  return (
    <div className="space-y-5">
      {/* Cyclone Alert Banner */}
      <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/40 rounded-xl px-4 py-3">
        <span className="w-3 h-3 rounded-full bg-red-500 animate-ping shrink-0"></span>
        <div className="flex-1 text-sm font-extrabold text-red-400">🌀 CYCLONE WARNING ACTIVE — CYCLONE DANA (CAT. 3) — Landfall ETA: 18 Hours — Bay of Bengal</div>
        <span className="text-[11px] text-red-300 font-bold shrink-0 border border-red-500/40 px-2 py-0.5 rounded-full">IMD ALERT</span>
      </div>

      {/* Current Weather Hero */}
      <div className="glass-card border border-slate-700 rounded-2xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <select value={selectedState} onChange={e => setSelectedState(e.target.value)} className="bg-transparent text-white font-extrabold text-lg focus:outline-none cursor-pointer">
                {STATES.map(s => <option key={s} value={s} className="bg-slate-900">{s}</option>)}
              </select>
            </div>
            <div className="flex items-end gap-3">
              <span className="text-6xl font-black text-white">31°C</span>
              <span className="text-5xl">⛈️</span>
            </div>
            <div className="text-slate-400 text-sm">Heavy Rain + Thunderstorm · Feels Like <span className="text-white font-bold">38°C</span></div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            {[
              { icon: <Droplets className="w-3.5 h-3.5 text-blue-400" />, label: 'Humidity', value: '89%' },
              { icon: <Wind className="w-3.5 h-3.5 text-purple-400" />, label: 'Wind', value: '62 km/h NE' },
              { icon: <Eye className="w-3.5 h-3.5 text-slate-400" />, label: 'Visibility', value: '2.1 km' },
              { icon: <Thermometer className="w-3.5 h-3.5 text-amber-400" />, label: 'Pressure', value: '994 hPa' },
            ].map(i => (
              <div key={i.label} className="flex items-center gap-2 bg-slate-900/60 px-3 py-2 rounded-xl border border-slate-800">
                {i.icon}
                <div><div className="text-slate-400">{i.label}</div><div className="font-bold text-white">{i.value}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="grid grid-cols-7 gap-2">
        {FORECAST.map((f, i) => (
          <div key={i} className={`glass-card border rounded-xl p-2.5 text-center text-xs space-y-1.5 ${i === 0 ? 'border-cyan-500/40' : 'border-slate-700'}`}>
            <div className="font-bold text-slate-300">{f.day}</div>
            <div className="text-2xl">{f.icon}</div>
            <div className="text-white font-bold">{f.high}°</div>
            <div className="text-slate-500">{f.low}°</div>
            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${f.rain}%` }} />
            </div>
            <div className="text-blue-400 text-[10px]">{f.rain}%</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card border border-slate-700 rounded-xl p-4 space-y-2">
          <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider">Hourly Rain Probability (Next 12h)</h4>
          <RainBarChart />
          <div className="text-[10px] text-slate-500 text-center">Hours from now</div>
        </div>
        <div className="glass-card border border-slate-700 rounded-xl p-4 space-y-2">
          <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider">24-Hour Wind Speed Chart</h4>
          <WindLineChart />
          <div className="flex gap-4 text-[10px] mt-1">
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-purple-400 inline-block"></span>Wind Speed</span>
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 border-t border-dashed border-red-400 inline-block"></span>Storm Threshold</span>
          </div>
        </div>
      </div>

      {/* Cyclone Path Tracker */}
      <div className="glass-card border border-purple-500/30 rounded-xl p-4 space-y-3">
        <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          🌀 Cyclone DANA — Path Tracker
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Name</span><span className="font-bold text-white">CYCLONE DANA</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Category</span><span className="font-bold text-red-400">Category 3 — Severe</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Wind Speed</span><span className="font-bold text-white">185 km/h</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Landfall ETA</span><span className="font-bold text-amber-400">~18 hours</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Landfall Point</span><span className="font-bold text-white">Paradip Coast, Odisha</span>
            </div>
          </div>
          <div className="relative w-full h-32 bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 rounded-xl overflow-hidden border border-purple-500/30 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 120">
              <circle cx="60" cy="80" r="5" fill="#8b5cf6" opacity="0.5" />
              <circle cx="60" cy="80" r="15" fill="none" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
              <circle cx="60" cy="80" r="28" fill="none" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3,3" opacity="0.25" />
              <path d="M60,80 Q110,50 155,40" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,3" />
              <circle cx="155" cy="40" r="6" fill="#ef4444" opacity="0.8" />
              <text x="115" y="35" fill="#ef4444" fontSize="8" textAnchor="middle">Landfall →</text>
              <text x="55" y="100" fill="#8b5cf6" fontSize="7">Origin</text>
              <text x="145" y="55" fill="#ef4444" fontSize="7">ETA 18h</text>
            </svg>
          </div>
        </div>
      </div>

      {/* District Weather Table */}
      <div className="glass-card border border-slate-700 rounded-xl p-4 space-y-3">
        <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider">District-wise Weather Alerts</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs min-w-[450px]">
            <thead><tr className="text-slate-400 border-b border-slate-800">
              {['District', 'Temp', 'Rainfall', 'Wind Speed', 'Alert Level'].map(h => (
                <th key={h} className="text-left py-2 px-2 font-bold uppercase tracking-wider text-[10px]">{h}</th>
              ))}
            </tr></thead>
            <tbody className="divide-y divide-slate-800/50">
              {DISTRICTS.map(d => (
                <tr key={d.name} className="hover:bg-slate-800/30 transition">
                  <td className="py-2 px-2 font-bold text-slate-200">{d.name}</td>
                  <td className="py-2 px-2 text-slate-300">{d.temp}°C</td>
                  <td className="py-2 px-2 text-blue-400 font-bold">{d.rain}</td>
                  <td className="py-2 px-2 text-purple-400">{d.wind}</td>
                  <td className="py-2 px-2"><span className={`px-2 py-0.5 rounded-full border text-[10px] font-extrabold ${d.alertColor}`}>{d.alert}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
