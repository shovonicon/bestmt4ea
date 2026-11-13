/**
 * Astro middleware — legacy redirects + per-request session/CSRF resolution.
 *
 * The Cloudflare adapter serves prerendered pages and static assets itself and
 * only falls through to Astro for on-demand routes (the 404, `/login`,
 * `/dashboard`, `/auth/*`, `/api/*`, ...). Running the redirect manifest here —
 * rather than in a hand-rolled Worker — keeps one implementation for both the
 * old `worker/index.ts` behaviour and the new SSR app.
 *
 * `worker/match.mjs` is the same pure matcher the old Worker used, and the same
 * one `scripts/worker.test.mjs` exercises, so the redirect rules are unchanged.
 */

import { defineMiddleware } from 'astro:middleware';
import { env } from 'cloudflare:workers';
import { legacyResponse } from './lib/redirect-response';
import { getDb } from './db/client';
import { resolveSession, SESSION_COOKIE } from './lib/session';
import { CSRF_COOKIE, generateCsrfToken } from './lib/csrf';
import { clientIpFrom } from './lib/http';

/**
 * On-demand routes that must never be cached or indexed.
 *
 * `public/_headers` only applies to static assets, so it never reaches these
 * server-rendered pages — the headers have to be set here, where every
 * on-demand response actually passes through.
 */
const PRIVATE_PREFIXES = ['/login', '/dashboard', '/checkout', '/admin'];
const isPrivatePath = (pathname: string) =>
  PRIVATE_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

/** Hosts that reach this Worker but must never serve the site themselves. */
const NON_CANONICAL_HOSTS = new Set(['www.bestmt4ea.com', 'new.bestmt4ea.com']);

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);

  // One canonical host. The Worker answers on www and on the old staging host
  // `new.` as well as the apex, which left each serving a full duplicate of the
  // site (200, no redirect). Send those requests to the apex with a 301,
  // preserving path and query.
  // This only sees on-demand routes: the adapter serves prerendered pages before
  // middleware runs, so each extra host also needs a Cloudflare Single Redirect
  // Rule on the zone (www has one) or to be detached from the Worker.
  if (NON_CANONICAL_HOSTS.has(url.hostname)) {
    url.hostname = 'bestmt4ea.com';
    return new Response(null, {
      status: 301,
      headers: { location: url.toString(), 'cache-control': 'public, max-age=86400' },
    });
  }

  // The single sitemap URL is `/sitemap-0.xml` (robots.txt, footer, Search Console).
  // Tools and older bookmarks that ask for `/sitemap.xml` are redirected there.
  if (url.pathname === '/sitemap.xml') {
    return new Response(null, {
      status: 301,
      headers: { location: '/sitemap-0.xml', 'cache-control': 'public, max-age=86400' },
    });
  }

  // The old WordPress site (Yoast) served its sitemap at `/sitemap_index.xml`,
  // and that URL is still registered with some engines. Serve the same sitemap.
  if (url.pathname === '/sitemap_index.xml') {
    const assets = (env as unknown as { ASSETS?: { fetch(input: URL): Promise<Response> } }).ASSETS;
    if (assets) return assets.fetch(new URL('/sitemap-0.xml', url));
  }

  const legacy = legacyResponse(url);
  if (legacy) return legacy;

  const db = getDb();
  const secret = env.SESSION_SECRET;
  const token = context.cookies.get(SESSION_COOKIE)?.value;
  context.locals.session = secret ? await resolveSession(db, secret, token) : null;
  context.locals.clientIp = clientIpFrom(context.request);

  let csrf = context.cookies.get(CSRF_COOKIE)?.value;
  if (!csrf) {
    csrf = generateCsrfToken();
    context.cookies.set(CSRF_COOKIE, csrf, {
      path: '/',
      sameSite: 'lax',
      secure: url.protocol === 'https:',
      httpOnly: false,
      maxAge: 43200,
    });
  }
  context.locals.csrfToken = csrf;

  const response = await next();

  // A private page must never be cached by a browser or proxy, and must carry a
  // header-level noindex rather than relying on the meta tag alone.
  if (isPrivatePath(url.pathname) && response.status === 200) {
    const headers = new Headers(response.headers);
    if (!headers.has('cache-control')) headers.set('cache-control', 'private, no-store');
    headers.set('x-robots-tag', 'noindex, nofollow');
    return new Response(response.body, { status: response.status, headers });
  }

  return response;
});
