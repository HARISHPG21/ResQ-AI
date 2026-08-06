'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Plane, Battery, MapPin, Radio, Upload, Target, Wind } from 'lucide-react';

const DRONES = [
  { id: 'DELTA_01', status: 'Active', statusColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40', battery: 78, location: '20.4730° N, 85.8880° E', mission: 'Search & Rescue', ping: '< 1s' },
  { id: 'DELTA_02', status: 'Standby', statusColor: 'bg-blue-500/20 text-blue-400 border-blue-500/40', battery: 94, location: '20.4600° N, 85.8700° E', mission: 'Awaiting Orders', ping: '1.2s' },
  { id: 'DELTA_03', status: 'Low Battery', statusColor: 'bg-red-500/20 text-red-400 border-red-500/40', battery: 12, location: '20.4680° N, 85.8820° E', mission: 'RTB — Returning', ping: '2.1s' },
  { id: 'DELTA_04', status: 'Charging', statusColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40', battery: 45, location: 'Base Station Alpha', mission: 'Recharging', ping: 'Offline' },
  { id: 'DELTA_05', status: 'Mission Complete', statusColor: 'bg-slate-500/20 text-slate-400 border-slate-500/40', battery: 67, location: 'Base Station Alpha', mission: 'Damage Survey ✓', ping: 'Docked' },
];

const MISSIONS = [
  { id: 'MSN-001', drone: 'DELTA_01', type: 'Search & Rescue', area: 'Sector 11 Rooftops', status: 'In Progress', time: '14 mins ago' },
  { id: 'MSN-002', drone: 'DELTA_03', type: 'Damage Survey', area: 'Mahanadi Ghats', status: 'Returning', time: '32 mins ago' },
  { id: 'MSN-003', drone: 'DELTA_05', type: 'Aerial Reconnaissance', area: 'Jobra Barrage', status: 'Complete', time: '1.5 hrs ago' },
];

interface DroneOpsDashboardProps {
  regionName?: string;
  stateName?: string;
}

export const DroneOpsDashboard: React.FC<DroneOpsDashboardProps> = ({
  regionName = 'Cuttack & Mahanadi Basin',
  stateName = 'Odisha'
}) => {
  const [telemetry, setTelemetry] = useState({ alt: 120, speed: 45, heading: 142, signal: 94, wind: 18 });
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [time, setTime] = useState(new Date());
  const [missionType, setMissionType] = useState('Search & Rescue');
  const [selectedDrone, setSelectedDrone] = useState('DELTA_01');
  const [targetGPS, setTargetGPS] = useState('20.4730, 85.8880');
  const [dispatchMsg, setDispatchMsg] = useState<string | null>(null);

  useEffect(() => {
    const iv = setInterval(() => {
      setTime(new Date());
      setTelemetry(t => ({
        alt: +Math.max(50, Math.min(200, t.alt + (Math.random() - 0.5) * 4)).toFixed(0),
        speed: +Math.max(20, Math.min(80, t.speed + (Math.random() - 0.5) * 3)).toFixed(0),
        heading: (t.heading + Math.random() * 2 - 1 + 360) % 360 | 0,
        signal: +Math.max(60, Math.min(100, t.signal + (Math.random() - 0.5) * 2)).toFixed(0),
        wind: +Math.max(5, Math.min(40, t.wind + (Math.random() - 0.5) * 2)).toFixed(0),
      }));
    }, 1500);
    return () => clearInterval(iv);
  }, []);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setUploadedImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDispatch = () => {
    setDispatchMsg(`✅ ${selectedDrone} dispatched for ${missionType} to GPS: ${targetGPS}`);
    setTimeout(() => setDispatchMsg(null), 5000);
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Live Feed Panel */}
        <div className="lg:col-span-2 glass-card border border-slate-700 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Radio className="w-4 h-4 text-red-400 animate-pulse" /> Live Drone Feed — DELTA_01
            </h4>
            <label className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-300 text-[11px] font-semibold cursor-pointer transition">
              <Upload className="w-3.5 h-3.5" /> Upload Image
              <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
            </label>
          </div>

          {/* Video / Image Feed */}
          <div className="relative w-full h-56 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-xl overflow-hidden border border-slate-800">
            {uploadedImage && <img src={uploadedImage} alt="drone feed" className="absolute inset-0 w-full h-full object-cover opacity-80" />}
            {/* Scan line overlay */}
            <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,255,0.03) 3px, rgba(0,255,255,0.03) 4px)' }} />

            {/* Bounding Boxes */}
            <div className="absolute border-2 border-red-500 rounded-sm" style={{ top: '18%', left: '12%', width: '22%', height: '28%' }}>
              <div className="absolute -top-5 left-0 bg-red-600/90 text-white text-[9px] px-1.5 py-0.5 rounded whitespace-nowrap font-bold">Victim #1 — 94.2%</div>
            </div>
            <div className="absolute border-2 border-red-500 rounded-sm" style={{ top: '50%', left: '58%', width: '18%', height: '22%' }}>
              <div className="absolute -top-5 left-0 bg-red-600/90 text-white text-[9px] px-1.5 py-0.5 rounded whitespace-nowrap font-bold">Victim #2 — 89.1%</div>
            </div>
            <div className="absolute border-2 border-orange-500 rounded-sm" style={{ top: '62%', left: '28%', width: '28%', height: '18%' }}>
              <div className="absolute -top-5 left-0 bg-orange-600/90 text-white text-[9px] px-1.5 py-0.5 rounded whitespace-nowrap font-bold">Bldg Damage — 87.5%</div>
            </div>

            {/* HUD Overlays */}
            <div className="absolute top-2 left-2 text-[10px] font-mono text-cyan-400 bg-slate-950/80 px-2 py-1 rounded space-y-0.5 leading-relaxed">
              <div>ALT: {telemetry.alt}m</div>
              <div>SPD: {telemetry.speed} km/h</div>
              <div>HDG: {telemetry.heading}°</div>
            </div>
            <div className="absolute top-2 right-2 text-[10px] font-mono text-cyan-400 bg-slate-950/80 px-2 py-1 rounded space-y-0.5 leading-relaxed text-right">
              <div>SIG: {telemetry.signal}%</div>
              <div>WIND: {telemetry.wind} km/h</div>
              <div>{time.toLocaleTimeString('en-IN')}</div>
            </div>
            <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span className="text-[10px] text-red-400 font-extrabold">LIVE · YOLOv11 AI</span>
            </div>
            <div className="absolute bottom-2 right-2 font-mono text-[10px] text-slate-500">DRONE_DELTA_01 · EPSG:4326</div>
          </div>

          {/* Detection Result Cards */}
          <div className="grid grid-cols-3 gap-2 text-center">
            {[{ label: 'Victims', value: '2', color: 'text-red-400', bg: 'border-red-500/30' }, { label: 'Bldg Damage', value: '1', color: 'text-orange-400', bg: 'border-orange-500/30' }, { label: 'Avg Conf.', value: '90.3%', color: 'text-emerald-400', bg: 'border-emerald-500/30' }].map(c => (
              <div key={c.label} className={`glass-card border ${c.bg} rounded-lg py-2`}>
                <div className={`text-xl font-black ${c.color}`}>{c.value}</div>
                <div className="text-[11px] text-slate-400">{c.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Telemetry + Dispatch Panel */}
        <div className="space-y-4">
          {/* Telemetry */}
          <div className="glass-card border border-slate-700 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider">Live Telemetry</h4>
            {[
              { label: 'Altitude', value: `${telemetry.alt} m`, icon: '📡' },
              { label: 'Speed', value: `${telemetry.speed} km/h`, icon: '💨' },
              { label: 'Heading', value: `${telemetry.heading}°`, icon: '🧭' },
              { label: 'Signal', value: `${telemetry.signal}%`, icon: '📶' },
              { label: 'Wind', value: `${telemetry.wind} km/h`, icon: '🌬️' },
            ].map(t => (
              <div key={t.label} className="flex justify-between items-center text-xs border-b border-slate-800 pb-1">
                <span className="text-slate-400">{t.icon} {t.label}</span>
                <span className="font-bold text-cyan-400 font-mono">{t.value}</span>
              </div>
            ))}
          </div>

          {/* Mission Dispatch */}
          <div className="glass-card border border-slate-700 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Target className="w-3.5 h-3.5 text-indigo-400" /> Dispatch Mission
            </h4>
            {dispatchMsg && <div className="text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-3 py-2">{dispatchMsg}</div>}
            <select value={selectedDrone} onChange={e => setSelectedDrone(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none">
              {DRONES.filter(d => d.status === 'Active' || d.status === 'Standby').map(d => <option key={d.id} className="bg-slate-900">{d.id}</option>)}
            </select>
            <select value={missionType} onChange={e => setMissionType(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none">
              {['Search & Rescue', 'Damage Survey', 'Supply Drop', 'Surveillance', 'Medical Delivery'].map(m => <option key={m} className="bg-slate-900">{m}</option>)}
            </select>
            <input value={targetGPS} onChange={e => setTargetGPS(e.target.value)} placeholder="Target GPS (lat, lng)" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono" />
            <button onClick={handleDispatch} className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-extrabold py-2 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer outline-none">
              <Plane className="w-3.5 h-3.5" /> Dispatch Drone
            </button>
          </div>
        </div>
      </div>

      {/* Drone Fleet Table */}
      <div className="glass-card border border-slate-700 rounded-xl p-4 space-y-3">
        <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider">Drone Fleet Status</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs min-w-[550px]">
            <thead><tr className="text-slate-400 border-b border-slate-800">
              {['Drone ID', 'Status', 'Battery', 'Location', 'Mission', 'Last Ping'].map(h => (
                <th key={h} className="text-left py-2 px-2 font-bold uppercase tracking-wider text-[10px]">{h}</th>
              ))}
            </tr></thead>
            <tbody className="divide-y divide-slate-800/50">
              {DRONES.map(d => (
                <tr key={d.id} className="hover:bg-slate-800/30 transition">
                  <td className="py-2 px-2 font-mono font-bold text-cyan-400">{d.id}</td>
                  <td className="py-2 px-2"><span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${d.statusColor}`}>{d.status}</span></td>
                  <td className="py-2 px-2">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${d.battery < 20 ? 'text-red-400' : d.battery < 50 ? 'text-amber-400' : 'text-emerald-400'}`}>{d.battery}%</span>
                      <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${d.battery < 20 ? 'bg-red-500' : d.battery < 50 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${d.battery}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-2 text-slate-400 font-mono text-[10px]">{d.location}</td>
                  <td className="py-2 px-2 text-slate-300">{d.mission}</td>
                  <td className="py-2 px-2 text-slate-500 font-mono">{d.ping}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
