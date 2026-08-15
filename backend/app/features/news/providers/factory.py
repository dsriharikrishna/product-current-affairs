from app.features.news.providers.base_provider import BaseNewsProvider
from app.features.news.providers.newsdata_provider import NewsDataProvider

class NewsProviderFactory:
    _newsdata_provider = None
    
    @classmethod
    def get_newsdata_provider(cls) -> BaseNewsProvider:
        """
        Returns a singleton instance of the NewsData.io provider.
        """
        if cls._newsdata_provider is None:
            cls._newsdata_provider = NewsDataProvider()
        return cls._newsdata_provider
