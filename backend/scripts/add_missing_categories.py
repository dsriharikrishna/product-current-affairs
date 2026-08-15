import asyncio
import sys
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import AsyncSessionLocal
from app.features.categories.model import Category
from app.features.news.model import News
from app.features.sources.model import Source
from sqlalchemy import select

async def add_data():
    async with AsyncSessionLocal() as session:
        categories = ["Sports", "Business", "Health", "Entertainment", "World", "Technology", "National"]
        for c_name in categories:
            stmt = select(Category).where(Category.name == c_name)
            result = await session.execute(stmt)
            if not result.scalars().first():
                print(f"Adding {c_name}...")
                session.add(Category(name=c_name))
        await session.commit()
        print("Categories added successfully!")

if __name__ == "__main__":
    if sys.platform == 'win32':
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(add_data())
