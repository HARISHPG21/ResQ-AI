from fastapi import APIRouter, status
from pydantic import BaseModel
from typing import List
from datetime import datetime

router = APIRouter()

class SensorTelemetryInput(BaseModel):
    hardware_id: str
    sensor_type: str # WATER_LEVEL, SMOKE, RAINFALL, SEISMIC
    reading_value: float
    unit: str
    latitude: float
    longitude: float

MOCK_SENSORS = [
    {
        "hardware_id": "ESP32_WATER_NODE_01",
        "sensor_type": "WATER_LEVEL",
        "reading_value": 6.8,
        "unit": "meters",
        "status": "CRITICAL_ALERT",
        "warning_threshold": 5.0,
        "critical_threshold": 6.5,
        "latitude": 20.4710,
        "longitude": 85.8860,
        "river_name": "Mahanadi River - Ghat 4",
        "battery": 94.0
    },
    {
        "hardware_id": "ESP32_SMOKE_NODE_04",
        "sensor_type": "SMOKE",
        "reading_value": 480.0,
        "unit": "ppm",
        "status": "WARNING",
        "warning_threshold": 300.0,
        "critical_threshold": 600.0,
        "latitude": 20.4510,
        "longitude": 85.8510,
        "river_name": "Choudwar Chemical Zone",
        "battery": 88.5
    },
    {
        "hardware_id": "ESP32_SEISMIC_NODE_09",
        "sensor_type": "SEISMIC",
        "reading_value": 2.1,
        "unit": "Richter",
        "status": "NORMAL",
        "warning_threshold": 4.0,
        "critical_threshold": 5.5,
        "latitude": 20.4600,
        "longitude": 85.8700,
        "river_name": "Fault Line Station B",
        "battery": 98.0
    }
]

@router.get("/sensors")
async def list_sensors():
    return MOCK_SENSORS

@router.post("/telemetry", status_code=status.HTTP_201_CREATED)
async def ingest_telemetry(data: SensorTelemetryInput):
    alert_triggered = False
    if data.sensor_type == "WATER_LEVEL" and data.reading_value >= 6.5:
        alert_triggered = True
    elif data.sensor_type == "SMOKE" and data.reading_value >= 500:
        alert_triggered = True
        
    return {
        "status": "SUCCESS",
        "hardware_id": data.hardware_id,
        "alert_triggered": alert_triggered,
        "timestamp": datetime.utcnow().isoformat()
    }
