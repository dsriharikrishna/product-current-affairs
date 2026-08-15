import uuid
from fastapi import HTTPException, status
from app.features.users.repository import UserRepository
from app.features.users.schema import UserUpdate, PreferenceUpdate

class UserService:
    def __init__(self, repository: UserRepository):
        self.repository = repository

    async def get_user_profile(self, user_id: uuid.UUID):
        user = await self.repository.get_user_by_id(user_id)
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        return user

    async def update_user_profile(self, user_id: uuid.UUID, data: UserUpdate):
        user = await self.repository.update_user(user_id, data)
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        return user

    async def get_user_preferences(self, user_id: uuid.UUID):
        pref = await self.repository.get_preferences(user_id)
        if not pref:
            # Return defaults if doesn't exist
            return {"user_id": user_id, "notification_enabled": True}
        return pref

    async def update_user_preferences(self, user_id: uuid.UUID, data: PreferenceUpdate):
        return await self.repository.update_preferences(user_id, data)
