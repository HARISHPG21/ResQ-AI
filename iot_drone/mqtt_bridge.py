"""
MQTT to Redis & WebSocket Ingestion Bridge
ResQ-AI Disaster Response Intelligence Platform
"""

import json
import time

def simulate_mqtt_stream():
    print("[MQTT BRIDGE] Connected to EMQX Broker at 127.0.0.1:1883")
    print("[MQTT BRIDGE] Subscribed to topics: resq/telemetry/#")
    
    mock_payload = {
        "hardware_id": "ESP32_WATER_NODE_01",
        "sensor_type": "WATER_LEVEL",
        "reading_value": 6.85,
        "unit": "meters",
        "lat": 20.4710,
        "lng": 85.8860,
        "timestamp": time.time()
    }
    
    print(f"[PUB/SUB STREAM] Ingested packet -> {json.dumps(mock_payload)}")
    print("[REDIS CACHE] Pushed to key `stream:iot:water_level`")

if __name__ == "__main__":
    simulate_mqtt_stream()
