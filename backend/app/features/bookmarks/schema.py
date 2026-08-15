from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict

from app.features.news.schema import NewsResponse


from typing import Optional

class BookmarkCreateRequest(BaseModel):
    article_id: str
    title: str
    url: str
    image: Optional[str] = None
    source_name: Optional[str] = None


class BookmarkResponse(BaseModel):
    id: UUID
    created_at: datetime
    article_id: str
    title: str
    url: str
    image: Optional[str] = None
    source_name: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)
