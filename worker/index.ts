import manifest from '../src/generated/redirects.json' with { type: 'json' };
import { buildMap, matchRedirect } from './match.mjs';

/**
 * Cloudflare Worker: legacy-redirect edge handler in front of static assets.
 *
 * Redirect/gone responses are served first; everything else falls through to
 * the site build via the ASSETS binding. Query strings survive redirects.
 */

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

const REDIRECT_MAP = buildMap(manifest.rules);

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const matched = matchRedirect(REDIRECT_MAP, url.pathname, url.search);

    if (matched.kind === 'gone') {
      return new Response(matched.status === 451 ? 'Unavailable For Legal Reasons' : 'Gone', {
        status: matched.status,
        headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=86400' },
      });
    }

    if (matched.kind === 'redirect' && matched.location) {
      return Response.redirect(new URL(matched.location, url).toString(), matched.status);
    }

    return env.ASSETS.fetch(request);
  },
};
