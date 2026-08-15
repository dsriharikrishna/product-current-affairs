import httpx
from fastapi import HTTPException
from typing import Dict, Any, List, Optional

from app.core.config import settings
from app.features.news.schema import NormalizedNewsArticle, NormalizedNewsResponse
from app.features.news.providers.base_provider import BaseNewsProvider
from app.utils.cache import async_ttl_cache

class NewsDataProvider(BaseNewsProvider):
    def __init__(self):
        self.base_url = settings.NEWSDATA_BASE_URL.rstrip('/')
        self.api_key = settings.NEWSDATA_API_KEY

    async def _fetch(self, endpoint: str, params: Dict[str, Any] = None) -> Dict[str, Any]:
        if params is None:
            params = {}
            
        params["apikey"] = self.api_key
        params["removeduplicate"] = "1"
        params["sort"] = "source"
        
        params = {k: v for k, v in params.items() if v is not None and v != ""}

        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.get(
                    f"{self.base_url}{endpoint}",
                    params=params,
                    headers={"Accept": "application/json"}
                )
                
            if response.status_code == 401:
                raise HTTPException(status_code=401, detail="Invalid API key or unauthorized access.")
            elif response.status_code == 429:
                raise HTTPException(status_code=429, detail="Rate limit exceeded.")
            elif response.status_code >= 400:
                raise HTTPException(status_code=response.status_code, detail=f"NewsData API error: {response.text}")
                
            data = response.json()
            if data.get("status") == "error":
                raise HTTPException(status_code=400, detail=data.get("results", {}).get("message", "Unknown error from NewsData API"))
                
            return data
            
        except httpx.ReadTimeout:
            raise HTTPException(status_code=504, detail="Timeout while communicating with NewsData API.")
        except httpx.RequestError as exc:
            raise HTTPException(status_code=502, detail=f"Network failure: {str(exc)}")
        except ValueError:
            raise HTTPException(status_code=502, detail="Invalid JSON response from provider.")

    def _process_articles(self, raw_news: List[Dict[str, Any]]) -> List[NormalizedNewsArticle]:
        articles = []
        for item in raw_news:
            image = item.get("image_url")
            if not isinstance(image, str) or image == "None":
                image = ""

            cat = item.get("category", [])
            if isinstance(cat, str):
                cat = [cat]
            
            author_data = item.get("creator")
            if isinstance(author_data, list) and len(author_data) > 0:
                author_str = author_data[0]
            else:
                author_str = str(author_data) if author_data else ""

            country_data = item.get("country")
            country_str = country_data[0] if isinstance(country_data, list) and country_data else ""
            
            source_name = item.get("source_id", "")
            source_link = item.get("link", "")
            
            content = item.get("content", "")
            disclaimer = f"\n\n---\n*Source: {source_name}*\n*Disclaimer: This content is aggregated from {source_name}. All credits belong to the original author and publication. [Read full article]({source_link})*"
            content = content + disclaimer if content else disclaimer

            articles.append(
                NormalizedNewsArticle(
                    id=item.get("article_id", ""),
                    title=item.get("title", ""),
                    description=item.get("description", ""),
                    content=content,
                    image=image,
                    author=author_str,
                    source=source_name,
                    category=cat,
                    country=country_str,
                    language=item.get("language", ""),
                    published_at=item.get("pubDate", ""),
                    source_url=source_link
                )
            )
        return articles

    @async_ttl_cache(maxsize=128, ttl=300)
    async def get_latest_news(
        self,
        language: Optional[str] = None,
        country: Optional[str] = None,
        category: Optional[str] = None,
        page_size: Optional[int] = None,
        cursor: Optional[str] = None
    ) -> NormalizedNewsResponse:
        
        params = {
            "language": language,
            "country": country,
            "category": category,
            "page": cursor
        }
        
        data = await self._fetch("/latest", params)
        articles = self._process_articles(data.get("results", []))
        
        return NormalizedNewsResponse(
            status="success",
            count=len(articles),
            next_cursor=data.get("nextPage"),
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
        page_size: Optional[int] = None,
        cursor: Optional[str] = None
    ) -> NormalizedNewsResponse:
        
        params = {
            "q": keywords,
            "category": category,
            "country": country,
            "language": language,
            "page": cursor
        }
        
        data = await self._fetch("/latest", params)
        articles = self._process_articles(data.get("results", []))
        
        return NormalizedNewsResponse(
            status="success",
            count=len(articles),
            next_cursor=data.get("nextPage"),
            data=articles
        )
