from datetime import datetime
from typing import Optional, List, Any

from pydantic import BaseModel, ConfigDict


class CurrentsArticle(BaseModel):
    id: str
    title: str
    description: str
    url: str
    image: str
    author: str
    published: str
    language: str
    category: List[str]
    source: str

    model_config = ConfigDict(from_attributes=True)


class CurrentsNewsResponse(BaseModel):
    status: str = "success"
    count: int
    next_cursor: Optional[str] = None
    data: List[CurrentsArticle]


class NewsResponse(BaseModel):
    id: str
    title: str
    description: Optional[str] = None
    image: Optional[str] = None
    category: Optional[str] = None
    source: Optional[str] = None
    published_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)

class NewsDetailResponse(NewsResponse):
    content: Optional[str] = None
    full_content: Optional[str] = None
    video_url: Optional[str] = None
    source_url: Optional[str] = None


class NormalizedNewsArticle(BaseModel):
    id: str
    title: str
    description: Optional[str] = None
    content: Optional[str] = None
    image: Optional[str] = None
    author: Optional[str] = None
    source: Optional[str] = None
    category: List[str] = []
    country: Optional[str] = None
    language: Optional[str] = None
    published_at: Optional[str] = None
    source_url: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class NormalizedNewsResponse(BaseModel):
    status: str = "success"
    count: int
    next_cursor: Optional[str] = None
    data: List[NormalizedNewsArticle]
