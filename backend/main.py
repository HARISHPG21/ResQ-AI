import asyncio
import json
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from routers import auth, incidents, gis, iot, ai, chatbot

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.API_VERSION,
    description="Government-Grade Disaster Response Intelligence Platform API (AI + GIS + IoT)",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication & RBAC"])
app.include_router(incidents.router, prefix="/api/v1/incidents", tags=["Incidents & Citizen SOS"])
app.include_router(gis.router, prefix="/api/v1/gis", tags=["GIS & PostGIS Routing"])
app.include_router(iot.router, prefix="/api/v1/iot", tags=["IoT Sensor Telemetry"])
app.include_router(ai.router, prefix="/api/v1/ai", tags=["AI Engine - YOLOv11, SAM, XGBoost"])
app.include_router(chatbot.router, prefix="/api/v1/chatbot", tags=["Gemini RAG Emergency Chatbot"])

# WebSocket Manager for Real-Time Sensor & SOS Broadcasts
class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except Exception:
                pass

manager = ConnectionManager()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # Keep alive & simulate periodic IoT sensor pulse
            data = await websocket.receive_text()
            await websocket.send_text(f"ACK: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)

@app.get("/")
async def root():
    return {
        "status": "ONLINE",
        "system": "ResQ-AI Disaster Response Intelligence Platform",
        "version": settings.API_VERSION,
        "docs": "/docs",
        "supported_roles": 11,
        "active_modules": ["AI Vision", "PostGIS Evacuation Router", "IoT Sensor Stream", "Gemini RAG"]
    }
