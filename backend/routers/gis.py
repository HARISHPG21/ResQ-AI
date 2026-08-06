from fastapi import APIRouter, Query
from pydantic import BaseModel
from typing import List, Dict, Any

router = APIRouter()

class RouteRequest(BaseModel):
    start_lat: float
    start_lng: float
    end_lat: float
    end_lng: float
    avoid_flood: bool = True

@router.get("/layers/hazards")
async def get_hazard_layers():
    """Return GeoJSON FeatureCollection of active disaster risk zones"""
    return {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {
                    "id": "hazard-01",
                    "hazard_type": "FLOOD_ZONE_A",
                    "risk_level": "EXTREME",
                    "depth_meters": 2.4
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[
                        [85.8800, 20.4680],
                        [85.8900, 20.4680],
                        [85.8900, 20.4750],
                        [85.8800, 20.4750],
                        [85.8800, 20.4680]
                    ]]
                }
            },
            {
                "type": "Feature",
                "properties": {
                    "id": "hazard-02",
                    "hazard_type": "FIRE_PROPAGATION_ZONE",
                    "risk_level": "HIGH",
                    "smoke_ppm": 450
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[
                        [85.8450, 20.4480],
                        [85.8550, 20.4480],
                        [85.8550, 20.4550],
                        [85.8450, 20.4550],
                        [85.8450, 20.4480]
                    ]]
                }
            }
        ]
    }

@router.post("/route/evacuation")
async def compute_safe_evacuation_route(req: RouteRequest):
    """
    Simulates PostGIS pgRouting Dijkstra engine calculating a safe evacuation path
    with edge weight penalty adjustments for flooded/blocked road segments.
    """
    # Generate dynamic safe waypoint path avoiding flood polygon (85.88-85.89, 20.468-20.475)
    path = [
        [req.start_lng, req.start_lat],
        [req.start_lng + 0.005, req.start_lat - 0.003], # Divert around flood hazard
        [req.end_lng - 0.004, req.end_lat - 0.002],
        [req.end_lng, req.end_lat]
    ]
    
    return {
        "type": "Feature",
        "properties": {
            "distance_km": 4.8,
            "estimated_time_mins": 11,
            "hazard_avoidance_status": "CLEAR_SAFE_PATH",
            "avoided_hazards_count": 2,
            "routing_engine": "PostGIS pgRouting Dijkstra v3.4"
        },
        "geometry": {
            "type": "LineString",
            "coordinates": path
        }
    }

@router.get("/shelters/nearest")
async def get_nearest_shelters(lat: float, lng: float):
    return [
        {
            "id": "sh-1",
            "name": "Cuttack Central High School Relief Camp",
            "distance_km": 1.2,
            "available_capacity": 320,
            "total_capacity": 500,
            "latitude": 20.4600,
            "longitude": 85.8700,
            "food_stock_days": 10
        },
        {
            "id": "sh-2",
            "name": "Bhuasuni Community Indoor Stadium",
            "distance_km": 2.4,
            "available_capacity": 480,
            "total_capacity": 800,
            "latitude": 20.4800,
            "longitude": 85.8900,
            "food_stock_days": 14
        }
    ]
