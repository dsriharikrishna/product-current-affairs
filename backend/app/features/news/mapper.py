from app.features.news.model import News
from app.features.news.schema import NewsDetailResponse, NewsResponse


def to_news_response(news: News) -> NewsResponse:
    return NewsResponse(
        id=news.id,
        title=news.title,
        description=news.description,
        image=news.image,
        category=news.category.name if news.category else None,
        source=news.source.name if news.source else None,
        published_at=news.published_at,
    )


def to_news_detail_response(news: News) -> NewsDetailResponse:
    return NewsDetailResponse(
        id=news.id,
        title=news.title,
        description=news.description,
        content=news.content,
        image=news.image,
        category=news.category.name if news.category else None,
        source=news.source.name if news.source else None,
        source_url=news.source_url,
        published_at=news.published_at,
    )
