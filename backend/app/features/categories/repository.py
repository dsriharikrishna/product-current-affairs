from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.features.categories.model import Category


class CategoryRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_all_active(self) -> list[Category]:
        stmt = select(Category).where(Category.is_active == True).order_by(Category.display_order)
        result = await self.session.execute(stmt)
        return list(result.scalars().all())
