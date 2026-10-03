export function json(data: unknown, init: ResponseInit = {}): Response {
  const headers = new Headers(init.headers);
  headers.set('content-type', 'application/json; charset=utf-8');
  if (!headers.has('cache-control')) headers.set('cache-control', 'no-store');
  return new Response(JSON.stringify(data), { ...init, headers });
}

export function jsonError(status: number, code: string, message?: string): Response {
  return json({ error: code, message: message ?? code }, { status });
}

export function redirect(location: string, status = 303): Response {
  return new Response(null, { status, headers: { location, 'cache-control': 'no-store' } });
}

export function clientIpFrom(request: Request): string {
  const direct = request.headers.get('cf-connecting-ip');
  if (direct) return direct;
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return '0.0.0.0';
}

export function htmlEscape(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function readBody(request: Request): Promise<Record<string, string>> {
  const contentType = request.headers.get('content-type') ?? '';
  const out: Record<string, string> = {};

  if (contentType.includes('application/json')) {
    const data = await request.json().catch(() => null);
    if (!data || typeof data !== 'object') return out;
    for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
      out[key] = typeof value === 'string' ? value : String(value ?? '');
    }
    return out;
  }

  const form = await request.formData().catch(() => null);
  if (!form) return out;
  for (const [key, value] of form.entries()) {
    out[key] = typeof value === 'string' ? value : '';
  }
  return out;
}

export function wantsHtml(request: Request): boolean {
  return (request.headers.get('accept') ?? '').includes('text/html');
}

// Post-login destinations are same-site paths only. Anything else is dropped, so
// a crafted value cannot turn the login flow into an open redirect.
export function safeRedirectPath(value: string | null | undefined): string | null {
  if (!value) return null;
  if (/[\r\n\\]/.test(value)) return null;
  if (!value.startsWith('/') || value.startsWith('//')) return null;
  return value;
}
