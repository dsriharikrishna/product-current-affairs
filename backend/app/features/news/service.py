import math
import uuid
from typing import Optional

from app.features.news.mapper import to_news_detail_response, to_news_response
from app.features.news.repository import NewsRepository
from app.features.news.schema import NewsDetailResponse, NewsResponse
from app.shared.responses.schema import PaginationMeta


class NewsService:
    def __init__(self, repository: NewsRepository):
        self.repository = repository

    async def get_news(
        self,
        page: int,
        page_size: int,
        category: Optional[str] = None,
        timeline: Optional[str] = None,
        search: Optional[str] = None,
    ) -> tuple[list[NewsResponse], PaginationMeta]:
        news_items, total = await self.repository.get_news_list(
            page=page,
            page_size=page_size,
            category=category,
            timeline=timeline,
            search=search,
        )

        responses = [to_news_response(news) for news in news_items]
        
        total_pages = math.ceil(total / page_size) if page_size > 0 else 0
        pagination = PaginationMeta(
            page=page,
            page_size=page_size,
            total=total,
            total_pages=total_pages,
        )
        return responses, pagination

    async def get_news_by_id(self, news_id: uuid.UUID) -> Optional[NewsDetailResponse]:
        news = await self.repository.get_news_by_id(news_id)
        if news:
            return to_news_detail_response(news)
        return None
