'use client';

import React, { useState, useRef, useEffect } from 'react';
import { AlertTriangle, Phone, MapPin, Camera, Video, Mic, Send, CheckCircle, Clock, FileText, Wifi } from 'lucide-react';

const EMERGENCY_NUMBERS = [
  { label: 'NDRF', num: '011-24363260', color: 'text-red-400' },
  { label: 'Ambulance', num: '108', color: 'text-pink-400' },
  { label: 'Police', num: '100', color: 'text-blue-400' },
  { label: 'Fire', num: '101', color: 'text-orange-400' },
  { label: 'State Control', num: '1070', color: 'text-cyan-400' },
  { label: 'NDMA Helpline', num: '1078', color: 'text-emerald-400' },
];

const MY_REPORTS = [
  { id: 'INC-2847', type: 'Flood', location: 'Sector 11, Mahanadi Bank', time: '2 hours ago', status: 'Verified', statusColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' },
  { id: 'INC-2831', type: 'Medical Emergency', location: 'Jobra Barrage Road', time: '5 hours ago', status: 'Under Review', statusColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40' },
  { id: 'INC-2812', type: 'Road Blocked', location: 'Link Road Bridge', time: '8 hours ago', status: 'Resolved', statusColor: 'bg-slate-500/20 text-slate-400 border-slate-500/40' },
];

interface CitizenPortalProps {
  regionName?: string;
  stateName?: string;
}

export const CitizenPortal: React.FC<CitizenPortalProps> = ({
  regionName = 'Chennai & Adyar River Basin',
  stateName = 'Tamil Nadu'
}) => {
  const [sosStage, setSosStage] = useState<'idle' | 'countdown' | 'sent'>('idle');
  const [countdown, setCountdown] = useState(3);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [videoName, setVideoName] = useState<string | null>(null);
  const [voiceStage, setVoiceStage] = useState<'idle' | 'recording' | 'recorded'>('idle');
  const [voiceTimer, setVoiceTimer] = useState(0);
  const [incidentType, setIncidentType] = useState('Flood');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [gps] = useState({ lat: 13.0827, lng: 80.2707, area: 'Chennai, Tamil Nadu' });
  const voiceIntervalRef = useRef<any>(null);
  const sosIntervalRef = useRef<any>(null);

  const triggerSOS = () => {
    if (sosStage !== 'idle') return;
    setSosStage('countdown');
    setCountdown(3);
    let c = 3;
    sosIntervalRef.current = setInterval(() => {
      c--;
      setCountdown(c);
      if (c <= 0) {
        clearInterval(sosIntervalRef.current);
        setSosStage('sent');
      }
    }, 1000);
  };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setVideoName(file.name);
  };

  const toggleVoice = () => {
    if (voiceStage === 'idle') {
      setVoiceStage('recording');
      setVoiceTimer(0);
      voiceIntervalRef.current = setInterval(() => setVoiceTimer(t => t + 1), 1000);
    } else if (voiceStage === 'recording') {
      clearInterval(voiceIntervalRef.current);
      setVoiceStage('recorded');
    }
  };

  const handleSubmit = () => {
    if (!description.trim()) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setDescription('');
    setPhotoPreview(null);
    setVideoName(null);
    setVoiceStage('idle');
  };

  useEffect(() => () => {
    clearInterval(voiceIntervalRef.current);
    clearInterval(sosIntervalRef.current);
  }, []);

  return (
    <div className="space-y-5">
      {/* GPS Status */}
      <div className="flex items-center gap-2 text-xs text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-3 py-2 rounded-xl w-fit">
        <Wifi className="w-3.5 h-3.5 animate-pulse" />
        <MapPin className="w-3.5 h-3.5" />
        <span className="font-bold">GPS Active: {gps.lat}° N, {gps.lng}° E — {gps.area}</span>
      </div>

      {/* SOS Button Section */}
      <div className="glass-card border border-red-500/30 rounded-2xl p-5 text-center space-y-4">
        <h3 className="font-extrabold text-white text-sm uppercase tracking-wider flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400" /> Emergency SOS
        </h3>

        {sosStage === 'idle' && (
          <button
            onClick={triggerSOS}
            className="w-40 h-40 rounded-full mx-auto flex flex-col items-center justify-center bg-red-600 hover:bg-red-500 text-white font-black text-2xl shadow-[0_0_60px_rgba(239,68,68,0.6)] transition-all duration-300 pulse-alert cursor-pointer outline-none border-4 border-red-400"
          >
            <span className="text-4xl">🆘</span>
            <span className="text-base mt-1">SOS</span>
          </button>
        )}

        {sosStage === 'countdown' && (
          <div className="w-40 h-40 rounded-full mx-auto flex flex-col items-center justify-center bg-red-700 border-4 border-red-400 shadow-[0_0_60px_rgba(239,68,68,0.7)]">
            <span className="text-6xl font-black text-white">{countdown}</span>
            <span className="text-xs text-red-200 mt-1">Sending SOS...</span>
          </div>
        )}

        {sosStage === 'sent' && (
          <div className="bg-emerald-500/15 border border-emerald-500/40 rounded-2xl p-5 space-y-2">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
            <p className="text-emerald-300 font-extrabold text-base">🎉 SOS Sent Successfully!</p>
            <p className="text-slate-300 text-xs">NDRF Team Dispatched · ETA: <span className="text-emerald-400 font-bold">8 minutes</span></p>
            <p className="text-slate-400 text-[11px]">GPS Coordinates Shared: {gps.lat}° N, {gps.lng}° E</p>
            <p className="text-slate-400 text-[11px]">Reference ID: <span className="font-mono text-cyan-400">SOS-{Math.floor(Math.random() * 9000) + 1000}</span></p>
            <button onClick={() => setSosStage('idle')} className="mt-2 text-[11px] text-slate-400 underline cursor-pointer">Reset</button>
          </div>
        )}

        {sosStage === 'idle' && (
          <p className="text-xs text-slate-400">Tap SOS — Sends GPS location to NDRF Command Center instantly</p>
        )}
      </div>

      {/* Incident Report Form */}
      <div className="glass-card border border-slate-700 rounded-2xl p-5 space-y-4">
        <h3 className="font-extrabold text-white text-sm uppercase tracking-wider flex items-center gap-2">
          <FileText className="w-4 h-4 text-cyan-400" /> Report Incident
        </h3>

        {submitted && (
          <div className="bg-emerald-500/15 border border-emerald-500/40 rounded-xl p-3 flex items-center gap-2 text-emerald-400 text-sm font-bold">
            <CheckCircle className="w-4 h-4" /> Incident reported successfully! Reference: INC-{Math.floor(Math.random() * 9000) + 1000}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Incident Type */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Incident Type</label>
            <select
              value={incidentType}
              onChange={e => setIncidentType(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              {['Flood', 'Fire', 'Landslide', 'Earthquake', 'Medical Emergency', 'Cyclone', 'Building Collapse', 'Road Blocked'].map(t => (
                <option key={t} value={t} className="bg-slate-900">{t}</option>
              ))}
            </select>
          </div>

          {/* GPS Location */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">📍 GPS Location</label>
            <div className="w-full bg-slate-900 border border-emerald-500/30 rounded-xl px-3 py-2 text-sm text-emerald-400 font-mono flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              {gps.lat}° N, {gps.lng}° E
            </div>
          </div>
        </div>

        {/* Upload Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Photo Upload */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">📷 Upload Photo</label>
            <label className="flex flex-col items-center justify-center border border-dashed border-slate-600 rounded-xl p-3 cursor-pointer hover:border-cyan-500 transition text-slate-400 text-xs gap-1">
              {photoPreview
                ? <img src={photoPreview} alt="preview" className="w-full h-20 object-cover rounded-lg" />
                : <><Camera className="w-6 h-6" /><span>Choose Photo</span></>}
              <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
            </label>
          </div>

          {/* Video Upload */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">🎥 Upload Video</label>
            <label className="flex flex-col items-center justify-center border border-dashed border-slate-600 rounded-xl p-3 cursor-pointer hover:border-cyan-500 transition text-slate-400 text-xs gap-1 h-full">
              <Video className="w-6 h-6" />
              <span className="text-center">{videoName || 'Choose Video'}</span>
              <input type="file" accept="video/*" className="hidden" onChange={handleVideo} />
            </label>
          </div>

          {/* Voice Note */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">🎤 Voice Note</label>
            <button
              onClick={toggleVoice}
              className={`w-full h-full min-h-[72px] flex flex-col items-center justify-center border border-dashed rounded-xl p-3 transition text-xs gap-1 cursor-pointer outline-none ${
                voiceStage === 'recording'
                  ? 'border-red-500 text-red-400 bg-red-500/10'
                  : voiceStage === 'recorded'
                  ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10'
                  : 'border-slate-600 text-slate-400 hover:border-cyan-500'
              }`}
            >
              <Mic className={`w-6 h-6 ${voiceStage === 'recording' ? 'animate-pulse' : ''}`} />
              {voiceStage === 'idle' && <span>Record Voice</span>}
              {voiceStage === 'recording' && <span>Recording... 00:{String(voiceTimer).padStart(2,'0')}</span>}
              {voiceStage === 'recorded' && <span>✅ Voice Recorded</span>}
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Describe Incident</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Describe what you see — water level, number of people trapped, injuries, etc..."
            rows={3}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 transition shadow-glow-cyan cursor-pointer outline-none"
        >
          <Send className="w-4 h-4" /> Submit Incident Report
        </button>
      </div>

      {/* My Reports */}
      <div className="glass-card border border-slate-700 rounded-2xl p-4 space-y-3">
        <h3 className="font-extrabold text-white text-sm uppercase tracking-wider flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-400" /> My Submitted Reports
        </h3>
        <div className="space-y-2">
          {MY_REPORTS.map(r => (
            <div key={r.id} className="flex items-center justify-between bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                  <span className="font-mono text-cyan-400">{r.id}</span>
                  <span>{r.type}</span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />{r.location} · {r.time}
                </div>
              </div>
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${r.statusColor}`}>{r.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Numbers */}
      <div className="glass-card border border-slate-700 rounded-2xl p-4">
        <h3 className="font-extrabold text-white text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 text-red-400" /> Emergency Helplines
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {EMERGENCY_NUMBERS.map(e => (
            <a key={e.label} href={`tel:${e.num}`} className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 hover:border-slate-600 px-3 py-2 rounded-xl transition cursor-pointer">
              <Phone className={`w-3.5 h-3.5 shrink-0 ${e.color}`} />
              <div>
                <div className="text-[11px] font-bold text-slate-300">{e.label}</div>
                <div className={`text-xs font-mono font-extrabold ${e.color}`}>{e.num}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
