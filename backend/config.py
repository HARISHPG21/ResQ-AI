import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "ResQ-AI Disaster Response Intelligence Platform"
    API_VERSION: str = "v1"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "sih_2026_super_secret_jwt_token_key_resq_ai")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 # 24 Hours
    
    # Database URLs
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql+asyncpg://resq_admin:resq_secure_password_2026@localhost:5432/resq_db")
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    
    # Google Gemini API Key
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
