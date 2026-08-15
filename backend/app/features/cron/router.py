from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.features.cron.service import CronService
from app.shared.dependencies import get_db
from app.shared.responses.schema import SuccessResponse

router = APIRouter(prefix="/cron", tags=["Cron"])


def get_cron_service(db: AsyncSession = Depends(get_db)) -> CronService:
    return CronService(db)


@router.post("/trigger", response_model=SuccessResponse)
async def trigger_cron(
    service: CronService = Depends(get_cron_service),
):
    """
    Manually trigger the news fetching pipeline.
    """
    result = await service.run_pipeline()
    return SuccessResponse(message="Pipeline executed", data=result)
