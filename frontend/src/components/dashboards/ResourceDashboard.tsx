'use client';

import React, { useState } from 'react';
import { Truck, Users, Package, Droplets, Home, HeartPulse, Brain, CheckCircle, Clock, XCircle } from 'lucide-react';

const DISTRICTS_DATA = [
  { name: 'Cuttack',       ambulances: { have: 4, need: 9 }, boats: { have: 2, need: 5 }, teams: { have: 3, need: 8 }, food: 1.2, beds: 120, status: 'CRITICAL' },
  { name: 'Kendrapara',    ambulances: { have: 2, need: 6 }, boats: { have: 1, need: 4 }, teams: { have: 2, need: 6 }, food: 0.8, beds: 80,  status: 'CRITICAL' },
  { name: 'Jagatsinghpur', ambulances: { have: 3, need: 5 }, boats: { have: 2, need: 3 }, teams: { have: 3, need: 5 }, food: 1.0, beds: 95,  status: 'HIGH' },
  { name: 'Puri',          ambulances: { have: 5, need: 6 }, boats: { have: 3, need: 3 }, teams: { have: 4, need: 5 }, food: 2.1, beds: 150, status: 'MEDIUM' },
  { name: 'Bhubaneswar',   ambulances: { have: 8, need: 8 }, boats: { have: 2, need: 2 }, teams: { have: 6, need: 6 }, food: 3.4, beds: 220, status: 'STABLE' },
  { name: 'Khordha',       ambulances: { have: 6, need: 6 }, boats: { have: 1, need: 1 }, teams: { have: 5, need: 5 }, food: 2.8, beds: 180, status: 'STABLE' },
];

const AI_RECOMMENDATIONS = [
  { id: 'REC-01', action: 'Deploy 5 Ambulances to Kendrapara', reason: 'XGBoost Risk Score: 94% — 40+ trapped survivors, nearest hospital 22km', priority: 'CRITICAL', priorityColor: 'border-red-500/40 bg-red-500/10 text-red-400' },
  { id: 'REC-02', action: 'Pre-position 3 Rescue Boats at Mahanadi Ghats', reason: 'River level: 8.1m (Flood Stage). PostGIS routing predicts road closures in 2hrs', priority: 'HIGH', priorityColor: 'border-orange-500/40 bg-orange-500/10 text-orange-400' },
  { id: 'REC-03', action: 'Open 2 Relief Camps in Puri District', reason: 'Shelter occupancy at 91%. Cyclone DANA landfall forecast for coastal zone in 18hrs', priority: 'HIGH', priorityColor: 'border-orange-500/40 bg-orange-500/10 text-orange-400' },
];

const STATUS_COLOR: Record<string, string> = {
  CRITICAL: 'bg-red-500/20 text-red-400 border-red-500/40',
  HIGH:     'bg-orange-500/20 text-orange-400 border-orange-500/40',
  MEDIUM:   'bg-amber-500/20 text-amber-400 border-amber-500/40',
  STABLE:   'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
};

const DISPATCH_LOG = [
  { time: '17:22', resource: '3 Ambulances', destination: 'Cuttack Sector 11', status: 'En Route' },
  { time: '17:05', resource: '2 Rescue Boats', destination: 'Mahanadi Ghat 4', status: 'Delivered' },
  { time: '16:48', resource: '500 Food Packets', destination: 'Puri Relief Camp 01', status: 'Delivered' },
  { time: '16:30', resource: '10,000L Water', destination: 'Kendrapara Zone B', status: 'En Route' },
  { time: '15:55', resource: '1 NDRF Team (45 members)', destination: 'Jagatsinghpur', status: 'Deployed' },
];

