import { base64UrlDecode, base64UrlEncode, timingSafeEqualBytes } from './crypto';

// Capped by the Workers runtime: crypto.subtle.deriveBits throws
// NotSupportedError for PBKDF2 iteration counts above 100,000. Raising this
// silently breaks every password check, because verifyPassword treats the
// throw as a mismatch.
const ITERATIONS = 100_000;
const KEY_BYTES = 32;

async function derive(
  password: string,
  salt: Uint8Array<ArrayBuffer>,
  iterations: number
): Promise<Uint8Array<ArrayBuffer>> {
  const material = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
    material,
    KEY_BYTES * 8
  );
  return new Uint8Array(bits);
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await derive(password, salt, ITERATIONS);
  return `pbkdf2$${ITERATIONS}$${base64UrlEncode(salt)}$${base64UrlEncode(key)}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split('$');
  if (parts.length !== 4 || parts[0] !== 'pbkdf2') return false;
  const iterations = Number.parseInt(parts[1], 10);
  if (!Number.isFinite(iterations) || iterations <= 0) return false;
  try {
    const salt = base64UrlDecode(parts[2]);
    const expected = base64UrlDecode(parts[3]);
    const key = await derive(password, salt, iterations);
    return timingSafeEqualBytes(key, expected);
  } catch (error) {
    // A throw here is a misconfiguration, not a wrong password — the runtime
    // rejects unsupported iteration counts. Never let it read as a mismatch
    // without saying so.
    console.error('password_verify_failed', { iterations, error: String(error) });
    return false;
  }
}
