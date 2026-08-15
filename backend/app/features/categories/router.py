from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.features.categories.repository import CategoryRepository
from app.features.categories.schema import CategoryResponse
from app.features.categories.service import CategoryService
from app.shared.dependencies import get_db
from app.shared.responses.schema import SuccessResponse

router = APIRouter(prefix="/categories", tags=["Categories"])


def get_category_service(db: AsyncSession = Depends(get_db)) -> CategoryService:
    repository = CategoryRepository(db)
    return CategoryService(repository)


@router.get("", response_model=SuccessResponse[list[CategoryResponse]])
async def get_categories(
    service: CategoryService = Depends(get_category_service),
):
    """
    Get all active categories.
    """
    categories = await service.get_categories()
    return SuccessResponse(data=categories)
