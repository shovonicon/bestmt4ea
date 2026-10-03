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
import manifest from './generated/redirects.json' with { type: 'json' };
import { buildMap, matchRedirect } from '../worker/match.mjs';
import { getDb } from './db/client';
import { resolveSession, SESSION_COOKIE } from './lib/session';
import { CSRF_COOKIE, generateCsrfToken } from './lib/csrf';
import { clientIpFrom } from './lib/http';

type Rule = { from: string; to: string; status: number };

const REDIRECT_MAP = buildMap((manifest as { rules: Rule[] }).rules);

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const matched = matchRedirect(REDIRECT_MAP, url.pathname, url.search);

  if (matched.kind === 'gone') {
    return new Response(matched.status === 451 ? 'Unavailable For Legal Reasons' : 'Gone', {
      status: matched.status,
      headers: {
        'content-type': 'text/plain; charset=utf-8',
        'cache-control': 'public, max-age=86400',
      },
    });
  }

  if (matched.kind === 'redirect' && matched.location) {
    return new Response(null, {
      status: matched.status,
      headers: { location: matched.location, 'cache-control': 'public, max-age=3600' },
    });
  }

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

  return next();
});
