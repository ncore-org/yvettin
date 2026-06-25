# Skill: React Enterprise Implementation

## Intent

Build production-grade frontend features for Yvettin with clean state boundaries and reusable UI primitives.

## Non-negotiable style rules

- Keep existing minimalist premium fashion direction.
- Keep current palette family and visual rhythm.
- Preserve product box layout style unless explicitly asked otherwise.
- Avoid noisy sections or oversized visual blocks that break the brand tone.

## Inputs expected

- Route or page context
- UX goal and acceptance criteria
- Data source mode (mock, static, API)

## Execution pattern

1. Define component contracts and prop types.
2. Choose the right stack bucket:
   - UI primitives: Radix + react-aria-components
   - Server state: TanStack Query
   - Client state: Zustand/local state
   - Motion: Framer Motion
3. Keep route files thin and move rich interaction to dedicated components.
4. Implement mobile-first, then scale to desktop.
5. Add loading, empty, and error states.
6. Validate keyboard and focus flow on all interactive controls.
7. Run lint/build and fix regressions.

## Commerce UX checklist

- Search flow: query input, placeholder behavior, submit reliability.
- Add-to-cart flow: immediate feedback, clear state transition.
- Cart/checkout flow: no dead ends, clear CTA progression.
- PDP flow: variant clarity, stock clarity, delivery clarity.
- Home sections: conversion-focused blocks in clean layout.

## Done criteria

- Typed components and no implicit any.
- Accessible interaction path for keyboard users.
- No layout break across major breakpoints.
- No dead link (`#`) for expected real routes.
- Route-level smoke checks return `200` for changed pages.
