import { randomToken, timingSafeEqual } from './crypto';

export const CSRF_COOKIE = 'bmt4_csrf';

export function generateCsrfToken(): string {
  return randomToken(24);
}

export function isSameOrigin(request: Request): boolean {
  const host = new URL(request.url).host;

  const origin = request.headers.get('origin');
  if (origin) {
    try {
      return new URL(origin).host === host;
    } catch {
      return false;
    }
  }

  const fetchSite = request.headers.get('sec-fetch-site');
  if (fetchSite) return fetchSite === 'same-origin';

  const referer = request.headers.get('referer');
  if (referer) {
    try {
      return new URL(referer).host === host;
    } catch {
      return false;
    }
  }

  return false;
}

export function verifyCsrf(
  request: Request,
  cookieToken: string | undefined | null,
  submitted: string | null | undefined
): boolean {
  if (!isSameOrigin(request)) return false;
  if (submitted) return Boolean(cookieToken) && timingSafeEqual(cookieToken ?? '', submitted);
  // Same-origin JSON requests cannot be forged by an HTML form (they need a
  // CORS preflight), so origin + content-type is sufficient there.
  return (request.headers.get('content-type') ?? '').includes('application/json');
}
