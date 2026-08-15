# FRONTEND_APP.md

# Current Affairs Platform

## Frontend Architecture

Version: 1.0

Platform: React Native Expo

---

# 1. Overview

The frontend application is responsible for presenting current affairs in a clean, fast, and user-friendly interface.

The frontend **does not contain business logic for fetching or processing news**. It consumes REST APIs provided by the backend and focuses on rendering, caching, navigation, and user interactions.

---

# 2. Technology Stack

Core

* React Native Expo (Latest Stable)
* Expo Router
* TypeScript

UI

* NativeWind
* FlashList
* Lucide Icons

State Management

* Zustand
* TanStack Query

Networking

* Axios

Storage

* MMKV

Forms

* React Hook Form
* Zod

Notifications

* Expo Notifications

---

# 3. Architecture

The application follows **Feature-Based Architecture**.

Each feature owns its:

* Components
* Hooks
* API
* Store
* Types
* Utilities

No feature should directly depend on another feature.

Shared code belongs in shared folders.

---

# 4. Folder Structure

```text
src/
│
├── app/
│
├── assets/
│
├── components/
│
├── config/
│
├── constants/
│
├── features/
│
├── hooks/
│
├── providers/
│
├── services/
│
├── store/
│
├── theme/
│
├── types/
│
└── utils/
```

---

# 5. App Router

```text
app/

(auth)/

(tabs)/

home/

categories/

search/

bookmarks/

profile/

news/

settings/

_layout.tsx

index.tsx
```

---

# 6. Feature Structure

Every feature follows the same structure.

```text
news/

api/

components/

hooks/

store/

types/

utils/

constants/

index.ts
```

Example

```text
features/

news/

category/

bookmark/

search/

profile/

notification/
```

---

# 7. Shared Components

Reusable components belong here.

```text
components/

ui/

layout/

common/
```

### UI

* Button
* Input
* Card
* Chip
* Badge
* Loader
* Skeleton
* Empty State

### Layout

* Header
* Screen
* Container

### Common

* Network Banner
* Error View
* Retry View

---

# 8. State Management

Use Zustand only for global application state.

Examples

* Theme
* User Preferences
* Notification Settings

Do NOT store server data in Zustand.

---

Server data belongs in TanStack Query.

Examples

* News
* Categories
* Search Results

---

Local UI state belongs inside components.

Examples

* Modal Open
* Selected Tab
* Bottom Sheet State

---

# 9. API Layer

All API requests must go through a centralized API layer.

```text
services/

api.ts

axios.ts

interceptors.ts
```

Responsibilities

* Base URL
* Headers
* Error Handling
* Authentication
* Logging

Never call Axios directly from components.

---

# 10. MMKV Storage

Store only local persistent data.

Examples

* Bookmarks
* Theme
* User Preferences
* Cached Search
* Notification Preference

Never store API business data manually.

Use TanStack Query cache.

---

# 11. Home Module

Responsibilities

* Breaking News
* Latest News
* Categories
* Timeline Filters

The Home screen should only compose reusable widgets.

---

# 12. Categories Module

Responsibilities

* Category Grid
* Category Selection
* Filter News

---

# 13. Search Module

Responsibilities

* Search Input
* Search Results
* Search History
* Debounce
* Pagination

---

# 14. Bookmark Module

Responsibilities

* Save
* Remove
* Read Later

Bookmarks should be available offline.

---

# 15. Profile Module

Responsibilities

* Preferences
* Notification Settings
* App Information

---

# 16. Navigation

Bottom Tabs

* Home
* Categories
* Search
* Bookmarks
* Profile

Stack Navigation

* Article Detail
* Settings

---

# 17. Theme System

Support

* Light Theme
* Dark Theme

Theme Tokens

* Colors
* Typography
* Radius
* Spacing
* Shadows

Never hardcode colors inside components.

---

# 18. Design Principles

Every screen must include:

* Loading State
* Empty State
* Error State
* Success State

Avoid blank screens.

---

# 19. Performance

Always use:

* FlashList
* React.memo
* useMemo
* useCallback

Lazy load heavy components.

Avoid unnecessary re-renders.

---

# 20. Accessibility

Support:

* Screen Readers
* Dynamic Font Scaling
* Accessible Labels
* Proper Touch Targets

---

# 21. Error Handling

Show user-friendly messages.

Retry failed requests where appropriate.

Log unexpected errors.

Never expose raw backend errors.

---

# 22. Coding Standards

Use

* Functional Components
* Named Exports
* Strict TypeScript
* Absolute Imports
* Barrel Exports

Avoid

* Inline Styles
* Anonymous Components
* Hardcoded Values
* Duplicate Logic

---

# 23. Development Workflow

Feature Request

↓

API Available

↓

Create Feature Module

↓

Create Components

↓

Connect APIs

↓

Testing

↓

Code Review

↓

Merge

---

# 24. MVP Screens

Authentication

* Splash
* Onboarding

Application

* Home
* Categories
* Search
* Bookmarks
* Profile
* Settings
* Article Detail

---

# 25. Future Features

Architecture should support future modules without restructuring.

Examples

* AI Summary
* AI Quiz
* Revision
* Downloads
* Offline Reading
* Premium
* Multi-language
* Study Planner

New features should be added under the **features/** directory using the same architecture.

---

# 26. Definition of Done

A feature is complete only when:

* UI matches design.
* APIs are integrated.
* Loading, empty, and error states are implemented.
* Performance is acceptable.
* Accessibility is considered.
* Code follows project standards.
* Feature is tested.
* Documentation is updated.

No feature should be merged unless it satisfies all of the above.
