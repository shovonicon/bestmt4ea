import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getDb } from '../../db/client';
import { authCookie, consumeTokenByLink } from '../../server/auth';
import { issueSession } from '../../lib/session';

export const prerender = false;

/** Exchange a magic-link token for a session. */
export const GET: APIRoute = async ({ request }) => {
  const token = new URL(request.url).searchParams.get('token') ?? '';
  const db = getDb();

  const customer = token ? await consumeTokenByLink(db, env.SESSION_SECRET, token) : null;
  if (!customer) {
    return new Response(null, {
      status: 303,
      headers: { location: '/login/?error=link', 'cache-control': 'no-store' },
    });
  }

  const session = await issueSession(db, env.SESSION_SECRET, {
    subjectType: 'customer',
    subjectId: customer.id,
  });

  const headers = new Headers({ location: '/dashboard/', 'cache-control': 'no-store' });
  headers.append('set-cookie', authCookie(session.token));
  return new Response(null, { status: 303, headers });
};
