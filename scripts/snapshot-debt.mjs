/**
 * Content-debt baseline snapshot.
 *
 * Records every current validation issue (per scripts/content-rules.mjs codes)
 * so the Phase 3 release gate can prove debt only shrinks:
 *   - fail on any NEW violation or any regression of a compliant item
 *   - never auto-regenerate during a normal build
 *   - remove entries only by deliberate review when the post is fixed
 *
 * Usage:
 *   node scripts/snapshot-debt.mjs            # print summary only
 *   node scripts/snapshot-debt.mjs --write    # rewrite src/data/content-debt.json
 */

import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import matter from 'gray-matter';
import { countWords, shingles, jaccard } from '../src/lib/reading.ts';
import { LIMITS, validateDoc } from './content-rules.mjs';

const POSTS_DIR = 'src/content/posts';
const PRODUCTS_DIR = 'src/content/products';
const OUT_FILE = 'src/data/content-debt.json';

async function loadDir(dir, kind) {
  const files = (await readdir(dir)).filter((f) => f.endsWith('.md'));
  const docs = [];
  for (const file of files) {
    const raw = await readFile(join(dir, file), 'utf8');
    const { data, content } = matter(raw);
    docs.push({
      kind,
      file: `${dir}/${file}`,
      slug: data.slug ?? file.replace(/\.md$/, ''),
      issues: validateDoc({ data, content, kind }),
      shingles: kind === 'post' ? shingles(content) : new Set(),
    });
  }
  return docs;
}

const posts = await loadDir(POSTS_DIR, 'post');
const products = await loadDir(PRODUCTS_DIR, 'product');
const all = [...posts, ...products];

// Pairwise duplicates (posts only).
const duplicates = [];
for (let i = 0; i < posts.length; i++) {
  for (let j = i + 1; j < posts.length; j++) {
    const score = jaccard(posts[i].shingles, posts[j].shingles);
    if (score >= LIMITS.DUPLICATE_THRESHOLD) {
      duplicates.push([posts[i].slug, posts[j].slug, Math.round(score * 100)]);
    }
  }
}

const entries = {};
for (const d of all) {
  if (!d.issues.length) continue;
  const byCode = {};
  for (const issue of d.issues) {
    (byCode[issue.code] ??= []).push(issue.detail);
  }
  entries[`${d.kind}:${d.slug}`] = { file: d.file, violations: byCode };
}

const snapshot = {
  generatedAt: new Date().toISOString(),
  rules: 'scripts/content-rules.mjs',
  totals: {
    docs: all.length,
    withViolations: Object.keys(entries).length,
    clean: all.length - Object.keys(entries).length,
    duplicatePairs: duplicates.length,
  },
  duplicates,
  entries,
};

if (process.argv.includes('--write')) {
  await writeFile(OUT_FILE, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
  console.log(`Wrote ${OUT_FILE}: ${snapshot.totals.withViolations} docs with violations.`);
} else {
  console.log(
    `${all.length} docs, ${snapshot.totals.withViolations} with violations, ` +
      `${duplicates.length} duplicate pair(s). Pass --write to save.`,
  );
}
