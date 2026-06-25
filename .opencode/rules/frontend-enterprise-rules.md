# Frontend Enterprise Rules (Yvettin)

## Scope

- Primary focus: `yvettin.com/frontend`
- Respect current minimalist visual direction and existing component language.

## Delivery rules

- Keep all new UI typed and reusable.
- Prefer composition over one-off monolithic components.
- Maintain responsive behavior for mobile and desktop.
- Preserve accessibility by default (semantic elements, keyboard path, labels).
- Keep state ownership explicit (server state in TanStack Query, client state in Zustand/local state).

## Reliability rules

- New infrastructure libraries must be integrated through thin wrappers in `src/lib`.
- Monitoring code must be safe when env vars are missing.
- Do not make backend assumptions in frontend-only tasks.

## Quality gate

- Run lint before finishing.
- Run production build for high-impact changes.
- If either fails, resolve or document exact blocker and location.
