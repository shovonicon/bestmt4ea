/**
 * Changed-content detection without git.
 *
 * The release gate has to know which content files a change touched, but this
 * repo is not a git checkout and may be edited by tools that never commit. So
 * "changed" means: the file's hash differs from the baseline recorded in
 * `src/data/content-hashes.json`.
 *
 * An absent or empty baseline treats every file as changed, which is the safe
 * default — a fresh clone is asked to satisfy the strict gate for everything
 * before it can ship.
 *
 * Usage:
 *   node scripts/changed-files.mjs            # list changed content files
 *   node scripts/changed-files.mjs --write    # accept current state as baseline
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';

export const BASELINE = 'src/data/content-hashes.json';
export const CONTENT_DIRS = ['src/content/posts', 'src/content/products', 'src/content/pages'];

/** Every content file, as forward-slash relative paths. */
export function contentFiles() {
  const out = [];
  for (const dir of CONTENT_DIRS) {
    if (!existsSync(dir)) continue;
    for (const f of readdirSync(dir)) {
      if (f.endsWith('.md')) out.push(`${dir}/${f}`);
    }
  }
  return out;
}

const hashFile = (path) => createHash('sha256').update(readFileSync(path)).digest('hex').slice(0, 16);

export function currentHashes() {
  const map = {};
  for (const f of contentFiles()) map[f] = hashFile(f);
  return map;
}

export function readBaseline() {
  if (!existsSync(BASELINE)) return {};
  try {
    return JSON.parse(readFileSync(BASELINE, 'utf8')).hashes ?? {};
  } catch {
    return {};
  }
}

/**
 * Content files whose hash differs from the baseline, plus any file the
 * baseline has never seen. `only` optionally narrows the result to paths
 * ending with one of the given suffixes.
 */
export function changedFiles(only = null) {
  const base = readBaseline();
  const changed = contentFiles().filter((f) => base[f] !== hashFile(f));
  if (!only?.length) return changed;
  return changed.filter((f) => only.some((suffix) => f.endsWith(suffix)));
}

/** Persist the current hashes as the new baseline. Returns the file count. */
export function writeBaseline() {
  const hashes = currentHashes();
  writeFileSync(BASELINE, `${JSON.stringify({ generatedAt: new Date().toISOString(), hashes }, null, 2)}\n`, 'utf8');
  return Object.keys(hashes).length;
}

/* -------------------------------------------------------------------- cli */

const invokedDirectly = process.argv[1]?.replace(/\\/g, '/').endsWith('scripts/changed-files.mjs');
if (invokedDirectly) {
  if (process.argv.includes('--write')) {
    console.log(`Baseline written for ${writeBaseline()} content file(s) -> ${BASELINE}`);
  } else {
    const changed = changedFiles();
    if (changed.length === 0) {
      console.log('No content files differ from the baseline.');
    } else {
      console.log(`${changed.length} changed content file(s):`);
      for (const f of changed) console.log(`  ${f}`);
    }
  }
}
