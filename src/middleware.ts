/**
 * Astro middleware — the legacy-redirect edge handler.
 *
 * The Cloudflare adapter serves prerendered pages and static assets itself and
 * only falls through to Astro for on-demand routes (the 404, and later
 * `/api/*`, login, dashboard, checkout). Running the redirect manifest here —
 * rather than in a hand-rolled Worker — keeps one implementation for both the
 * old `worker/index.ts` behaviour and the new SSR app, and matches how the
 * adapter expects request handling to compose.
 *
 * `worker/match.mjs` is the same pure matcher the old Worker used, and the
 * same one `scripts/worker.test.mjs` exercises, so the rules are unchanged.
 */

import { defineMiddleware } from 'astro:middleware';
import manifest from './generated/redirects.json' with { type: 'json' };
import { buildMap, matchRedirect } from '../worker/match.mjs';

type Rule = { from: string; to: string; status: number };

const REDIRECT_MAP = buildMap((manifest as { rules: Rule[] }).rules);

export const onRequest = defineMiddleware((context, next) => {
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

  return next();
});
