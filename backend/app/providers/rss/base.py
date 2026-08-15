import datetime
from abc import ABC, abstractmethod
from typing import Any, Optional
from pydantic import BaseModel


class NormalizedArticle(BaseModel):
    title: str
    description: Optional[str] = None
    content: Optional[str] = None
    image: Optional[str] = None
    source_name: Optional[str] = None
    source_url: str
    published_at: Optional[datetime.datetime] = None


class BaseRSSProvider(ABC):
    def __init__(self, source_name: str, category_name: str):
        self.source_name = source_name
        self.category_name = category_name

    @abstractmethod
    def parse_feed(self, parsed_feed: dict[str, Any]) -> list[NormalizedArticle]:
        """
        Parses a raw feedparser dictionary into a list of normalized articles.
        """
        pass
