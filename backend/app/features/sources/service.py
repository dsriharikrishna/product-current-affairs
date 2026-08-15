from app.features.sources.repository import SourceRepository
from app.features.sources.schema import SourceResponse


class SourceService:
    def __init__(self, repository: SourceRepository):
        self.repository = repository

    async def get_sources(self) -> list[SourceResponse]:
        sources = await self.repository.get_all_active()
        return [SourceResponse.model_validate(s) for s in sources]
