/**
 * Worker redirect tests — no dependencies, no runner.
 *
 * Exercises `worker/match.mjs` (the exact matching code the Worker deploys)
 * against the REAL generated manifest plus synthetic fixtures for statuses
 * the manifest does not currently contain (410/451) and failure modes the
 * generator must already have rejected (cycles, unresolved hops).
 *
 *   node scripts/worker.test.mjs        # per-test output
 *
 * Any failure exits 1.
 */

import { readFileSync, existsSync } from 'node:fs';
import { buildMap, matchRedirect, canon, cmpKey } from '../worker/match.mjs';

const MANIFEST = 'src/generated/redirects.json';

let passed = 0;
let failed = 0;
const failures = [];

function check(name, actual, expected) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a === e) {
    passed++;
  } else {
    failed++;
    failures.push(`${name}\n    expected: ${e}\n    actual:   ${a}`);
  }
}

if (!existsSync(MANIFEST)) {
  console.error(`Missing ${MANIFEST} — run: npm run redirects`);
  process.exit(1);
}
const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'));
const map = buildMap(manifest.rules);
console.log(`Loaded ${manifest.rules.length} manifest rules.`);

/* --- ordinary redirects ----------------------------------------------- */
{
  const first = manifest.rules.find((r) => r.status === 301);
  check('ordinary redirect status+location', matchRedirect(map, first.from), {
    kind: 'redirect',
    status: first.status,
    location: first.to.endsWith('/') ? first.to : `${first.to}/`,
  });
  check(
    'ordinary redirect without trailing slash in request',
    matchRedirect(map, first.from.replace(/\/+$/, '')),
    { kind: 'redirect', status: first.status, location: first.to.endsWith('/') ? first.to : `${first.to}/` },
  );
  check('query string preserved', matchRedirect(map, first.from, '?a=1&b=2'), {
    kind: 'redirect',
    status: first.status,
    location: `${first.to.endsWith('/') ? first.to : `${first.to}/`}?a=1&b=2`,
  });
}

/* --- flattened chains resolve in one hop -------------------------------- */
{
  const flat = manifest.rules.find((r) => r.from === '/gold-rush-mt4-ea');
  check('flattened chain lands on final target', matchRedirect(map, '/gold-rush-mt4-ea'), {
    kind: 'redirect',
    status: 301,
    location: flat ? (flat.to.endsWith('/') ? flat.to : `${flat.to}/`) : 'MISSING-FIXTURE',
  });
}

/* --- retired-archive remaps + hub-funnel policy -----------------------------
 * Retired archives used to act as funnels: every rule that landed on one was
 * re-pointed at a generic fallback (/blog/, /top-ranking/). Since the
 * hub-funnel policy (2026-10-22), a CONTENT url that reached a hub that way
 * is 410 Gone — only taxonomy -> same-taxonomy moves still redirect. These
 * checks pin the new behaviour: the converted rules are recorded in
 * `hubFunnelGone`, and matching one answers 'gone', never a hub redirect. */
{
  const gone = manifest.hubFunnelGone ?? [];
  check('hub-funnel conversions recorded in manifest', gone.length > 0, true);
  const one = gone[0];
  if (one) {
    check('hub-funnelled rule answers 410 gone', matchRedirect(map, one.from), {
      kind: 'gone',
      status: 410,
    });
  }
  const stillFunnelling = manifest.rules.filter(
    (r) => r.status === 301 && manifest.retiredRemaps?.some((rr) => r.to === rr.fallback),
  );
  check('no content rule still redirects into a retired fallback', stillFunnelling.length, 0);
}

/* --- encoded / decoded emoji paths --------------------------------------- */
{
  const emojiRule = manifest.rules.find((r) => /%/.test(r.from) && r.status === 301);
  check('manifest contains percent-encoded sources', Boolean(emojiRule), true);
  if (emojiRule) {
    const decoded = decodeURIComponent(emojiRule.from);
    check('encoded source redirects', matchRedirect(map, emojiRule.from).kind, 'redirect');
    check('decoded emoji source redirects identically', matchRedirect(map, decoded), matchRedirect(map, emojiRule.from));
    check(
      'lowercase-hex encoding redirects identically',
      matchRedirect(map, emojiRule.from.toLowerCase()),
      matchRedirect(map, emojiRule.from),
    );
  }
}

/* --- legal routes are NOT intercepted -------------------------------------- */
for (const legal of ['/disclaimer/', '/disclaimer', '/dmca-policy/', '/dmca-policy', '/methodology/']) {
  check(`legal route passes through: ${legal}`, matchRedirect(map, legal), { kind: 'pass' });
}

/* The retired special-discount page redirects to the broker comparison (owner decision, 2026-11-05). */
check('retired special-discount page 301s to the brokers page', matchRedirect(map, '/special-discount/'), {
  kind: 'redirect',
  status: 301,
  location: '/best-forex-brokers/',
});

