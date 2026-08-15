from typing import Optional, Dict, Any
from abc import ABC, abstractmethod
from app.features.news.schema import NormalizedNewsResponse

class BaseNewsProvider(ABC):
    @abstractmethod
    async def get_latest_news(
        self,
        language: Optional[str] = None,
        country: Optional[str] = None,
        category: Optional[str] = None,
        page_size: Optional[int] = 30,
        cursor: Optional[str] = None
    ) -> NormalizedNewsResponse:
        """
        Fetch latest news.
        """
        pass

    @abstractmethod
    async def search_news(
        self,
        keywords: Optional[str] = None,
        category: Optional[str] = None,
        country: Optional[str] = None,
        language: Optional[str] = None,
        author: Optional[str] = None,
        domain: Optional[str] = None,
        start_date: Optional[str] = None,
        end_date: Optional[str] = None,
        page_size: Optional[int] = 30,
        cursor: Optional[str] = None
    ) -> NormalizedNewsResponse:
        """
        Search for news.
        """
        pass
