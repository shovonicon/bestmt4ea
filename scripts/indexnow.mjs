/**
 * IndexNow submission: tells Bing, Yandex and other IndexNow engines that URLs
 * were added or changed, so they are crawled without waiting for a sitemap pass.
 * (Google does not use IndexNow; use Search Console for Google.)
 *
 * The key lives in public/<key>.txt and must be live on the site before submitting.
 *
 * Usage:
 *   node scripts/indexnow.mjs --since <git-rev>   # posts/pages added or changed since that revision
 *   node scripts/indexnow.mjs --all               # every URL in the sitemap
 *   node scripts/indexnow.mjs /some-page/ /other/ # specific paths
 *   add --dry-run to print the list without sending
 */

import { readdirSync, readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const HOST = 'bestmt4ea.com';
const ORIGIN = `https://${HOST}`;
const args = process.argv.slice(2);
const DRY = args.includes('--dry-run');

const keyFile = readdirSync('public').find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) throw new Error('No IndexNow key file (public/<32 hex>.txt) found');
const KEY = keyFile.replace('.txt', '');

const urls = new Set();
const sinceIdx = args.indexOf('--since');
if (sinceIdx >= 0) {
  const rev = args[sinceIdx + 1];
  const out = execSync(`git diff --name-only --diff-filter=AM ${rev} HEAD -- src/content/posts src/content/pages`, { encoding: 'utf8' });
  for (const f of out.split(/\r?\n/).filter(Boolean)) {
    if (/^draft:\s*true/m.test(readFileSync(f, 'utf8'))) continue; // drafts are not public
    const slug = decodeURIComponent(f.replace(/^src\/content\/(posts|pages)\//, '').replace(/\.md$/, ''));
    urls.add(`${ORIGIN}/${encodeURI(slug)}/`);
  }
  urls.add(`${ORIGIN}/`);
  urls.add(`${ORIGIN}/blog/`);
} else if (args.includes('--all')) {
  const res = await fetch(`${ORIGIN}/sitemap-0.xml`);
  for (const m of (await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)) urls.add(m[1]);
} else {
  for (const p of args.filter((a) => a.startsWith('/'))) urls.add(`${ORIGIN}${p}`);
}

const urlList = [...urls];
console.log(`${urlList.length} URL(s) for ${HOST}, key ${KEY.slice(0, 6)}…`);
if (!urlList.length) process.exit(0);
if (DRY) { console.log(urlList.slice(0, 40).join('\n')); process.exit(0); }

// IndexNow accepts up to 10,000 URLs per call.
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${ORIGIN}/${KEY}.txt`, urlList }),
});
console.log('IndexNow response:', res.status, res.statusText, '(200/202 = accepted)');
