/**
 * Route validation for the Worker redirect manifest.
 *
 * Independently re-verifies `src/generated/redirects.json` against the live
 * routes derived from content (`scripts/routes.mjs`), so a stale or
 * hand-edited manifest cannot deploy:
 *
 *   - no source may collide with a live route (redirects must never shadow
 *     real pages — notably /disclaimer/, /dmca-policy/, /special-discount/)
 *   - every local target must be a live route (no redirect may land on a 404)
 *   - no duplicate sources, no self-redirects, no unsupported statuses
 *   - no rule may be an unresolved chain hop (every target must be final)
 *
 * Usage: node scripts/check-routes.mjs
 */

import { readFileSync, existsSync } from 'node:fs';
import { getLiveRoutes, cmpKey, isExternal } from './routes.mjs';

const MANIFEST = 'src/generated/redirects.json';

/** Legal and system pages a redirect must never intercept. */
const PROTECTED_ROUTES = [
  '/disclaimer/',
  '/dmca-policy/',
  '/affiliate-disclosure/',
  '/privacy-policy/',
  '/terms-conditions/',
  '/special-discount/',
];

const VALID_STATUSES = new Set([301, 302, 307, 308, 410, 451]);

async function main() {
  const errors = [];
  if (!existsSync(MANIFEST)) {
    console.error(`Missing ${MANIFEST} — run: npm run redirects`);
    process.exit(1);
  }
  const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'));
  const live = getLiveRoutes();

  const seen = new Set();
  for (const rule of manifest.rules) {
    const sk = cmpKey(rule.from);
    if (seen.has(sk)) errors.push(`Duplicate source: ${rule.from}`);
    seen.add(sk);

    if (!VALID_STATUSES.has(rule.status)) {
      errors.push(`Unsupported status ${rule.status}: ${rule.from}`);
    }
    if (!isExternal(rule.to) && sk === cmpKey(rule.to)) {
      errors.push(`Self-redirect: ${rule.from}`);
    }
    if (live.has(sk)) {
      errors.push(`Source shadows a live route: ${rule.from} -> ${rule.to}`);
    }
    if (!isExternal(rule.to) && !live.has(cmpKey(rule.to))) {
      errors.push(`Target is not a live route: ${rule.from} -> ${rule.to}`);
    }
  }

  // No target may be a hop in another redirect (chains must be flattened).
  for (const rule of manifest.rules) {
    if (!isExternal(rule.to) && seen.has(cmpKey(rule.to)) && cmpKey(rule.to) !== cmpKey(rule.from)) {
      errors.push(`Unresolved chain hop: ${rule.from} -> ${rule.to} (target is itself a source)`);
    }
  }

  // Protected pages: neither shadowed by a redirect source nor missing.
  for (const route of PROTECTED_ROUTES) {
    const k = cmpKey(route);
    if (seen.has(k)) errors.push(`Protected route shadowed by a redirect source: ${route}`);
    if (!live.has(k)) errors.push(`Protected route has no live page: ${route}`);
  }

  if (errors.length > 0) {
    console.error(`\ncheck-routes FAILED with ${errors.length} error(s):`);
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }
  console.log(`check-routes PASS: ${manifest.rules.length} rules, ${live.size} live routes, no collisions.`);
}

main().catch((err) => {
  console.error('check-routes failed:', err.message);
  process.exit(1);
});
