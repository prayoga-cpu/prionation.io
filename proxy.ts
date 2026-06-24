import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

// Regions that require an opt-in cookie-consent banner (GDPR/EEA + UK + CH).
// Visitors elsewhere skip the banner and analytics run by default.
const CONSENT_REQUIRED = new Set([
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU',
  'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES',
  'SE', // EU
  'IS', 'LI', 'NO', // EEA
  'GB', 'CH', // UK + Switzerland
]);

// Wrap next-intl's middleware to also stamp a geo cookie the client reads to
// decide whether the consent banner is needed. The cookie itself is functional
// (consent-management), so it is exempt from consent. Pages stay fully static —
// no request headers are read during rendering.
export default function proxy(request: NextRequest) {
  const response = intlMiddleware(request);
  const country = request.headers.get('x-vercel-ip-country')?.toUpperCase();
  // Unknown country (local dev / missing header) → required (privacy-safe).
  const required = !country || CONSENT_REQUIRED.has(country);
  response.cookies.set('pn_eu', required ? '1' : '0', {
    path: '/',
    maxAge: 60 * 60 * 24 * 180,
    sameSite: 'lax',
  });
  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(id|en|fr)/:path*'],
};
