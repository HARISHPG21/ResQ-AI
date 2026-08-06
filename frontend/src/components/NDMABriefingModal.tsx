'use client';

import React from 'react';
import { X, Printer, Shield, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

interface NDMABriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
  regionName?: string;
  stateName?: string;
}

export const NDMABriefingModal: React.FC<NDMABriefingModalProps> = ({
  isOpen,
  onClose,
  regionName = 'Cuttack & Mahanadi Basin',
  stateName = 'Odisha'
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const currentTime = new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-8 text-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Modal Header Toolbar */}
        <div className="flex items-center justify-between p-4 bg-slate-950 border-b border-slate-800 shrink-0 print:hidden">
          <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-sm">
            <FileText className="w-4 h-4" />
            <span>NDMA Daily Situation Report (SITREP) Exporter</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs rounded-xl flex items-center gap-2 cursor-pointer transition shadow-glow-emerald outline-none"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-8 overflow-y-auto space-y-6 bg-slate-950 text-slate-100 print:bg-white print:text-black print:p-6 print:overflow-visible">
          
          {/* Official Letterhead Header */}
          <div className="border-b-2 border-cyan-500/60 print:border-black pb-4 text-center space-y-1">
            <div className="flex items-center justify-center gap-3">
              <Shield className="w-8 h-8 text-cyan-400 print:text-black" />
              <div className="text-left">
                <div className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase print:text-gray-700">Government of India • Ministry of Home Affairs</div>
                <div className="text-xl font-black text-white tracking-tight print:text-black">NATIONAL DISASTER MANAGEMENT AUTHORITY (NDMA)</div>
              </div>
            </div>
            <div className="text-xs font-bold text-slate-400 print:text-gray-600 pt-2 uppercase tracking-wider">
              DAILY NATIONAL DISASTER SITUATION BRIEFING REPORT (SITREP-2026-08)
            </div>
            <div className="text-[11px] font-mono text-cyan-400 print:text-gray-800">
              Date: <b>{currentDate}</b> • Time: <b>{currentTime} IST</b> • Status: <span className="text-red-400 print:text-red-600 font-bold">NATIONAL ALERT LEVEL 4</span>
            </div>
          </div>

          {/* Region Overview Banner */}
          <div className="bg-slate-900 border border-slate-800 print:border-gray-300 print:bg-gray-50 rounded-xl p-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <div className="text-slate-400 print:text-gray-500 font-bold text-[10px] uppercase">Active Region</div>
              <div className="font-extrabold text-white print:text-black text-sm">{regionName}</div>
              <div className="text-slate-400 print:text-gray-600 text-[11px]">{stateName} State</div>
            </div>
            <div>
              <div className="text-slate-400 print:text-gray-500 font-bold text-[10px] uppercase">Primary Hazard</div>
              <div className="font-extrabold text-amber-400 print:text-amber-800 text-sm">River Flood &amp; Cyclone DANA</div>
              <div className="text-slate-400 print:text-gray-600 text-[11px]">Category 3 Severe Storm</div>
            </div>
            <div>
              <div className="text-slate-400 print:text-gray-500 font-bold text-[10px] uppercase">Command Center</div>
              <div className="font-extrabold text-cyan-400 print:text-blue-800 text-sm">NDRF Battalion 03</div>
              <div className="text-slate-400 print:text-gray-600 text-[11px]">Joint Control Room</div>
            </div>
            <div>
              <div className="text-slate-400 print:text-gray-500 font-bold text-[10px] uppercase">AI Confidence</div>
              <div className="font-extrabold text-emerald-400 print:text-emerald-800 text-sm">94.2% Accuracy</div>
              <div className="text-slate-400 print:text-gray-600 text-[11px]">YOLOv11 + XGBoost</div>
            </div>
          </div>

          {/* Key Situation Summary Stats */}
          <div className="space-y-2">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 print:text-black border-b border-slate-800 print:border-gray-300 pb-1">
              1. Key Situation Metrics &amp; Operations
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-900/80 print:bg-gray-100 p-3 rounded-lg border border-slate-800 print:border-gray-300">
                <div className="text-slate-400 print:text-gray-600">Total Citizens Rescued</div>
                <div className="text-xl font-black text-emerald-400 print:text-emerald-800 mt-0.5">1,48,200</div>
                <div className="text-[10px] text-slate-500 print:text-gray-500">Across 4 affected districts</div>
              </div>
              <div className="bg-slate-900/80 print:bg-gray-100 p-3 rounded-lg border border-slate-800 print:border-gray-300">
                <div className="text-slate-400 print:text-gray-600">Active Incidents</div>
                <div className="text-xl font-black text-red-400 print:text-red-800 mt-0.5">1,284</div>
                <div className="text-[10px] text-slate-500 print:text-gray-500">18 critical danger zones</div>
              </div>
              <div className="bg-slate-900/80 print:bg-gray-100 p-3 rounded-lg border border-slate-800 print:border-gray-300">
                <div className="text-slate-400 print:text-gray-600">Shelter Occupancy</div>
                <div className="text-xl font-black text-blue-400 print:text-blue-800 mt-0.5">1,240 / 2,000</div>
                <div className="text-[10px] text-slate-500 print:text-gray-500">47 active relief camps</div>
              </div>
              <div className="bg-slate-900/80 print:bg-gray-100 p-3 rounded-lg border border-slate-800 print:border-gray-300">
                <div className="text-slate-400 print:text-gray-600">Avg Rescue Response</div>
                <div className="text-xl font-black text-amber-400 print:text-amber-800 mt-0.5">8.4 Minutes</div>
                <div className="text-[10px] text-slate-500 print:text-gray-500">⚡ 65% faster dispatch</div>
              </div>
            </div>
          </div>

          {/* AI Tactical Recommendations */}
          <div className="space-y-2">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 print:text-black border-b border-slate-800 print:border-gray-300 pb-1">
              2. AI Tactical Resource Deployment Recommendations
            </h3>
            <div className="space-y-2 text-xs">
              <div className="bg-slate-900/60 print:bg-gray-50 border border-red-500/30 print:border-red-400 p-3 rounded-lg flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-red-400 print:text-red-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-extrabold text-white print:text-black">[CRITICAL] Deploy 5 ALS Ambulances to Kendrapara Zone B</div>
                  <div className="text-slate-300 print:text-gray-700 text-[11px] mt-0.5">
                    XGBoost Risk Score: 94% • 40+ survivors detected on rooftops by YOLOv11 drone stream • Nearest hospital 22km away.
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/60 print:bg-gray-50 border border-orange-500/30 print:border-orange-400 p-3 rounded-lg flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-orange-400 print:text-orange-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-extrabold text-white print:text-black">[HIGH] Pre-position 3 Motor Boats at Mahanadi Ghat 4</div>
                  <div className="text-slate-300 print:text-gray-700 text-[11px] mt-0.5">
                    River level at 8.1m (Flood Stage). PostGIS pgRouting predicts road access cut-off within 2 hours.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* District Status Matrix */}
          <div className="space-y-2">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 print:text-black border-b border-slate-800 print:border-gray-300 pb-1">
              3. District-wise Risk &amp; Resource Availability Matrix
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 print:border-gray-300 text-slate-400 print:text-gray-600 font-bold uppercase text-[10px]">
                    <th className="py-1.5 px-2">District</th>
                    <th className="py-1.5 px-2">Rainfall</th>
                    <th className="py-1.5 px-2">Ambulances</th>
                    <th className="py-1.5 px-2">Rescue Boats</th>
                    <th className="py-1.5 px-2">Food Stock</th>
                    <th className="py-1.5 px-2">Alert Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 print:divide-gray-200">
                  {[
                    { name: 'Cuttack', rain: '142 mm/hr', amb: '4 / 9', boats: '2 / 5', food: '1.2 Tonnes', alert: 'RED' },
                    { name: 'Kendrapara', rain: '118 mm/hr', amb: '2 / 6', boats: '1 / 4', food: '0.8 Tonnes', alert: 'RED' },
                    { name: 'Jagatsinghpur', rain: '112 mm/hr', amb: '3 / 5', boats: '2 / 3', food: '1.0 Tonnes', alert: 'ORANGE' },
                    { name: 'Puri', rain: '98 mm/hr', amb: '5 / 6', boats: '3 / 3', food: '2.1 Tonnes', alert: 'ORANGE' },
                    { name: 'Bhubaneswar', rain: '64 mm/hr', amb: '8 / 8', boats: '2 / 2', food: '3.4 Tonnes', alert: 'YELLOW' },
                  ].map(d => (
                    <tr key={d.name}>
                      <td className="py-1.5 px-2 font-bold text-white print:text-black">{d.name}</td>
                      <td className="py-1.5 px-2 font-mono text-cyan-400 print:text-blue-800">{d.rain}</td>
                      <td className="py-1.5 px-2 font-bold">{d.amb}</td>
                      <td className="py-1.5 px-2 font-bold">{d.boats}</td>
                      <td className="py-1.5 px-2 text-slate-300 print:text-gray-700">{d.food}</td>
                      <td className="py-1.5 px-2 font-black text-red-400 print:text-red-700">{d.alert}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Official Sign-off & Helpline Strip */}
          <div className="pt-4 border-t border-slate-800 print:border-gray-400 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[10px] text-slate-400 print:text-gray-600">
            <div>
              <b>NDRF Helpline:</b> 011-24363260 • <b>State Control Room:</b> 1070 • <b>Ambulance:</b> 108
            </div>
            <div className="font-mono">
              Generated by ResQ-AI Command Intelligence • Page 1 of 1
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
