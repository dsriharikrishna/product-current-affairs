import uuid
from datetime import datetime, timedelta, timezone
from typing import Optional

from sqlalchemy import func, or_, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.features.categories.model import Category
from app.features.news.model import News
from app.features.sources.model import Source


class NewsRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_news_list(
        self,
        page: int,
        page_size: int,
        category: Optional[str] = None,
        timeline: Optional[str] = None,
        search: Optional[str] = None,
    ) -> tuple[list[News], int]:
        stmt = select(News).options(selectinload(News.category), selectinload(News.source)).where(News.is_active == True)

        if category:
            # Join category to filter by name
            stmt = stmt.join(News.category).where(func.lower(Category.name) == category.lower())

        if timeline:
            now = datetime.now(timezone.utc)
            if timeline == "today":
                start_date = now - timedelta(days=1)
            elif timeline == "week":
                start_date = now - timedelta(weeks=1)
            elif timeline == "month":
                start_date = now - timedelta(days=30)
            elif timeline == "year":
                start_date = now - timedelta(days=365)
            else:
                start_date = None

            if start_date:
                stmt = stmt.where(News.published_at >= start_date)

        if search:
            search_term = f"%{search}%"
            stmt = stmt.where(
                or_(
                    News.title.ilike(search_term),
                    News.description.ilike(search_term),
                    News.content.ilike(search_term),
                )
            )

        # Count total
        count_stmt = select(func.count()).select_from(stmt.subquery())
        total_result = await self.session.execute(count_stmt)
        total = total_result.scalar() or 0

        # Pagination
        stmt = stmt.order_by(News.published_at.desc().nulls_last())
        stmt = stmt.offset((page - 1) * page_size).limit(page_size)

        result = await self.session.execute(stmt)
        return list(result.scalars().all()), total

    async def get_news_by_id(self, news_id: uuid.UUID) -> Optional[News]:
        stmt = select(News).options(
            selectinload(News.category), selectinload(News.source)
        ).where(News.id == news_id, News.is_active == True)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()
