import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getDb } from '../db/client';
import { authClearCookie } from '../server/auth';
import { revokeSession, SESSION_COOKIE } from '../lib/session';

export const prerender = false;

/** Sign out: revoke the session server-side, then clear the cookie. */
export const GET: APIRoute = async ({ cookies }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  if (token) await revokeSession(getDb(), env.SESSION_SECRET, token);

  const headers = new Headers({ location: '/', 'cache-control': 'no-store' });
  headers.append('set-cookie', authClearCookie());
  return new Response(null, { status: 303, headers });
};
