# DELIVERY.md

# Current Affairs Platform

## Delivery, Deployment & Release Guide

Version: 1.0

---

# 1. Objective

This document defines how the application is developed, tested, deployed, and released.

Every release should follow the same process to ensure consistency, stability, and quality.

---

# 2. Project Structure

```text
current-affairs-platform/

├── docs/
├── frontend/
├── backend/
└── .github/
```

---

# 3. Environments

The project uses three environments.

## Development

Purpose

* Local development
* Feature implementation
* Debugging

Frontend

```text
ENV=development
API_URL=http://localhost:8000
```

Backend

```text
ENV=development
DATABASE_URL=postgresql://...
```

---

## Staging

Purpose

* QA Testing
* API Validation
* Performance Verification

This environment should closely match Production.

---

## Production

Purpose

Public application.

Only stable code should be deployed here.

---

# 4. Git Workflow

Branch Structure

```text
main

develop

feature/<feature-name>

bugfix/<bug-name>

release/<version>
```

Examples

```text
feature/search

feature/bookmarks

bugfix/api-timeout

release/v1.0.0
```

---

# 5. Development Workflow

```text
Requirement

↓

Architecture Review

↓

Backend Development

↓

Frontend Development

↓

Integration

↓

Testing

↓

Code Review

↓

Merge into develop

↓

Staging Deployment

↓

QA Approval

↓

Merge into main

↓

Production Release
```

---

# 6. Pull Request Rules

Every Pull Request must include:

* Feature Summary
* Screenshots (Frontend)
* API Changes (Backend)
* Test Results
* Related Issue

Checklist

* Code Reviewed
* No Console Logs
* No Dead Code
* Lint Passed
* Tests Passed

---

# 7. Versioning

Use Semantic Versioning.

Format

```text
MAJOR.MINOR.PATCH
```

Examples

```text
1.0.0

1.0.1

1.1.0

2.0.0
```

Guidelines

* PATCH → Bug fixes
* MINOR → New backward-compatible features
* MAJOR → Breaking changes

---

# 8. Backend Deployment

Deployment Target

* AWS Lightsail or EC2
* Docker
* Docker Compose
* Nginx

Deployment Steps

1. Pull latest code
2. Install dependencies
3. Run Alembic migrations
4. Build Docker images
5. Start containers
6. Verify Health Check
7. Monitor Logs

Health Endpoint

```http
GET /health
```

Should return:

```json
{
  "status": "healthy"
}
```

---

# 9. Frontend Deployment

Steps

1. Update version
2. Update release notes
3. Generate production build
4. Test release build
5. Upload to Play Console
6. Submit for review
7. Monitor rollout

---

# 10. Database Deployment

Before every release:

* Backup database
* Apply migrations
* Verify schema
* Validate indexes
* Test rollback

Never modify production data manually.

---

# 11. Release Checklist

Frontend

* App builds successfully
* No crashes
* API integration verified
* Icons updated
* Splash screen verified
* Version updated

Backend

* Health check passes
* APIs tested
* Cron jobs running
* Logs verified
* Database migration successful

Documentation

* Changelog updated
* Version updated
* API changes documented

---

# 12. Monitoring

Monitor

Frontend

* Crash Rate
* App Launch Time
* ANRs
* User Sessions

Backend

* CPU
* Memory
* Disk
* API Response Time
* Error Rate
* Cron Execution
* Database Connections

---

# 13. Logging

Frontend

Log

* Network Errors
* Unexpected Exceptions
* App Crashes

Backend

Log

* API Requests
* API Errors
* Cron Jobs
* RSS Fetch Failures
* Database Errors

Logs should include timestamps and enough context to diagnose issues.

---

# 14. Rollback Strategy

If a production issue occurs:

Frontend

* Pause rollout (if possible)
* Revert to previous app version in the release pipeline

Backend

* Redeploy previous stable version
* Restore database only if necessary
* Verify health endpoint
* Monitor logs

Always investigate the root cause before re-releasing.

---

# 15. Security

* Never commit secrets to Git.
* Use environment variables for credentials.
* Enable HTTPS in production.
* Rotate secrets when required.
* Validate all external input.
* Keep dependencies up to date.

---

# 16. Backup Strategy

Database

* Daily automated backup
* Weekly full backup

Storage

* Version important files
* Verify backup restoration periodically

---

# 17. Future Improvements

As the platform grows, consider adding:

* CI/CD with GitHub Actions
* Automated testing in pull requests
* Infrastructure as Code (Terraform)
* Container orchestration (ECS or Kubernetes)
* Centralized log aggregation
* Metrics dashboards
* Alerting and incident response

---

# 18. Production Definition of Done

A release is production-ready only if:

* All planned features are complete.
* Documentation is updated.
* Code review is approved.
* Tests pass.
* Staging validation succeeds.
* Database migration is verified.
* Monitoring is active.
* Rollback plan is confirmed.
* Version is tagged.
* Release notes are published.

Following this process helps ensure predictable, stable releases and simplifies collaboration as the project grows.
