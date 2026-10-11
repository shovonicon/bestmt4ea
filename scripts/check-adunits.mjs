/**
 * Live ad-unit diagnostic.
 *
 * Reports, per unit: size, whether it actually asked AdSense for an ad, and what
 * AdSense answered. The distinction that matters is `asked=n` (never requested —
 * correct for a unit that is hidden, a bug for one that is visible) versus
 * `asked=y status=unfilled` (requested and declined by AdSense).
 *
 * Hoped-for shape after the AdSlot fix: no unit asks while it has zero height,
 * and every unit that is visible in both axes asks.
 *
 * Lives in scripts/ rather than test-results/ because the release build wipes
 * that directory — it deleted this probe twice.
 */
import { chromium } from '@playwright/test';

const URL =
  'https://bestmt4ea.com/eur-usd-expert-advisor-ea-overview-free-download-guide/';
const CACHE_BUST = `?probe=${Date.now()}`;

const browser = await chromium.launch();

for (const vp of [
  { width: 1920, height: 1000 },
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
]) {
  const page = await browser.newPage({ viewport: vp });
  await page.goto(URL + CACHE_BUST, { waitUntil: 'load' });
  await page.waitForTimeout(9000);

  const units = await page.evaluate(() =>
    [...document.querySelectorAll('ins.adsbygoogle')].map((el) => ({
      slot: el.getAttribute('data-ad-slot') ?? '(none)',
      w: el.offsetWidth,
      h: el.offsetHeight,
      asked: el.dataset.adRequested === '1',
      status: el.getAttribute('data-ad-status') ?? '(none)',
    })),
  );

  const visible = units.filter((u) => u.w > 0 && u.h > 0);
  const visibleNotAsked = visible.filter((u) => !u.asked);
  const zeroHeightAsked = units.filter((u) => u.w > 0 && u.h === 0 && u.asked);
  const filled = units.filter((u) => u.status === 'filled');

  console.log(`\n=== viewport ${vp.width}x${vp.height} ===`);
  console.log(
    `units ${units.length}  visible ${visible.length}  asked ${units.filter((u) => u.asked).length}  filled ${filled.length}`,
  );
  console.log(
    `FAULT visible-but-never-asked: ${visibleNotAsked.length}    zero-height-but-asked: ${zeroHeightAsked.length}`,
  );
  for (const u of units) {
    console.log(
      `  slot ${u.slot}  ${String(u.w).padStart(5)}x${String(u.h).padEnd(4)}  asked=${u.asked ? 'y' : 'n'}  status=${u.status}`,
    );
  }

  await page.close();
}

await browser.close();
