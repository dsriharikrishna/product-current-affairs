import uuid
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.features.users.repository import UserRepository
from app.features.users.service import UserService
from app.features.users.schema import UserResponse, UserUpdate, PreferenceResponse, PreferenceUpdate
from app.shared.dependencies import get_db, get_current_user_id
from app.shared.responses.schema import SuccessResponse

router = APIRouter(prefix="/users", tags=["Users"])

def get_user_service(db: AsyncSession = Depends(get_db)) -> UserService:
    return UserService(UserRepository(db))

@router.get("/me", response_model=SuccessResponse[UserResponse])
async def get_my_profile(
    user_id: uuid.UUID = Depends(get_current_user_id),
    service: UserService = Depends(get_user_service),
):
    """Get the current user's profile."""
    user = await service.get_user_profile(user_id)
    return SuccessResponse(data=user)

@router.put("/me", response_model=SuccessResponse[UserResponse])
async def update_my_profile(
    data: UserUpdate,
    user_id: uuid.UUID = Depends(get_current_user_id),
    service: UserService = Depends(get_user_service),
):
    """Update the current user's profile."""
    user = await service.update_user_profile(user_id, data)
    return SuccessResponse(data=user)

@router.get("/me/preferences", response_model=SuccessResponse[PreferenceResponse])
async def get_my_preferences(
    user_id: uuid.UUID = Depends(get_current_user_id),
    service: UserService = Depends(get_user_service),
):
    """Get the current user's preferences."""
    pref = await service.get_user_preferences(user_id)
    return SuccessResponse(data=pref)

@router.put("/me/preferences", response_model=SuccessResponse[PreferenceResponse])
async def update_my_preferences(
    data: PreferenceUpdate,
    user_id: uuid.UUID = Depends(get_current_user_id),
    service: UserService = Depends(get_user_service),
):
    """Update the current user's preferences."""
    pref = await service.update_user_preferences(user_id, data)
    return SuccessResponse(data=pref)