function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.min(100, (value / max) * 100);
  const isShort = value < max;
  return (
    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
      <div className={`h-full rounded-full transition-all duration-700 ${isShort ? 'bg-red-500' : color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

interface DashboardProps {
  regionName?: string;
  stateName?: string;
}

export const ResourceDashboard: React.FC<DashboardProps> = ({
  regionName = 'Cuttack & Mahanadi Basin',
  stateName = 'Odisha'
}) => {
  const [accepted, setAccepted] = useState<string[]>([]);
  const [deferred, setDeferred] = useState<string[]>([]);
  const [reqDistrict, setReqDistrict] = useState('Cuttack');
  const [reqResource, setReqResource] = useState('Ambulances');
  const [reqQty, setReqQty] = useState('');
  const [reqPriority, setReqPriority] = useState('HIGH');
  const [requests, setRequests] = useState<{ district: string; resource: string; qty: string; priority: string }[]>([]);

  const submitRequest = () => {
    if (!reqQty) return;
    setRequests(r => [{ district: reqDistrict, resource: reqResource, qty: reqQty, priority: reqPriority }, ...r]);
    setReqQty('');
  };

  return (
    <div className="space-y-5">
      {/* Inventory Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { icon: <Truck className="w-4 h-4 text-amber-400" />, label: 'Ambulances', have: 24, total: 45, color: 'bg-amber-500' },
          { icon: <Users className="w-4 h-4 text-blue-400" />, label: 'Rescue Teams', have: 18, total: 30, color: 'bg-blue-500' },
          { icon: <Package className="w-4 h-4 text-emerald-400" />, label: 'Food (tonnes)', have: 14.2, total: 30, color: 'bg-emerald-500' },
          { icon: <Droplets className="w-4 h-4 text-cyan-400" />, label: 'Water (kL)', have: 8.4, total: 20, color: 'bg-cyan-500' },
          { icon: <Home className="w-4 h-4 text-purple-400" />, label: 'Shelter Beds', have: 1240, total: 2000, color: 'bg-purple-500' },
          { icon: <HeartPulse className="w-4 h-4 text-pink-400" />, label: 'Hospital Beds', have: 89, total: 180, color: 'bg-pink-500' },
        ].map(r => {
          const pct = Math.round((r.have / r.total) * 100);
          return (
            <div key={r.label} className="glass-card border border-slate-700 rounded-xl p-3 space-y-2">
              <div className="flex items-center gap-2">{r.icon}<span className="text-[11px] font-bold text-slate-400">{r.label}</span></div>
              <div className="text-xl font-black text-white">{r.have}<span className="text-slate-500 text-xs font-normal">/{r.total}</span></div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${r.color}`} style={{ width: `${pct}%` }} />
              </div>
              <div className="text-[10px] text-slate-500">{pct}% available</div>
            </div>
          );
        })}
      </div>

      {/* AI Recommendations */}
      <div className="space-y-3">
        <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Brain className="w-4 h-4 text-indigo-400" /> AI Resource Recommendations
        </h4>
        {AI_RECOMMENDATIONS.map(rec => (
          <div key={rec.id} className={`border rounded-xl p-4 ${rec.priorityColor} space-y-2`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-slate-400">{rec.id}</span>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${rec.priorityColor}`}>{rec.priority}</span>
                </div>
                <div className="text-sm font-extrabold text-white">{rec.action}</div>
                <div className="text-[11px] text-slate-400">{rec.reason}</div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {accepted.includes(rec.id)
                  ? <span className="flex items-center gap-1 text-emerald-400 text-xs font-bold"><CheckCircle className="w-4 h-4" />Accepted</span>
                  : deferred.includes(rec.id)
                  ? <span className="flex items-center gap-1 text-slate-400 text-xs font-bold"><XCircle className="w-4 h-4" />Deferred</span>
                  : <>
                    <button onClick={() => setAccepted(a => [...a, rec.id])} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg cursor-pointer outline-none transition">Accept</button>
                    <button onClick={() => setDeferred(d => [...d, rec.id])} className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold text-xs rounded-lg cursor-pointer outline-none transition">Defer</button>
                  </>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* District Table */}
      <div className="glass-card border border-slate-700 rounded-xl p-4 space-y-3">
        <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider">District-wise Resource Inventory</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs min-w-[600px]">
            <thead><tr className="text-slate-400 border-b border-slate-800">
              {['District', 'Ambulances', 'Boats', 'Rescue Teams', 'Food (T)', 'Shelter Beds', 'Status'].map(h => (
                <th key={h} className="text-left py-2 px-2 font-bold uppercase tracking-wider text-[10px]">{h}</th>
              ))}
            </tr></thead>
            <tbody className="divide-y divide-slate-800/50">
              {DISTRICTS_DATA.map(d => (
                <tr key={d.name} className="hover:bg-slate-800/30">
                  <td className="py-2 px-2 font-bold text-slate-200">{d.name}</td>
                  <td className={`py-2 px-2 font-bold ${d.ambulances.have < d.ambulances.need ? 'text-red-400' : 'text-emerald-400'}`}>{d.ambulances.have}/{d.ambulances.need}</td>
                  <td className={`py-2 px-2 font-bold ${d.boats.have < d.boats.need ? 'text-red-400' : 'text-emerald-400'}`}>{d.boats.have}/{d.boats.need}</td>
                  <td className={`py-2 px-2 font-bold ${d.teams.have < d.teams.need ? 'text-red-400' : 'text-emerald-400'}`}>{d.teams.have}/{d.teams.need}</td>
                  <td className="py-2 px-2 text-slate-300">{d.food}</td>
                  <td className="py-2 px-2 text-slate-300">{d.beds}</td>
                  <td className="py-2 px-2"><span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${STATUS_COLOR[d.status]}`}>{d.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resource Request Form + Dispatch Log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card border border-slate-700 rounded-xl p-4 space-y-3">
          <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider">Submit Resource Request</h4>
          <div className="grid grid-cols-2 gap-2">
            <select value={reqDistrict} onChange={e => setReqDistrict(e.target.value)} className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none">
              {DISTRICTS_DATA.map(d => <option key={d.name} className="bg-slate-900">{d.name}</option>)}
            </select>
            <select value={reqResource} onChange={e => setReqResource(e.target.value)} className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none">
              {['Ambulances', 'Rescue Boats', 'Food Packets', 'Water Tankers', 'Medical Kits', 'Rescue Teams'].map(r => <option key={r} className="bg-slate-900">{r}</option>)}
            </select>
            <input value={reqQty} onChange={e => setReqQty(e.target.value)} placeholder="Quantity" className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500" />
            <select value={reqPriority} onChange={e => setReqPriority(e.target.value)} className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none">
              {['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map(p => <option key={p} className="bg-slate-900">{p}</option>)}
            </select>
          </div>
          <button onClick={submitRequest} className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-extrabold py-2 rounded-xl text-xs cursor-pointer outline-none">Submit Request</button>
          {requests.length > 0 && (
            <div className="space-y-2 mt-2 max-h-32 overflow-y-auto">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Pending Requests</div>
              {requests.map((r, i) => (
                <div key={i} className="flex items-center justify-between text-[11px] bg-slate-900/60 border border-slate-800 rounded-lg px-3 py-2">
                  <span className="text-slate-300">{r.qty}× {r.resource} → {r.district}</span>
                  <span className={`font-bold text-[10px] ${STATUS_COLOR[r.priority]?.split(' ')[1] || 'text-slate-400'}`}>{r.priority}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="glass-card border border-slate-700 rounded-xl p-4 space-y-3">
          <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" /> Dispatch Log
          </h4>
          <div className="space-y-2">
            {DISPATCH_LOG.map((l, i) => (
              <div key={i} className="flex items-center gap-3 bg-slate-900/60 border border-slate-800 rounded-lg px-3 py-2">
                <span className="font-mono text-[10px] text-slate-500 shrink-0">{l.time}</span>
                <div className="flex-1 text-[11px]">
                  <span className="text-white font-bold">{l.resource}</span>
                  <span className="text-slate-400"> → {l.destination}</span>
                </div>
                <span className={`text-[10px] font-bold shrink-0 ${l.status === 'Delivered' || l.status === 'Deployed' ? 'text-emerald-400' : 'text-amber-400'}`}>{l.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
