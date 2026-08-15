# PRODUCT.md

# Current Affairs Platform

> Product Requirement Document (PRD)

Version: 1.0

Status: MVP

---

# 1. Product Vision

Build a simple, fast, and reliable mobile application that helps competitive exam aspirants stay updated with daily current affairs from trusted official sources.

The product should eliminate the need for students to browse multiple websites by providing one centralized platform for exam-relevant news.

The long-term vision is to evolve into an intelligent exam companion with AI-powered revision, quizzes, and personalized learning.

---

# 2. Problem Statement

Students preparing for competitive exams currently:

* Visit multiple websites every day.
* Follow several Telegram channels.
* Read lengthy articles.
* Waste time filtering irrelevant news.
* Miss important updates.
* Struggle to revise consistently.

Most existing platforms are heavily focused on coaching, advertisements, and information overload.

Our goal is to provide a clean and focused reading experience.

---

# 3. Target Users

The primary audience includes students preparing for:

* UPSC
* APPSC
* TSPSC
* SSC
* Banking
* Railways
* Police
* Defence
* State PSC

---

# 4. Product Goals

The application should:

* Deliver current affairs quickly.
* Provide reliable information.
* Minimize distractions.
* Offer an intuitive user experience.
* Scale easily for future features.

---

# 5. MVP Scope

The MVP includes only the essential features required to validate the product.

## Included

* Daily Current Affairs
* Categories
* Search
* Bookmarks
* Push Notifications
* Timeline Filters
* Article Details
* User Preferences

## Excluded

* AI Summaries
* AI MCQs
* Revision Mode
* Premium Features
* PDFs
* Mock Tests
* Admin CMS

---

# 6. User Flow

```text
Splash
   │
   ▼
Onboarding
   │
   ▼
Choose Preferred Exams
   │
   ▼
Home
   │
   ├── Categories
   ├── Search
   ├── Bookmarks
   ├── Profile
   └── Article Details
```

---

# 7. Navigation Structure

Bottom Navigation

* Home
* Categories
* Search
* Bookmarks
* Profile

Additional Screens

* Splash
* Onboarding
* Article Detail
* Settings

---

# 8. Core Features

## Home

Displays

* Breaking News
* Latest News
* Today's Current Affairs
* This Week
* This Month
* Categories

---

## Categories

Available categories:

* National
* International
* Economy
* Science
* Technology
* Defence
* Environment
* Sports
* Awards
* Government Schemes
* Education

---

## Search

Supports:

* Keyword Search
* Category Filter
* Date Filter

---

## Article Detail

Displays:

* Featured Image
* Title
* Description
* Source
* Published Date
* Open Original Source
* Bookmark
* Share

---

## Bookmarks

Users can:

* Save Articles
* Remove Bookmarks
* Read Offline (future)

---

## Notifications

Daily notification:

> "Today's Current Affairs are available."

---

# 9. Data Sources

The platform only consumes trusted and publicly available sources.

Examples:

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
* United Nations
* World Bank
* IMF
* UNESCO

Sports

* ICC
* IOC

The backend automatically fetches and processes content from these sources.

---

# 10. Non-Functional Requirements

The application should be:

* Fast
* Responsive
* Secure
* Scalable
* Offline-friendly
* Accessible
* Easy to maintain

---

# 11. Success Metrics

The MVP will be considered successful if it achieves:

* Daily Active Users (DAU)
* User Retention
* Average Reading Time
* Number of Bookmarked Articles
* Notification Open Rate
* Search Usage
* App Stability (Crash-Free Sessions > 99%)

---

# 12. Future Roadmap

## Phase 2

* AI Summaries
* AI Categories
* AI MCQs
* Weekly Revision
* Monthly Revision
* Offline Reading

---

## Phase 3

* Premium Subscription
* Mock Tests
* Daily Quiz
* Leaderboard
* Study Planner
* AI Tutor
* Personalized Recommendations

---

# 13. Monetization Strategy

Potential revenue streams:

* Premium Subscription
* AdMob
* Affiliate Books
* Test Series Partnerships
* Sponsored Content (clearly labeled)

The MVP will launch without monetization to focus on user adoption.

---

# 14. Product Principles

Every feature should follow these principles:

* Simplicity over complexity.
* Quality over quantity.
* Official sources over rumors.
* Fast reading over long-form content.
* Mobile-first experience.
* Build for long-term scalability.

---

# 15. Out of Scope (MVP)

The following features are intentionally excluded:

* AI-generated content
* Manual CMS
* Editorial Dashboard
* Video Courses
* Coaching Features
* Chat
* Social Feed
* Payments
* Web Application

These may be introduced after validating the MVP.
