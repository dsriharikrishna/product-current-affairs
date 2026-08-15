import uuid
from typing import Optional

from sqlalchemy import delete, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.features.bookmarks.model import Bookmark


class BookmarkRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_user_bookmarks(self, user_id: uuid.UUID) -> list[Bookmark]:
        stmt = (
            select(Bookmark)
            .where(Bookmark.user_id == user_id)
            .order_by(Bookmark.created_at.desc())
        )
        result = await self.session.execute(stmt)
        return list(result.scalars().all())

    async def create_bookmark(
        self, user_id: uuid.UUID, data: dict
    ) -> Optional[Bookmark]:
        bookmark = Bookmark(user_id=user_id, **data)
        self.session.add(bookmark)
        try:
            await self.session.commit()
            await self.session.refresh(bookmark)
            return bookmark
        except IntegrityError:
            await self.session.rollback()
            return None

    async def delete_bookmark(self, user_id: uuid.UUID, bookmark_id: uuid.UUID) -> bool:
        stmt = delete(Bookmark).where(
            Bookmark.id == bookmark_id, Bookmark.user_id == user_id
        )
        result = await self.session.execute(stmt)
        await self.session.commit()
        return result.rowcount > 0
