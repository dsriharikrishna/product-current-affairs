import asyncio
import datetime
import uuid
import logging
from typing import Any

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.features.cron.model import CronLog
from app.features.news.model import News
from app.features.sources.model import Source
from app.providers.rss.generic import GenericRSSProvider
from app.shared.helpers.rss_helper import fetch_and_parse_rss

logger = logging.getLogger(__name__)


class CronService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def run_pipeline(self) -> dict[str, Any]:
        """
        Executes the main data pipeline: fetch -> parse -> deduplicate -> save.
        """
        start_time = datetime.datetime.utcnow()
        articles_added = 0
        errors = 0
        details = []

        # Get sources with RSS URLs
        stmt = select(Source).where(Source.is_active == True, Source.rss_url.isnot(None))
        result = await self.session.execute(stmt)
        sources = result.scalars().all()

        for source in sources:
            try:
                # 1. Fetch and Parse
                provider = GenericRSSProvider(source_name=source.name, category_name=source.category or "")
                raw_feed = await fetch_and_parse_rss(source.rss_url)
                articles = provider.parse_feed(raw_feed)

                # 2. Deduplicate and Save
                added_for_source = 0
                for article in articles:
                    # Check if article already exists by source_url
                    exists_stmt = select(News.id).where(News.source_url == article.source_url)
                    exists_result = await self.session.execute(exists_stmt)
                    if not exists_result.scalar_one_or_none():
                        new_news = News(
                            title=article.title,
                            description=article.description,
                            content=article.content,
                            image=article.image,
                            source_url=article.source_url,
                            published_at=article.published_at or datetime.datetime.utcnow(),
                            source_id=source.id,
                            category_id=None,  # We would resolve Category here if needed
                        )
                        self.session.add(new_news)
                        added_for_source += 1
                        articles_added += 1

                await self.session.commit()
                details.append(f"{source.name}: Added {added_for_source} articles")

            except Exception as e:
                logger.error(f"Error processing source {source.name}: {e}")
                errors += 1
                details.append(f"{source.name}: Error - {str(e)}")

        # 3. Log to CronLog
        end_time = datetime.datetime.utcnow()
        log_entry = CronLog(
            job_name="fetch_news",
            started_at=start_time,
            completed_at=end_time,
            status="SUCCESS" if errors == 0 else "PARTIAL" if articles_added > 0 else "FAILED",
            records_processed=articles_added,
            error_message=" | ".join(details)
        )
        self.session.add(log_entry)
        await self.session.commit()

        return {
            "status": log_entry.status,
            "articles_added": articles_added,
            "errors": errors,
            "details": details
        }

    async def prune_old_data(self, days: int = 30) -> int:
        """
        Deletes news articles older than a specific number of days.
        """
        from sqlalchemy import delete
        
        cutoff_date = datetime.datetime.utcnow() - datetime.timedelta(days=days)
        
        try:
            stmt = delete(News).where(News.published_at < cutoff_date)
            result = await self.session.execute(stmt)
            await self.session.commit()
            
            deleted_count = result.rowcount
            logger.info(f"Pruned {deleted_count} articles older than {days} days.")
            return deleted_count
        except Exception as e:
            logger.error(f"Failed to prune old data: {e}")
            await self.session.rollback()
            return 0
