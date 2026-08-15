from typing import Optional

from pydantic import BaseModel, ConfigDict


class SourceResponse(BaseModel):
    id: int
    name: str
    website: Optional[str] = None
    category: Optional[str] = None
    country: Optional[str] = None
    is_active: bool

    model_config = ConfigDict(from_attributes=True)
