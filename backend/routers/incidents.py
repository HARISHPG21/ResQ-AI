from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid

router = APIRouter()

class SOSCreate(BaseModel):
    title: str
    category: str = Field(..., example="FLOOD")
    description: str
    affected_count: int = 1
    contact_phone: str
    latitude: float
    longitude: float
    address_text: Optional[str] = "Sector 11, Mahanadi River Bank, Cuttack"

class IncidentResponse(BaseModel):
    id: str
    title: str
    category: str
    priority: str
    status: str
    affected_count: int
    latitude: float
    longitude: float
    address_text: str
    ai_confidence_score: float

MOCK_INCIDENTS = [
    {
        "id": "inc-001",
        "title": "Mahanadi River Overflow - 40 Roof Trapped",
        "category": "FLOOD",
        "priority": "CRITICAL",
        "status": "IN_PROGRESS",
        "affected_count": 150,
        "latitude": 20.4700,
        "longitude": 85.8850,
        "address_text": "Sector 11, Mahanadi River Bank, Cuttack",
        "ai_confidence_score": 0.94
    },
    {
        "id": "inc-002",
        "title": "Transformer Explosion & Chemical Smoke",
        "category": "INDUSTRIAL_ACCIDENT",
        "priority": "EXTREME",
        "status": "VERIFIED",
        "affected_count": 30,
        "latitude": 20.4500,
        "longitude": 85.8500,
        "address_text": "Choudwar Industrial Zone, Cuttack",
        "ai_confidence_score": 0.91
    },
    {
        "id": "inc-003",
        "title": "Bridge Debris Blockage & Flash Flood",
        "category": "HEAVY_RAINFALL",
        "priority": "HIGH",
        "status": "REPORTED",
        "affected_count": 12,
        "latitude": 20.4650,
        "longitude": 85.8720,
        "address_text": "Jobra Barrage Approach Road",
        "ai_confidence_score": 0.88
    }
]

@router.get("/", response_model=List[IncidentResponse])
async def list_incidents(
    category: Optional[str] = None,
    priority: Optional[str] = None
):
    results = MOCK_INCIDENTS
    if category:
        results = [i for i in results if i["category"].upper() == category.upper()]
    if priority:
        results = [i for i in results if i["priority"].upper() == priority.upper()]
    return results

@router.post("/sos", response_model=IncidentResponse)
async def create_sos(req: SOSCreate):
    # Dynamic AI Priority Triage Algorithm
    priority = "HIGH"
    if req.affected_count >= 50 or req.category.upper() in ["FLOOD", "BUILDING_COLLAPSE", "TSUNAMI"]:
        priority = "CRITICAL"
    
    new_inc = {
        "id": f"inc-{uuid.uuid4().hex[:6]}",
        "title": req.title,
        "category": req.category.upper(),
        "priority": priority,
        "status": "REPORTED",
        "affected_count": req.affected_count,
        "latitude": req.latitude,
        "longitude": req.longitude,
        "address_text": req.address_text or "GPS Beacon Location",
        "ai_confidence_score": 0.96
    }
    MOCK_INCIDENTS.insert(0, new_inc)
    return new_inc
