/**
 * Screenshot the local dev server so the site can be shown after a change.
 *
 * Writes to test-results/show/ (gitignored). AdSense does not serve to
 * localhost, so ad units appear as labels with empty reserved boxes — expected.
 *
 * The dev server is left RUNNING after this finishes.
 */
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const BASE = 'http://localhost:4321';
const OUT = 'test-results/show';

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
};

const targets = [
  { name: 'home', path: '/', vps: ['desktop'] },
  { name: 'blog-archive', path: '/blog/', vps: ['desktop'] },
  { name: 'fxcore-single-plan', path: '/product/fxcore100-ea/', vps: ['desktop', 'mobile'] },
  { name: 'zenith-three-plans', path: '/product/zenith-matrix-ea-ai-gold-scalper-for-mt5/', vps: ['desktop'] },
];

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();

for (const target of targets) {
  for (const vpName of target.vps) {
    const vp = VIEWPORTS[vpName];
    const page = await browser.newPage({ viewport: vp });
    const res = await page.goto(BASE + target.path, { waitUntil: 'load' });
    await page.waitForTimeout(2000);
    const file = `${OUT}/${target.name}-${vpName}.png`;
    await page.screenshot({ path: file });
    const h1 = await page.evaluate(
      () => document.querySelector('h1')?.textContent?.trim() ?? '(no h1)',
    );
    console.log(
      `${vpName.padEnd(8)} ${target.name.padEnd(24)} status=${res?.status()}  h1="${h1.slice(0, 60)}"`,
    );
    await page.close();
  }
}

await browser.close();
