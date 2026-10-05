/**
 * Google sign-in — OAuth 2.0 authorisation-code flow.
 *
 * The exchange is server-to-server over TLS: we POST the code to Google and read
 * the ID token out of Google's own response, so the token never travels through
 * the browser. That is why its signature is not separately verified against
 * Google's JWKS here, while every claim that binds the token to us (`iss`, `aud`,
 * `exp`) and to a real address (`email_verified`) is checked. Add a JWKS check if
 * a token is ever accepted from a client rather than from this exchange.
 *
 * Identity is keyed on the **verified** email, which is what makes a Google
 * sign-in land on the same customer record as the magic-link flow.
 */

const AUTH_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth';
const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';
const VALID_ISSUERS = new Set(['accounts.google.com', 'https://accounts.google.com']);

export const OAUTH_STATE_COOKIE = 'bmt4_oauth_state';
const OAUTH_STATE_TTL_S = 10 * 60;

/** Short-lived cookie carrying the `state` we must see echoed back. */
export function stateCookie(value: string): string {
  return [
    `${OAUTH_STATE_COOKIE}=${value}`,
    'Path=/',
    'HttpOnly',
    'Secure',
    'SameSite=Lax',
    `Max-Age=${OAUTH_STATE_TTL_S}`,
  ].join('; ');
}

export function clearStateCookie(): string {
  return [`${OAUTH_STATE_COOKIE}=`, 'Path=/', 'HttpOnly', 'Secure', 'SameSite=Lax', 'Max-Age=0'].join('; ');
}

/** The redirect URI must match the Google console entry byte for byte, slash included. */
export function redirectUriFrom(appUrl: string): string {
  return new URL('/auth/google/callback/', appUrl).toString();
}

export function buildAuthUrl(input: { clientId: string; redirectUri: string; state: string }): string {
  const url = new URL(AUTH_ENDPOINT);
  url.searchParams.set('client_id', input.clientId);
  url.searchParams.set('redirect_uri', input.redirectUri);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('scope', 'openid email profile');
  url.searchParams.set('state', input.state);
  // Always let the visitor choose; never silently reuse a browser session.
  url.searchParams.set('prompt', 'select_account');
  url.searchParams.set('access_type', 'online');
  return url.toString();
}

export interface GoogleIdentity {
  subject: string;
  email: string;
  name: string | null;
}

export interface ExchangeInput {
  clientId: string;
  clientSecret: string;
  code: string;
  redirectUri: string;
}

/** Trade the code for Google's ID token, then validate and read it. */
export async function exchangeCodeForIdentity(input: ExchangeInput): Promise<GoogleIdentity | null> {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded', accept: 'application/json' },
    body: new URLSearchParams({
      code: input.code,
      client_id: input.clientId,
      client_secret: input.clientSecret,
      redirect_uri: input.redirectUri,
      grant_type: 'authorization_code',
    }),
  });
  if (!response.ok) return null;

  const body = (await response.json().catch(() => null)) as { id_token?: string } | null;
  return body?.id_token ? readIdentity(body.id_token, input.clientId) : null;
}

interface IdTokenClaims {
  iss?: unknown;
  aud?: unknown;
  exp?: unknown;
  email?: unknown;
  email_verified?: unknown;
  sub?: unknown;
  name?: unknown;
}

/** Enforce the claims, then return the identity. Anything off returns null. */
function readIdentity(idToken: string, clientId: string): GoogleIdentity | null {
  const parts = idToken.split('.');
  if (parts.length !== 3) return null;

  let claims: IdTokenClaims;
  try {
    claims = JSON.parse(decodeBase64Url(parts[1])) as IdTokenClaims;
  } catch {
    return null;
  }

  if (!VALID_ISSUERS.has(String(claims.iss))) return null;
  if (String(claims.aud) !== clientId) return null;
  if (!(Number(claims.exp) * 1000 > Date.now())) return null;
  // Only a verified address may become a customer: that is the whole basis for
  // keying the account on email.
  if (claims.email_verified !== true) return null;

  const email = String(claims.email ?? '').trim().toLowerCase();
  if (!email) return null;

  const name = String(claims.name ?? '').trim();
  return { subject: String(claims.sub ?? ''), email, name: name || null };
}

/** base64url -> UTF-8 text (names are not ASCII-only in general). */
function decodeBase64Url(value: string): string {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=');
  const bytes = Uint8Array.from(atob(padded), (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}
