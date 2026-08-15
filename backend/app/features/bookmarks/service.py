import uuid
from typing import Optional

from app.features.bookmarks.repository import BookmarkRepository
from app.features.bookmarks.schema import BookmarkResponse



class BookmarkService:
    def __init__(self, repository: BookmarkRepository):
        self.repository = repository

    async def get_user_bookmarks(self, user_id: uuid.UUID) -> list[BookmarkResponse]:
        bookmarks = await self.repository.get_user_bookmarks(user_id)
        
        responses = []
        for b in bookmarks:
            responses.append(
                BookmarkResponse(
                    id=b.id,
                    created_at=b.created_at,
                    article_id=b.article_id,
                    title=b.title,
                    url=b.url,
                    image=b.image,
                    source_name=b.source_name
                )
            )
        return responses

    async def create_bookmark(
        self, user_id: uuid.UUID, data: dict
    ) -> bool:
        bookmark = await self.repository.create_bookmark(user_id, data)
        return bookmark is not None

    async def delete_bookmark(self, user_id: uuid.UUID, bookmark_id: uuid.UUID) -> bool:
        return await self.repository.delete_bookmark(user_id, bookmark_id)
