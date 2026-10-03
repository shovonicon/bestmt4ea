#!/usr/bin/env node
/**
 * Production release gate.
 *
 * One command that must pass before anything ships. It runs the cheap content
 * gates first so a bad edit fails fast, then builds and validates the output:
 *
 *   1. Astro type/content check      (skipped when @astrojs/check is absent)
 *   2. Redirect manifest generation  (strict; fails on any invalid rule)
 *   3. Content inventory regeneration
 *   4. Changed-content gate          (touched files must be fully compliant)
 *   5. Content-debt gate             (debt may only shrink)
 *   6. Build
 *   7. Route validation              (manifest vs live routes)
 *   8. Rendered-HTML structure       (one H1, no duplicate sections, no sidebar)
 *   9. Canonicals + emoji encoding   (one absolute self-canonical per page)
 *  10. Structured data               (no zero prices, invented brand or build-time dates)
 *  11. Internal links
 *  12. Downloads (static shape)
 *  13. Downloads (live targets)
 *  14. Browser + accessibility tests   (Playwright + axe, desktop and mobile)
 *  15. Worker redirect tests
 *  16. Wrangler dry-run
 *  17. Cron Worker dry-run
 *
 * `npm run deploy` runs this automatically via npm's `predeploy` hook.
 *
 * Usage:
 *   npm run release:check
 *   node scripts/release-gate.mjs --skip-dry-run
 */

import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';

const skipDryRun = process.argv.includes('--skip-dry-run');
const hasAstroCheck = existsSync('node_modules/@astrojs/check');

/**
 * Steps run through the shell, because `npx.cmd` cannot be spawned directly on
 * Windows. Commands are fixed strings defined here — never built from input.
 */
const steps = [
  ...(hasAstroCheck
    ? [['Astro type/content check', 'npx astro check']]
    : [['Astro type/content check', null, 'install @astrojs/check to enable']]),
  ['Generate redirect manifest', 'node scripts/build-redirects.mjs'],
  ['Regenerate content inventory', 'node scripts/build-inventory.mjs'],
  ['Changed-content gate', 'node scripts/check-content.mjs --changed'],
  ['Content-debt gate', 'node scripts/check-content.mjs --debt'],
  ['Build site', 'npx astro build'],
  ['Route validation', 'node scripts/check-routes.mjs'],
  ['Rendered-HTML structure', 'node scripts/check-rendered-html.mjs'],
  ['Canonicals + emoji encoding', 'node scripts/check-canonicals.mjs'],
  ['Structured data', 'node scripts/check-schema.mjs'],
  ['Internal links', 'node scripts/check-links.mjs'],
  ['Downloads (static)', 'node scripts/check-downloads.mjs'],
  ['Downloads (live targets)', 'node scripts/check-downloads-live.mjs'],
  ['Browser + accessibility tests', 'npx playwright test'],
  ['Worker redirect tests', 'node scripts/worker.test.mjs'],
  ...(skipDryRun
    ? [
        ['Wrangler dry-run', null, 'skipped (--skip-dry-run)'],
        ['Cron Worker dry-run', null, 'skipped (--skip-dry-run)'],
      ]
    : [
        ['Wrangler dry-run', 'npx wrangler deploy --dry-run'],
        [
          'Cron Worker dry-run',
          'npx wrangler deploy --config worker-cron/wrangler.jsonc --dry-run',
        ],
      ]),
];

const started = Date.now();
let failed = 0;

for (const [name, command, skipReason] of steps) {
  if (!command) {
    console.log(`\n${'\u2500'.repeat(72)}\nSKIP  ${name} — ${skipReason}`);
    continue;
  }
  console.log(`\n${'\u2500'.repeat(72)}\nRUN   ${name}`);
  const result = spawnSync(command, { stdio: 'inherit', shell: true });
  if (result.status !== 0) {
    failed++;
    console.error(`\nFAIL  ${name} (exit ${result.status ?? result.signal ?? 'unknown'})`);
    break;
  }
}

const seconds = ((Date.now() - started) / 1000).toFixed(1);
if (failed > 0) {
  console.error(`\n${'\u2500'.repeat(72)}\nrelease:check FAILED after ${seconds}s.`);
  process.exit(1);
}
console.log(`\n${'\u2500'.repeat(72)}\nrelease:check PASSED (${seconds}s).`);
