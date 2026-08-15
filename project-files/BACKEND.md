# BACKEND.md

# Current Affairs Platform

## Backend Architecture

**Version:** 2.0

**Framework:** FastAPI

---

# 1. Overview

The backend is responsible for:

* Automatically collecting current affairs from trusted official sources.
* Parsing RSS/XML feeds.
* Normalizing news data.
* Removing duplicate articles.
* Categorizing articles.
* Storing data in PostgreSQL.
* Exposing REST APIs for the mobile application.
* Running scheduled background jobs.
* Providing a scalable foundation for future AI features.

The backend is designed to be **fully automated**.

* ❌ No CMS
* ❌ No Manual Data Entry
* ❌ No AI in MVP

---

# 2. Technology Stack

## Framework

* FastAPI
* Python 3.13+

## Configuration

* Pydantic v2
* pydantic-settings

## Database

* PostgreSQL
* SQLAlchemy 2.x
* Alembic

## Background Jobs

* APScheduler

## Networking

* httpx

## RSS Parsing

* feedparser

## HTML Parsing (Fallback)

* BeautifulSoup4

## Validation

* Pydantic v2

## Caching (Future)

* Redis

## Code Quality

* Ruff
* Black
* isort
* mypy

## Testing

* pytest

## Deployment

* Docker
* Docker Compose
* AWS
* Nginx
* GitHub Actions

---

# 3. Architecture

The backend follows **Feature-Based Architecture**.

Each feature owns its own:

* Router
* Service
* Repository
* Model
* Schema
* Validators
* Dependencies
* Exceptions
* Helpers
* Utilities
* Constants

Business logic should never exist inside routers.

Routers → Services → Repositories → Database

---

# 4. Folder Structure

```text
backend/

app/
│
├── api/
│
├── core/
│
├── shared/
│
├── features/
│
├── providers/
│
├── tasks/
│
└── main.py

tests/

scripts/

docker/

alembic/

requirements.txt

pyproject.toml
```

---

# 5. Core

Contains global application configuration.

```text
core/

settings.py

config.py

database.py

scheduler.py

security.py

logging.py

middleware.py

exceptions.py

constants.py
```

Responsibilities

* Environment Variables
* Database Connection
* Scheduler
* JWT
* Security
* Middleware
* Logging
* Application Constants

---

# 6. Shared

Reusable code used across all features.

```text
shared/

responses/

pagination/

validators/

exceptions/

dependencies/

helpers/

utils/

types/

enums/

mixins/
```

---

# 7. Helpers vs Utils

## Helpers

Application-specific reusable logic.

```text
helpers/

rss_helper.py

news_helper.py

response_helper.py

duplicate_helper.py

http_helper.py

file_helper.py
```

Examples

* Fetch RSS Feed
* Normalize News
* Remove Duplicates
* Build API Responses

---

## Utils

Generic utility functions.

```text
utils/

date.py

slug.py

string.py

hash.py

jwt.py

json.py

pagination.py

time.py

url.py
```

Examples

* Format Date
* Generate Slug
* Hash String
* JWT Helper
* JSON Serialization

---

# 8. Providers

Third-party integrations.

```text
providers/

rss/

storage/

notifications/
```

Example

```text
rss/

pib.py

rbi.py

who.py

un.py

isro.py

storage/

s3.py
```

---

# 9. Tasks

Background scheduled jobs.

```text
tasks/

fetch_news.py

cleanup_logs.py

daily_statistics.py
```

Executed by APScheduler.

---

# 10. Features

Every business feature follows the same structure.

```text
features/

auth/

users/

news/

categories/

bookmarks/

search/

sources/

notifications/

cron/
```

---

# 11. Feature Structure

Example: News Module

```text
news/

router.py

service.py

repository.py

model.py

schema.py

mapper.py

validator.py

dependencies.py

constants.py

exceptions.py

helper.py

utils.py

__init__.py
```

---

# 12. Source Module

