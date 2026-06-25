# Enterprise Frontend Libraries

## Active groups

- State and data: TanStack Query, TanStack Table/Virtual, Zustand
- UI and interaction: Radix UI, react-aria-components, Framer Motion, Sonner
- Commerce and forms: react-hook-form, zod, next-intl
- Performance: react-window, react-window-infinite-loader, react-virtualized-auto-sizer
- Monitoring: @sentry/nextjs

## Integration notes

- Monitoring bootstrap is centralized in `src/lib/monitoring.ts`.
- Query debugging is enabled in development through `src/app/providers.tsx`.
- Reusable dependency map is in `src/lib/enterprise-stack.ts`.
- Accessible search primitive is available at `src/components/ui/enterprise-search-field.tsx`.

## Selection policy

- Prefer existing primitives before adding new dependencies.
- Add new libraries only when they improve a real architectural gap.
- Keep runtime wrappers in `src/lib` and route components thin.
