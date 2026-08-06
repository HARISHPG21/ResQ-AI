'use client';

import React, { useEffect, useState } from 'react';

export interface RegionData {
  id: string;
  name: string;
  state: string;
  disasterType: string;
  center: [number, number];
  zoom: number;
  floodPolygon: [number, number][];
  firePolygon?: [number, number][];
  evacuationLine: [number, number][];
  victimCoords: [number, number][];
  sensorCoords: [number, number][];
  shelterCoords: [number, number][];
  hospitalCoords: [number, number][];
  ambulanceCoords: [number, number][];
  fireStationCoords: [number, number][];
  droneCoords: [number, number][];
  dangerZone: [number, number][];
}

export const REGIONS: Record<string, RegionData> = {
  CUTTACK: {
    id: 'CUTTACK',
    name: 'Cuttack & Mahanadi Basin',
    state: 'Odisha',
    disasterType: 'River Flood Inundation',
    center: [20.4650, 85.8750],
    zoom: 13,
    floodPolygon: [[20.468,85.880],[20.475,85.880],[20.475,85.890],[20.468,85.890]],
    dangerZone: [[20.471,85.883],[20.474,85.883],[20.474,85.887],[20.471,85.887]],
    evacuationLine: [[20.470,85.885],[20.467,85.881],[20.463,85.875],[20.460,85.870]],
    victimCoords: [[20.4700,85.8850],[20.4720,85.8870]],
    sensorCoords: [[20.4710,85.8860],[20.4690,85.8830]],
    shelterCoords: [[20.4600,85.8700],[20.4580,85.8680]],
    hospitalCoords: [[20.4680,85.8750]],
    ambulanceCoords: [[20.4640,85.8720],[20.4620,85.8740]],
    fireStationCoords: [[20.4650,85.8760]],
    droneCoords: [[20.4730,85.8880],[20.4700,85.8820]],
  },
  GUWAHATI: {
    id: 'GUWAHATI',
    name: 'Guwahati & Brahmaputra Valley',
    state: 'Assam',
    disasterType: 'Severe Monsoon Inundation',
    center: [26.1445, 91.7362],
    zoom: 13,
    floodPolygon: [[26.150,91.740],[26.160,91.740],[26.160,91.755],[26.150,91.755]],
    dangerZone: [[26.153,91.743],[26.158,91.743],[26.158,91.750],[26.153,91.750]],
    evacuationLine: [[26.152,91.742],[26.148,91.739],[26.144,91.735]],
    victimCoords: [[26.1520,91.7420]],
    sensorCoords: [[26.1550,91.7450]],
    shelterCoords: [[26.1400,91.7300]],
    hospitalCoords: [[26.1460,91.7380]],
    ambulanceCoords: [[26.1430,91.7320]],
    fireStationCoords: [[26.1470,91.7390]],
    droneCoords: [[26.1560,91.7460]],
  },
  WAYANAD: {
    id: 'WAYANAD',
    name: 'Wayanad & Western Ghats',
    state: 'Kerala',
    disasterType: 'Landslide & Debris Flow',
    center: [11.6854, 76.1320],
    zoom: 13,
    floodPolygon: [[11.690,76.135],[11.700,76.135],[11.700,76.145],[11.690,76.145]],
    firePolygon: [[11.685,76.128],[11.688,76.128],[11.688,76.131],[11.685,76.131]],
    dangerZone: [[11.692,76.137],[11.698,76.137],[11.698,76.143],[11.692,76.143]],
    evacuationLine: [[11.692,76.137],[11.688,76.134],[11.684,76.130]],
    victimCoords: [[11.6920,76.1370]],
    sensorCoords: [[11.6950,76.1400]],
    shelterCoords: [[11.6800,76.1250]],
    hospitalCoords: [[11.6860,76.1310]],
    ambulanceCoords: [[11.6820,76.1260]],
    fireStationCoords: [[11.6870,76.1320]],
    droneCoords: [[11.6960,76.1410]],
  },
  UTTARKASHI: {
    id: 'UTTARKASHI',
    name: 'Uttarkashi & Bhagirathi Valley',
    state: 'Uttarakhand',
    disasterType: 'Cloudburst & Flash Flood',
    center: [30.7268, 78.4354],
    zoom: 13,
    floodPolygon: [[30.730,78.440],[30.740,78.440],[30.740,78.450],[30.730,78.450]],
    dangerZone: [[30.732,78.442],[30.738,78.442],[30.738,78.448],[30.732,78.448]],
    evacuationLine: [[30.732,78.442],[30.728,78.438],[30.724,78.434]],
    victimCoords: [[30.7320,78.4420]],
    sensorCoords: [[30.7350,78.4450]],
    shelterCoords: [[30.7200,78.4300]],
    hospitalCoords: [[30.7260,78.4360]],
    ambulanceCoords: [[30.7220,78.4310]],
    fireStationCoords: [[30.7270,78.4370]],
    droneCoords: [[30.7360,78.4460]],
  },
  SUNDARBANS: {
    id: 'SUNDARBANS',
    name: 'Sundarbans Coastal Delta',
    state: 'West Bengal',
    disasterType: 'Cyclone & Storm Surge',
    center: [21.9497, 89.1833],
    zoom: 12,
    floodPolygon: [[21.955,89.190],[21.965,89.190],[21.965,89.205],[21.955,89.205]],
    dangerZone: [[21.957,89.192],[21.963,89.192],[21.963,89.202],[21.957,89.202]],
    evacuationLine: [[21.957,89.192],[21.952,89.187],[21.948,89.182]],
    victimCoords: [[21.9570,89.1920]],
    sensorCoords: [[21.9600,89.1950]],
    shelterCoords: [[21.9450,89.1780]],
    hospitalCoords: [[21.9500,89.1840]],
    ambulanceCoords: [[21.9460,89.1790]],
    fireStationCoords: [[21.9510,89.1850]],
    droneCoords: [[21.9610,89.1960]],
  },
  CHENNAI: {
    id: 'CHENNAI',
    name: 'Chennai & Adyar River Basin',
    state: 'Tamil Nadu',
    disasterType: 'Cyclonic Flood & Urban Inundation',
    center: [13.0827, 80.2707],
    zoom: 13,
    floodPolygon: [[13.088,80.275],[13.098,80.275],[13.098,80.290],[13.088,80.290]],
    dangerZone: [[13.090,80.277],[13.096,80.277],[13.096,80.287],[13.090,80.287]],
    evacuationLine: [[13.090,80.277],[13.086,80.272],[13.082,80.267],[13.078,80.262]],
    victimCoords: [[13.0900,80.2780],[13.0920,80.2800]],
    sensorCoords: [[13.0910,80.2790]],
    shelterCoords: [[13.0760,80.2600]],
    hospitalCoords: [[13.0820,80.2680]],
    ambulanceCoords: [[13.0780,80.2620]],
    fireStationCoords: [[13.0830,80.2700]],
    droneCoords: [[13.0950,80.2830],[13.0870,80.2750]],
  },
  BHUJ: {
    id: 'BHUJ',
    name: 'Bhuj & Kutch District',
    state: 'Gujarat',
    disasterType: 'Earthquake (Seismic Zone V)',
    center: [23.2420, 69.6699],
    zoom: 13,
    floodPolygon: [[23.248,69.675],[23.258,69.675],[23.258,69.685],[23.248,69.685]],
    dangerZone: [[23.250,69.677],[23.256,69.677],[23.256,69.683],[23.250,69.683]],
    evacuationLine: [[23.250,69.677],[23.246,69.673],[23.242,69.669],[23.238,69.665]],
    victimCoords: [[23.2500,69.6780],[23.2530,69.6800]],
    sensorCoords: [[23.2510,69.6790]],
    shelterCoords: [[23.2360,69.6600]],
    hospitalCoords: [[23.2400,69.6650]],
    ambulanceCoords: [[23.2370,69.6620]],
    fireStationCoords: [[23.2420,69.6680]],
    droneCoords: [[23.2560,69.6820],[23.2480,69.6740]],
  },
  SILCHAR: {
    id: 'SILCHAR',
    name: 'Silchar & Barak Valley',
    state: 'Assam',
    disasterType: 'River Flood & Landslide',
    center: [24.8333, 92.7789],
    zoom: 13,
    floodPolygon: [[24.838,92.782],[24.848,92.782],[24.848,92.794],[24.838,92.794]],
    dangerZone: [[24.840,92.784],[24.846,92.784],[24.846,92.792],[24.840,92.792]],
    evacuationLine: [[24.840,92.784],[24.836,92.780],[24.832,92.776]],
    victimCoords: [[24.8400,92.7850]],
    sensorCoords: [[24.8430,92.7870]],
    shelterCoords: [[24.8280,92.7720]],
    hospitalCoords: [[24.8310,92.7750]],
    ambulanceCoords: [[24.8290,92.7730]],
    fireStationCoords: [[24.8330,92.7770]],
    droneCoords: [[24.8460,92.7900]],
  },
  IMPHAL: {
    id: 'IMPHAL',
    name: 'Imphal & Loktak Lake Zone',
    state: 'Manipur',
    disasterType: 'Flash Flood & Landslide',
    center: [24.8170, 93.9368],
    zoom: 13,
    floodPolygon: [[24.822,93.940],[24.832,93.940],[24.832,93.952],[24.822,93.952]],
    dangerZone: [[24.824,93.942],[24.830,93.942],[24.830,93.950],[24.824,93.950]],
    evacuationLine: [[24.824,93.942],[24.820,93.938],[24.816,93.934]],
    victimCoords: [[24.8250,93.9430]],
    sensorCoords: [[24.8280,93.9460]],
    shelterCoords: [[24.8120,93.9280]],
    hospitalCoords: [[24.8150,93.9310]],
    ambulanceCoords: [[24.8130,93.9290]],
    fireStationCoords: [[24.8170,93.9340]],
    droneCoords: [[24.8310,93.9490]],
  },
  SHIMLA: {
    id: 'SHIMLA',
    name: 'Shimla & Satluj Valley',
    state: 'Himachal Pradesh',
    disasterType: 'Cloudburst & Mountain Landslide',
    center: [31.1048, 77.1734],
    zoom: 13,
    floodPolygon: [[31.109,77.177],[31.119,77.177],[31.119,77.189],[31.109,77.189]],
    firePolygon: [[31.106,77.171],[31.109,77.171],[31.109,77.175],[31.106,77.175]],
    dangerZone: [[31.111,77.179],[31.117,77.179],[31.117,77.187],[31.111,77.187]],
    evacuationLine: [[31.111,77.179],[31.107,77.175],[31.103,77.171]],
    victimCoords: [[31.1120,77.1800]],
    sensorCoords: [[31.1150,77.1830]],
    shelterCoords: [[31.1000,77.1660]],
    hospitalCoords: [[31.1030,77.1690]],
    ambulanceCoords: [[31.1010,77.1670]],
    fireStationCoords: [[31.1050,77.1710]],
    droneCoords: [[31.1180,77.1860]],
  },
  VIJAYAWADA: {
    id: 'VIJAYAWADA',
    name: 'Vijayawada & Krishna Delta',
    state: 'Andhra Pradesh',
    disasterType: 'Cyclone & Krishna River Flood',
    center: [16.5062, 80.6480],
    zoom: 13,
    floodPolygon: [[16.510,80.651],[16.520,80.651],[16.520,80.663],[16.510,80.663]],
    dangerZone: [[16.512,80.653],[16.518,80.653],[16.518,80.661],[16.512,80.661]],
    evacuationLine: [[16.512,80.653],[16.508,80.649],[16.504,80.645],[16.500,80.641]],
    victimCoords: [[16.5130,80.6540],[16.5160,80.6570]],
    sensorCoords: [[16.5150,80.6560]],
    shelterCoords: [[16.4980,80.6380]],
    hospitalCoords: [[16.5020,80.6420]],
    ambulanceCoords: [[16.4990,80.6390]],
    fireStationCoords: [[16.5040,80.6440]],
    droneCoords: [[16.5200,80.6640],[16.5100,80.6510]],
  },
  PATNA: {
    id: 'PATNA',
    name: 'Patna & Ganga-Kosi Flood Plain',
    state: 'Bihar',
    disasterType: 'Ganga River Flood & Embankment Breach',
    center: [25.5941, 85.1376],
    zoom: 13,
    floodPolygon: [[25.598,85.140],[25.608,85.140],[25.608,85.153],[25.598,85.153]],
    dangerZone: [[25.600,85.142],[25.606,85.142],[25.606,85.151],[25.600,85.151]],
    evacuationLine: [[25.600,85.142],[25.596,85.138],[25.592,85.134],[25.588,85.130]],
    victimCoords: [[25.6010,85.1430],[25.6040,85.1460]],
    sensorCoords: [[25.6030,85.1450]],
    shelterCoords: [[25.5860,85.1280]],
    hospitalCoords: [[25.5900,85.1320]],
    ambulanceCoords: [[25.5870,85.1290]],
    fireStationCoords: [[25.5920,85.1340]],
    droneCoords: [[25.6070,85.1500],[25.5990,85.1410]],
  },
  JAISALMER: {
    id: 'JAISALMER',
    name: 'Jaisalmer & Thar Desert Zone',
    state: 'Rajasthan',
    disasterType: 'Extreme Heatwave & Dust Storm',
    center: [26.9157, 70.9083],
    zoom: 13,
    floodPolygon: [[26.919,70.911],[26.929,70.911],[26.929,70.921],[26.919,70.921]],
    firePolygon: [[26.912,70.905],[26.916,70.905],[26.916,70.909],[26.912,70.909]],
    dangerZone: [[26.921,70.913],[26.927,70.913],[26.927,70.919],[26.921,70.919]],
    evacuationLine: [[26.921,70.913],[26.917,70.909],[26.913,70.905]],
    victimCoords: [[26.9220,70.9140]],
    sensorCoords: [[26.9250,70.9170]],
    shelterCoords: [[26.9110,70.9030]],
    hospitalCoords: [[26.9140,70.9060]],
    ambulanceCoords: [[26.9120,70.9040]],
    fireStationCoords: [[26.9160,70.9080]],
    droneCoords: [[26.9270,70.9190]],
  },
  BENGALURU: {
    id: 'BENGALURU',
    name: 'Bengaluru Urban Flood Zone',
    state: 'Karnataka',
    disasterType: 'Urban Flash Flood & Lake Overflow',
    center: [12.9716, 77.5946],
    zoom: 13,
    floodPolygon: [[12.975,77.598],[12.985,77.598],[12.985,77.610],[12.975,77.610]],
    dangerZone: [[12.977,77.600],[12.983,77.600],[12.983,77.608],[12.977,77.608]],
    evacuationLine: [[12.977,77.600],[12.973,77.596],[12.969,77.592],[12.965,77.588]],
    victimCoords: [[12.9780,77.6010],[12.9810,77.6040]],
    sensorCoords: [[12.9800,77.6030]],
    shelterCoords: [[12.9630,77.5860]],
    hospitalCoords: [[12.9670,77.5900]],
    ambulanceCoords: [[12.9640,77.5870]],
    fireStationCoords: [[12.9690,77.5920]],
    droneCoords: [[12.9840,77.6070],[12.9760,77.5990]],
  },
  GANGTOK: {
    id: 'GANGTOK',
    name: 'Gangtok & Teesta River Valley',
    state: 'Sikkim',
    disasterType: 'Glacial Lake Outburst Flood (GLOF)',
    center: [27.3389, 88.6065],
    zoom: 13,
    floodPolygon: [[27.342,88.609],[27.352,88.609],[27.352,88.619],[27.342,88.619]],
    dangerZone: [[27.344,88.611],[27.350,88.611],[27.350,88.617],[27.344,88.617]],
    evacuationLine: [[27.344,88.611],[27.340,88.607],[27.336,88.603]],
    victimCoords: [[27.3450,88.6120]],
    sensorCoords: [[27.3480,88.6150]],
    shelterCoords: [[27.3340,88.6010]],
    hospitalCoords: [[27.3370,88.6040]],
    ambulanceCoords: [[27.3350,88.6020]],
    fireStationCoords: [[27.3390,88.6060]],
    droneCoords: [[27.3510,88.6180]],
  },
};


