/**
 * Pure redirect matching for the Cloudflare Worker (and its tests).
 *
 * Importable from both `worker/index.ts` and `scripts/worker.test.mjs`
 * with zero dependencies, so the edge behavior under test is exactly the
 * edge behavior deployed.
 *
 * Matching:
 *   - method is irrelevant — redirects apply to GET, HEAD, and anything else
 *   - query strings are preserved on redirect (`?a=1` survives the hop)
 *   - source lookup is slash-insensitive (`/foo` matches a `/foo/` rule)
 *   - percent-encoding is canonicalised, so an emoji path matches whether
 *     the client sends it raw or percent-encoded, in any hex case
 *   - trailing-slash targets are enforced so Astro serves one canonical URL
 */

export function isExternal(value) {
  return /^https?:\/\//i.test(String(value));
}

/** Decode then re-encode; external URLs pass through untouched. */
export function canon(path) {
  let p = String(path).trim();
  if (!p) return '';
  if (isExternal(p)) return p;
  if (p.includes('%')) {
    try {
      p = decodeURIComponent(p);
    } catch {
      /* leave as-is */
    }
  }
  if (!p.startsWith('/')) p = `/${p}`;
  return encodeURI(p);
}

export const cmpKey = (path) => {
  const c = canon(path).replace(/\/+$/, '') || '/';
  return c.toLowerCase();
};

/** Build the lookup map once at Worker startup: cmpKey(source) -> rule. */
export function buildMap(rules) {
  const map = new Map();
  for (const r of rules) map.set(cmpKey(r.from), r);
  return map;
}

const REDIRECT_STATUSES = new Set([301, 302, 307, 308]);
const GONE_STATUSES = new Set([410, 451]);

/**
 * WordPress-era URL classes that can never exist on this site. Bots and old
 * backlinks keep requesting them, and each one otherwise ends in a 404 that
 * Search Console reports. They answer 410 Gone instead of 404.
 *
 *   - /wp-content, /wp-includes, /wp-admin, /wc-stripe, /wc-api, /cart,
 *     /my-account  (path-prefix, anchored) and /wp-login.php
 *   - the old shop and blog pagination, /shop/page/N/ and /blog/page/N/ (both
 *     are single pages now)
 *   - post, category and comment feeds: .../feed/, .../feed/rss2/, .../feed/atom/
 *
 * Deliberately NOT matched: anything under /wp-json/. The dead WooCommerce
 * Stripe webhook (/wp-json/wc-stripe/v1/webhook) must be left exactly as it is;
 * removing that endpoint is the owner's call in the Stripe Dashboard.
 */
const GONE_PATTERNS = [
  /^\/(?:wp-content|wp-includes|wp-admin|wc-stripe|wc-api|cart|my-account)(?:\/|$)/i,
  /^\/wp-login\.php\/?$/i,
  /^\/shop\/page\/\d+(?:\/|$)/i,
  /^\/blog\/page\/\d+(?:\/|$)/i,
  /(?:^|\/)feed(?:\/(?:rss2?|atom|rdf))?\/?$/i,
];

export function isLegacyGonePath(requestPath) {
  const p = String(requestPath);
  return GONE_PATTERNS.some((re) => re.test(p));
}

/**
 * Match a request path against the manifest.
 * Returns `{ kind: 'redirect', status, location }`,
 * `{ kind: 'gone', status }`, or `{ kind: 'pass' }`.
 */
export function matchRedirect(map, requestPath, search = '') {
  const rule = map.get(cmpKey(requestPath));
  if (!rule) return isLegacyGonePath(requestPath) ? { kind: 'gone', status: 410 } : { kind: 'pass' };
  if (GONE_STATUSES.has(rule.status)) return { kind: 'gone', status: rule.status };
  if (!REDIRECT_STATUSES.has(rule.status)) return { kind: 'pass' };
  let location = isExternal(rule.to) ? rule.to : canon(rule.to);
  // Enforce one canonical URL: local targets always end in `/`.
  if (!isExternal(location) && !location.endsWith('/')) location += '/';
  return { kind: 'redirect', status: rule.status, location: location + search };
}
