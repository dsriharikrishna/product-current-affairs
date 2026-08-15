# DESIGN_SYSTEM.md

# Current Affairs Platform

## Design System

Version: 1.0

Platform: React Native Expo

---

# 1. Overview

The Design System defines the visual language, reusable UI components, spacing, typography, colors, and interaction patterns used throughout the application.

Its goals are to:

* Maintain consistency across screens.
* Improve development speed.
* Simplify maintenance.
* Ensure accessibility.
* Support future scalability.

---

# 2. Design Principles

The application should always be:

* Simple
* Clean
* Modern
* Readable
* Fast
* Mobile First

Avoid unnecessary decorations.

Content should always be the primary focus.

---

# 3. Theme

Support

* Light Theme
* Dark Theme

Themes should be controlled from a single source.

Never hardcode colors inside components.

---

# 4. Color Palette

## Primary

Purpose

* Buttons
* Active Tabs
* Links
* Highlights

```text
Primary: #2563EB
Primary Light: #60A5FA
Primary Dark: #1D4ED8
```

---

## Success

```text
#22C55E
```

---

## Warning

```text
#F59E0B
```

---

## Error

```text
#EF4444
```

---

## Background

Light

```text
#FFFFFF
```

Dark

```text
#09090B
```

---

## Surface

Light

```text
#F8FAFC
```

Dark

```text
#18181B
```

---

## Text

Primary

```text
#111827
```

Secondary

```text
#6B7280
```

Disabled

```text
#9CA3AF
```

---

# 5. Typography

Font Family

* Inter

Fallback

* System Font

---

## Heading

H1

32

Bold

---

H2

28

Bold

---

H3

24

SemiBold

---

H4

20

SemiBold

---

H5

18

Medium

---

## Body

Large

16

Regular

---

Medium

14

Regular

---

Small

12

Regular

---

Caption

11

Regular

---

# 6. Spacing System

Use an 8-point spacing grid.

```text
4

8

12

16

20

24

32

40

48

64
```

Never use arbitrary spacing values.

---

# 7. Border Radius

Small

```text
8
```

Medium

```text
12
```

Large

```text
16
```

Extra Large

```text
24
```

Full

```text
999
```

---

# 8. Elevation

Use minimal shadows.

Levels

* None
* Small
* Medium
* Large

Avoid excessive shadow effects.

---

# 9. Icons

Library

* Lucide React Native

Icon Sizes

```text
16

20

24

28

32
```

Maintain consistent icon sizes across screens.

---

# 10. Buttons

Variants

* Primary
* Secondary
* Outline
* Text
* Danger

States

* Default
* Pressed
* Disabled
* Loading

---

# 11. Inputs

Support

* Label
* Placeholder
* Helper Text
* Error Text
* Disabled
* Loading

---

# 12. Cards

Used for

* News
* Categories
* Bookmarks

Each card should contain:

* Image
* Title
* Source
* Published Date

---

# 13. Chips

Used for

* Categories
* Filters
* Tags

Variants

* Filled
* Outlined

---

# 14. Badges

Examples

* Breaking
* New
* Updated

Keep badges short and visually distinct.

---

# 15. Avatars

Support

* Image
* Initials
* Placeholder

---

# 16. Lists

Use FlashList.

Support

* Infinite Scroll
* Pull to Refresh
* Skeleton Loading

---

# 17. Navigation

Bottom Navigation

* Home
* Categories
* Search
* Bookmarks
* Profile

Maintain consistent active and inactive states.

---

# 18. Loading States

Use

* Skeleton Loaders
* Activity Indicators

Avoid blank screens.

---

# 19. Empty States

Examples

* No News Available
* No Search Results
* No Bookmarks

Each empty state should include:

* Illustration or Icon
* Message
* Optional Action

---

# 20. Error States

Display:

* Friendly message
* Retry button

Never expose technical errors to users.

---

# 21. Animations

Use subtle animations only.

Recommended:

* Fade In
* Fade Out
* Scale
* Slide

Avoid long or distracting animations.

---

# 22. Accessibility

Ensure:

* Adequate color contrast
* Readable font sizes
* Accessible touch targets (minimum 44x44)
* Screen reader labels

Accessibility should be considered for every component.

---

# 23. Responsive Design

Support:

* Small Phones
* Large Phones
* Tablets (future)

Use flexible layouts.

Avoid fixed dimensions where possible.

---

# 24. Component Naming

Examples

```text
NewsCard

CategoryChip

SearchBar

BookmarkButton

PrimaryButton

SectionHeader
```

Component names should clearly describe their purpose.

---

# 25. Design Rules

* Keep interfaces uncluttered.
* Maintain consistent spacing.
* Use typography hierarchy.
* Reuse components.
* Prioritize readability.
* Minimize visual noise.

---

# 26. Future Expansion

The design system should support future additions without breaking consistency.

Examples:

* AI Summary Cards
* Quiz Components
* Premium Badges
* Download Cards
* Revision Widgets

---

# 27. Definition of Done

A UI component is complete only if:

* It follows the design system.
* Supports light and dark themes.
* Is responsive.
* Includes loading, empty, and error states where applicable.
* Meets accessibility guidelines.
* Is reusable.
* Has clear documentation.
* Is tested before use in production.

The Design System is the single source of truth for all UI development. Any new component should align with these standards before being introduced into the application.
