from typing import Optional

from sqlalchemy import Boolean, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base, SerialMixin


class Source(SerialMixin, Base):
    __tablename__ = "sources"

    name: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    website: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    rss_url: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    category: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    country: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    news_items: Mapped[list["News"]] = relationship(
        back_populates="source"
    )
