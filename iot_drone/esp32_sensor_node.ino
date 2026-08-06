/*
  ResQ-AI IoT Disaster Sensor Firmware
  Target: ESP32 Microcontroller
  Sensors: 
   - Ultrasonic HC-SR04 (Water Level / River Rise)
   - MQ-2 Smoke & Toxic Gas Sensor
   - MPU6050 Accelerometer / Seismic Sensor
   - Tipping Bucket Rain Gauge
  Protocol: MQTT over Wi-Fi / GSM Mesh
*/

#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

// Wi-Fi & MQTT Configurations
const char* ssid = "DisasterResponse_MeshNet";
const char* password = "EmergencyPass2026";
const char* mqtt_server = "192.168.1.100"; // Local or Cloud MQTT Broker (EMQX)
const int mqtt_port = 1883;

WiFiClient espClient;
PubSubClient client(espClient);

// Hardware Pin Definitions
#define TRIG_PIN 5
#define ECHO_PIN 18
#define MQ2_SMOKE_PIN 34
#define RAIN_GAUGE_PIN 19

void setup() {
  Serial.begin(115200);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(MQ2_SMOKE_PIN, INPUT);
  
  setup_wifi();
  client.setServer(mqtt_server, mqtt_port);
}

void setup_wifi() {
  delay(10);
  Serial.println("Connecting to Disaster Mesh WiFi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi Connected! IP Address: ");
  Serial.println(WiFi.localIP());
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    if (client.connect("ESP32_WaterLevel_Node_01")) {
      Serial.println("MQTT Connected!");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      delay(5000);
    }
  }
}

float measure_water_level_cm() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  
  long duration = pulseIn(ECHO_PIN, HIGH);
  float distance_cm = duration * 0.034 / 2;
  return distance_cm;
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  // Read Sensor Values
  float distance_cm = measure_water_level_cm();
  int smoke_ppm = analogRead(MQ2_SMOKE_PIN);
  
  // Construct JSON Telemetry Payload
  StaticJsonDocument<256> doc;
  doc["hardware_id"] = "ESP32_WATER_NODE_01";
  doc["sensor_type"] = "WATER_LEVEL";
  doc["water_level_cm"] = distance_cm;
  doc["smoke_ppm"] = smoke_ppm;
  doc["lat"] = 20.4710;
  doc["lng"] = 85.8860;
  doc["battery_v"] = 3.92;

  char jsonBuffer[512];
  serializeJson(doc, jsonBuffer);
  
  // Publish Telemetry to EMQX MQTT Broker
  client.publish("resq/telemetry/water_level", jsonBuffer);
  Serial.print("Published MQTT Payload: ");
  Serial.println(jsonBuffer);

  delay(5000); // 5-Second Sensor Pulse Rate
}
