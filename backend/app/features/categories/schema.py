from typing import Optional

from pydantic import BaseModel, ConfigDict


class CategoryResponse(BaseModel):
    id: int
    name: str
    icon: Optional[str] = None
    color: Optional[str] = None
    display_order: int
    is_active: bool

    model_config = ConfigDict(from_attributes=True)
