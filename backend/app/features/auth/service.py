import logging
from typing import Optional

from app.core.security import (
    create_access_token,
    create_reset_token,
    get_password_hash,
    verify_password,
    verify_reset_token,
)
from app.features.auth.repository import AuthRepository
from app.features.auth.schema import Token, UserCreate
from app.features.users.model import User

logger = logging.getLogger(__name__)


class AuthService:
    def __init__(self, repository: AuthRepository):
        self.repository = repository

    async def authenticate_user(self, email: str, password: str) -> Optional[User]:
        user = await self.repository.get_user_by_email(email)
        if not user or not user.password_hash:
            return None
        if not verify_password(password, user.password_hash):
            return None
        return user

    async def register_user(self, user_in: UserCreate) -> Optional[User]:
        existing_user = await self.repository.get_user_by_email(user_in.email)
        if existing_user:
            return None
        hashed_password = get_password_hash(user_in.password)
        user = await self.repository.create_user(
            email=user_in.email, password_hash=hashed_password
        )
        return user

    def generate_token(self, user: User) -> Token:
        access_token = create_access_token(data={"sub": str(user.id)})
        return Token(access_token=access_token, token_type="bearer")

    async def generate_password_reset_token(self, email: str) -> Optional[str]:
        user = await self.repository.get_user_by_email(email)
        if not user:
            return None
        token = create_reset_token(email)
        return token

    async def reset_password(self, token: str, new_password: str) -> bool:
        email = verify_reset_token(token)
        if not email:
            return False
        user = await self.repository.get_user_by_email(email)
        if not user:
            return False
        
        hashed_password = get_password_hash(new_password)
        await self.repository.update_user_password(email, hashed_password)
        return True
