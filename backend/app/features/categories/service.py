from app.features.categories.repository import CategoryRepository
from app.features.categories.schema import CategoryResponse


class CategoryService:
    def __init__(self, repository: CategoryRepository):
        self.repository = repository

    async def get_categories(self) -> list[CategoryResponse]:
        categories = await self.repository.get_all_active()
        # The schema uses from_attributes=True, so it can parse SQLAlchemy models directly
        return [CategoryResponse.model_validate(c) for c in categories]
