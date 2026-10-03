/**
 * Live validation of download targets.
 *
 * `check-downloads.mjs` validates the shape of every `download:` block; this
 * checks the destinations actually resolve, because a 404 on a download button
 * is the single most damaging failure this site can ship.
 *
 * Only non-2xx results that mean "this file is gone" fail the run — a 404, 410
 * or other error status. A network error or timeout after one retry is reported
 * as a warning instead: these targets include large GitHub archive downloads
 * that genuinely take longer than a moment to answer, and failing a release on
 * a slow CDN would train people to ignore the gate. A file that was really
 * removed answers 404, not a persistent timeout.
 *
 * When the machine is offline the whole check skips cleanly.
 *
 * Usage:
 *   node scripts/check-downloads-live.mjs
 *   node scripts/check-downloads-live.mjs --verbose
 */

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';

const POSTS_DIR = 'src/content/posts';
const R2_PUBLIC_URL = (process.env.PUBLIC_R2_PUBLIC_URL || 'https://files.bestmt4ea.com').replace(/\/+$/, '');
const TIMEOUT_MS = 20_000;
const RETRIES = 1;
const VERBOSE = process.argv.includes('--verbose');
const GONE = new Set([404, 410, 451]);
const HEAD_REFUSED = new Set([403, 405, 429, 501]);

async function probe(url, attempt = 0) {
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { 'user-agent': 'BESTMT4EA-release-check/1.0 (+https://bestmt4ea.com/)' },
    });
    return { status: res.status, finalUrl: res.url };
  } catch (error) {
    if (attempt < RETRIES) return probe(url, attempt + 1);
    return { error: error.name === 'TimeoutError' ? 'timed out' : error.message };
  }
}

const targets = [];
for (const file of readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'))) {
  const { data } = matter(readFileSync(join(POSTS_DIR, file), 'utf8'));
  const download = data.download;
  if (!download) continue;
  const slug = data.slug ?? file.replace(/\.md$/, '');
  if (download.fileKey) {
    targets.push({ slug, kind: 'hosted', url: `${R2_PUBLIC_URL}/${String(download.fileKey).replace(/^\/+/, '')}` });
  } else if (download.externalUrl) {
    targets.push({ slug, kind: 'external', url: String(download.externalUrl) });
  }
}

if (targets.length === 0) {
  console.log('check-downloads-live: no download targets to probe.');
  process.exit(0);
}

// Connectivity probe: an unreachable network is not a content defect.
const online = await probe('https://example.com/');
if (online.error) {
  console.log(`check-downloads-live SKIPPED: no network access (${online.error}).`);
  process.exit(0);
}

const problems = [];
const warnings = [];
let ok = 0;

for (const target of targets) {
  const result = await probe(target.url);
  if (result.error) {
    warnings.push(`${target.slug} [${target.kind}] could not be reached (${result.error}) — ${target.url}`);
    continue;
  }
  if (GONE.has(result.status)) {
    problems.push(`${target.slug} [${target.kind}] returns ${result.status} — ${target.url}`);
    continue;
  }
  if (HEAD_REFUSED.has(result.status)) {
    warnings.push(`${target.slug} [${target.kind}] host refused HEAD (${result.status}) — ${target.url}`);
    continue;
  }
  if (result.status >= 400) {
    problems.push(`${target.slug} [${target.kind}] returns ${result.status} — ${target.url}`);
    continue;
  }
  ok++;
  if (VERBOSE) console.log(`  ${result.status} ${target.slug} — ${target.url}`);
}

if (warnings.length) {
  console.log(`Warnings (${warnings.length}):`);
  for (const w of warnings) console.log(`  - ${w}`);
}

if (problems.length > 0) {
  console.error(`\ncheck-downloads-live FAILED with ${problems.length} problem(s):`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}

console.log(`check-downloads-live PASS: ${ok}/${targets.length} download target(s) resolve.`);
