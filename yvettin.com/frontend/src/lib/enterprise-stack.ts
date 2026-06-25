export const enterpriseFrontendStack = {
  stateAndData: [
    '@tanstack/react-query',
    '@tanstack/react-query-devtools',
    '@tanstack/react-table',
    '@tanstack/react-virtual',
    'zustand',
  ],
  uiAndInteraction: [
    '@radix-ui/react-dialog',
    '@radix-ui/react-select',
    'react-aria-components',
    'framer-motion',
    'sonner',
  ],
  commerceAndForms: ['react-hook-form', '@hookform/resolvers', 'zod', 'next-intl'],
  performance: ['react-window', 'react-window-infinite-loader', 'react-virtualized-auto-sizer'],
  observability: ['@sentry/nextjs'],
} as const;

export type EnterpriseFrontendStackGroup = keyof typeof enterpriseFrontendStack;

export function getEnterpriseStack(group: EnterpriseFrontendStackGroup) {
  return enterpriseFrontendStack[group];
}
