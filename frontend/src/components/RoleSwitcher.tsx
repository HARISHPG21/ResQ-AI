'use client';

import React from 'react';
import {
  ShieldAlert, Building2, HeartHandshake, Flame, ShieldCheck, Hospital,
  UserCheck, Radio, Cpu, Plane, Activity, CloudSun, Package, BarChart2, Settings
} from 'lucide-react';

export type UserRole =
  | 'NATIONAL_ADMIN' | 'STATE_ADMIN' | 'DISTRICT_COLLECTOR'
  | 'NDRF' | 'POLICE_FIRE' | 'HOSPITAL'
  | 'CITIZEN' | 'VOLUNTEER'
  | 'AI_ENGINE' | 'DRONE_OPS' | 'IOT_TELEMETRY'
  | 'WEATHER' | 'RESOURCES' | 'ANALYTICS';

interface RoleSwitcherProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const ROLES: { id: UserRole; label: string; icon: any; color: string }[] = [
  { id: 'NATIONAL_ADMIN',    label: 'National Admin',     icon: ShieldAlert,    color: 'text-red-400' },
  { id: 'STATE_ADMIN',       label: 'State Admin',        icon: Building2,      color: 'text-amber-400' },
  { id: 'DISTRICT_COLLECTOR',label: 'District Collector', icon: Activity,       color: 'text-cyan-400' },
  { id: 'NDRF',              label: 'NDRF / SDRF',        icon: ShieldCheck,    color: 'text-emerald-400' },
  { id: 'POLICE_FIRE',       label: 'Police & Fire',      icon: Flame,          color: 'text-orange-400' },
  { id: 'HOSPITAL',          label: 'Hospitals & Health', icon: Hospital,       color: 'text-pink-400' },
  { id: 'CITIZEN',           label: 'Citizen SOS Portal', icon: UserCheck,      color: 'text-purple-400' },
  { id: 'VOLUNTEER',         label: 'Volunteer & NGO',    icon: HeartHandshake, color: 'text-teal-400' },
  { id: 'AI_ENGINE',         label: 'AI Analytics',       icon: Cpu,            color: 'text-indigo-400' },
  { id: 'DRONE_OPS',         label: 'Drone Surveillance', icon: Plane,          color: 'text-blue-400' },
  { id: 'IOT_TELEMETRY',     label: 'IoT Sensors',        icon: Radio,          color: 'text-yellow-400' },
  { id: 'WEATHER',           label: 'Weather Center',     icon: CloudSun,       color: 'text-sky-400' },
  { id: 'RESOURCES',         label: 'Resource Mgmt',      icon: Package,        color: 'text-lime-400' },
  { id: 'ANALYTICS',         label: 'Analytics',          icon: BarChart2,      color: 'text-violet-400' },
];

export const RoleSwitcher: React.FC<RoleSwitcherProps> = ({ currentRole, onRoleChange }) => (
  <div className="w-full glass-panel border-y border-slate-800/80 py-2.5 px-4 overflow-x-auto no-scrollbar shadow-inner">
    <div className="flex items-center space-x-2 min-w-max">
      <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 mr-2 flex items-center gap-1.5 shrink-0">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
        RBAC Role Terminal:
      </span>
      {ROLES.map(r => {
        const Icon = r.icon;
        const isActive = currentRole === r.id;
        return (
          <button
            key={r.id}
            onClick={() => onRoleChange(r.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 outline-none border cursor-pointer ${
              isActive
                ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/60 shadow-glow-cyan scale-[1.02]'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800/70 hover:border-slate-700'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${r.color}`} />
            {r.label}
          </button>
        );
      })}
    </div>
  </div>
);
