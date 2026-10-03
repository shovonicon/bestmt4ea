/**
 * Product image migration.
 *
 * Downloads only the images referenced by PRODUCT entries (featured image,
 * gallery and inline product screenshots) and rewrites those references to
 * local paths under /media/products/. Posts and pages are exported text-only,
 * so nothing else needs fetching.
 *
 * Images are stored flat and deduplicated by source URL, because the same
 * broker/symbol artwork is reused across many products. Filename collisions
 * between different images get a short hash suffix so nothing is overwritten.
 *
 * Usage:
 *   node scripts/fetch-media.mjs --dry-run   # list what would be fetched
 *   node scripts/fetch-media.mjs             # download and rewrite
 */

import { mkdir, readFile, writeFile, readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

const PRODUCTS_DIR = 'src/content/products';
const OUT_DIR = 'public/media/products';
const PUBLIC_PREFIX = '/media/products';
const CONCURRENCY = 6;

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');

const IMAGE_RE = /https:\/\/bestmt4ea\.com\/wp-content\/uploads\/[^\s")'\\]+/g;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function safeName(url) {
  const raw = decodeURIComponent(url.split('/').pop().split('?')[0]);
  const cleaned = raw
    .replace(/[^a-zA-Z0-9._-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
  return cleaned || 'image';
}

/** Short stable hash so two different images with the same name do not clash. */
function shortHash(input) {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (Math.imul(31, h) + input.charCodeAt(i)) | 0;
  }
  return Math.abs(h).toString(36).slice(0, 6);
}

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function download(url, dest) {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
      Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
      Referer: 'https://bestmt4ea.com/',
    },
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buffer);
  return buffer.length;
}

async function main() {
  const files = (await readdir(PRODUCTS_DIR)).filter((f) => f.endsWith('.md'));
  if (files.length === 0) {
    console.error(`No product files found in ${PRODUCTS_DIR}`);
    process.exit(1);
  }

  // Collect url -> filename, resolving collisions deterministically.
  const urlToFile = new Map();
  const fileToUrl = new Map();
  const perFile = new Map();

  for (const file of files) {
    const body = await readFile(join(PRODUCTS_DIR, file), 'utf8');
    const urls = [...new Set(body.match(IMAGE_RE) ?? [])];
    perFile.set(file, urls);

    for (const url of urls) {
      if (urlToFile.has(url)) continue;
      let name = safeName(url);
      if (fileToUrl.has(name) && fileToUrl.get(name) !== url) {
        const ext = name.includes('.') ? name.slice(name.lastIndexOf('.')) : '';
        name = `${name.slice(0, name.length - ext.length)}-${shortHash(url)}${ext}`;
      }
      urlToFile.set(url, name);
      fileToUrl.set(name, url);
    }
  }

  const unique = [...urlToFile.keys()];
  console.log(`Found ${unique.length} unique product images across ${files.length} products.`);

  if (DRY_RUN) {
    for (const url of unique) console.log(`  ${url}  ->  ${PUBLIC_PREFIX}/${urlToFile.get(url)}`);
    return;
  }

  await mkdir(OUT_DIR, { recursive: true });

  let downloaded = 0;
  let skipped = 0;
  const failures = [];

  for (let i = 0; i < unique.length; i += CONCURRENCY) {
    const batch = unique.slice(i, i + CONCURRENCY);
    await Promise.all(
      batch.map(async (url) => {
        const dest = join(OUT_DIR, urlToFile.get(url));
        if (await exists(dest)) {
          skipped++;
          return;
        }
        try {
          await download(url, dest);
          downloaded++;
        } catch (err) {
          failures.push(`${url} -> ${err.message}`);
          urlToFile.delete(url);
        }
      }),
    );
    process.stdout.write(`\r  ${Math.min(i + CONCURRENCY, unique.length)}/${unique.length} processed`);
    await sleep(80);
  }
  process.stdout.write('\n');

  // Rewrite references in the product markdown.
  let rewritten = 0;
  for (const [file, urls] of perFile) {
    if (urls.length === 0) continue;
    const path = join(PRODUCTS_DIR, file);
    let body = await readFile(path, 'utf8');
    let changed = false;
    for (const url of urls) {
      const name = urlToFile.get(url);
      if (!name) continue;
      if (body.includes(url)) {
        body = body.split(url).join(`${PUBLIC_PREFIX}/${name}`);
        changed = true;
      }
    }
    if (changed) {
      await writeFile(path, body, 'utf8');
      rewritten++;
    }
  }

  console.log(`\nDownloaded ${downloaded}, skipped ${skipped} (already present).`);
  console.log(`Rewrote image paths in ${rewritten} product files.`);
  if (failures.length) {
    console.log(`\n${failures.length} failed:`);
    for (const f of failures.slice(0, 20)) console.log(`  - ${f}`);
    if (failures.length > 20) console.log(`  ... and ${failures.length - 20} more`);
    process.exitCode = 2;
  }
}

main().catch((err) => {
  console.error('Media fetch failed:', err.message);
  process.exit(1);
});
