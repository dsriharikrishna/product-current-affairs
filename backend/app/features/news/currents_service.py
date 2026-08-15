import httpx
from fastapi import HTTPException, status
from typing import Dict, Any, List, Optional
from datetime import datetime
from app.core.config import settings
from app.features.news.schema import CurrentsArticle, CurrentsNewsResponse
from app.utils.cache import async_ttl_cache

class CurrentsService:
    def __init__(self):
        self.base_url = settings.CURRENTS_API_BASE_URL.rstrip('/')
        self.headers = {
            "Authorization": f"Bearer {settings.CURRENTS_API_KEY}"
        }

    async def _fetch(self, endpoint: str, params: Dict[str, Any] = None) -> Dict[str, Any]:
        """
        Generic HTTP GET request handler with error handling.
        """
        if params is None:
            params = {}
            
        # Clean up empty params
        params = {k: v for k, v in params.items() if v is not None and v != ""}

        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.get(
                    f"{self.base_url}{endpoint}",
                    headers=self.headers,
                    params=params
                )
                
            if response.status_code == 401:
                raise HTTPException(status_code=401, detail="Invalid API key or unauthorized access.")
            elif response.status_code == 429:
                raise HTTPException(status_code=429, detail="Rate limit exceeded.")
            elif response.status_code >= 400:
                raise HTTPException(status_code=response.status_code, detail=f"Currents API error: {response.text}")
                
            data = response.json()
            if data.get("status") != "ok":
                # Some error from Currents
                raise HTTPException(status_code=400, detail=data.get("message", "Unknown error from Currents API"))
                
            return data
            
        except httpx.ReadTimeout:
            raise HTTPException(status_code=504, detail="Timeout while communicating with Currents API.")
        except httpx.RequestError as exc:
            raise HTTPException(status_code=502, detail=f"Network failure: {str(exc)}")

    def _process_articles(self, raw_news: List[Dict[str, Any]], limit: Optional[int] = None) -> List[CurrentsArticle]:
        """
        Deduplicates by URL, sorts by date, and parses to schema.
        """
        seen_urls = set()
        articles = []
        for item in raw_news:
            url = item.get("url")
            if not url or url in seen_urls:
                continue
            seen_urls.add(url)
            
            # Map API fields to our schema
            image = item.get("image")
            if not isinstance(image, str) or image == "None":
                image = ""

            # Sometimes category is a list, sometimes string
            cat = item.get("category", [])
            if isinstance(cat, str):
                cat = [cat]

            articles.append(
                CurrentsArticle(
                    id=item.get("id", ""),
                    title=item.get("title", ""),
                    description=item.get("description", ""),
                    url=url,
                    image=image,
                    author=item.get("author", ""),
                    published=item.get("published", ""),
                    language=item.get("language", ""),
                    category=cat,
                    source=item.get("source", "")
                )
            )

        # Sort by latest published date
        articles.sort(key=lambda x: x.published, reverse=True)
        
        if limit:
            articles = articles[:limit]
            
        return articles

    @async_ttl_cache(maxsize=128, ttl=300)
    async def get_latest_news(
        self,
        language: Optional[str] = None,
        country: Optional[str] = None,
        category: Optional[str] = None,
        page_size: Optional[int] = 30,
        cursor: Optional[str] = None
    ) -> CurrentsNewsResponse:
        
        if category:
            category = category.lower()
            category_mapping = {
                "national": "regional"
            }
            category = category_mapping.get(category, category)

        params = {
            "language": language,
            "country": country,
            "category": category,
            "page_number": cursor
        }
        
        data = await self._fetch("/latest-news", params)
        articles = self._process_articles(data.get("news", []))
        
        next_cursor = str(int(cursor) + 1) if cursor and cursor.isdigit() else "2"
        
        return CurrentsNewsResponse(
            status="success",
            count=len(articles),
            next_cursor=next_cursor,
            data=articles
        )

    @async_ttl_cache(maxsize=128, ttl=300)
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
    ) -> CurrentsNewsResponse:
        
        if category:
            category = category.lower()
            category_mapping = {
                "national": "regional"
            }
            category = category_mapping.get(category, category)

        params = {
            "keywords": keywords,
            "category": category,
            "country": country,
            "language": language,
            "author": author,
            "domain": domain,
            "start_date": start_date,
            "end_date": end_date,
            "limit": page_size,
            "page_number": cursor
        }
        
        data = await self._fetch("/search", params)
        articles = self._process_articles(data.get("news", []))
        
        next_cursor = str(int(cursor) + 1) if cursor and cursor.isdigit() else "2"
        
        return CurrentsNewsResponse(
            status="success",
            count=len(articles),
            next_cursor=next_cursor,
            data=articles
        )

    @async_ttl_cache(maxsize=128, ttl=300)
    async def get_trending_news(self) -> CurrentsNewsResponse:
        data = await self._fetch("/latest-news", {})
        articles = self._process_articles(data.get("news", []), limit=20)
        
        return CurrentsNewsResponse(
            status="success",
            count=len(articles),
            data=articles
        )

    @async_ttl_cache(maxsize=128, ttl=300)
    async def get_breaking_news(self) -> CurrentsNewsResponse:
        data = await self._fetch("/latest-news", {})
        articles = self._process_articles(data.get("news", []), limit=10)
        
        return CurrentsNewsResponse(
            status="success",
            count=len(articles),
            data=articles
        )

currents_service = CurrentsService()
