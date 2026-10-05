import type { APIRoute } from 'astro';
import { eq } from 'drizzle-orm';
import { env } from 'cloudflare:workers';
import { getDb } from '../../../db/client';
import { customers } from '../../../db/schema';
import { issueSession } from '../../../lib/session';
import { timingSafeEqual } from '../../../lib/crypto';
import { authCookie, upsertCustomer } from '../../../server/auth';
import {
  OAUTH_STATE_COOKIE,
  clearStateCookie,
  exchangeCodeForIdentity,
  redirectUriFrom,
} from '../../../server/google';

export const prerender = false;

/**
 * Finish Google sign-in: check the state, trade the code for an identity, then
 * issue the same session the magic-link flow issues. Identity is keyed on the
 * verified email, so a customer who signed in by email and now uses Google lands
 * on the one account.
 */
export const GET: APIRoute = async ({ request, cookies }) => {
  const clientId = env.GOOGLE_CLIENT_ID ?? '';
  const clientSecret = env.GOOGLE_CLIENT_SECRET ?? '';
  if (!clientId || !clientSecret) return fail('google');

  const url = new URL(request.url);
  // Google reports a refusal as ?error=access_denied; there is nothing to retry.
  if (url.searchParams.get('error')) return fail('google');

  const state = url.searchParams.get('state') ?? '';
  const expected = cookies.get(OAUTH_STATE_COOKIE)?.value ?? '';
  if (!state || !expected || !timingSafeEqual(state, expected)) return fail('csrf');

  const code = url.searchParams.get('code') ?? '';
  if (!code) return fail('google');

  const identity = await exchangeCodeForIdentity({
    clientId,
    clientSecret,
    code,
    redirectUri: redirectUriFrom(env.APP_URL),
  });
  if (!identity) return fail('google');

  const db = getDb();
  const customer = await upsertCustomer(db, identity.email);

  // Keep the display name Google gave us, but never overwrite one they set.
  if (identity.name && !customer.name) {
    await db
      .update(customers)
      .set({ name: identity.name, updatedAt: new Date() })
      .where(eq(customers.id, customer.id));
  }

  const session = await issueSession(db, env.SESSION_SECRET, {
    subjectType: 'customer',
    subjectId: customer.id,
  });

  const headers = new Headers({ location: '/dashboard/', 'cache-control': 'no-store' });
  headers.append('set-cookie', authCookie(session.token));
  headers.append('set-cookie', clearStateCookie());
  return new Response(null, { status: 303, headers });
};

/** Back to the login page with a reason, and always drop the spent state cookie. */
function fail(reason: 'google' | 'csrf'): Response {
  const headers = new Headers({ location: `/login/?error=${reason}`, 'cache-control': 'no-store' });
  headers.append('set-cookie', clearStateCookie());
  return new Response(null, { status: 303, headers });
}
