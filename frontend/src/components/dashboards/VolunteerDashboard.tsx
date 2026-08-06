'use client';

import React from 'react';
import { HeartHandshake, PackageCheck, Utensils, Droplets } from 'lucide-react';

interface DashboardProps {
  regionName?: string;
  stateName?: string;
}

export const VolunteerDashboard: React.FC<DashboardProps> = ({
  regionName = 'Cuttack & Mahanadi Basin',
  stateName = 'Odisha'
}) => {
  return (
    <div className="space-y-5">
      <div className="glass-panel p-4 rounded-xl border border-teal-500/40 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-teal-400" />
            Volunteer & NGO Relief Logistics Terminal — Red Cross Odisha
          </h2>
          <p className="text-xs text-slate-400">Food Packet Distribution, Water Bottles & Community Kitchen Tracker.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-teal-400">
            <Utensils className="w-4 h-4" />
            Cooked Food Packets Ready
          </div>
          <div className="text-2xl font-black text-white">4,500 Packets</div>
          <p className="text-[10px] text-slate-400">Dispatched to Relief Camp #02</p>
        </div>

        <div className="glass-card p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
            <Droplets className="w-4 h-4" />
            Clean Water Bottles
          </div>
          <div className="text-2xl font-black text-white">12,000 Liters</div>
          <p className="text-[10px] text-slate-400">Chlorine Purification Kits Active</p>
        </div>

        <div className="glass-card p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-400">
            <PackageCheck className="w-4 h-4" />
            Hygiene & First Aid Kits
          </div>
          <div className="text-2xl font-black text-white">1,200 Kits</div>
          <p className="text-[10px] text-slate-400">Distributed by 45 Volunteers</p>
        </div>
      </div>
    </div>
  );
};