Responsible for managing official data sources.

Responsibilities

* Source Registration
* RSS URLs
* Source Status
* Source Validation

Supported Sources

Government

* PIB
* RBI
* ISRO
* DRDO
* MyGov
* SEBI
* NITI Aayog

International

* WHO
* UN
* IMF
* World Bank
* UNESCO

Sports

* ICC
* IOC

---

# 13. Cron Module

Responsibilities

* Fetch RSS
* Parse XML
* Normalize Data
* Remove Duplicates
* Save Articles
* Generate Logs

Schedule

Every Hour

* Fetch RSS
* Normalize
* Save News

Daily

* Generate Statistics

Weekly

* Cleanup Logs

---

# 14. Data Pipeline

```text
Official Sources

↓

RSS Feed

↓

HTTP Client

↓

RSS Parser

↓

Normalizer

↓

Duplicate Detection

↓

Validation

↓

PostgreSQL

↓

REST APIs

↓

React Native App
```

---

# 15. Database

Core Tables

* users
* preferences
* news
* categories
* sources
* bookmarks
* cron_logs

Future Tables

* quizzes
* revision
* ai_summaries
* notifications
* analytics

---

# 16. Repository Pattern

Repositories contain database access only.

Responsibilities

* CRUD
* Search
* Pagination
* Filtering
* Sorting

Repositories should never contain business logic.

---

# 17. Service Layer

Services contain business logic.

Examples

* Duplicate Detection
* RSS Processing
* Search Logic
* Timeline Filters
* Validation Rules

Services should never access HTTP request objects.

---

# 18. Validation

Use Pydantic v2 for all request and response models.

Custom validators belong inside each feature.

Example

```text
validators/

news_validator.py

bookmark_validator.py

search_validator.py
```

---

# 19. Exception Handling

Global exception hierarchy.

```text
exceptions/

base.py

validation.py

not_found.py

unauthorized.py

forbidden.py

conflict.py

database.py

external_api.py
```

All exceptions return a consistent API response.

---

# 20. Response Format

Success

```json
{
  "success": true,
  "message": "Success",
  "data": {},
  "pagination": {}
}
```

Error

```json
{
  "success": false,
  "message": "Validation Failed",
  "errors": []
}
```

---

# 21. Logging

Log

* API Requests
* API Errors
* Cron Jobs
* RSS Parsing
* External API Failures
* Database Errors

Centralize logging inside the `core` layer.

---

# 22. Security

Use

* JWT Authentication (Future)
* HTTPS
* Environment Variables
* Input Validation
* Rate Limiting
* CORS
* Security Headers

Never expose secrets in source code.

---

# 23. Deployment

Support

* Docker
* Docker Compose
* AWS EC2 / Lightsail
* Nginx
* GitHub Actions
* Health Checks

---

# 24. Development Workflow

```text
Requirement

↓

Create Feature

↓

Model

↓

Schema

↓

Repository

↓

Service

↓

Router

↓

Testing

↓

Documentation

↓

Pull Request

↓

Merge
```

---

# 25. MVP Scope

Included

* RSS Collection
* Duplicate Detection
* Categories
* Search
* Bookmarks
* REST APIs
* Scheduled Jobs

Not Included

* AI
* CMS
* Admin Dashboard
* Payments
* Analytics
* Premium

---

# 26. Future Modules

The architecture should support adding new features without changing the existing structure.

Examples

```text
features/

ai/

revision/

quiz/

recommendation/

analytics/

downloads/

premium/
```

---

# 27. Definition of Done

A backend feature is complete only if:

* Database schema finalized.
* SQLAlchemy model created.
* Pydantic schemas implemented.
* Repository completed.
* Service layer implemented.
* Router documented.
* Validation completed.
* Exceptions handled.
* Logging added.
* Unit tests written.
* API documentation updated.
* Docker build successful.
* Feature reviewed and merged.

No feature should be deployed unless it satisfies every item in this checklist.
