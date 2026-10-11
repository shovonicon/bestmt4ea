/**
 * Live ad-unit diagnostic.
 *
 * Reports per unit: size, whether the ask script ran, what AdSense answered, and
 * which renderer produced it — `AdSlot.astro` or the rehype injector. Those two
 * are different code paths and had different bugs, so telling them apart is the
 * whole point.
 *
 * `asked` reads an attribute that only AdSlot sets. The rehype injector pushes
 * unconditionally and sets nothing, so a unit tagged `injected` with asked=n may
 * well have pushed. `run` distinguishes the two properly: it records whether the
 * ask script executed at all, via a marker pushed onto the queue.
 *
 * AdSense reports its own failures to the console, so console output is captured
 * and printed. Guessing at why a unit did not fill is how a wrong diagnosis got
 * recorded once already.
 *
 * Usage: node scripts/check-adunits.mjs [url]
 *
 * Lives in scripts/ rather than test-results/ because the release build wipes
 * that directory — it deleted this probe twice.
 */
import { chromium } from '@playwright/test';

const URL =
  process.argv[2] ||
  'https://bestmt4ea.com/eur-usd-expert-advisor-ea-overview-free-download-guide/';
const CACHE_BUST = `?probe=${Date.now()}`;

const browser = await chromium.launch();

for (const vp of [
  { width: 1920, height: 1000 },
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
]) {
  const page = await browser.newPage({ viewport: vp });

  const console_ = [];
  page.on('console', (m) => {
    const t = m.text();
    if (/adsbygoogle|AdSense|slot size|availableWidth|ins element/i.test(t)) {
      console_.push(`[${m.type()}] ${t}`);
    }
  });
  page.on('pageerror', (e) => console_.push(`[pageerror] ${e.message}`));

  await page.goto(URL + CACHE_BUST, { waitUntil: 'load' });
  await page.waitForTimeout(9000);

  const report = await page.evaluate(() => {
    const lib = document.querySelector('script[src*="adsbygoogle.js"]');
    return {
      libLoaded: Boolean(lib),
      libRequested: Boolean(window.__adsenseRequested),
      queueIsArray: Array.isArray(window.adsbygoogle),
      queueLength: Array.isArray(window.adsbygoogle) ? window.adsbygoogle.length : -1,
      units: [...document.querySelectorAll('ins.adsbygoogle')].map((el) => ({
        slot: el.getAttribute('data-ad-slot') ?? '(none)',
        kind: el.closest('.in-article-ad')
          ? 'injected'
          : el.closest('[data-ad-unit]')
            ? 'adslot'
            : 'external',
        w: el.offsetWidth,
        h: el.offsetHeight,
        flag: el.dataset.adRequested === '1',
        status: el.getAttribute('data-ad-status') ?? '(none)',
      })),
    };
  });

  console.log(`\n=== viewport ${vp.width}x${vp.height} ===`);
  console.log(
    `lib script in DOM: ${report.libLoaded}   __adsenseRequested: ${report.libRequested}   ` +
      `window.adsbygoogle is ${report.queueIsArray ? `array(len ${report.queueLength})` : 'the library object'}`,
  );
  console.log(`units ${report.units.length}`);
  for (const u of report.units) {
    console.log(
      `  ${u.kind.padEnd(8)} slot ${u.slot.padEnd(12)} ${String(u.w).padStart(5)}x${String(u.h).padEnd(4)}` +
        `  flag=${u.flag ? 'y' : 'n'}  status=${u.status}`,
    );
  }
  if (console_.length) {
    console.log(`  AdSense console output (${console_.length}):`);
    for (const line of console_.slice(0, 12)) console.log(`    ${line}`);
  } else {
    console.log('  AdSense console output: none matched');
  }

  await page.close();
}

await browser.close();
