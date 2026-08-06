'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Waves, Thermometer, Droplets, CloudRain, Wind, Flame, AlertCircle, Activity, Download } from 'lucide-react';

interface SensorData {
  id: string;
  name: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  status: string;
  statusColor: string;
  threshold: number;
  min: number;
  max: number;
  color: string;
  history: number[];
}

const ALERT_LOG_INIT = [
  { time: '17:28:12', sensor: 'Water Level Node-01', value: '6.8m', severity: 'CRITICAL', color: 'text-red-400' },
  { time: '17:25:44', sensor: 'Rainfall Node-03', value: '142mm/hr', severity: 'EXTREME', color: 'text-red-400' },
  { time: '17:22:01', sensor: 'River Level Node-02', value: '8.1m', severity: 'FLOOD', color: 'text-red-400' },
  { time: '17:19:30', sensor: 'Smoke Node-04', value: '340 PPM', severity: 'ALERT', color: 'text-orange-400' },
  { time: '17:15:55', sensor: 'Temperature Node-01', value: '38.2°C', severity: 'HIGH', color: 'text-amber-400' },
];

const rand = (base: number, spread: number) => +(base + (Math.random() - 0.5) * spread).toFixed(1);

function Sparkline({ data, color, threshold, min, max }: { data: number[]; color: string; threshold: number; min: number; max: number }) {
  const w = 120, h = 36, pad = 2;
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return `${x},${y}`;
  }).join(' ');
  const tY = h - pad - ((threshold - min) / range) * (h - pad * 2);
  return (
    <svg width={w} height={h} className="shrink-0">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <line x1={pad} y1={tY} x2={w - pad} y2={tY} stroke="#f59e0b" strokeDasharray="3,2" strokeWidth="1" />
    </svg>
  );
}

interface IoTSensorDashboardProps {
  regionName?: string;
  stateName?: string;
}

