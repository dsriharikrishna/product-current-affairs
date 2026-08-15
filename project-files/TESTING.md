# TESTING.md

# Current Affairs Platform

## Testing Strategy & Quality Assurance

Version: 1.0

---

# 1. Objective

The purpose of testing is to ensure that every release is:

* Stable
* Reliable
* Fast
* Bug-free
* Production-ready

Testing should be performed throughout development, not only before release.

---

# 2. Testing Scope

The project includes two applications:

* React Native Expo Mobile App
* FastAPI Backend

Both applications must be tested independently and together.

---

# 3. Testing Levels

## Unit Testing

Test individual functions, utilities, hooks, services, and repositories.

Examples:

* Date formatting
* Search filters
* Bookmark utilities
* Validation functions

---

## Integration Testing

Verify communication between modules.

Examples:

* Frontend ↔ Backend APIs
* Cron Job → Database
* API → Mobile App
* Bookmark API → Local Storage

---

## End-to-End Testing

Validate complete user flows.

Examples:

* Open app
* Browse current affairs
* Search
* Bookmark
* Remove bookmark
* Open article

---

# 4. Frontend Testing Checklist

## Navigation

* Splash opens correctly
* Onboarding completes
* Bottom navigation works
* Deep navigation works
* Back navigation works

---

## Home

Verify:

* Breaking News loads
* Latest News loads
* Categories display correctly
* Timeline filters work
* Pull-to-refresh works

---

## Categories

Verify:

* Categories load
* Category selection works
* Category articles display correctly

---

## Search

Verify:

* Keyword search
* Empty search
* No-result state
* Search history (if implemented)

---

## Article Detail

Verify:

* Image loads
* Title displays
* Description displays
* Source link opens
* Share works
* Bookmark works

---

## Bookmarks

Verify:

* Add bookmark
* Remove bookmark
* Bookmark persistence after app restart

---

## Notifications

Verify:

* Permission request
* Notification received
* Notification opens correct screen

---

# 5. Backend Testing Checklist

## Authentication

* Login
* Invalid credentials
* Expired token
* Unauthorized access

---

## News APIs

Verify:

* Latest news
* Today filter
* Week filter
* Month filter
* Pagination
* Sorting

---

## Search

Verify:

* Keyword search
* Category search
* Date filter
* Invalid query handling

---

## Bookmarks

Verify:

* Create
* Delete
* Duplicate bookmark prevention

---

## Cron Jobs

Verify:

* RSS fetch
* Duplicate detection
* Database insertion
* Failure logging
* Retry behavior

---

# 6. Database Testing

Verify:

* Table creation
* Foreign keys
* Constraints
* Indexes
* Duplicate handling
* Data integrity

---

# 7. Performance Testing

Frontend

* App launch time
* Screen transition speed
* Scroll performance
* Memory usage

Backend

* API response time
* Database query time
* Concurrent request handling

---

# 8. Error Handling

Verify:

* Network failure
* Timeout
* Invalid data
* Empty responses
* Server errors (500)
* Unauthorized (401)
* Not Found (404)

Users should always receive clear and friendly error messages.

---

# 9. Device Testing

Android

* Small screens
* Medium screens
* Large screens
* Tablets (optional)

Test on both emulator and at least one physical device.

---

# 10. Browser & API Testing

Use:

* Postman or Bruno
* Swagger (OpenAPI)

Verify all endpoints before frontend integration.

---

# 11. Regression Testing

Before every release, ensure that previously working features still function correctly.

Key regression areas:

* Home
* Search
* Bookmarks
* Notifications
* Navigation
* Cron jobs

---

# 12. Release Checklist

Before publishing a new version:

* No critical crashes
* No broken navigation
* APIs working
* Cron jobs running
* Notifications working
* Bookmarks persistent
* Version updated
* Changelog prepared

---

# 13. Bug Reporting Format

Each bug should include:

* Title
* Environment
* Steps to reproduce
* Expected result
* Actual result
* Severity
* Screenshot or screen recording
* Logs (if applicable)

---

# 14. Severity Levels

Critical

* App crash
* Data loss
* Security issue

High

* Major feature broken
* API unavailable

Medium

* Incorrect UI
* Validation issue

Low

* Alignment
* Typography
* Minor visual issues

---

# 15. Definition of Done

A release is considered ready only if:

* All planned features are complete.
* Unit tests pass.
* Integration tests pass.
* End-to-end testing is successful.
* No critical or high-severity bugs remain.
* Performance is acceptable.
* Documentation is updated.
* Release checklist is complete.

Quality is a continuous process, not a final step before deployment.
