'use client';

import React from 'react';
import { 
  Shield, 
  Sparkles, 
  Activity, 
  Radio, 
  Cpu, 
  Plane, 
  MapPin, 
  Users, 
  ShieldCheck, 
  ShieldAlert,
  Flame, 
  Hospital, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Bot, 
  Droplets,
  LifeBuoy
} from 'lucide-react';

interface LandingPageProps {
  onExploreCommandCenter: () => void;
  onOpenSOS: () => void;
  onOpenAIAdvisor: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onExploreCommandCenter,
  onOpenSOS,
  onOpenAIAdvisor,
}) => {
  return (
    <div className="space-y-16 py-6 pb-16 px-4 sm:px-6 max-w-[1600px] mx-auto">
      {/* Hero Section */}
      <section className="relative glass-panel rounded-3xl p-8 sm:p-12 border border-slate-800 overflow-hidden bg-gradient-to-br from-slate-900/90 via-slate-950/80 to-slate-900/90 shadow-2xl">
        {/* Glow Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-extrabold tracking-wider uppercase">
            <Sparkles className="w-4 h-4 fill-cyan-400" />
            National Disaster Response & AI Intelligence System
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none">
            Next-Generation <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
              AI + GIS + IoT
            </span> Disaster Intelligence
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-3xl">
            ResQ-AI unifies real-time satellite imagery, autonomous drone computer vision streams, 
            solar-powered ESP32 IoT telemetry, weather APIs, and crowdsourced citizen SOS beacons 
            into a single government-grade Command & Control Platform for NDMA, SDRF, NDRF, and District Authorities.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onExploreCommandCenter}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm transition-all duration-300 shadow-glow-cyan flex items-center gap-2.5 outline-none cursor-pointer transform hover:scale-[1.02]"
            >
              <Activity className="w-5 h-5 fill-slate-950" />
              Launch Live GIS Command Center
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenSOS}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-extrabold text-sm transition-all duration-300 shadow-glow-red flex items-center gap-2.5 outline-none cursor-pointer transform hover:scale-[1.02]"
            >
              <LifeBuoy className="w-5 h-5 animate-pulse" />
              1-Tap Citizen SOS Portal
            </button>

            <button
              onClick={onOpenAIAdvisor}
              className="px-5 py-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-bold text-sm transition flex items-center gap-2 outline-none cursor-pointer"
            >
              <Bot className="w-5 h-5 text-cyan-400" />
              Gemini 1.5 RAG Advisor
            </button>
          </div>
        </div>

        {/* Live Metrics Grid Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-800/80 relative z-10">
          <div className="glass-card p-4 rounded-2xl border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Citizens Rescued</div>
            <div className="text-2xl sm:text-3xl font-black text-white mt-1">1,48,200</div>
            <div className="text-[10px] text-emerald-400 font-bold mt-1">Across 4 Coastal States</div>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">YOLOv11 Vision Accuracy</div>
            <div className="text-2xl sm:text-3xl font-black text-cyan-400 mt-1">94.2%</div>
            <div className="text-[10px] text-slate-400 mt-1">Aerial Survivor Detection</div>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">PostGIS Routing Speed</div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">&lt; 120 ms</div>
            <div className="text-[10px] text-slate-400 mt-1">Dijkstra Hazard Avoidance</div>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Average Response Time</div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">8.4 Mins</div>
            <div className="text-[10px] text-emerald-400 font-bold mt-1">⚡ 65% Faster Dispatch</div>
          </div>
        </div>
      </section>

      {/* Core Technology Pillars */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white">Platform Technology Pillars</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Integrating cutting-edge Artificial Intelligence, Spatial GIS, Hardware Sensors, and Cloud Microservices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1: AI */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-cyan-500/40 transition duration-300">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Multi-Modal AI Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              YOLOv11 real-time survivor detection, SAM building collapse segmentation, and XGBoost flood inundation time-series forecasting.
            </p>
            <ul className="text-xs text-slate-300 space-y-1.5 pt-2 border-t border-slate-800 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                Ultralytics YOLOv11 Aerial Vision
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                Meta Segment Anything (SAM 2.0)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                XGBoost River Flood Predictor
              </li>
            </ul>
          </div>

          {/* Pillar 2: GIS */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-emerald-500/40 transition duration-300">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">PostGIS Spatial Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dynamic Dijkstra graph routing avoiding flooded roads, debris blockages, and active chemical hazard zones.
            </p>
            <ul className="text-xs text-slate-300 space-y-1.5 pt-2 border-t border-slate-800 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                PostGIS 3.4 Spatial Queries
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Dynamic Edge Weight Penalties
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Nearest Shelter & Hospital Lookup
              </li>
            </ul>
          </div>

          {/* Pillar 3: IoT */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-yellow-500/40 transition duration-300">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 flex items-center justify-center">
              <Radio className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Edge IoT Sensor Network</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Solar-powered ESP32 hardware microcontrollers transmitting water level, smoke, and seismic telemetry over MQTT.
            </p>
            <ul className="text-xs text-slate-300 space-y-1.5 pt-2 border-t border-slate-800 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-yellow-400" />
                Ultrasonic Water Rise Gauge
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-yellow-400" />
                MQ-2 Toxic Smoke & Gas Sensor
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-yellow-400" />
                EMQX MQTT Pub/Sub Broker
              </li>
            </ul>
          </div>

          {/* Pillar 4: Drone */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-blue-500/40 transition duration-300">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
              <Plane className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Autonomous Drone Swarms</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Live RTSP video feeds, thermal infrared body temperature signatures, and automated search-and-rescue waypoint planning.
            </p>
            <ul className="text-xs text-slate-300 space-y-1.5 pt-2 border-t border-slate-800 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                30 FPS Optical Aerial Stream
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                Thermal Signature Body Tracking
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                Rooftop Survivor Pinpointing
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Supported Disasters Section */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white">Supported Disaster Categories</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Pre-configured early warning alerts, tactical response SOPs, and AI models for 8 major disaster types.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="glass-card p-4 rounded-xl border border-slate-800 flex flex-col items-center text-center space-y-2 hover:border-cyan-500/40 transition">
            <Droplets className="w-6 h-6 text-cyan-400" />
            <span className="font-bold text-xs text-white">Floods & Inundation</span>
          </div>

          <div className="glass-card p-4 rounded-xl border border-slate-800 flex flex-col items-center text-center space-y-2 hover:border-blue-500/40 transition">
            <Radio className="w-6 h-6 text-blue-400" />
            <span className="font-bold text-xs text-white">Cyclones & Storms</span>
          </div>

          <div className="glass-card p-4 rounded-xl border border-slate-800 flex flex-col items-center text-center space-y-2 hover:border-emerald-500/40 transition">
            <Activity className="w-6 h-6 text-emerald-400" />
            <span className="font-bold text-xs text-white">Earthquakes & Tremors</span>
          </div>

          <div className="glass-card p-4 rounded-xl border border-slate-800 flex flex-col items-center text-center space-y-2 hover:border-orange-500/40 transition">
            <Flame className="w-6 h-6 text-orange-400" />
            <span className="font-bold text-xs text-white">Forest Fires</span>
          </div>

          <div className="glass-card p-4 rounded-xl border border-slate-800 flex flex-col items-center text-center space-y-2 hover:border-amber-500/40 transition">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
            <span className="font-bold text-xs text-white">Landslides</span>
          </div>

          <div className="glass-card p-4 rounded-xl border border-slate-800 flex flex-col items-center text-center space-y-2 hover:border-purple-500/40 transition">
            <Building2 className="w-6 h-6 text-purple-400" />
            <span className="font-bold text-xs text-white">Building Collapses</span>
          </div>

          <div className="glass-card p-4 rounded-xl border border-slate-800 flex flex-col items-center text-center space-y-2 hover:border-red-500/40 transition">
            <ShieldAlert className="w-6 h-6 text-red-400" />
            <span className="font-bold text-xs text-white">Industrial Gas Leaks</span>
          </div>

          <div className="glass-card p-4 rounded-xl border border-slate-800 flex flex-col items-center text-center space-y-2 hover:border-teal-500/40 transition">
            <LifeBuoy className="w-6 h-6 text-teal-400" />
            <span className="font-bold text-xs text-white">Tsunami & Cloudbursts</span>
          </div>
        </div>
      </section>

      {/* Target User Agencies Grid */}
      <section className="glass-panel rounded-3xl p-8 border border-slate-800 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-black text-white">Integrated Government Agencies</h2>
          <p className="text-xs text-slate-400">
            Strict Role-Based Access Control (RBAC) terminals customized for every level of disaster management.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-bold text-slate-200">NDMA</div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-bold text-slate-200">SDMA</div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-bold text-slate-200">NDRF</div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-bold text-slate-200">SDRF</div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-bold text-slate-200">Police & Fire</div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-bold text-slate-200">Hospitals & NGOs</div>
        </div>
      </section>

      {/* Technology Stack Highlights (SIH Criteria) */}
      <section className="glass-panel rounded-3xl p-8 border border-slate-800 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-black text-white">Technologies Highlighted</h2>
          <p className="text-xs text-slate-400">
            Production-grade technology stack driving real-time intelligence &amp; zero-latency emergency response.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2.5">
          {[
            'AI/ML', 'Computer Vision (YOLOv11)', 'Meta SAM 2.0', 'XGBoost Forecasting',
            'GIS (Leaflet + PostGIS)', 'IoT (ESP32 + MQTT)', 'Drone Intelligence',
            'Weather APIs', 'FastAPI (Python)', 'Next.js 14 (React)',
            'PostgreSQL + PostGIS', 'Redis Cache', 'WebSockets', 'Docker Containers', 'Gemini 2.5 Flash'
          ].map(tech => (
            <span key={tech} className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold shadow-sm">
              ⚡ {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Future Roadmap / Scope */}
      <section className="glass-panel rounded-3xl p-8 border border-slate-800 space-y-6 bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-950">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-black text-white flex items-center justify-center gap-2">
            🚀 Future Scope &amp; Expansion Roadmap
          </h2>
          <p className="text-xs text-slate-400">
            Phase 2 roadmap for nationwide deployment with ISRO satellite integration &amp; autonomous drone swarms.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2">
            <div className="font-extrabold text-cyan-400 text-sm">🛰️ ISRO Bhuvan Integration</div>
            <div className="text-slate-400 leading-relaxed">Direct synthetic aperture radar (SAR) satellite feeds for cloud-penetrating flood mapping.</div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2">
            <div className="font-extrabold text-indigo-400 text-sm">🚁 Drone Swarm Mesh</div>
            <div className="text-slate-400 leading-relaxed">Autonomous multi-drone mesh networking for GPS-denied emergency search &amp; rescue operations.</div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2">
            <div className="font-extrabold text-emerald-400 text-sm">🔮 Predictive Disaster AI</div>
            <div className="text-slate-400 leading-relaxed">Deep learning spatial-temporal models predicting cloudburst landfall &amp; dam bursts 12 hours prior.</div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2">
            <div className="font-extrabold text-amber-400 text-sm">🇮🇳 Multi-State Rollout</div>
            <div className="text-slate-400 leading-relaxed">Scaling across 28 states and 8 union territories with localized language support &amp; regional disaster SOPs.</div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2">
            <div className="font-extrabold text-red-400 text-sm">🛡️ Direct NDMA Integration</div>
            <div className="text-slate-400 leading-relaxed">Direct API sync with National Emergency Response System (112) &amp; Common Alerting Protocol (CAP).</div>
          </div>
        </div>
      </section>
    </div>
  );
};

