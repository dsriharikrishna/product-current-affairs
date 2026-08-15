import uuid
from typing import Optional, Dict, Any
from pydantic import BaseModel, EmailStr

class PreferenceBase(BaseModel):
    theme: Optional[str] = None
    notification_enabled: bool = True
    preferred_categories: Optional[Dict[str, Any]] = None
    preferred_exams: Optional[Dict[str, Any]] = None

class PreferenceUpdate(PreferenceBase):
    pass

class PreferenceResponse(PreferenceBase):
    user_id: uuid.UUID

    class Config:
        from_attributes = True

class UserBase(BaseModel):
    name: str
    email: EmailStr
    avatar: Optional[str] = None

class UserUpdate(BaseModel):
    name: Optional[str] = None
    avatar: Optional[str] = None

class UserResponse(UserBase):
    id: uuid.UUID
    preference: Optional[PreferenceResponse] = None

    class Config:
        from_attributes = True
