from typing import Optional

from sqlalchemy import Boolean, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base, SerialMixin


class Category(SerialMixin, Base):
    __tablename__ = "categories"

    name: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    icon: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    color: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    display_order: Mapped[int] = mapped_column(Integer, default=0)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    news_items: Mapped[list["News"]] = relationship(
        back_populates="category"
    )
