#!/usr/bin/env node
/**
 * Render every `resources/*.html` to a print-ready PDF.
 *
 * The HTML is the source of truth — diffable, reviewable, and editable without a
 * design tool. The PDF is the artefact a visitor actually downloads, and what a
 * post's `download.fileKey` points at once it is uploaded to R2.
 *
 * Usage:
 *   node scripts/build-resources.mjs                    # every resource
 *   node scripts/build-resources.mjs risk-checklist     # one, by base name
 */

import { readdir } from 'node:fs/promises';
import { basename, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from '@playwright/test';

const DIR = 'resources';
const only = process.argv.slice(2).find((a) => !a.startsWith('--'));

const files = (await readdir(DIR)).filter((f) => f.endsWith('.html'));
const targets = only ? files.filter((f) => basename(f, '.html') === only) : files;

if (targets.length === 0) {
  console.error(`No resource HTML to render${only ? ` matching "${only}"` : ''}.`);
  process.exit(1);
}

const browser = await chromium.launch();
try {
  for (const file of targets) {
    const page = await browser.newPage();
    await page.goto(pathToFileURL(resolve(join(DIR, file))).href, { waitUntil: 'networkidle' });
    const pdf = join(DIR, `${basename(file, '.html')}.pdf`);
    await page.pdf({ path: pdf, format: 'A4', printBackground: true, preferCSSPageSize: true });
    await page.close();
    console.log(`rendered ${pdf}`);
  }
} finally {
  await browser.close();
}
