import asyncio
import uuid
import sys
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import AsyncSessionLocal
from app.features.categories.model import Category
from app.features.sources.model import Source
from app.features.news.model import News
from app.features.users.model import User, Preference
from app.features.bookmarks.model import Bookmark
from app.features.cron.model import CronLog
from sqlalchemy import select

async def seed_data():
    async with AsyncSessionLocal() as session:
        # Check if categories already exist
        stmt = select(Category)
        result = await session.execute(stmt)
        if result.scalars().first():
            print("Database already seeded.")
            return

        print("Seeding categories...")
        cat_national = Category(name="National")
        cat_tech = Category(name="Technology")
        cat_sports = Category(name="Sports")
        cat_business = Category(name="Business")
        cat_health = Category(name="Health")
        cat_entertainment = Category(name="Entertainment")
        cat_world = Category(name="World")
        
        cats = [cat_national, cat_tech, cat_sports, cat_business, cat_health, cat_entertainment, cat_world]
        session.add_all(cats)
        await session.commit()
        for cat in cats:
            await session.refresh(cat)
        
        print("Seeding sources...")
        sources = [
            Source(
                name="PIB Delhi",
                url="https://pib.gov.in",
                rss_url="https://pib.gov.in/rss/Mainstream.xml",
                language="en",
                is_active=True
            ),
            Source(
                name="RBI Press Releases",
                url="https://rbi.org.in",
                rss_url="https://www.rbi.org.in/home.aspx",
                language="en",
                is_active=True
            )
        ]
        session.add_all(sources)
        await session.commit()
        print("Seed completed successfully!")

if __name__ == "__main__":
    # Workaround for Windows asyncio bug
    if sys.platform == 'win32':
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(seed_data())
