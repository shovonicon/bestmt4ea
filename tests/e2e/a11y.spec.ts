import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Accessibility audit of the pages the site depends on.
 *
 * Only `serious` and `critical` axe findings fail the run: `moderate` and
 * `minor` items are reported by axe but are not release blockers, and treating
 * them as blockers trains people to ignore the gate.
 */

const PAGES = [
  { name: 'homepage', path: '/' },
  { name: 'top ranking', path: '/top-ranking/' },
  { name: 'broker comparison', path: '/best-forex-brokers/' },
  { name: 'product page', path: '/product/ava-aigpt5-ea/' },
  { name: 'privacy policy', path: '/privacy-policy/' },
  { name: 'terms and conditions', path: '/terms-conditions/' },
  { name: 'risk disclaimer', path: '/disclaimer/' },
];

const BLOCKING = new Set(['serious', 'critical']);

for (const page of PAGES) {
  test(`${page.name} — no serious or critical accessibility violations`, async ({ page: pw }) => {
    await pw.goto(page.path, { waitUntil: 'load' });

    const results = await new AxeBuilder({ page: pw })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    const blocking = results.violations.filter((violation) => BLOCKING.has(violation.impact ?? ''));
    const summary = blocking
      .map((v) => `  ${v.id} [${v.impact}] — ${v.help}\n    ${v.nodes.map((n) => n.target.join(' ')).join('\n    ')}`)
      .join('\n');

    expect(blocking, `axe found blocking issues:\n${summary}`).toEqual([]);
  });
}

// The three money pages carry the widest tables on the site, so they are the
// ones that would break this.
for (const entry of [
  { name: 'homepage', path: '/' },
  { name: 'top ranking', path: '/top-ranking/' },
  { name: 'broker comparison', path: '/best-forex-brokers/' },
]) {
  test(`no horizontal overflow on the ${entry.name}`, async ({ page }) => {
    await page.goto(entry.path, { waitUntil: 'load' });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `${entry.path} should not scroll horizontally`).toBeLessThanOrEqual(1);
  });
}

test('every page declares one H1', async ({ page }) => {
  for (const entry of PAGES) {
    await page.goto(entry.path, { waitUntil: 'load' });
    await expect(page.locator('h1'), `${entry.path} should have exactly one H1`).toHaveCount(1);
  }
});
