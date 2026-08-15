import logging

from app.core.database import AsyncSessionLocal
from app.features.cron.service import CronService
from app.tasks.scheduler import scheduler

logger = logging.getLogger(__name__)


async def fetch_news_job():
    logger.info("Starting fetch_news_job...")
    async with AsyncSessionLocal() as session:
        service = CronService(session)
        try:
            result = await service.run_pipeline()
            logger.info(f"fetch_news_job completed: {result}")
            
            prune_result = await service.prune_old_data(days=30)
            logger.info(f"pruned {prune_result} old articles")
            
        except Exception as e:
            logger.error(f"fetch_news_job failed: {e}")


def setup_jobs():
    # Run every 30 minutes
    scheduler.add_job(
        fetch_news_job,
        "interval",
        minutes=30,
        id="fetch_news_job",
        replace_existing=True,
    )
