# AGENTS.md

This file is the operating guide for coding agents working in `/ncore-openclaw-backup/yvettin`.
Follow this before making changes.

## 1) Repository Overview

- Monorepo-style layout with two apps in `yvettin.com/`:
  - `yvettin.com/frontend` (Next.js 14, React 18, TypeScript, Tailwind)
  - `yvettin.com/backend` (NestJS scaffold, TypeScript, Jest config in `package.json`)
- Frontend is the active app; backend currently has package scripts but minimal source implementation.
- Root contains planning/docs files used by the team.

## 2) Priority Working Rules

- Keep all work inside this repository; do not cross-reference external project directories.
- Prefer minimal, focused changes aligned with current architecture.
- Do not edit generated directories (`.next/`, `node_modules/`) unless explicitly asked.
- Preserve existing visual language: clean, premium, minimalist fashion e-commerce style.

## 3) Cursor/Copilot Rule Detection

Checked locations:
- `.cursor/rules/`
- `.cursorrules`
- `.github/copilot-instructions.md`

Status:
- No Cursor or Copilot instruction files were found in this repository at the time of writing.
- If these files appear later, treat them as highest-priority local instructions and update this file.

## 4) Install and Run Commands

### Frontend (`/ncore-openclaw-backup/yvettin/yvettin.com/frontend`)

- Install deps: `npm install`
- Dev server: `npm run dev` (configured for port `4009`)
- Production build: `npm run build`
- Start built app: `npm run start` (port `4009`)
- Lint: `npm run lint`

### Backend (`/ncore-openclaw-backup/yvettin/yvettin.com/backend`)

- Install deps: `npm install`
- Build: `npm run build`
- Dev: `npm run start:dev`
- Lint: `npm run lint`
- Unit tests: `npm run test`
- E2E tests: `npm run test:e2e`
- Coverage: `npm run test:cov`

## 5) Single-Test Commands (Important)

Backend uses Jest, so single-test execution is supported.

- Run one test file:
  - `npm run test -- src/path/to/file.spec.ts`
- Run one test by name pattern:
  - `npm run test -- -t "should create order"`
- Run one test file in watch mode:
  - `npm run test:watch -- src/path/to/file.spec.ts`
- Run one e2e test file:
  - `npm run test:e2e -- test/path/to/e2e-spec.ts`

Frontend currently has no dedicated test runner configured in scripts.

- For targeted verification in frontend, use:
  - `npm run lint`
  - `npm run build`
  - route-level manual checks in browser/curl

## 6) Code Style and Formatting

### Language and Typing

- TypeScript first; avoid `any`.
- Prefer explicit interfaces/types for component props and shared models.
- Keep strict typing compatible with frontend `tsconfig.json` (`"strict": true`).
- Use optional fields only when domain-relevant.

### Imports

- Use path alias `@/` for frontend internal modules.
- Group imports in this order:
  1. React / framework imports
  2. third-party libraries
  3. internal imports (`@/...`)
- Remove unused imports immediately.

### Naming

- Components: `PascalCase` (e.g., `ProductDetailClient`).
- Hooks: `useXxx` (e.g., `useBreakpoint`).
- Utility functions/vars: `camelCase`.
- Constants: `UPPER_SNAKE_CASE` only for true constants.
- Files:
  - React components typically `PascalCase.tsx`
  - utility/data files typically `kebab-case.ts` or established local convention

### Formatting

- Follow existing repository style (semicolons, single quotes in TS/TSX).
- Keep JSX readable; avoid deeply nested inline logic when extraction improves clarity.
- Use Tailwind utility classes consistently with existing spacing/token patterns.

### React/Next Patterns

- Prefer Server Components by default in App Router; add `'use client'` only when needed.
- Keep page files thin; move richer UI logic into dedicated components.
- Reuse existing UI primitives in `src/components/ui` before introducing new ones.
- Use `Link` from `next/link` for internal navigation.

### State/Data

- Client state: local state or Zustand stores in `src/lib/store`.
- Server/cache state: TanStack Query patterns already present in project.
- Keep data derivation in memoized selectors/computed blocks when expensive.

### Error Handling

- Fail fast on invalid required inputs.
- In UI flows, provide user-facing feedback via existing toast patterns.
- Avoid silent failures; include actionable error messages.
- For recoverable states, render graceful empty/error UI blocks.

### Accessibility

- Preserve semantic HTML structure (`header/main/section/nav` where applicable).
- Include `aria-label` on icon-only actions.
- Ensure keyboard reachability for interactive controls.

## 7) Frontend UX Rules for This Project

- Keep minimalist premium fashion identity; do not introduce noisy/flashy styles.
- Preserve current product-card box layout unless explicitly requested otherwise.
- Ensure responsive behavior across mobile/tablet/desktop.
- Do not leave dead links (`#`) where real routes are expected.

## 8) Validation Checklist Before Hand-off

- Run `npm run lint` in `yvettin.com/frontend` after frontend changes.
- Run `npm run build` in `yvettin.com/frontend` for route/layout changes.
- Verify key routes return `200` if routing was touched.
- If backend changes are made, run at minimum:
  - `npm run lint`
  - `npm run test` (or single targeted tests when appropriate)

## 9) Known Practical Notes

- The dev/prod server on port `4009` can become stale after heavy route changes.
- If routes appear as 404 unexpectedly, restart server after a clean build.
- Existing lint warnings for `<img>` may appear; migrate to `next/image` when requested.

## 10) What to Avoid

- Do not commit or edit files under `node_modules/`.
- Do not rely on `.next/` output as source of truth.
- Do not invent new architecture when existing components/utilities already solve the task.
