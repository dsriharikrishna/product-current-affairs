from datetime import datetime
from email.utils import parsedate_to_datetime
from typing import Any

from app.providers.rss.base import BaseRSSProvider, NormalizedArticle


class GenericRSSProvider(BaseRSSProvider):
    def parse_feed(self, parsed_feed: dict[str, Any]) -> list[NormalizedArticle]:
        articles = []
        for entry in parsed_feed.get("entries", []):
            title = entry.get("title", "").strip()
            if not title:
                continue
                
            link = entry.get("link", "").strip()
            description = entry.get("summary", "") or entry.get("description", "")
            
            # Simple content fallback
            content = ""
            if "content" in entry and len(entry["content"]) > 0:
                content = entry["content"][0].get("value", "")

            # Add a mandatory disclaimer to ensure attribution
            disclaimer = f"\n\n---\n*Source: {self.source_name}*\n*Disclaimer: This content is aggregated from {self.source_name}. All credits belong to the original author and publication. [Read full article]({link})*"
            content = content + disclaimer if content else disclaimer

            published_at = None
            if "published" in entry:
                try:
                    published_at = parsedate_to_datetime(entry["published"])
                except (TypeError, ValueError):
                    pass

            # Enhanced image extraction logic
            image = None
            if "media_content" in entry and len(entry["media_content"]) > 0:
                image = entry["media_content"][0].get("url")
            elif "media_thumbnail" in entry and len(entry["media_thumbnail"]) > 0:
                image = entry["media_thumbnail"][0].get("url")
            elif "enclosures" in entry:
                for enc in entry["enclosures"]:
                    if "image" in enc.get("type", ""):
                        image = enc.get("href")
                        break
            
            # Fallback: regex search for img tags in content or description if image is still None
            if not image:
                import re
                img_match = re.search(r'<img[^>]+src="([^">]+)"', content or description or "")
                if img_match:
                    image = img_match.group(1)

            articles.append(
                NormalizedArticle(
                    title=title,
                    description=description,
                    content=content,
                    image=image,
                    source_name=self.source_name,
                    source_url=link,
                    published_at=published_at,
                )
            )
        return articles
