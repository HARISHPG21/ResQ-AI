'use client';

import React, { useState, useEffect } from 'react';
import { LandingPage } from '@/components/LandingPage';
import { RoleSwitcher, UserRole } from '@/components/RoleSwitcher';
import { GISMap, REGIONS } from '@/components/GISMap';
import { AIChatbotModal } from '@/components/AIChatbotModal';

// Import Dashboards
import { NationalAdminDashboard } from '@/components/dashboards/NationalAdminDashboard';
import { StateAdminDashboard } from '@/components/dashboards/StateAdminDashboard';
import { DistrictCollectorDashboard } from '@/components/dashboards/DistrictCollectorDashboard';
import { NDRFDashboard } from '@/components/dashboards/NDRFDashboard';
import { PoliceFireDashboard } from '@/components/dashboards/PoliceFireDashboard';
import { HospitalDashboard } from '@/components/dashboards/HospitalDashboard';
import { CitizenPortal } from '@/components/dashboards/CitizenPortal';
import { VolunteerDashboard } from '@/components/dashboards/VolunteerDashboard';
import { AIEngineDashboard } from '@/components/dashboards/AIEngineDashboard';
import { DroneOpsDashboard } from '@/components/dashboards/DroneOpsDashboard';
import { IoTSensorDashboard } from '@/components/dashboards/IoTSensorDashboard';
import { WeatherDashboard } from '@/components/dashboards/WeatherDashboard';
import { ResourceDashboard } from '@/components/dashboards/ResourceDashboard';
import { AnalyticsDashboard } from '@/components/dashboards/AnalyticsDashboard';

import { NDMABriefingModal } from '@/components/NDMABriefingModal';