export const IoTSensorDashboard: React.FC<IoTSensorDashboardProps> = ({
  regionName = 'Cuttack & Mahanadi Basin',
  stateName = 'Odisha'
}) => {
  const genHistory = (base: number, spread: number) => Array.from({ length: 20 }, () => rand(base, spread));

  const initSensors = (): SensorData[] => [
    { id: 'WL01', name: 'Water Level', value: 6.8, unit: 'm', icon: <Waves className="w-4 h-4"/>, status: 'CRITICAL', statusColor: 'bg-red-500/20 text-red-400 border-red-500/40', threshold: 5, min: 0, max: 10, color: '#ef4444', history: genHistory(6.8, 1) },
    { id: 'TM01', name: 'Temperature', value: 34.2, unit: '°C', icon: <Thermometer className="w-4 h-4"/>, status: 'HIGH', statusColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40', threshold: 35, min: 25, max: 45, color: '#f59e0b', history: genHistory(34.2, 2) },
    { id: 'HM01', name: 'Humidity', value: 87, unit: '%', icon: <Droplets className="w-4 h-4"/>, status: 'HIGH', statusColor: 'bg-blue-500/20 text-blue-400 border-blue-500/40', threshold: 85, min: 40, max: 100, color: '#3b82f6', history: genHistory(87, 5) },
    { id: 'RF01', name: 'Rainfall', value: 142, unit: 'mm/hr', icon: <CloudRain className="w-4 h-4"/>, status: 'EXTREME', statusColor: 'bg-red-500/20 text-red-400 border-red-500/40', threshold: 100, min: 0, max: 200, color: '#8b5cf6', history: genHistory(142, 20) },
    { id: 'RL01', name: 'River Level', value: 8.1, unit: 'm', icon: <Activity className="w-4 h-4"/>, status: 'FLOOD', statusColor: 'bg-red-500/20 text-red-400 border-red-500/40', threshold: 7, min: 0, max: 12, color: '#06b6d4', history: genHistory(8.1, 0.8) },
    { id: 'SM01', name: 'Smoke Density', value: 340, unit: 'PPM', icon: <Flame className="w-4 h-4"/>, status: 'ALERT', statusColor: 'bg-orange-500/20 text-orange-400 border-orange-500/40', threshold: 300, min: 0, max: 500, color: '#f97316', history: genHistory(340, 30) },
    { id: 'GS01', name: 'Gas (CO2)', value: 890, unit: 'PPM', icon: <AlertCircle className="w-4 h-4"/>, status: 'MODERATE', statusColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40', threshold: 1000, min: 0, max: 1500, color: '#eab308', history: genHistory(890, 50) },
    { id: 'EQ01', name: 'Earthquake', value: 3.2, unit: 'Richter', icon: <Wind className="w-4 h-4"/>, status: 'LOW', statusColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40', threshold: 5, min: 0, max: 9, color: '#10b981', history: genHistory(3.2, 0.3) },
  ];

  const [sensors, setSensors] = useState<SensorData[]>(initSensors());
  const [alerts, setAlerts] = useState(ALERT_LOG_INIT);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const iv = setInterval(() => {
      setTime(new Date());
      setSensors(prev => prev.map(s => {
        const delta = (Math.random() - 0.5) * (s.max - s.min) * 0.03;
        const newVal = +Math.max(s.min, Math.min(s.max, s.value + delta)).toFixed(1);
        const newHistory = [...s.history.slice(1), newVal];
        return { ...s, value: newVal, history: newHistory };
      }));
    }, 2000);
    return () => clearInterval(iv);
  }, []);

  const nodes = [
    { id: 'Node-01', x: '20%', y: '30%', signal: 92 },
    { id: 'Node-02', x: '60%', y: '20%', signal: 87 },
    { id: 'Node-03', x: '75%', y: '65%', signal: 74 },
    { id: 'Node-04', x: '35%', y: '70%', signal: 95 },
    { id: 'Node-05', x: '55%', y: '45%', signal: 61 },
  ];

  return (
    <div className="space-y-5">
      {/* MQTT Status Bar */}
      <div className="glass-card border border-cyan-500/30 rounded-xl px-4 py-2.5 flex flex-wrap items-center gap-4 text-xs">
        <div className="flex items-center gap-2 text-emerald-400 font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>MQTT CONNECTED
        </div>
        <span className="text-slate-400">Broker: <span className="font-mono text-cyan-400">mqtt.resqai.ndma.gov.in</span></span>
        <span className="text-slate-400">Nodes: <span className="text-white font-bold">12 Online</span></span>
        <span className="text-slate-400">Last Sync: <span className="font-mono text-cyan-400">{time.toLocaleTimeString('en-IN')}</span></span>
        <div className="ml-auto flex gap-2">
          {['CSV', 'JSON', 'PDF'].map(f => (
            <button key={f} className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-300 text-[11px] font-semibold cursor-pointer outline-none transition">
              <Download className="w-3 h-3" />{f}
            </button>
          ))}
        </div>
      </div>

      {/* 8 Sensor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {sensors.map(s => (
          <div key={s.id} className="glass-card border border-slate-700 rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-slate-400">{s.icon}</span>
                <span className="text-xs font-bold">{s.name}</span>
              </div>
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${s.statusColor}`}>{s.status}</span>
            </div>
            <div className="text-2xl font-black" style={{ color: s.color }}>
              {s.value}<span className="text-sm font-semibold text-slate-400 ml-1">{s.unit}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <Sparkline data={s.history} color={s.color} threshold={s.threshold} min={s.min} max={s.max} />
              <div className="text-[10px] text-slate-500 text-right">
                <div>Threshold:</div><div className="text-amber-400 font-bold">{s.threshold}{s.unit}</div>
              </div>
            </div>
            <div className="text-[10px] text-slate-500 font-mono">{s.id} · {time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>
          </div>
        ))}
      </div>

      {/* Node Map + Alert Log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Sensor Network Map */}
        <div className="glass-card border border-slate-700 rounded-xl p-4 space-y-3">
          <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider">ESP32 Sensor Network Map</h4>
          <div className="relative w-full h-48 bg-slate-900/80 rounded-xl border border-slate-800 overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            {nodes.map(n => (
              <div key={n.id} className="absolute transform -translate-x-1/2 -translate-y-1/2" style={{ left: n.x, top: n.y }}>
                <div className="relative">
                  <div className="w-4 h-4 rounded-full bg-cyan-400 border-2 border-cyan-300 shadow-glow-cyan"></div>
                  <div className="w-8 h-8 rounded-full bg-cyan-400/10 absolute -top-2 -left-2 animate-ping"></div>
                </div>
                <div className="text-[9px] font-mono text-cyan-400 mt-1 whitespace-nowrap">{n.id}</div>
                <div className="text-[9px] text-slate-500">{n.signal}%</div>
              </div>
            ))}
            <div className="absolute bottom-2 right-2 text-[10px] text-slate-500 font-mono">Mahanadi Basin, Odisha</div>
          </div>
        </div>

        {/* Alert Log */}
        <div className="glass-card border border-slate-700 rounded-xl p-4 space-y-3">
          <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400" /> Live Alert Log
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {alerts.map((a, i) => (
              <div key={i} className="flex items-center gap-3 bg-slate-900/60 border border-slate-800 rounded-lg px-3 py-2">
                <span className="font-mono text-[10px] text-slate-500 shrink-0">{a.time}</span>
                <span className="text-[11px] text-slate-300 flex-1">{a.sensor}: <span className="font-bold text-white">{a.value}</span></span>
                <span className={`text-[10px] font-extrabold shrink-0 ${a.color}`}>{a.severity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
