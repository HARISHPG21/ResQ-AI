-- ====================================================================
-- RESQ-AI DISASTER RESPONSE INTELLIGENCE PLATFORM (AI + GIS + IoT)
-- Complete Production Database Schema (PostgreSQL 16 + PostGIS 3.4)
-- Smart India Hackathon (SIH) 2026 Winner Specification
-- ====================================================================

-- 1. Enable Required Spatial & Utility Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "pgrouting";

-- 2. Create Custom Enum Types
CREATE TYPE disaster_category AS ENUM (
    'FLOOD', 'CYCLONE', 'EARTHQUAKE', 'FOREST_FIRE', 
    'LANDSLIDE', 'INDUSTRIAL_ACCIDENT', 'BUILDING_COLLAPSE', 
    'TSUNAMI', 'CLOUD_BURST', 'HEAVY_RAINFALL'
);

CREATE TYPE priority_level AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL', 'EXTREME');
CREATE TYPE incident_status AS ENUM ('REPORTED', 'VERIFIED', 'DISPATCHED', 'IN_PROGRESS', 'RESOLVED', 'REJECTED');
CREATE TYPE sensor_type_enum AS ENUM ('WATER_LEVEL', 'RAINFALL', 'TEMPERATURE', 'HUMIDITY', 'AIR_QUALITY', 'SMOKE', 'EARTHQUAKE', 'GAS_LEAK');