import { Shield, Sparkles, Radio, Activity, Sun, Moon, Home as HomeIcon, LayoutDashboard, LifeBuoy, Layers, Eye, EyeOff, MapPin, Globe, FileText } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'HOME' | 'COMMAND_CENTER'>('HOME');
  const [currentRole, setCurrentRole] = useState<UserRole>('NATIONAL_ADMIN');
  const [selectedRegionKey, setSelectedRegionKey] = useState<string>('CUTTACK');
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [briefingOpen, setBriefingOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // GIS Layer Toggles
  const [showFloodZone, setShowFloodZone] = useState(true);
  const [showDangerZone, setShowDangerZone] = useState(true);
  const [showFireZone, setShowFireZone] = useState(true);
  const [showEvacuationRoute, setShowEvacuationRoute] = useState(true);
  const [showVictims, setShowVictims] = useState(true);
  const [showSensors, setShowSensors] = useState(true);
  const [showShelters, setShowShelters] = useState(true);
  const [showHospitals, setShowHospitals] = useState(true);
  const [showAmbulances, setShowAmbulances] = useState(true);
  const [showFireStations, setShowFireStations] = useState(true);
  const [showDrones, setShowDrones] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = (localStorage.getItem('resq_theme') as 'dark' | 'light') || 'dark';
    setTheme(savedTheme);
    document.documentElement.className = savedTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('resq_theme', newTheme);
    document.documentElement.className = newTheme;
  };

  const activeRegion = REGIONS[selectedRegionKey] || REGIONS.CUTTACK;

  const renderDashboardByRole = () => {
    switch (currentRole) {
      case 'NATIONAL_ADMIN':
        return <NationalAdminDashboard regionName={activeRegion.name} stateName={activeRegion.state} />;
      case 'STATE_ADMIN':
        return <StateAdminDashboard regionName={activeRegion.name} stateName={activeRegion.state} />;
      case 'DISTRICT_COLLECTOR':
        return <DistrictCollectorDashboard regionName={activeRegion.name} stateName={activeRegion.state} />;
      case 'NDRF':
        return <NDRFDashboard regionName={activeRegion.name} stateName={activeRegion.state} />;
      case 'POLICE_FIRE':
        return <PoliceFireDashboard regionName={activeRegion.name} stateName={activeRegion.state} />;
      case 'HOSPITAL':
        return <HospitalDashboard regionName={activeRegion.name} stateName={activeRegion.state} />;
      case 'CITIZEN':
        return <CitizenPortal regionName={activeRegion.name} stateName={activeRegion.state} />;
      case 'VOLUNTEER':
        return <VolunteerDashboard regionName={activeRegion.name} stateName={activeRegion.state} />;
      case 'AI_ENGINE':
        return <AIEngineDashboard regionName={activeRegion.name} stateName={activeRegion.state} />;
      case 'DRONE_OPS':
        return <DroneOpsDashboard regionName={activeRegion.name} stateName={activeRegion.state} />;
      case 'IOT_TELEMETRY':
        return <IoTSensorDashboard regionName={activeRegion.name} stateName={activeRegion.state} />;
      case 'WEATHER':
        return <WeatherDashboard regionName={activeRegion.name} stateName={activeRegion.state} />;
      case 'RESOURCES':
        return <ResourceDashboard regionName={activeRegion.name} stateName={activeRegion.state} />;
      case 'ANALYTICS':
        return <AnalyticsDashboard regionName={activeRegion.name} stateName={activeRegion.state} />;
      default:
        return <NationalAdminDashboard />;
    }
  };

  return (
    <main className="min-h-screen flex flex-col transition-colors duration-300">
      {/* Top Government Platform Header */}
      <header className="glass-panel border-b border-slate-800 py-3.5 px-4 sm:px-6 sticky top-0 z-50 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('HOME')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center text-slate-950 font-black shadow-glow-cyan shrink-0">
              <Shield className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-white">ResQ-AI</h1>
                <span className="text-[9px] sm:text-[10px] bg-red-500/20 text-red-400 font-extrabold px-2.5 py-0.5 rounded-full border border-red-500/40 uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                  National Alert Level 4
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 font-medium hidden md:block">NDMA Disaster Response Intelligence Platform</p>
            </div>
          </div>

          {/* Navigation View Tabs */}
          <nav className="flex items-center bg-slate-900/80 p-1 rounded-xl border border-slate-800 space-x-1">
            <button
              onClick={() => setActiveTab('HOME')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition outline-none cursor-pointer ${
                activeTab === 'HOME'
                  ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <HomeIcon className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>

            <button
              onClick={() => setActiveTab('COMMAND_CENTER')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition outline-none cursor-pointer ${
                activeTab === 'COMMAND_CENTER'
                  ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Command Center</span>
            </button>
          </nav>
        </div>

        {/* Action Controls & Responsive Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* 1-Tap SOS Direct Button */}
          <button
            onClick={() => {
              setActiveTab('COMMAND_CENTER');
              setCurrentRole('CITIZEN');
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-600/90 hover:bg-red-600 text-white font-extrabold text-xs transition shadow-glow-red outline-none cursor-pointer"
          >
            <LifeBuoy className="w-4 h-4 animate-pulse" />
            <span>SOS Portal</span>
          </button>

          {/* Dark / Light Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark / Light Theme"
            className="px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-semibold text-xs transition flex items-center gap-2 shadow-sm outline-none cursor-pointer"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="hidden lg:inline">Light Theme</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-cyan-500" />
                <span className="hidden lg:inline">Dark Theme</span>
              </>
            )}
          </button>

          {/* Gemini AI Assistant Button */}
          <button
            onClick={() => setChatbotOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs transition shadow-glow-cyan flex items-center gap-2 outline-none cursor-pointer"
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span className="hidden sm:inline">AI Advisor</span>
          </button>

          {/* Export NDMA Briefing PDF Button */}
          <button
            onClick={() => setBriefingOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs transition shadow-glow-emerald flex items-center gap-2 outline-none cursor-pointer"
          >
            <FileText className="w-4 h-4 fill-slate-950" />
            <span className="hidden md:inline">NDMA Briefing PDF</span>
          </button>
        </div>
      </header>

      {/* View Switcher: LANDING HOME vs COMMAND CENTER DASHBOARD */}
      {activeTab === 'HOME' ? (
        <LandingPage
          onExploreCommandCenter={() => setActiveTab('COMMAND_CENTER')}
          onOpenSOS={() => {
            setActiveTab('COMMAND_CENTER');
            setCurrentRole('CITIZEN');
          }}
          onOpenAIAdvisor={() => setChatbotOpen(true)}
        />
      ) : (
        <div className="flex-1 flex flex-col">
          {/* Role Switcher Navigation Bar */}
          <RoleSwitcher currentRole={currentRole} onRoleChange={(r) => setCurrentRole(r)} />

          {/* Main Content Area */}
          <div className="flex-1 p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 max-w-[1600px] w-full mx-auto">
            {/* Unified GIS Spatial Map View */}
            <section className="glass-panel p-3.5 sm:p-4 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/60 pb-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan-400 shrink-0" />
                    <h3 className="font-bold text-xs sm:text-sm text-slate-200">
                      Live Spatial GIS Map Engine — PostGIS Inundation & Evacuation Layer
                    </h3>
                  </div>
                  
                  {/* Location Area Badge & Dynamic Region Dropdown */}
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/30">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{activeRegion.name}, {activeRegion.state} ({activeRegion.center[0]}° N, {activeRegion.center[1]}° E)</span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30">
                      <span>Hazard: {activeRegion.disasterType}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Disaster Region Selector Dropdown */}
                  <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-xl text-xs">
                    <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
                    <label htmlFor="region-select" className="text-slate-300 font-bold shrink-0">Region:</label>
                    <select
                      id="region-select"
                      value={selectedRegionKey}
                      onChange={(e) => setSelectedRegionKey(e.target.value)}
                      className="bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer"
                    >
                      <option value="CUTTACK"     className="bg-slate-900 text-white">🌊 Cuttack &amp; Mahanadi Basin (Odisha)</option>
                      <option value="GUWAHATI"    className="bg-slate-900 text-white">🌊 Guwahati &amp; Brahmaputra Valley (Assam)</option>
                      <option value="WAYANAD"     className="bg-slate-900 text-white">⛰️ Wayanad &amp; Western Ghats (Kerala)</option>
                      <option value="UTTARKASHI"  className="bg-slate-900 text-white">⛰️ Uttarkashi &amp; Bhagirathi (Uttarakhand)</option>
                      <option value="SUNDARBANS"  className="bg-slate-900 text-white">🌀 Sundarbans Coastal Delta (West Bengal)</option>
                      <option value="MUMBAI"      className="bg-slate-900 text-white">🌊 Mumbai Urban Coast (Maharashtra)</option>
                      <option value="CHENNAI"     className="bg-slate-900 text-white">🌀 Chennai &amp; Adyar River Basin (Tamil Nadu)</option>
                      <option value="BHUJ"        className="bg-slate-900 text-white">🏚️ Bhuj &amp; Kutch District (Gujarat)</option>
                      <option value="SILCHAR"     className="bg-slate-900 text-white">🌊 Silchar &amp; Barak Valley (Assam)</option>
                      <option value="IMPHAL"      className="bg-slate-900 text-white">⛰️ Imphal &amp; Loktak Lake Zone (Manipur)</option>
                      <option value="SHIMLA"      className="bg-slate-900 text-white">⛰️ Shimla &amp; Satluj Valley (Himachal Pradesh)</option>
                      <option value="VIJAYAWADA"  className="bg-slate-900 text-white">🌀 Vijayawada &amp; Krishna Delta (Andhra Pradesh)</option>
                      <option value="PATNA"       className="bg-slate-900 text-white">🌊 Patna &amp; Ganga-Kosi Flood Plain (Bihar)</option>
                      <option value="JAISALMER"   className="bg-slate-900 text-white">🌡️ Jaisalmer &amp; Thar Desert Zone (Rajasthan)</option>
                      <option value="BENGALURU"   className="bg-slate-900 text-white">🌊 Bengaluru Urban Flood Zone (Karnataka)</option>
                      <option value="GANGTOK"     className="bg-slate-900 text-white">🏔️ Gangtok &amp; Teesta Valley (Sikkim)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Interactive Layer Toggle Controls */}
              <div className="flex flex-wrap items-center gap-2 py-1 overflow-x-auto no-scrollbar">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  GIS Layer Controls:
                </span>
                <button
                  onClick={() => setShowFloodZone(!showFloodZone)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border cursor-pointer outline-none ${
                    showFloodZone ? 'bg-blue-500/20 text-blue-400 border-blue-500/40' : 'bg-slate-900/50 text-slate-500 border-slate-800'
                  }`}
                >
                  {showFloodZone ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  🌊 Flood Zone
                </button>
                <button
                  onClick={() => setShowDangerZone(!showDangerZone)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border cursor-pointer outline-none ${
                    showDangerZone ? 'bg-red-500/20 text-red-400 border-red-500/40' : 'bg-slate-900/50 text-slate-500 border-slate-800'
                  }`}
                >
                  {showDangerZone ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  🔴 Danger Zone
                </button>
                <button
                  onClick={() => setShowFireZone(!showFireZone)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border cursor-pointer outline-none ${
                    showFireZone ? 'bg-orange-500/20 text-orange-400 border-orange-500/40' : 'bg-slate-900/50 text-slate-500 border-slate-800'
                  }`}
                >
                  {showFireZone ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  🔥 Fire Zone
                </button>
                <button
                  onClick={() => setShowEvacuationRoute(!showEvacuationRoute)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border cursor-pointer outline-none ${
                    showEvacuationRoute ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-slate-900/50 text-slate-500 border-slate-800'
                  }`}
                >
                  {showEvacuationRoute ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  ✅ Evacuation Route
                </button>
                <button
                  onClick={() => setShowVictims(!showVictims)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border cursor-pointer outline-none ${
                    showVictims ? 'bg-purple-500/20 text-purple-400 border-purple-500/40' : 'bg-slate-900/50 text-slate-500 border-slate-800'
                  }`}
                >
                  {showVictims ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  🆘 Victims
                </button>
                <button
                  onClick={() => setShowSensors(!showSensors)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border cursor-pointer outline-none ${
                    showSensors ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' : 'bg-slate-900/50 text-slate-500 border-slate-800'
                  }`}
                >
                  {showSensors ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  📡 IoT Sensors
                </button>
                <button
                  onClick={() => setShowShelters(!showShelters)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border cursor-pointer outline-none ${
                    showShelters ? 'bg-teal-500/20 text-teal-400 border-teal-500/40' : 'bg-slate-900/50 text-slate-500 border-slate-800'
                  }`}
                >
                  {showShelters ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  ⛺ Shelters
                </button>
                <button
                  onClick={() => setShowHospitals(!showHospitals)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border cursor-pointer outline-none ${
                    showHospitals ? 'bg-pink-500/20 text-pink-400 border-pink-500/40' : 'bg-slate-900/50 text-slate-500 border-slate-800'
                  }`}
                >
                  {showHospitals ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  🏥 Hospitals
                </button>
                <button
                  onClick={() => setShowAmbulances(!showAmbulances)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border cursor-pointer outline-none ${
                    showAmbulances ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' : 'bg-slate-900/50 text-slate-500 border-slate-800'
                  }`}
                >
                  {showAmbulances ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  🚑 Ambulances
                </button>
                <button
                  onClick={() => setShowFireStations(!showFireStations)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border cursor-pointer outline-none ${
                    showFireStations ? 'bg-orange-500/20 text-orange-400 border-orange-500/40' : 'bg-slate-900/50 text-slate-500 border-slate-800'
                  }`}
                >
                  {showFireStations ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  🚒 Fire Stations
                </button>
                <button
                  onClick={() => setShowDrones(!showDrones)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border cursor-pointer outline-none ${
                    showDrones ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40' : 'bg-slate-900/50 text-slate-500 border-slate-800'
                  }`}
                >
                  {showDrones ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  🚁 Drones
                </button>
                <button
                  onClick={() => setShowHeatmap(!showHeatmap)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border cursor-pointer outline-none ${
                    showHeatmap ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' : 'bg-slate-900/50 text-slate-500 border-slate-800'
                  }`}
                >
                  {showHeatmap ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  🔥 Heatmap
                </button>
              </div>

              {/* GIS Map Container with Dynamic Theme & Region Props */}
              <div className="w-full h-[360px] sm:h-[480px]">
                <GISMap
                  theme={theme}
                  selectedRegionKey={selectedRegionKey}
                  showFloodZone={showFloodZone}
                  showDangerZone={showDangerZone}
                  showFireZone={showFireZone}
                  showEvacuationRoute={showEvacuationRoute}
                  showVictims={showVictims}
                  showSensors={showSensors}
                  showShelters={showShelters}
                  showHospitals={showHospitals}
                  showAmbulances={showAmbulances}
                  showFireStations={showFireStations}
                  showDrones={showDrones}
                  showHeatmap={showHeatmap}
                />
              </div>
            </section>

            {/* Dynamic Role-Specific Dashboard Terminal */}
            <section className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-extrabold text-xs sm:text-sm text-white uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-glow-cyan"></span>
                  {currentRole.replace(/_/g, ' ')} Terminal Workspace — {activeRegion.name} ({activeRegion.state})
                </h3>
                <span className="text-[11px] sm:text-xs text-slate-400 font-mono bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                  Role: {currentRole}
                </span>
              </div>

              {renderDashboardByRole()}
            </section>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="glass-panel border-t border-slate-800 py-3.5 px-4 sm:px-6 text-center text-[11px] sm:text-xs text-slate-400 font-medium mt-auto">
        ResQ-AI Platform v2.0.0 • Government of India • Powered by Next.js 14, FastAPI, PostGIS, YOLOv11 & Gemini 2.5 Flash
      </footer>

      {/* Gemini Chatbot Modal */}
      <AIChatbotModal isOpen={chatbotOpen} onClose={() => setChatbotOpen(false)} />

      {/* NDMA Daily Situation Report Exporter Modal */}
      <NDMABriefingModal
        isOpen={briefingOpen}
        onClose={() => setBriefingOpen(false)}
        regionName={activeRegion.name}
        stateName={activeRegion.state}
      />
    </main>
  );
}
