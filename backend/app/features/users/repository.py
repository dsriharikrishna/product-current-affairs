import uuid
from typing import Optional

from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.features.users.model import User, Preference
from app.features.users.schema import UserUpdate, PreferenceUpdate

class UserRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_user_by_id(self, user_id: uuid.UUID) -> Optional[User]:
        stmt = select(User).options(selectinload(User.preference)).where(User.id == user_id)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def update_user(self, user_id: uuid.UUID, data: UserUpdate) -> Optional[User]:
        update_data = data.model_dump(exclude_unset=True)
        if not update_data:
            return await self.get_user_by_id(user_id)
            
        stmt = update(User).where(User.id == user_id).values(**update_data)
        await self.session.execute(stmt)
        await self.session.commit()
        return await self.get_user_by_id(user_id)

    async def get_preferences(self, user_id: uuid.UUID) -> Optional[Preference]:
        stmt = select(Preference).where(Preference.user_id == user_id)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def update_preferences(self, user_id: uuid.UUID, data: PreferenceUpdate) -> Optional[Preference]:
        update_data = data.model_dump(exclude_unset=True)
        
        pref = await self.get_preferences(user_id)
        if not pref:
            # Create if doesn't exist
            pref = Preference(user_id=user_id, **update_data)
            self.session.add(pref)
            await self.session.commit()
            await self.session.refresh(pref)
            return pref
            
        if update_data:
            stmt = update(Preference).where(Preference.user_id == user_id).values(**update_data)
            await self.session.execute(stmt)
            await self.session.commit()
            
        return await self.get_preferences(user_id)