interface GISMapProps {
  theme?: 'dark' | 'light';
  selectedRegionKey?: string;
  showFloodZone?: boolean;
  showDangerZone?: boolean;
  showFireZone?: boolean;
  showVictims?: boolean;
  showEvacuationRoute?: boolean;
  showSensors?: boolean;
  showShelters?: boolean;
  showHospitals?: boolean;
  showAmbulances?: boolean;
  showFireStations?: boolean;
  showDrones?: boolean;
  showHeatmap?: boolean;
}

export const GISMap: React.FC<GISMapProps> = ({
  theme = 'dark',
  selectedRegionKey = 'CUTTACK',
  showFloodZone = true,
  showDangerZone = true,
  showFireZone = true,
  showVictims = true,
  showEvacuationRoute = true,
  showSensors = true,
  showShelters = true,
  showHospitals = true,
  showAmbulances = true,
  showFireStations = true,
  showDrones = true,
  showHeatmap = false,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full min-h-[420px] bg-slate-950 flex flex-col items-center justify-center text-slate-400 gap-2 rounded-xl border border-slate-800">
        <div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin"></div>
        <span className="text-xs font-mono text-cyan-400">Loading PostGIS Spatial Canvas...</span>
      </div>
    );
  }

  const region = REGIONS[selectedRegionKey] || REGIONS.CUTTACK;
  const { MapContainer, TileLayer, Polygon, Marker, Popup, Polyline, useMap, CircleMarker } = require('react-leaflet');
  const L = require('leaflet');

  function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  // Always use the light Carto Voyager tile for maximum map readability
  const tileUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

  const makeIcon = (html: string, size = 28) => L.divIcon({
    className: '',
    html,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });

  const victimIcon = makeIcon(`<div style="width:28px;height:28px;border-radius:50%;background:#dc2626;border:2px solid white;display:flex;align-items:center;justify-content:center;color:white;font-size:9px;font-weight:900;animation:ping 1s infinite">SOS</div>`);
  const sensorIcon = makeIcon(`<div style="width:24px;height:24px;border-radius:50%;background:#06b6d4;border:2px solid #0f172a;display:flex;align-items:center;justify-content:center;font-size:8px;color:#0f172a;font-weight:900">IoT</div>`, 24);
  const shelterIcon = makeIcon(`<div style="width:28px;height:28px;border-radius:6px;background:#10b981;border:1px solid white;display:flex;align-items:center;justify-content:center;font-size:14px">⛺</div>`);
  const hospitalIcon = makeIcon(`<div style="width:28px;height:28px;border-radius:6px;background:#db2777;border:1px solid white;display:flex;align-items:center;justify-content:center;font-size:14px">🏥</div>`);
  const ambulanceIcon = makeIcon(`<div style="width:28px;height:28px;border-radius:6px;background:#f59e0b;border:1px solid white;display:flex;align-items:center;justify-content:center;font-size:14px">🚑</div>`);
  const fireStationIcon = makeIcon(`<div style="width:28px;height:28px;border-radius:6px;background:#f97316;border:1px solid white;display:flex;align-items:center;justify-content:center;font-size:14px">🚒</div>`);
  const droneIcon = makeIcon(`<div style="width:28px;height:28px;border-radius:50%;background:#6366f1;border:2px solid #a5b4fc;display:flex;align-items:center;justify-content:center;font-size:14px;animation:spin 3s linear infinite">🚁</div>`);
  const policeIcon = makeIcon(`<div style="width:28px;height:28px;border-radius:6px;background:#3b82f6;border:1px solid white;display:flex;align-items:center;justify-content:center;font-size:14px">🚓</div>`);
  const supplyIcon = makeIcon(`<div style="width:28px;height:28px;border-radius:6px;background:#8b5cf6;border:1px solid white;display:flex;align-items:center;justify-content:center;font-size:14px">📦</div>`);

  // Secondary Evacuation Line (Alternative Route)
  const secondaryEvacuationLine: [number, number][] = region.evacuationLine.map(([lat, lng]) => [lat + 0.003, lng - 0.002]);

  // Derived Police and Supply Locations
  const policeCoords: [number, number][] = region.shelterCoords.map(([lat, lng]) => [lat + 0.002, lng + 0.003]);
  const supplyCoords: [number, number][] = region.hospitalCoords.map(([lat, lng]) => [lat - 0.003, lng + 0.002]);

  return (
    <div className="w-full h-full min-h-[420px] rounded-xl overflow-hidden border border-slate-800 relative z-0 shadow-2xl">
      {/* Live Map Telemetry HUD */}
      <div className="absolute top-3 left-3 z-[500] glass-panel px-3 py-1.5 rounded-xl border border-slate-700/80 text-[11px] font-mono text-slate-200 flex items-center gap-3 shadow-lg">
        <span className="flex items-center gap-1 text-cyan-400 font-bold">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          GIS Canvas
        </span>
        <span className="text-slate-400">|</span>
        <span>Lat: <b className="text-white">{region.center[0].toFixed(4)}° N</b></span>
        <span>Lng: <b className="text-white">{region.center[1].toFixed(4)}° E</b></span>
        <span className="text-slate-400 hidden md:inline">|</span>
        <span className="text-emerald-400 font-bold hidden md:inline">PostGIS 3.4 (ST_DWithin: 14ms)</span>
      </div>

      <MapContainer
        center={region.center}
        zoom={region.zoom}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%', minHeight: '420px', background: '#f1f5f9' }}
      >
        <ChangeView center={region.center} zoom={region.zoom} />

        <TileLayer key={theme} attribution='&copy; <a href="https://carto.com/">CARTO</a>' url={tileUrl} />

        {/* Flood Inundation Zone */}
        {showFloodZone && (
          <Polygon positions={region.floodPolygon} pathOptions={{ color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 0.35, weight: 2.5, dashArray: '6,4' }}>
            <Popup>
              <div className="p-1 space-y-1">
                <div className="text-blue-600 font-black text-xs">🌊 FLOOD INUNDATION ZONE</div>
                <div className="text-xs font-bold text-slate-800">{region.name} — {region.disasterType}</div>
                <div className="text-[11px] text-slate-600">Depth: 1.8m - 3.2m · Velocity: 4.2 km/h</div>
                <div className="text-[10px] text-blue-500 font-mono">XGBoost Flood Risk: 92% (High)</div>
              </div>
            </Popup>
          </Polygon>
        )}

        {/* Danger Zone */}
        {showDangerZone && (
          <Polygon positions={region.dangerZone} pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.5, weight: 3, dashArray: '4,4' }}>
            <Popup>
              <div className="p-1 space-y-1">
                <div className="text-red-600 font-black text-xs">🔴 CRITICAL DANGER ZONE</div>
                <div className="text-xs text-slate-800">High Risk — Immediate Evacuation Mandated by SDMA</div>
                <div className="text-[10px] text-red-500 font-bold">Structural Collapse Hazard: Active</div>
              </div>
            </Popup>
          </Polygon>
        )}

        {/* Fire Zone */}
        {showFireZone && region.firePolygon && (
          <Polygon positions={region.firePolygon} pathOptions={{ color: '#f97316', fillColor: '#f97316', fillOpacity: 0.45, weight: 2.5, dashArray: '5,5' }}>
            <Popup>
              <div className="p-1 space-y-1">
                <div className="text-orange-600 font-black text-xs">🔥 ACTIVE FIRE &amp; HAZMAT ZONE</div>
                <div className="text-xs text-slate-800">Fire &amp; Rescue Teams Deployed (3 Foam Tenders)</div>
              </div>
            </Popup>
          </Polygon>
        )}

        {/* Primary Evacuation Route */}
        {showEvacuationRoute && (
          <Polyline positions={region.evacuationLine} pathOptions={{ color: '#10b981', weight: 5, opacity: 0.95, dashArray: '10,8' }}>
            <Popup>
              <div className="p-1 space-y-1">
                <div className="text-emerald-600 font-black text-xs">✅ PRIMARY SAFE EVACUATION PATH</div>
                <div className="text-xs text-slate-700">PostGIS pgRouting Dijkstra — Dynamic Hazard Avoidance Active</div>
                <div className="text-[10px] text-emerald-600 font-bold">Status: Clear &amp; Escorted by NDRF</div>
              </div>
            </Popup>
          </Polyline>
        )}

        {/* Secondary Alternative Evacuation Route */}
        {showEvacuationRoute && (
          <Polyline positions={secondaryEvacuationLine} pathOptions={{ color: '#06b6d4', weight: 3, opacity: 0.8, dashArray: '6,6' }}>
            <Popup>
              <div className="p-1 space-y-1">
                <div className="text-cyan-600 font-black text-xs">↩️ SECONDARY ALTERNATIVE ROUTE</div>
                <div className="text-xs text-slate-700">Backup Emergency Access Line for Heavy Relief Trucks</div>
              </div>
            </Popup>
          </Polyline>
        )}

        {/* Victims */}
        {showVictims && region.victimCoords.map((pos, i) => (
          <Marker key={`v${i}`} position={pos} icon={victimIcon}>
            <Popup>
              <div className="p-1 space-y-1">
                <div className="text-red-600 font-black text-xs">🆘 YOLOv11 VICTIM DETECTED #{i+1}</div>
                <div className="text-xs text-slate-700">Coordinates: {pos[0].toFixed(4)}° N, {pos[1].toFixed(4)}° E</div>
                <div className="text-[11px] font-bold text-red-500">AI Confidence: {(94.2 - i * 4.5).toFixed(1)}%</div>
                <div className="text-[10px] text-slate-500">Status: Trapped on rooftop · Signal waving verified</div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* IoT Sensors */}
        {showSensors && region.sensorCoords.map((pos, i) => (
          <Marker key={`s${i}`} position={pos} icon={sensorIcon}>
            <Popup>
              <div className="p-1 space-y-1">
                <div className="text-cyan-600 font-black text-xs">📡 ESP32 IoT NODE #{i+1}</div>
                <div className="text-xs text-slate-700">Water Rise: <b>6.8m (CRITICAL)</b> · Temp: 34.2°C</div>
                <div className="text-[10px] text-slate-500">MQTT Protocol: Active (Broker: EMQX)</div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Shelters */}
        {showShelters && region.shelterCoords.map((pos, i) => (
          <Marker key={`sh${i}`} position={pos} icon={shelterIcon}>
            <Popup>
              <div className="p-1 space-y-1">
                <div className="text-emerald-600 font-black text-xs">⛺ RELIEF SHELTER CAMP #{i+1}</div>
                <div className="text-xs text-slate-700">Capacity: <b>320 / 500 beds</b> (64% occupied)</div>
                <div className="text-[10px] text-emerald-600 font-bold">Food &amp; Water Rations: 10 Days Available</div>
                <div className="text-[10px] text-slate-500">Medical Officer: Dr. K. Sharma (On Duty)</div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Hospitals */}
        {showHospitals && region.hospitalCoords.map((pos, i) => (
          <Marker key={`h${i}`} position={pos} icon={hospitalIcon}>
            <Popup>
              <div className="p-1 space-y-1">
                <div className="text-pink-600 font-black text-xs">🏥 EMERGENCY HOSPITAL HUB #{i+1}</div>
                <div className="text-xs text-slate-700">ICU Beds Available: <b>24 / 45</b></div>
                <div className="text-[10px] text-pink-600 font-bold">Trauma &amp; Blood Bank: Operational</div>
                <div className="text-[10px] text-slate-500">Emergency Contact: 011-24363260</div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Ambulances */}
        {showAmbulances && region.ambulanceCoords.map((pos, i) => (
          <Marker key={`a${i}`} position={pos} icon={ambulanceIcon}>
            <Popup>
              <div className="p-1 space-y-1">
                <div className="text-amber-600 font-black text-xs">🚑 ALS AMBULANCE UNIT #{i+1}</div>
                <div className="text-xs text-slate-700">Driver: R. Kumar · Call Sign: RESQ-AMB-{i+1}</div>
                <div className="text-[10px] text-amber-600 font-bold">Status: En Route to Victim Location (ETA 6m)</div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Fire Stations */}
        {showFireStations && region.fireStationCoords.map((pos, i) => (
          <Marker key={`fs${i}`} position={pos} icon={fireStationIcon}>
            <Popup>
              <div className="p-1 space-y-1">
                <div className="text-orange-600 font-black text-xs">🚒 FIRE &amp; RESCUE STATION #{i+1}</div>
                <div className="text-xs text-slate-700">Units Ready: 3 Foam Tenders, 2 Motor Boats</div>
                <div className="text-[10px] text-orange-600 font-bold">Status: High Alert Standing By</div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Drones */}
        {showDrones && region.droneCoords.map((pos, i) => (
          <Marker key={`d${i}`} position={pos} icon={droneIcon}>
            <Popup>
              <div className="p-1 space-y-1">
                <div className="text-indigo-600 font-black text-xs">🚁 SURVEILLANCE DRONE #{i+1}</div>
                <div className="text-xs text-slate-700">Altitude: <b>120m</b> · Speed: <b>45 km/h</b></div>
                <div className="text-[10px] text-indigo-600 font-bold">Battery: 78% · YOLOv11 Streaming at 30 FPS</div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Police Checkpoints */}
        {showShelters && policeCoords.map((pos, i) => (
          <Marker key={`p${i}`} position={pos} icon={policeIcon}>
            <Popup>
              <div className="p-1 space-y-1">
                <div className="text-blue-600 font-black text-xs">🚓 POLICE CHECKPOINT #{i+1}</div>
                <div className="text-xs text-slate-700">Traffic Diversion &amp; Perimeter Security Active</div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Relief Supply Distribution Hubs */}
        {showShelters && supplyCoords.map((pos, i) => (
          <Marker key={`sup${i}`} position={pos} icon={supplyIcon}>
            <Popup>
              <div className="p-1 space-y-1">
                <div className="text-purple-600 font-black text-xs">📦 RELIEF DISTRIBUTION HUB #{i+1}</div>
                <div className="text-xs text-slate-700">Stock: 12.4 Tonnes Food, 5,000L Drinking Water</div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Heatmap circles (simulated) */}
        {showHeatmap && region.victimCoords.map((pos, i) => (
          <CircleMarker key={`heat${i}`} center={pos} radius={40} pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.15, weight: 0 }} />
        ))}
      </MapContainer>

      {/* Expanded GIS Legend Overlay */}
      <div className="absolute bottom-4 right-4 z-[500] glass-panel p-3 rounded-xl text-[11px] space-y-1.5 border border-slate-700/80 shadow-2xl hidden sm:block max-w-[220px]">
        <div className="font-extrabold text-slate-200 mb-1.5 border-b border-slate-700 pb-1 flex items-center justify-between">
          <span>GIS Spatial Legend</span>
          <span className="text-[9px] text-cyan-400 font-mono">EPSG:4326</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300"><span className="w-3 h-3 rounded bg-blue-500/50 border border-blue-400 shrink-0"></span>🌊 Flood Inundation Zone</div>
        <div className="flex items-center gap-2 text-slate-300"><span className="w-3 h-3 rounded bg-red-500/60 border border-red-400 shrink-0"></span>🔴 Critical Danger Zone</div>
        {region.firePolygon && <div className="flex items-center gap-2 text-slate-300"><span className="w-3 h-3 rounded bg-orange-500/50 border border-orange-400 shrink-0"></span>🔥 Active Fire Zone</div>}
        <div className="flex items-center gap-2 text-slate-300"><span className="w-4 h-1 bg-emerald-400 rounded shrink-0"></span>Primary Route (Dijkstra)</div>
        <div className="flex items-center gap-2 text-slate-300"><span className="w-4 h-1 bg-cyan-400 rounded shrink-0 border-t border-dashed"></span>Secondary Backup Route</div>
        <div className="flex items-center gap-2 text-slate-300">🆘 YOLOv11 Victims Detected</div>
        <div className="flex items-center gap-2 text-slate-300">📡 ESP32 IoT Water Nodes</div>
        <div className="flex items-center gap-2 text-slate-300">⛺ Relief Camps · 🏥 Hospitals</div>
        <div className="flex items-center gap-2 text-slate-300">🚑 Ambulances · 🚒 Fire Units</div>
        <div className="flex items-center gap-2 text-slate-300">🚓 Police Post · 📦 Supply Hub</div>
        <div className="flex items-center gap-2 text-slate-300">🚁 Drone Swarm Locations</div>
      </div>
    </div>
  );
};
