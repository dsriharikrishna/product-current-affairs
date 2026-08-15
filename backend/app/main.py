from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.core.config import settings
from app.features.categories.router import router as categories_router
from app.features.sources.router import router as sources_router
from app.features.news.router import router as news_router
from app.features.bookmarks.router import router as bookmarks_router
from app.features.cron.router import router as cron_router
from app.features.auth.router import router as auth_router
from app.features.users.router import router as users_router
from app.tasks.scheduler import start_scheduler, stop_scheduler
from app.tasks.fetch_news import setup_jobs

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    setup_jobs()
    start_scheduler()
    yield
    # Shutdown
    stop_scheduler()

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan,
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the actual origins
    allow_credentials=False, # Must be False when allow_origins is ["*"]
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(categories_router, prefix=settings.API_V1_STR)
app.include_router(sources_router, prefix=settings.API_V1_STR)
app.include_router(news_router, prefix=settings.API_V1_STR)
app.include_router(bookmarks_router, prefix=settings.API_V1_STR)
app.include_router(cron_router, prefix=settings.API_V1_STR)
app.include_router(auth_router, prefix=settings.API_V1_STR)
app.include_router(users_router, prefix=settings.API_V1_STR)

from fastapi.responses import RedirectResponse

@app.get("/", include_in_schema=False)
async def root():
    return RedirectResponse(url="/docs")

@app.get("/health")
async def health_check():
    return {"status": "ok", "version": settings.VERSION}
