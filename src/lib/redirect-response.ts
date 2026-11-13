/**
 * Turns a redirect-manifest match into the HTTP response the Worker sends.
 *
 * Shared by `src/middleware.ts` and `src/worker-entry.ts` so a legacy URL gets
 * the same answer whichever layer catches it.
 */

import manifest from '../generated/redirects.json' with { type: 'json' };
import { buildMap, matchRedirect } from '../../worker/match.mjs';

type Rule = { from: string; to: string; status: number };

const REDIRECT_MAP = buildMap((manifest as { rules: Rule[] }).rules);

/** The manifest's response for this URL, or `null` when no rule applies. */
export function legacyResponse(url: URL): Response | null {
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
    const headers: Record<string, string> = { location: matched.location, 'cache-control': 'public, max-age=3600' };
    // Affiliate go-links are hops, not pages: keep them out of search.
    if (url.pathname.startsWith('/go/')) headers['x-robots-tag'] = 'noindex, nofollow';
    return new Response(null, { status: matched.status, headers });
  }

  return null;
}
