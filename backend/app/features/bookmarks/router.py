import uuid

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.features.bookmarks.repository import BookmarkRepository
from app.features.bookmarks.schema import BookmarkCreateRequest, BookmarkResponse
from app.features.bookmarks.service import BookmarkService
from app.shared.dependencies import get_current_user_id, get_db
from app.shared.responses.schema import SuccessResponse

router = APIRouter(prefix="/bookmarks", tags=["Bookmarks"])


def get_bookmark_service(db: AsyncSession = Depends(get_db)) -> BookmarkService:
    repository = BookmarkRepository(db)
    return BookmarkService(repository)


@router.get("", response_model=SuccessResponse[list[BookmarkResponse]])
async def get_bookmarks(
    user_id: uuid.UUID = Depends(get_current_user_id),
    service: BookmarkService = Depends(get_bookmark_service),
):
    """
    Get all bookmarks for the current user.
    """
    bookmarks = await service.get_user_bookmarks(user_id)
    return SuccessResponse(data=bookmarks)


@router.post("", response_model=SuccessResponse, status_code=201)
async def create_bookmark(
    request: BookmarkCreateRequest,
    user_id: uuid.UUID = Depends(get_current_user_id),
    service: BookmarkService = Depends(get_bookmark_service),
):
    """
    Bookmark a news article.
    """
    success = await service.create_bookmark(user_id, request.model_dump())
    if not success:
        raise HTTPException(
            status_code=400, detail="Bookmark already exists"
        )
    return SuccessResponse(message="Bookmarked successfully")


@router.delete("/{id}", response_model=SuccessResponse)
async def delete_bookmark(
    id: uuid.UUID,
    user_id: uuid.UUID = Depends(get_current_user_id),
    service: BookmarkService = Depends(get_bookmark_service),
):
    """
    Remove a bookmark.
    """
    success = await service.delete_bookmark(user_id, id)
    if not success:
        raise HTTPException(status_code=404, detail="Bookmark not found")
    return SuccessResponse(message="Bookmark removed successfully")