/* --- unknown paths 404 ------------------------------------------------------ */
check('unknown path passes through', matchRedirect(map, '/no-such-page-anywhere/'), { kind: 'pass' });
check('homepage passes through', matchRedirect(map, '/'), { kind: 'pass' });

/* --- synthetic fixtures: gone statuses --------------------------------------- */
{
  const fix = buildMap([
    { from: '/removed-old-bonus/', to: '/removed-old-bonus/', status: 410 },
    { from: '/takedown-notice/', to: '/takedown-notice/', status: 451 },
    { from: '/temp-move/', to: '/somewhere-else/', status: 302 },
    { from: '/external-hop/', to: 'https://example.com/landing/', status: 301 },
  ]);
  check('410 gone', matchRedirect(fix, '/removed-old-bonus/'), { kind: 'gone', status: 410 });
  check('451 gone', matchRedirect(fix, '/takedown-notice/'), { kind: 'gone', status: 451 });
  check('302 temporary', matchRedirect(fix, '/temp-move/'), {
    kind: 'redirect',
    status: 302,
    location: '/somewhere-else/',
  });
  check('external target untouched', matchRedirect(fix, '/external-hop/'), {
    kind: 'redirect',
    status: 301,
    location: 'https://example.com/landing/',
  });
  check('external target keeps query', matchRedirect(fix, '/external-hop/', '?x=1'), {
    kind: 'redirect',
    status: 301,
    location: 'https://example.com/landing/?x=1',
  });
}

/* --- legacy WordPress URL classes answer 410 ------------------------------------ */
{
  const gone = { kind: 'gone', status: 410 };
  const empty = buildMap([]);
  check('post feed is gone', matchRedirect(empty, '/some-old-post/feed/'), gone);
  check('post feed without slash is gone', matchRedirect(empty, '/some-old-post/feed'), gone);
  check('category feed is gone', matchRedirect(empty, '/category/forex/feed/'), gone);
  check('comments feed is gone', matchRedirect(empty, '/comments/feed/'), gone);
  check('feed/atom is gone', matchRedirect(empty, '/some-old-post/feed/atom/'), gone);
  check('wp-content wildcard row is gone', matchRedirect(empty, '/wp-content/*/'), gone);
  check('wp-content plugin path is gone', matchRedirect(empty, '/wp-content/plugins/x/sdk_files/'), gone);
  check('wp-includes is gone', matchRedirect(empty, '/wp-includes/js/jquery.js'), gone);
  check('wc-stripe REST route is gone', matchRedirect(empty, '/wc-stripe/v1/cart/item/'), gone);
  check('wc-api endpoint is gone', matchRedirect(empty, '/wc-api/stripe_add_payment_method/'), gone);
  check('old cart is gone', matchRedirect(empty, '/cart/'), gone);
  check('old my-account is gone', matchRedirect(empty, '/my-account/downloads/'), gone);
  check('wp-login.php is gone', matchRedirect(empty, '/wp-login.php'), gone);
  check('old shop pagination is gone', matchRedirect(empty, '/shop/page/1/'), gone);
  check('old blog pagination is gone', matchRedirect(empty, '/blog/page/177/'), gone);
  check('the blog itself passes', matchRedirect(empty, '/blog/'), { kind: 'pass' });
  check('the shop itself passes', matchRedirect(empty, '/shop/'), { kind: 'pass' });
  check('cart-like slug passes', matchRedirect(empty, '/cart-abandonment-in-forex-ecommerce/'), { kind: 'pass' });
  check('Stripe webhook path is NOT touched', matchRedirect(empty, '/wp-json/wc-stripe/v1/webhook/'), { kind: 'pass' });
  check('wp-json is NOT matched by pattern', matchRedirect(empty, '/wp-json/anything/'), { kind: 'pass' });
  check('slug containing "feed" passes', matchRedirect(empty, '/how-to-feed-data-into-an-ea/'), { kind: 'pass' });
  check('slug ending in -feed passes', matchRedirect(empty, '/best-news-feed/'), { kind: 'pass' });
  check('wc-stripe-like slug passes', matchRedirect(empty, '/wc-stripes-review/'), { kind: 'pass' });
  const withRule = buildMap([{ from: '/old/feed/', to: '/new-page/', status: 301 }]);
  check('an explicit rule beats the pattern', matchRedirect(withRule, '/old/feed/'), {
    kind: 'redirect',
    status: 301,
    location: '/new-page/',
  });
}

/* --- canon helper -------------------------------------------------------------- */
check('canon collapses encoding case', canon('/%f0%9f%9a%80-a/'), canon('/%F0%9F%9A%80-a/'));
check('canon matches decoded emoji', canon('/%F0%9F%9A%80-a/'), canon('/🚀-a/'));

/* --- report ---------------------------------------------------------------------- */
console.log(`\n${passed} passed, ${failed} failed.`);
if (failures.length) {
  console.error('\nFailures:');
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log('worker.test PASS');
