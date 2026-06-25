import * as Sentry from '@sentry/nextjs';

let monitoringInitialized = false;

export function initMonitoring() {
  if (monitoringInitialized || typeof window === 'undefined') {
    return;
  }

  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

  if (!dsn) {
    return;
  }

  Sentry.init({
    dsn,
    tracesSampleRate: 0.1,
    environment: process.env.NEXT_PUBLIC_APP_ENV || process.env.NODE_ENV,
  });

  monitoringInitialized = true;
}
