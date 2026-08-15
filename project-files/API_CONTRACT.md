# API_CONTRACT.md

# Current Affairs Platform

## REST API Contract

Version: 1.0

---

# Overview

This document defines the contract between the Mobile Application and the Backend.
The frontend should never assume API structures. Both frontend and backend must follow this contract.

---

# Base URL

Development
```text
http://localhost:8000/api/v1
```

Production
```text
https://api.yourdomain.com/api/v1
```

---

# Authentication

The backend uses JWT token-based authentication.
For endpoints that require authentication (like `/bookmarks`), pass the token in the `Authorization` header:
`Authorization: Bearer <token>`

---

# Standard Response Format

## Success
```json
{
    "success": true,
    "message": "Success",
    "data": {} 
}
```

## Error
```json
{
    "success": false,
    "message": "Something went wrong",
    "errors": []
}
```

---

# News Endpoints

## GET /news/latest
Get the latest news articles.

**Query Params:**
- `language` (optional, e.g. en)
- `country` (optional, e.g. US, IN)
- `category` (optional)
- `page_size` (default: 30)
- `cursor` (optional, for pagination)

## GET /news/search
Search for news articles with advanced filters.

**Query Params:**
- `keywords` (optional)
- `category` (optional)
- `country` (optional)
- `language` (optional)
- `author` (optional)
- `domain` (optional)
- `start_date` (optional, YYYY-MM-DD)
- `end_date` (optional, YYYY-MM-DD)
- `page_size` (default: 30)
- `cursor` (optional)

## GET /news/trending
Get the latest trending news (top 20 articles).

## GET /news/breaking
Get the top 10 breaking news articles.

## GET /news/category/{category}
Get latest news for a specific category.

**Query Params:**
- `page_size` (default: 30)
- `cursor` (optional)

## GET /news/country/{country_code}
Get latest news for a specific country using its ISO code (e.g., IN, US).

**Query Params:**
- `page_size` (default: 30)
- `cursor` (optional)

## GET /news/keyword/{keyword}
Search news specifically by a keyword.

**Query Params:**
- `page_size` (default: 30)
- `cursor` (optional)

---

# India Specific News (NewsData.io)

## GET /news/india/latest
Get the latest news articles from India.

**Query Params:**
- `category` (optional)
- `cursor` (optional)

## GET /news/india/search
Search for news articles from India.

**Query Params:**
- `keywords` (optional)
- `category` (optional)
- `language` (optional)
- `cursor` (optional)

## GET /news/india/category/{category}
Get latest India news for a specific category.

**Query Params:**
- `cursor` (optional)

---

# Categories

## GET /categories
Returns all active categories.

**Response:**
```json
{
    "success": true,
    "message": "Success",
    "data": [
        {
            "id": "uuid-string",
            "name": "technology",
            "display_name": "Technology"
        }
    ]
}
```

---

# Sources

## GET /sources
Returns all active sources.

**Response:**
```json
{
    "success": true,
    "message": "Success",
    "data": [
        {
            "id": "uuid-string",
            "name": "PIB",
            "url": "https://pib.gov.in"
        }
    ]
}
```

---

# Bookmarks (Requires Authentication)

## GET /bookmarks
Returns bookmarked articles for the current user.

## POST /bookmarks
Bookmark a news article.

**Body:**
```json
{
    "news_id": "uuid-string-or-id"
}
```

## DELETE /bookmarks/{id}
Remove a bookmark by its ID.

---

# Authentication

## POST /auth/register
Register a new user.

**Body:**
```json
{
    "email": "user@example.com",
    "password": "strongpassword",
    "full_name": "John Doe"
}
```

## POST /auth/login
Login to get an access token.
Uses `OAuth2PasswordRequestForm`.

**Body (Form Data):**
- `username`: user's email
- `password`: user's password

**Response:**
```json
{
    "success": true,
    "message": "Login successful",
    "data": {
        "access_token": "jwt-token-here",
        "token_type": "bearer"
    }
}
```

## POST /auth/forgot-password
Generate a password reset token.

**Body:**
```json
{
    "email": "user@example.com"
}
```

## POST /auth/reset-password
Reset password using the token.

**Body:**
```json
{
    "token": "reset-token-here",
    "new_password": "new-strong-password"
}
```

---

# Health

## GET /health

**Response:**
```json
{
    "status": "ok",
    "version": "1.0.0"
}
```

---

# Status Codes

* `200` Success
* `201` Created
* `204` Deleted
* `400` Bad Request
* `401` Unauthorized
* `404` Not Found
* `422` Validation Error
* `500` Internal Server Error