-- 3. Roles & Permissions Table (11 User Roles)
CREATE TABLE roles (
    role_code VARCHAR(32) PRIMARY KEY,
    role_name VARCHAR(64) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO roles (role_code, role_name, description) VALUES
('CITIZEN', 'Citizen', 'Public user, SOS reporting, shelter locator, offline alerts'),
('VOLUNTEER', 'Volunteer', 'Relief worker, food/kit distribution tracker'),
('NGO', 'NGO Organization', 'Relief material logistics & community kitchen ops'),
('POLICE', 'Police Department', 'Traffic control, road closures, crowd evacuation'),
('FIRE', 'Fire Department', 'Fire suppression, hazard containment, rescue operations'),
('HOSPITAL', 'Hospital Administrator', 'ICU beds management, blood bank, ambulance dispatch'),
('NDRF', 'NDRF Squad Commander', 'National disaster response force tactical rescue'),
('DISTRICT_COLLECTOR', 'District Collector', 'District magistrate, emergency orders, local command'),
('STATE_ADMIN', 'State Administrator', 'State disaster management authority oversight'),
('NATIONAL_ADMIN', 'National Administrator', 'NDMA national disaster command center authority');

-- 4. Users Table (With Spatial GPS Location)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(128) NOT NULL,
    email VARCHAR(128) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_code VARCHAR(32) NOT NULL REFERENCES roles(role_code),
    district VARCHAR(64),
    state VARCHAR(64),
    is_active BOOLEAN DEFAULT TRUE,
    location_geom GEOMETRY(Point, 4326),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_role ON users(role_code);
CREATE INDEX idx_users_geom ON users USING GIST(location_geom);

-- 5. Incidents / Disaster SOS Table
CREATE TABLE incidents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category disaster_category NOT NULL,
    priority priority_level DEFAULT 'HIGH',
    status incident_status DEFAULT 'REPORTED',
    affected_count INT DEFAULT 1,
    reported_by UUID REFERENCES users(id) ON DELETE SET NULL,
    contact_phone VARCHAR(20),
    media_urls TEXT[],
    voice_note_url VARCHAR(512),
    location_geom GEOMETRY(Point, 4326) NOT NULL,
    address_text TEXT,
    ai_confidence_score FLOAT DEFAULT 0.85,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_incidents_category ON incidents(category);
CREATE INDEX idx_incidents_status ON incidents(status);
CREATE INDEX idx_incidents_geom ON incidents USING GIST(location_geom);

-- 6. Emergency Shelters Table
CREATE TABLE shelters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(128) NOT NULL,
    total_capacity INT NOT NULL,
    current_occupancy INT DEFAULT 0,
    food_stock_days INT DEFAULT 7,
    water_supply_liters INT DEFAULT 10000,
    medical_kits_available INT DEFAULT 50,
    contact_person VARCHAR(128),
    contact_phone VARCHAR(20),
    location_geom GEOMETRY(Point, 4326) NOT NULL,
    address_text TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_shelters_geom ON shelters USING GIST(location_geom);

-- 7. Hospitals & Emergency Health Infrastructure
CREATE TABLE hospitals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(128) NOT NULL,
    total_beds INT NOT NULL,
    available_icu_beds INT DEFAULT 10,
    available_general_beds INT DEFAULT 50,
    oxygen_cylinders_count INT DEFAULT 100,
    blood_units_o_neg INT DEFAULT 20,
    blood_units_o_pos INT DEFAULT 50,
    ambulances_available INT DEFAULT 5,
    contact_phone VARCHAR(20),
    location_geom GEOMETRY(Point, 4326) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_hospitals_geom ON hospitals USING GIST(location_geom);

-- 8. IoT Sensor Hardware Nodes
CREATE TABLE iot_sensors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hardware_id VARCHAR(64) UNIQUE NOT NULL,
    sensor_type sensor_type_enum NOT NULL,
    location_geom GEOMETRY(Point, 4326) NOT NULL,
    installation_river_name VARCHAR(128),
    warning_threshold FLOAT NOT NULL,
    critical_threshold FLOAT NOT NULL,
    is_online BOOLEAN DEFAULT TRUE,
    battery_level FLOAT DEFAULT 100.0,
    last_ping TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_iot_sensors_geom ON iot_sensors USING GIST(location_geom);

-- 9. IoT Sensor Readings Telemetry
CREATE TABLE sensor_readings (
    id BIGSERIAL PRIMARY KEY,
    sensor_id UUID REFERENCES iot_sensors(id) ON DELETE CASCADE,
    reading_value FLOAT NOT NULL,
    unit VARCHAR(16) NOT NULL,
    is_alert_triggered BOOLEAN DEFAULT FALSE,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sensor_readings_time ON sensor_readings(sensor_id, recorded_at DESC);

-- 10. Drones & Live Stream Telemetry
CREATE TABLE drones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    drone_code VARCHAR(32) UNIQUE NOT NULL,
    pilot_name VARCHAR(128),
    status VARCHAR(32) DEFAULT 'AVAILABLE',
    battery_percentage FLOAT DEFAULT 100.0,
    stream_rtsp_url VARCHAR(255),
    current_location_geom GEOMETRY(Point, 4326),
    last_telemetry_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. AI Video Detections (YOLOv11 & SAM Logs)
CREATE TABLE ai_detections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    drone_id UUID REFERENCES drones(id) ON DELETE CASCADE,
    incident_id UUID REFERENCES incidents(id) ON DELETE SET NULL,
    detection_type VARCHAR(64) NOT NULL, -- e.g., 'VICTIM', 'BUILDING_DAMAGE', 'FLOOD_BOUND'
    confidence FLOAT NOT NULL,
    bounding_box_json JSONB,
    frame_snapshot_url VARCHAR(512),
    location_geom GEOMETRY(Point, 4326),
    detected_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. Rescue Squads & Resource Tracking
CREATE TABLE rescue_teams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    team_name VARCHAR(128) NOT NULL,
    agency_type VARCHAR(32) NOT NULL, -- 'NDRF', 'SDRF', 'FIRE', 'POLICE'
    member_count INT NOT NULL,
    leader_user_id UUID REFERENCES users(id),
    status VARCHAR(32) DEFAULT 'STANDBY',
    current_location_geom GEOMETRY(Point, 4326),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 13. Weather & Hazard Forecast Alerts
CREATE TABLE weather_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    alert_title VARCHAR(255) NOT NULL,
    severity priority_level NOT NULL,
    source_api VARCHAR(64) DEFAULT 'IMD_OPENWEATHER',
    wind_speed_kmh FLOAT,
    rainfall_mm FLOAT,
    affected_polygon GEOMETRY(Polygon, 4326),
    valid_until TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ====================================================================
-- SEED MOCK DATA FOR DEMONSTRATION & SIH JUDGING
-- ====================================================================

-- Seed Roles & Mock Users
INSERT INTO users (full_name, email, phone, password_hash, role_code, district, state, location_geom) VALUES
('National Commander Sharma', 'national@ndma.gov.in', '+919876543210', '$2b$12$eA8P...', 'NATIONAL_ADMIN', 'New Delhi', 'Delhi', ST_SetSRID(ST_MakePoint(77.2090, 28.6139), 4326)),
('Collector Rajesh Kumar', 'collector@cuttack.gov.in', '+919876543211', '$2b$12$eA8P...', 'DISTRICT_COLLECTOR', 'Cuttack', 'Odisha', ST_SetSRID(ST_MakePoint(85.8793, 20.4625), 4326)),
('NDRF Captain Verma', 'ndrf.commander@ndrf.gov.in', '+919876543212', '$2b$12$eA8P...', 'NDRF', 'Cuttack', 'Odisha', ST_SetSRID(ST_MakePoint(85.8820, 20.4650), 4326)),
('Citizen Rahul Das', 'rahul.das@gmail.com', '+919876543213', '$2b$12$eA8P...', 'CITIZEN', 'Cuttack', 'Odisha', ST_SetSRID(ST_MakePoint(85.8850, 20.4700), 4326));

-- Seed Active Flood Incident
INSERT INTO incidents (title, description, category, priority, status, affected_count, contact_phone, location_geom, address_text, ai_confidence_score) VALUES
('Mahanadi River Overflow - Flood Alert', 'Water level crossed danger mark by 1.8 meters. 40 families trapped on roofs near Bhuasuni temple.', 'FLOOD', 'CRITICAL', 'IN_PROGRESS', 150, '+919876543213', ST_SetSRID(ST_MakePoint(85.8850, 20.4700), 4326), 'Sector 11, Mahanadi River Bank, Cuttack', 0.94),
('Short Circuit Industrial Fire', 'Chemical plant smoke leak reported following transformer explosion.', 'INDUSTRIAL_ACCIDENT', 'EXTREME', 'VERIFIED', 30, '+919876543299', ST_SetSRID(ST_MakePoint(85.8500, 20.4500), 4326), 'Choudwar Industrial Estate', 0.91);

-- Seed Emergency Shelters
INSERT INTO shelters (name, total_capacity, current_occupancy, food_stock_days, water_supply_liters, location_geom, address_text) VALUES
('Cuttack Central High School Relief Camp', 500, 180, 10, 15000, ST_SetSRID(ST_MakePoint(85.8700, 20.4600), 4326), 'Main Road, Cuttack'),
('Bhuasuni Community Indoor Stadium', 800, 320, 14, 25000, ST_SetSRID(ST_MakePoint(85.8900, 20.4800), 4326), 'Stadium Complex, Cuttack');

-- Seed Hospitals
INSERT INTO hospitals (name, total_beds, available_icu_beds, available_general_beds, oxygen_cylinders_count, location_geom) VALUES
('SCB Medical College & Hospital', 1200, 24, 110, 350, ST_SetSRID(ST_MakePoint(85.8750, 20.4680), 4326)),
('City General Emergency Hospital', 300, 8, 45, 90, ST_SetSRID(ST_MakePoint(85.8600, 20.4550), 4326));

-- Seed IoT Sensors
INSERT INTO iot_sensors (hardware_id, sensor_type, location_geom, installation_river_name, warning_threshold, critical_threshold) VALUES
('ESP32_WATER_NODE_01', 'WATER_LEVEL', ST_SetSRID(ST_MakePoint(85.8860, 20.4710), 4326), 'Mahanadi River - Ghat 4', 5.0, 7.5),
('ESP32_SMOKE_NODE_04', 'SMOKE', ST_SetSRID(ST_MakePoint(85.8510, 20.4510), 4326), 'Choudwar Chemical Zone', 300.0, 600.0);
