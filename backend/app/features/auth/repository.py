from typing import Optional

from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.features.users.model import User


class AuthRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_user_by_email(self, email: str) -> Optional[User]:
        stmt = select(User).where(User.email == email)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def create_user(self, email: str, password_hash: str) -> User:
        # We set name to email prefix for MVP
        name = email.split('@')[0]
        user = User(email=email, name=name, password_hash=password_hash)
        self.session.add(user)
        await self.session.commit()
        await self.session.refresh(user)
        return user

    async def update_user_password(self, email: str, new_password_hash: str) -> None:
        stmt = update(User).where(User.email == email).values(password_hash=new_password_hash)
        await self.session.execute(stmt)
        await self.session.commit()
