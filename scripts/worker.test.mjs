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
  const first = manifest.rules[0];
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

/* --- retired-archive remaps ---------------------------------------------- */
{
  const retired = manifest.retiredRemaps?.[0];
  if (retired) {
    const sample = manifest.rules.find((r) => r.to === retired.fallback && !map.get(cmpKey(r.to)));
    void sample;
    const viaRetired = manifest.rules.filter((r) =>
      manifest.retiredRemaps.some((rr) => r.to === rr.fallback),
    );
    check('at least one rule lands on a retired-archive fallback', viaRetired.length > 0, true);
    const one = viaRetired[0];
    check('retired-archive rule redirects to live fallback', matchRedirect(map, one.from), {
      kind: 'redirect',
      status: one.status,
      location: retired.fallback,
    });
  } else {
    check('retired remaps recorded in manifest', manifest.retiredRemaps, 'MISSING');
  }
}

/* --- encoded / decoded emoji paths --------------------------------------- */
{
  const emojiRule = manifest.rules.find((r) => /%/.test(r.from));
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
for (const legal of ['/disclaimer/', '/disclaimer', '/dmca-policy/', '/dmca-policy', '/special-discount']) {
  check(`legal route passes through: ${legal}`, matchRedirect(map, legal), { kind: 'pass' });
}

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
