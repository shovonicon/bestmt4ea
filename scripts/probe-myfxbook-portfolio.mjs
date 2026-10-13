/**
 * What does the new Myfxbook /portfolio/ layout actually expose?
 *
 * The collector reads <table> rows. An old /members/ page yields stats=20;
 * the new /portfolio/ page yields stats=0, so the figures live somewhere else.
 * This reports where, so the scraper can be taught to read it.
 */
import { chromium } from '@playwright/test';

const URL =
  process.argv[2] ||
  'https://www.myfxbook.com/portfolio/equinox-cosmos-gbpjpy-ea-ai/12256314';
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36';

const browser = await chromium.launch();
const page = await browser.newPage({ userAgent: UA });

const res = await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(7000);

console.log(`status ${res?.status()}  final url ${page.url()}`);

const info = await page.evaluate(() => {
  const text = document.body.innerText;
  const tables = [...document.querySelectorAll('table')];

  // Any element whose text is exactly a figure we want, with its ancestry.
  const wanted = /^\s*[-+]?[\d.,]+\s*%?\s*$/;
  const samples = [];
  for (const el of document.querySelectorAll('span,div,td,strong,b')) {
    const t = (el.textContent ?? '').trim();
    if (t.length < 12 && wanted.test(t) && el.children.length === 0) {
      samples.push({
        text: t,
        tag: el.tagName,
        cls: (el.className || '').toString().slice(0, 60),
        parentCls: (el.parentElement?.className || '').toString().slice(0, 60),
      });
    }
    if (samples.length > 14) break;
  }

  return {
    title: document.title,
    h1: document.querySelector('h1')?.textContent?.trim() ?? null,
    tableCount: tables.length,
    tableRowCounts: tables.map((t) => t.querySelectorAll('tr').length),
    hasTotalGainText: /total gain/i.test(text),
    hasProfitFactor: /profit factor/i.test(text),
    hasDrawdown: /drawdown/i.test(text),
    bodyLen: text.length,
    samples,
  };
});

console.log(JSON.stringify(info, null, 1));

// Where in the text do the keywords sit, so we can see the surrounding block.
const idx = await page.evaluate(() => {
  const t = document.body.innerText;
  const out = {};
  for (const k of ['Total Gain', 'Profit Factor', 'Drawdown', 'Balance']) {
    out[k] = t.indexOf(k);
  }
  return out;
});
console.log('keyword offsets:', JSON.stringify(idx));
if (idx['Profit Factor'] >= 0) {
  const around = await page.evaluate(
    () => document.body.innerText.slice(0, 1200).replace(/\n+/g, ' | '),
  );
  console.log('first 1200 chars:', around);
}

await browser.close();
