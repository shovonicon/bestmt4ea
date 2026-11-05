#!/usr/bin/env node
/**
 * Title-tag gate (SEO recovery, Phase 4).
 *
 * Reads the rendered <title> of every page in dist/client and checks it against
 * the display window Google uses: 30-60 characters, counted after HTML entities
 * are decoded. Over-length titles are truncated in results; very short ones waste
 * the strongest on-page signal.
 *
 *   over 60   FAIL   (BaseLayout drops the brand suffix before this happens, so a
 *                     failure means the page's own title needs shortening)
 *   under 30  FAIL
 *   duplicate WARN   (two pages sharing one title compete with each other)
 *
 * Usage: node scripts/check-titles.mjs        (run after `npm run build`)
 */

import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist/client';
const MIN = 30;
const MAX = 60;

if (!existsSync(DIST)) {
  console.error(`check-titles: ${DIST} not found. Run \`npm run build\` first.`);
  process.exit(1);
}

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));

const pages = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name === 'index.html') {
      const match = readFileSync(path, 'utf8').match(/<title>([\s\S]*?)<\/title>/);
      const route = '/' + path.slice(DIST.length).split('\\').join('/').replace(/^\/|index\.html$/g, '');
      pages.push({ route, title: match ? decode(match[1].trim()) : null });
    }
  }
})(DIST);

const problems = [];
const seen = new Map();
for (const { route, title } of pages) {
  if (!title) {
    problems.push(`${route}  has no <title>`);
    continue;
  }
  const length = [...title].length;
  if (length > MAX) problems.push(`${route}  ${length} chars (max ${MAX}): ${title}`);
  else if (length < MIN) problems.push(`${route}  ${length} chars (min ${MIN}): ${title}`);
  seen.set(title, [...(seen.get(title) ?? []), route]);
}

const duplicates = [...seen.entries()].filter(([, routes]) => routes.length > 1);

if (duplicates.length) {
  console.warn(`check-titles WARN: ${duplicates.length} title(s) shared by more than one page:`);
  for (const [title, routes] of duplicates.slice(0, 10)) console.warn(`  "${title}"  ${routes.join(', ')}`);
}

if (problems.length) {
  console.error(`check-titles FAIL: ${problems.length} of ${pages.length} page(s) outside ${MIN}-${MAX} characters:`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}

console.log(`check-titles PASS: ${pages.length} page(s), every title is ${MIN}-${MAX} characters.`);
