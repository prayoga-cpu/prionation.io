import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { routing } from './i18n/routing';
import { FINANCE_SESSION_COOKIE, verifyFinanceSession } from './lib/finance/auth/session';

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

const FINANCE_LOGIN_PATH = '/finance/login';

// /finance lives outside app/[locale] (internal, English-only, no i18n) and
// is gated on a session cookie instead of locale negotiation — handled here,
// before next-intl ever sees the request.
async function financeGuard(request: NextRequest): Promise<NextResponse> {
  if (request.nextUrl.pathname === FINANCE_LOGIN_PATH) {
    return NextResponse.next();
  }
  const token = request.cookies.get(FINANCE_SESSION_COOKIE)?.value;
  const session = token ? await verifyFinanceSession(token) : null;
  if (!session) {
    const url = request.nextUrl.clone();
    url.pathname = FINANCE_LOGIN_PATH;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

// Wrap next-intl's middleware to also stamp a geo cookie the client reads to
// decide whether the consent banner is needed. The cookie itself is functional
// (consent-management), so it is exempt from consent. Pages stay fully static —
// no request headers are read during rendering.
export default async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/finance')) {
    return financeGuard(request);
  }

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
  // Match every pathname except api routes, Next internals, and requests for
  // files with an extension (static assets). Previously this only matched
  // '/' and already-locale-prefixed paths, so any bare unprefixed link (e.g.
  // '/ai-product-engineering-for-mid-market-companies' instead of
  // '/en/ai-product-engineering-for-mid-market-companies') skipped next-intl's
  // redirect entirely and hard-404'd — confirmed live and flagged in GSC as
  // "Not found (404)".
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
