# Architecture & System Design Specification

## ResQ-AI: Disaster Response Intelligence Platform

---

## 1. High-Level UML System Architecture Diagram

```mermaid
graph TB
    subgraph Data Sources & Hardware
        S1[ESP32 Water Level Node]
        S2[ESP32 Smoke & Gas Node]
        S3[ESP32 Seismic Sensor Node]
        D1[Drone RTSP Live Video Stream]
        SAT[NASA / Sentinel Satellite API]
        WTH[OpenWeather / IMD API]
        CIT[Citizen Mobile App / Browser]
    end

    subgraph Edge & Ingestion Layer
        MQTT[EMQX MQTT Message Broker]
        WSS[WebSocket Broadcast Engine]
        API_GATEWAY[FastAPI Gateway / NGINX]
    end

    subgraph Core AI & GIS Microservices
        AUTH[Auth & RBAC Service - JWT]
        INCIDENT[Incident Management & Triage Engine]
        ROUTER[PostGIS Dijkstra Evacuation Router]
        YOLO_SRV[YOLOv11 Object Detection Service]
        SAM_SRV[SAM Building Damage Segmentation]
        PRED_SRV[XGBoost Flood & Fire Predictor]
        RAG_SRV[Gemini 1.5 RAG Chatbot Service]
    end

    subgraph Data Persistence Layer
        PG[(PostgreSQL 16 + PostGIS)]
        MONGO[(MongoDB Telemetry Storage)]
        REDIS[(Redis Cache & Pub/Sub)]
    end

    subgraph Command Center UI
        DASH[11 Glassmorphic Role Dashboards]
        MAP[Leaflet 3D GIS Visualizer]
    end

    S1 & S2 & S3 --> MQTT --> REDIS --> PRED_SRV
    D1 --> YOLO_SRV
    SAT --> SAM_SRV
    WTH --> PRED_SRV
    CIT --> API_GATEWAY

    API_GATEWAY --> AUTH & INCIDENT & ROUTER & RAG_SRV
    INCIDENT & ROUTER --> PG
    YOLO_SRV & SAM_SRV --> MONGO
    
    PG & MONGO & REDIS --> WSS --> DASH & MAP
```

---

## 2. Spatial GIS Evacuation Routing Algorithm (PostGIS)

The platform computes safe evacuation paths for rescue squads avoiding flooded, blocked, or high-risk zones using PostGIS `pgRouting` with dynamic edge weight penalty adjustments.

$$\text{Edge Weight } W_e = L_e \times \left(1 + \alpha \cdot H_e + \beta \cdot D_e\right)$$

Where:
* $L_e$ = Length of road segment in meters
* $H_e$ = Water depth / Hazard score (0.0 to 1.0)
* $D_e$ = Debris blockage flag (0 or 1)
* $\alpha, \beta$ = Penalty multiplier constants ($\alpha = 10.0, \beta = 100.0$)

---

## 3. Data Flow Diagram (DFD Level 1)

```mermaid
dfd
    process P1["1. Ingest IoT Telemetry"]
    process P2["2. Process Drone Video Feed"]
    process P3["3. Calculate Hazard Score"]
    process P4["4. Optimize Evacuation Route"]
    process P5["5. Dispatch Rescue Squad"]

    datastore DS1[("PostGIS Database")]
    datastore DS2[("Redis Stream Cache")]

    P1 -->|Sensor Readings| DS2
    P2 -->|Detected Victims| DS1
    DS2 --> P3
    P3 -->|Hazard Polygons| DS1
    DS1 --> P4
    P4 -->|Safe Path GeoJSON| P5
```

---

## 4. Entity-Relationship (ER) Diagram

```mermaid
erDiagram
    USERS ||--o{ INCIDENTS : reports
    USERS ||--o{ RESCUE_TEAMS : commands
    ROLES ||--o{ USERS : assigned_to
    INCIDENTS ||--o{ RESCUE_ASSIGNMENTS : linked_to
    RESCUE_TEAMS ||--o{ RESCUE_ASSIGNMENTS : performs
    IOT_SENSORS ||--o{ SENSOR_READINGS : records
    DRONES ||--o{ DRONE_FEEDS : streams
    DRONE_FEEDS ||--o{ AI_DETECTIONS : generates
    SHELTERS ||--o{ RESCUE_ASSIGNMENTS : destinations
    HOSPITALS ||--o{ RESCUE_ASSIGNMENTS : admits

    USERS {
        uuid id PK
        string full_name
        string phone
        string role_code FK
        point location_geom
    }

    INCIDENTS {
        uuid id PK
        string disaster_type
        integer priority_score
        string status
        geometry location_geom
        uuid reported_by FK
    }

    IOT_SENSORS {
        uuid id PK
        string sensor_type
        string hardware_id
        geometry location_geom
        float warning_threshold
    }

    DRONES {
        uuid id PK
        string drone_code
        string status
        geometry current_location_geom
    }
```
