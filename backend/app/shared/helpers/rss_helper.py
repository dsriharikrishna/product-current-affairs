from typing import Any
import feedparser
import httpx


async def fetch_and_parse_rss(url: str) -> dict[str, Any]:
    """
    Fetches an RSS feed asynchronously and parses it using feedparser.
    """
    async with httpx.AsyncClient() as client:
        response = await client.get(url, timeout=15.0)
        response.raise_for_status()
        
    # parse the content
    parsed_feed = feedparser.parse(response.text)
    return parsed_feed
