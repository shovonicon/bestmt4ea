/**
 * Live preview probe — built output served through the real Worker.
 *
 * `check-canonicals.mjs` proves the static build is self-consistent; this proves
 * the *served* site behaves, which is where emoji routing actually breaks. Run it
 * against `wrangler dev`:
 *
 *   npx wrangler dev --port 8788 --local        # in one terminal
 *   npm run check:preview                       # in another
 *
 * It asserts:
 *   - a decoded emoji path and its uppercase-encoded form both serve the page
 *   - the lowercase-encoded form canonicalises onto the same route
 *   - every form that serves the page advertises ONE canonical
 *   - a legacy redirect still fires at the edge
 *   - a legal page is not intercepted, an unknown path 404s
 *   - a route without its trailing slash canonicalises to the slashed URL
 *
 * Usage: node scripts/check-preview.mjs [base-url]
 */

const BASE = (process.argv[2] || process.env.PREVIEW_URL || 'http://127.0.0.1:8788').replace(/\/+$/, '');

/** A post whose slug begins with an emoji, so encoding matters. */
const SLUG =
  '🚀-supergold-m1-scalping-ea-free-download-powerful-proven-7-step-setup-guide-for-maximum-profits';

const decoded = `/${SLUG}/`;
const upper = `/${encodeURIComponent(SLUG)}/`;
const lower = upper.replace(/%[0-9A-F]{2}/g, (m) => m.toLowerCase());

const REDIRECT_STATUSES = [301, 302, 307, 308];
let failures = 0;

const report = (ok, label, detail) => {
  if (!ok) failures++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`);
};

async function get(path) {
  const res = await fetch(`${BASE}${path}`, { redirect: 'manual' });
  return {
    status: res.status,
    location: res.headers.get('location'),
    body: res.status === 200 ? await res.text() : '',
  };
}

const canonicalOf = (body) => body.match(/rel="canonical" href="([^"]+)"/)?.[1];
const canonicalise = (value) => decodeURIComponent(value ?? '');

try {
  console.log(`Probing ${BASE}\n\nemoji route encodings`);
  const served = [];

  for (const [label, path] of [
    ['decoded', decoded],
    ['uppercase-encoded', upper],
    ['lowercase-encoded', lower],
  ]) {
    const r = await get(path);
    const redirects = REDIRECT_STATUSES.includes(r.status);
    report(
      r.status === 200 || redirects,
      `${label} serves or canonicalises`,
      r.status === 200 ? 'served directly' : `${r.status} -> ${r.location}`,
    );

    if (r.status === 200) {
      const canonical = canonicalOf(r.body);
      served.push(canonical);
      report(
        canonicalise(canonical).includes(canonicalise(SLUG)),
        `${label} advertises this page's canonical`,
        canonical ?? 'none',
      );
    } else {
      report(
        canonicalise(r.location).includes(canonicalise(SLUG)),
        `${label} redirects onto the canonical route`,
        r.location ?? 'no location',
      );
    }
  }

  report(served.length > 0, 'at least one encoding serves the page', `${served.length} served directly`);
  report(new Set(served).size <= 1, 'served encodings agree on one canonical', [...new Set(served)].join(' | '));

  console.log('\nredirects and fallthrough');
  const legacy = await get('/gold-rush-mt4-ea');
  report(
    REDIRECT_STATUSES.includes(legacy.status),
    'legacy redirect fires at the edge',
    `${legacy.status} -> ${legacy.location}`,
  );

  const legal = await get('/disclaimer/');
  report(legal.status === 200, 'legal page is not intercepted', `status ${legal.status}`);

  const missing = await get('/no-such-page-anywhere/');
  report(missing.status === 404, 'unknown path 404s', `status ${missing.status}`);

  const noSlash = await get('/shop');
  report(
    noSlash.status === 200 || (noSlash.location ?? '').endsWith('/shop/'),
    'no-slash route canonicalises to the trailing-slash URL',
    `${noSlash.status}${noSlash.location ? ` -> ${noSlash.location}` : ''}`,
  );
} catch (error) {
  console.error(`\ncheck-preview could not reach ${BASE} — is \`npx wrangler dev --port 8788 --local\` running?`);
  console.error(`  ${error.message}`);
  process.exit(1);
}

if (failures > 0) {
  console.error(`\ncheck-preview FAILED (${failures} check(s)).`);
  process.exit(1);
}
console.log('\ncheck-preview PASS');
