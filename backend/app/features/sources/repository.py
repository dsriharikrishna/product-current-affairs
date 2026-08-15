from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.features.sources.model import Source


class SourceRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_all_active(self) -> list[Source]:
        stmt = select(Source).where(Source.is_active == True).order_by(Source.name)
        result = await self.session.execute(stmt)
        return list(result.scalars().all())
