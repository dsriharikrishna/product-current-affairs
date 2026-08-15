# Current Affairs Platform

> Production-ready Current Affairs platform for Competitive Exam Aspirants.

---

# Overview

This project consists of two applications:

* **Frontend:** React Native Expo mobile application.
* **Backend:** FastAPI REST API with automated news ingestion.

The platform automatically collects current affairs from trusted official sources, stores them in PostgreSQL, and serves them to the mobile application.

The initial MVP focuses on providing a clean reading experience without AI-generated content.

---

# Repository Structure

```text
project/

docs/

frontend/

backend/
```

---

# Documentation

| File            | Description                               |
| --------------- | ----------------------------------------- |
| PRODUCT.md      | Product requirements and roadmap          |
| FRONTEND_APP.md | Mobile architecture and development guide |
| BACKEND.md      | Backend architecture and API guide        |
| TESTING.md      | Testing and QA standards                  |
| DELIVERY.md     | Deployment and release guide              |

---

# Product

The product targets students preparing for:

* UPSC
* APPSC
* TSPSC
* SSC
* Banking
* Railways
* Police
* Defence
* State PSC

Primary goal:

> Deliver daily current affairs in a simple, fast, and distraction-free experience.

---

# Architecture

```text
Official Sources
        │
        ▼
FastAPI Cron Jobs
        │
        ▼
PostgreSQL
        │
        ▼
REST APIs
        │
        ▼
React Native Expo App
```

---

# Technology Stack

## Mobile

* React Native Expo
* Expo Router
* TypeScript
* NativeWind
* Zustand
* TanStack Query
* MMKV
* FlashList

## Backend

* FastAPI
* PostgreSQL
* SQLAlchemy
* Alembic
* APScheduler
* Docker

## Infrastructure

* AWS
* S3
* Nginx
* GitHub Actions

---

# Development Workflow

```text
Requirement
    ↓
Architecture
    ↓
Backend
    ↓
Frontend
    ↓
Testing
    ↓
Deployment
```

---

# Branch Strategy

```text
main
develop
feature/*
bugfix/*
release/*
```

---

# Coding Standards

* Feature-Based Architecture
* TypeScript Strict Mode
* Clean Code
* Reusable Components
* Repository Pattern
* Service Layer
* Absolute Imports
* Conventional Commits

---

# MVP Features

* Current Affairs
* Categories
* Search
* Bookmarks
* Notifications

No AI.
No CMS.
No Premium.

---

# Future Features

* AI Summaries
* AI MCQs
* Revision
* Monthly PDFs
* Offline Reading
* Premium Subscription
* Analytics
* Multi-language

---

# Project Goal

Build a scalable, production-ready platform that can evolve from a simple current affairs reader into a complete competitive exam companion while maintaining clean architecture and low operational cost.
