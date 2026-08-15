import asyncio
import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from app.core.security import get_password_hash
import app.main  # This imports the router which imports all models recursively
from app.features.users.model import User

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://postgres:postgres@db:5432/current_affairs")

engine = create_async_engine(DATABASE_URL)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def seed_admin():
    async with AsyncSessionLocal() as session:
        admin_email = os.getenv("ADMIN_EMAIL", "admin@example.com")
        admin_password = os.getenv("ADMIN_PASSWORD", "admin123")

        # Check if admin already exists
        from sqlalchemy import select
        stmt = select(User).where(User.email == admin_email)
        result = await session.execute(stmt)
        admin = result.scalar_one_or_none()
        
        if admin:
            print(f"Admin user already exists with email: {admin_email}")
            return

        new_admin = User(
            name="Admin",
            email=admin_email,
            password_hash=get_password_hash(admin_password)
        )
        session.add(new_admin)
        await session.commit()
        print(f"Admin user seeded successfully with email: {admin_email}, password: {admin_password}")

if __name__ == "__main__":
    asyncio.run(seed_admin())
