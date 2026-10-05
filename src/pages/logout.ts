import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getDb } from '../db/client';
import { authClearCookie } from '../server/auth';
import { revokeSession, SESSION_COOKIE } from '../lib/session';

export const prerender = false;

/**
 * Sign out: revoke the session server-side, then clear the cookie.
 *
 * It lands on the sign-in page's signed-out state rather than the homepage, so
 * the user is told the session is over instead of being silently dropped on a
 * page that looks unrelated to what they just did.
 */
export const GET: APIRoute = async ({ cookies }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  if (token) await revokeSession(getDb(), env.SESSION_SECRET, token);

  const headers = new Headers({ location: '/login/?signedout=1', 'cache-control': 'no-store' });
  headers.append('set-cookie', authClearCookie());
  return new Response(null, { status: 303, headers });
};
