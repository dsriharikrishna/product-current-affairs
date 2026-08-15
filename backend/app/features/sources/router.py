from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.features.sources.repository import SourceRepository
from app.features.sources.schema import SourceResponse
from app.features.sources.service import SourceService
from app.shared.dependencies import get_db
from app.shared.responses.schema import SuccessResponse

router = APIRouter(prefix="/sources", tags=["Sources"])


def get_source_service(db: AsyncSession = Depends(get_db)) -> SourceService:
    repository = SourceRepository(db)
    return SourceService(repository)


@router.get("", response_model=SuccessResponse[list[SourceResponse]])
async def get_sources(
    service: SourceService = Depends(get_source_service),
):
    """
    Get all active sources.
    """
    sources = await service.get_sources()
    return SuccessResponse(data=sources)
