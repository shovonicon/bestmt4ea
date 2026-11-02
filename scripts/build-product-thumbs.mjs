/**
 * Responsive thumbnails for product cards.
 *
 * Each product's featured image (a ~800-1250px webp) is sent whole to phones that
 * show it at ~360 CSS px. This writes `<name>-480.webp` and `<name>-640.webp`
 * beside the original so `ProductCard` can offer a `srcset`. Originals are never
 * touched; a variant is only written when the original is wider than the variant
 * and the variant is missing or older than the original.
 *
 * Usage: node scripts/build-product-thumbs.mjs
 */

import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import sharp from 'sharp';

const PRODUCTS = 'src/content/products';
const PUBLIC = 'public';
const WIDTHS = [480, 640];

const images = new Set();
for (const f of readdirSync(PRODUCTS)) {
  if (!f.endsWith('.md')) continue;
  const m = readFileSync(`${PRODUCTS}/${f}`, 'utf8').match(/^featuredImage:\s*"?(\/media\/products\/[^"\s]+\.webp)"?/m);
  if (m) images.add(m[1]);
}

let written = 0;
for (const src of images) {
  const file = `${PUBLIC}${src}`;
  if (!existsSync(file)) { console.log('missing original', src); continue; }
  const meta = await sharp(file).metadata();
  for (const w of WIDTHS) {
    if ((meta.width ?? 0) <= w) continue;
    const out = file.replace(/\.webp$/, `-${w}.webp`);
    if (existsSync(out) && statSync(out).mtimeMs >= statSync(file).mtimeMs) continue;
    await sharp(file).resize({ width: w }).webp({ quality: 72 }).toFile(out);
    written++;
    console.log(`${out.replace(PUBLIC, '')}  ${Math.round(statSync(out).size / 1024)}KB`);
  }
}
console.log(`${images.size} product images, ${written} variants written`);
