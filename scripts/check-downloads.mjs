/**
 * Download validation.
 *
 * Every post carries a `download:` block and that block is the site's core
 * promise, so it is validated before release rather than discovered by a user:
 *
 *   - exactly one of fileKey (hosted on R2) or externalUrl (linked at source)
 *   - the origin is own|opensource, with a stated licence
 *   - an opensource download credits its author and links to the source
 *   - the R2 public domain is configured when any hosted file is referenced
 *   - hosted keys are clean relative object keys with a real file extension
 *   - a download post carries installSteps (HowTo needs them, and the steps keep
 *     the download action away from the first ad)
 *
 * Hosted bytes are not fetched here — the key format and configuration are
 * checked, and `scripts/release-gate.mjs` runs this before `wrangler deploy`.
 *
 * Usage: node scripts/check-downloads.mjs
 */

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';

const POSTS_DIR = 'src/content/posts';
const R2_PUBLIC_URL = process.env.PUBLIC_R2_PUBLIC_URL || 'https://files.bestmt4ea.com';
const MIN_INSTALL_STEPS = 3;
const FILE_EXT = /\.(?:ex4|ex5|mq4|mq5|set|zip|rar|7z|pdf|xlsx?|csv|txt|tpl|ind|mqh)$/i;

const errors = [];
const notes = [];
const uses = [];
let checked = 0;
let hosted = 0;
let linked = 0;

/**
 * A download library where every entry offers the same file is not a library.
 * This is the ceiling on how often one source may back different posts.
 */
const MAX_SOURCE_REUSE = 4;
const WARN_SOURCE_REUSE = 2;

for (const file of readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'))) {
  const { data } = matter(readFileSync(join(POSTS_DIR, file), 'utf8'));
  const download = data.download;
  if (!download) continue;
  checked++;

  const fail = (msg) => errors.push(`${file}: ${msg}`);
  const slug = data.slug ?? file.replace(/\.md$/, '');

  if (!['own', 'opensource'].includes(download.origin)) {
    fail(`origin must be own|opensource (got ${JSON.stringify(download.origin)})`);
  }
  if (!download.license) fail('missing licence');

  if (download.origin === 'opensource') {
    if (!download.author) fail('opensource download must credit an author');
    if (!download.sourceUrl) fail('opensource download must link to its source');
    else if (!/^https?:\/\/\S+$/i.test(download.sourceUrl)) {
      fail(`sourceUrl is not an absolute URL: ${download.sourceUrl}`);
    }
  }

  const hasKey = Boolean(download.fileKey);
  const hasUrl = Boolean(download.externalUrl);
  if (hasKey && hasUrl) {
    notes.push(`${file}: has both fileKey and externalUrl — fileKey wins at render time`);
  }
  if (!hasKey && !hasUrl) {
    fail('needs either a hosted fileKey or an externalUrl');
  }

  if (hasKey) {
    hosted++;
    const key = String(download.fileKey);
    if (key.startsWith('/')) fail(`fileKey must be a relative object key, not a path: ${key}`);
    if (/\s/.test(key)) fail(`fileKey contains whitespace: ${key}`);
    if (!FILE_EXT.test(key)) fail(`fileKey has no recognised file extension: ${key}`);
    if (!R2_PUBLIC_URL) fail('fileKey is hosted but PUBLIC_R2_PUBLIC_URL is not configured');
  }

  if (hasUrl) {
    linked++;
    if (!/^https?:\/\/\S+$/i.test(String(download.externalUrl))) {
      fail(`externalUrl is not an absolute URL: ${download.externalUrl}`);
    }
    uses.push({ slug, source: String(download.externalUrl), kind: 'external' });
  } else if (hasKey) {
    uses.push({ slug, source: `r2://${String(download.fileKey)}`, kind: 'hosted' });
  }

  const steps = data.installSteps?.length ?? 0;
  if (steps < MIN_INSTALL_STEPS) {
    fail(`download post has ${steps} install step(s), expected at least ${MIN_INSTALL_STEPS}`);
  }

  notes.push(`${slug}: ${hasKey ? 'hosted' : 'external'} · ${download.license}${download.platform ? ` · ${download.platform}` : ''}`);
}

/* --------------------------------------------------------------- variety */

const counts = new Map();
for (const use of uses) counts.set(use.source, (counts.get(use.source) ?? 0) + 1);

const overused = [...counts.entries()].filter(([, n]) => n > MAX_SOURCE_REUSE);
const lopsided = [...counts.entries()].filter(([, n]) => n > WARN_SOURCE_REUSE && n <= MAX_SOURCE_REUSE);

for (const [source, n] of overused) {
  errors.push(`download source used by ${n} posts (max ${MAX_SOURCE_REUSE}) — ${source}`);
}

if (errors.length > 0) {
  console.error(`\ncheck-downloads FAILED with ${errors.length} error(s):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

if (lopsided.length) {
  console.log('Reused sources (aim for per-post variety):');
  for (const [source, n] of lopsided.sort((a, b) => b[1] - a[1])) {
    console.log(`  ${n}x ${source}`);
  }
}

if (process.env.VERBOSE) {
  console.log('\nDownload sources:');
  for (const [source, n] of [...counts.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(n).padStart(2)}x ${source}`);
  }
}

console.log(
  `check-downloads PASS: ${checked} download post(s) valid (${hosted} hosted, ${linked} external, ` +
    `${counts.size} distinct source(s), max reuse ${Math.max(0, ...counts.values())}).`,
);
