# Getting Started

Follow these instructions to start the Current Affairs backend application and database.

## Prerequisites

- **Docker Desktop** (Make sure it's running)
- **Python 3.11+** (If running backend manually)

## Starting the App with Docker

The easiest way to start both the PostgreSQL database and the FastAPI backend is using Docker Compose.

1. Open a terminal in the root directory.
2. Run the following command:
   ```bash
   docker-compose up -d
   ```
3. The API will be available at: `http://localhost:8000/docs`

## Applying Database Migrations

Once the database is running for the first time, you must apply the Alembic migrations to create the tables.

2. Run the migrations inside the backend container:
   ```bash
   docker-compose exec backend alembic upgrade head
   ```

## Local Development (Without Docker Backend)

If you prefer to run the backend manually (for development/debugging) while the database runs in Docker:

1. Stop the backend container: `docker-compose stop backend`
2. Ensure you have activated your virtual environment inside `backend/`.
3. Install dependencies: `pip install -r requirements.txt`
4. Start the FastAPI server:
   ```bash
   uvicorn app.main:app --reload
   ```

## Endpoints

- **Swagger UI**: `http://localhost:8000/docs`
- **Health Check**: `http://localhost:8000/health`
