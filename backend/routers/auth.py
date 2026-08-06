from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel
from datetime import datetime, timedelta
from jose import jwt
from config import settings

router = APIRouter()

class LoginRequest(BaseModel):
    email: str
    password: str
    role_code: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role_code: str
    user_name: str

ROLES_LIST = [
    "CITIZEN", "VOLUNTEER", "NGO", "POLICE", "FIRE", 
    "HOSPITAL", "NDRF", "DISTRICT_COLLECTOR", 
    "STATE_ADMIN", "NATIONAL_ADMIN"
]

@router.post("/login", response_model=TokenResponse)
async def login(req: LoginRequest):
    if req.role_code.upper() not in ROLES_LIST:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid role. Allowed roles: {ROLES_LIST}"
        )
    
    # Token generation for SIH demo
    payload = {
        "sub": req.email,
        "role": req.role_code.upper(),
        "exp": datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    
    return TokenResponse(
        access_token=token,
        role_code=req.role_code.upper(),
        user_name=f"Officer ({req.role_code.replace('_', ' ').title()})"
    )

@router.get("/roles")
async def get_all_roles():
    return {"roles": ROLES_LIST}
