import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { randomToken } from '../../../lib/crypto';
import { buildAuthUrl, redirectUriFrom, stateCookie } from '../../../server/google';

export const prerender = false;

/**
 * Start Google sign-in.
 *
 * A `state` value is minted and parked in a short-lived HttpOnly cookie; the
 * callback refuses anything that does not echo it, which is what stops a
 * cross-site request from completing someone else's sign-in.
 */
export const GET: APIRoute = async ({ request }) => {
  const clientId = env.GOOGLE_CLIENT_ID ?? '';
  if (!clientId) return gone();

  const state = randomToken(16);
  const headers = new Headers({
    location: buildAuthUrl({ clientId, redirectUri: redirectUriFrom(env.APP_URL), state }),
    'cache-control': 'no-store',
  });
  headers.append('set-cookie', stateCookie(state));

  return new Response(null, { status: 303, headers });
};

/** Not configured — say so on the login page rather than showing a dead button. */
function gone(): Response {
  return new Response(null, {
    status: 303,
    headers: { location: '/login/?error=google', 'cache-control': 'no-store' },
  });
}
