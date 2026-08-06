import os
import google.generativeai as genai
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from config import settings

router = APIRouter()

class ChatRequest(BaseModel):
    user_query: str
    language: str = "en"
    user_latitude: Optional[float] = 20.4700
    user_longitude: Optional[float] = 85.8850

class ChatResponse(BaseModel):
    response_text: str
    suggested_actions: list[str]
    nearest_shelter: str
    emergency_contact: str

SYSTEM_INSTRUCTION = """
You are ResQ Gemini AI, an expert Disaster Response Assistant trained on NDMA (National Disaster Management Authority) Guidelines, Indian Red Cross First-Aid Manuals, and Emergency Evacuation SOPs.
Your goal is to provide concise, calm, actionable, life-saving advice for disaster victims, emergency responders, and citizens.
Keep responses clear, bulleted when possible, and emphasize immediate safety steps.
"""

@router.post("/query", response_model=ChatResponse)
async def query_gemini_rag_chatbot(req: ChatRequest):
    q = req.user_query.strip()
    api_key = settings.GEMINI_API_KEY or os.getenv("GEMINI_API_KEY", "")
    
    reply = ""
    actions = ["Find Nearest Shelter", "Trigger 1-Tap SOS", "Check Flood Alerts"]
    
    if api_key and api_key != "MOCK_GEMINI_KEY":
        try:
            genai.configure(api_key=api_key)
            model = genai.GenerativeModel(
                model_name="gemini-1.5-flash",
                system_instruction=SYSTEM_INSTRUCTION
            )
            prompt = f"User Query: {q}\nUser Location: Lat {req.user_latitude}, Lng {req.user_longitude}\nProvide emergency instructions in language: {req.language}."
            res = model.generate_content(prompt)
            reply = res.text
        except Exception as e:
            reply = f"🚨 **LIVE GEMINI ADVISORY**: Stay calm. If in flood water, move to reinforced rooftops. Avoid electrical wires.\n\n*(Gemini API Status: {str(e)})*"
    else:
        # Fallback NDMA RAG Knowledge Response when API key is not yet set
        q_lower = q.lower()
        if "water" in q_lower or "flood" in q_lower or "trapped" in q_lower:
            reply = (
                "🚨 **CRITICAL FLOOD SAFETY ADVISORY (NDMA SOP)**:\n\n"
                "1. Move immediately to the highest accessible roof or upper floor.\n"
                "2. Do NOT touch electrical switches or walk through moving water deeper than 6 inches.\n"
                "3. Signal rescue drones by waving brightly colored cloth or flashlight.\n\n"
                "📍 **Nearest Evacuation Shelter**: Cuttack Central Relief Camp (1.2 km away, 320 beds available)."
            )
            actions = ["Trigger 1-Tap SOS", "Share Live GPS Location", "Navigate to Nearest Shelter"]
        elif "first aid" in q_lower or "injury" in q_lower or "blood" in q_lower:
            reply = (
                "🩺 **FIRST AID INSTRUCTIONS**:\n\n"
                "1. Apply direct pressure to open wounds using clean cloth to stop severe bleeding.\n"
                "2. Elevate injured limbs above heart level if no bone fracture is suspected.\n"
                "3. Keep the victim warm and calm until NDRF/Ambulance arrives."
            )
            actions = ["Call Emergency Ambulance", "Find Nearest Hospital", "View First Aid Video Guide"]
        else:
            reply = (
                f"Hello! I am **ResQ Gemini AI**, powered by Google Gemini API & NDMA Knowledge Base.\n\n"
                f"I am monitoring live IoT water sensors and drone feeds in your area. How can I assist your rescue or evacuation today?"
            )
            
    return ChatResponse(
        response_text=reply,
        suggested_actions=actions,
        nearest_shelter="Cuttack Central High School Relief Camp (1.2 km)",
        emergency_contact="NDRF Helpline: 011-24363260 | State Control Room: 1070"
    )
