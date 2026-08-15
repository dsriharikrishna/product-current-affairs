from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "Current Affairs Platform API"
    VERSION: str = "2.0"
    API_V1_STR: str = "/api/v1"
    
    # Database
    DATABASE_URL: str
    
    # Authentication
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    # External APIs
    CURRENTS_API_KEY: str
    CURRENTS_API_BASE_URL: str = "https://api.currentsapi.services/v1"
    NEWSDATA_API_KEY: str
    NEWSDATA_BASE_URL: str = "https://newsdata.io/api/1"
    RESET_TOKEN_EXPIRE_MINUTES: int
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_ignore_empty=True,
        extra="ignore",
    )

settings = Settings()
