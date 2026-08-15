# DATABASE.md

# Current Affairs Platform

## Database Design

Version: 1.0

Database: PostgreSQL

---

# 1. Overview

The database is designed to support a scalable Current Affairs platform.

Version 1 focuses only on:

* News
* Categories
* Sources
* Bookmarks
* User Preferences
* Cron Jobs

No AI tables.

No Quiz tables.

No Premium tables.

Future modules can be added without modifying the existing schema.

---

# 2. Design Principles

The database should be

* Normalized
* Scalable
* Easy to maintain
* Query optimized
* Audit friendly

Every table should include

* id
* created_at
* updated_at

---

# 3. Entity Relationship

```text
Users
   │
   ├──────────────┐
   │              │
   ▼              ▼
Bookmarks     Preferences
   │
   ▼
News
   │
   ▼
Categories

News
   │
   ▼
Sources

Cron Jobs
```

---

# 4. Tables

Current MVP

```text
users

preferences

categories

sources

news

bookmarks

cron_logs
```

---

# 5. Users

Purpose

Stores application users.

Columns

| Column     | Type      | Description   |
| ---------- | --------- | ------------- |
| id         | UUID      | Primary Key   |
| name       | VARCHAR   | User Name     |
| email      | VARCHAR   | Email         |
| avatar     | TEXT      | Profile Image |
| created_at | TIMESTAMP | Created Time  |
| updated_at | TIMESTAMP | Updated Time  |

Indexes

* email

---

# 6. Preferences

Purpose

Stores user settings.

Relationship

One User

↓

One Preference

Columns

| Column               | Type      |
| -------------------- | --------- |
| id                   | UUID      |
| user_id              | UUID      |
| theme                | VARCHAR   |
| notification_enabled | BOOLEAN   |
| preferred_categories | JSONB     |
| preferred_exams      | JSONB     |
| created_at           | TIMESTAMP |
| updated_at           | TIMESTAMP |

---

# 7. Categories

Purpose

Stores all news categories.

Columns

| Column        | Type    |
| ------------- | ------- |
| id            | SERIAL  |
| name          | VARCHAR |
| icon          | VARCHAR |
| color         | VARCHAR |
| display_order | INTEGER |
| is_active     | BOOLEAN |

Example

```text
National

International

Economy

Science

Technology

Sports

Environment

Defence

Awards

Education
```

---

# 8. Sources

Purpose

Stores all supported official sources.

Columns

| Column     | Type      |
| ---------- | --------- |
| id         | SERIAL    |
| name       | VARCHAR   |
| website    | TEXT      |
| rss_url    | TEXT      |
| category   | VARCHAR   |
| country    | VARCHAR   |
| is_active  | BOOLEAN   |
| created_at | TIMESTAMP |

Example

```text
PIB

RBI

ISRO

WHO

UN

NASA

IMF

World Bank
```

---

# 9. News

Purpose

Stores all published current affairs.

Columns

| Column       | Type      |
| ------------ | --------- |
| id           | UUID      |
| source_id    | INTEGER   |
| category_id  | INTEGER   |
| title        | TEXT      |
| slug         | VARCHAR   |
| description  | TEXT      |
| content      | TEXT      |
| image        | TEXT      |
| source_url   | TEXT      |
| published_at | TIMESTAMP |
| is_active    | BOOLEAN   |
| created_at   | TIMESTAMP |
| updated_at   | TIMESTAMP |

Relationships

News

↓

One Category

↓

One Source

---

# 10. Bookmarks

Purpose

Stores bookmarked articles.

Columns

| Column     | Type      |
| ---------- | --------- |
| id         | UUID      |
| user_id    | UUID      |
| news_id    | UUID      |
| created_at | TIMESTAMP |

Relationship

One User

↓

Many Bookmarks

↓

One News

Constraint

One user cannot bookmark the same article twice.

---

# 11. Cron Logs

Purpose

Stores scheduler execution history.

Columns

| Column            | Type      |
| ----------------- | --------- |
| id                | UUID      |
| job_name          | VARCHAR   |
| started_at        | TIMESTAMP |
| completed_at      | TIMESTAMP |
| status            | VARCHAR   |
| records_processed | INTEGER   |
| error_message     | TEXT      |

---

# 12. Relationships

```text
Users
   │
   └──────< Preferences

Users
   │
   └──────< Bookmarks >────── News

News
   │
   └────── Categories

News
   │
   └────── Sources
```

---

# 13. Indexes

Create indexes for

Users

* email

News

* category_id
* source_id
* published_at
* created_at

Bookmarks

* user_id
* news_id

Sources

* name

Categories

* name

---

# 14. Constraints

Users

Email must be unique.

Bookmarks

(user_id, news_id) must be unique.

Categories

Category name must be unique.

Sources

Source name must be unique.

---

# 15. Soft Delete

MVP

Not required.

Use

is_active

instead of deleting records.

---

# 16. Search Strategy

Search should support

* Title
* Description
* Category
* Source

Future

Use PostgreSQL Full Text Search.

---

# 17. Timeline Filters

Support

Today

Yesterday

This Week

This Month

This Year

Filter using

published_at

---

# 18. Data Retention

Keep all news permanently.

Never delete published news.

Future

Archive records older than five years.

---

# 19. Migration Strategy

Use Alembic.

Rules

* One migration per feature.
* Never edit an existing migration.
* Always create a new migration.
* Test migrations before production deployment.

---

# 20. Naming Conventions

Tables

snake_case

Columns

snake_case

Primary Keys

id

Foreign Keys

<entity>_id

Examples

```text
user_id

news_id

category_id

source_id
```

---

# 21. Performance Guidelines

* Use indexes for frequently queried columns.
* Avoid SELECT * in production queries.
* Paginate all list endpoints.
* Use database constraints to enforce integrity.
* Prefer joins over multiple queries where appropriate.

---

# 22. Future Tables (Not in MVP)

Reserved for future features:

```text
ai_summaries

mcqs

revision_packs

quizzes

quiz_attempts

notifications

downloads

premium_plans

subscriptions

analytics_events

study_streaks
```

These should be added only when the corresponding feature is implemented.

---

# 23. Definition of Done

A database change is complete only if:

* Schema is reviewed.
* Relationships are correct.
* Constraints are defined.
* Required indexes are added.
* Alembic migration is created.
* Migration is tested locally.
* Rollback is verified.
* Documentation is updated.

The database is the foundation of the platform. Changes should be deliberate, backward-compatible where possible, and accompanied by proper migrations and documentation.
