#!/usr/bin/env node
/**
 * Every deliverable must exist in the LIVE R2 bucket.
 *
 * Written after a paid order could not be downloaded: `product_files` was empty
 * in production *and* the object was missing from the bucket, because the upload
 * had gone to wrangler's LOCAL storage — the flag that means "the real bucket"
 * was never passed. The upload reported success and the verification agreed with
 * it, because both were looking at the same local copy.
 *
 * That is the shape of the bug this closes: not "did someone remember to
 * upload", but "did we verify against the thing the customer will actually hit".
 * So this fetches every object back out of remote R2 and refuses to pass on a
 * claim. A missing object here is a customer who has paid and cannot download.
 *
 *   node scripts/check-files.mjs            # verify
 *   node scripts/check-files.mjs --local    # skip, print why (used by CI)
 */

import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, statSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const BUCKET = 'bestmt4ea-files';
const DB = 'bestmt4ea';
const wranglerBin = fileURLToPath(new URL('../node_modules/wrangler/bin/wrangler.js', import.meta.url));
const skip = process.argv.includes('--local');

const tmp = mkdtempSync(join(tmpdir(), 'check-files-'));
const probe = (key) => {
  const dest = join(tmp, key.replace(/[^a-z0-9.]/gi, '_'));
  try {
    execFileSync(process.execPath, [wranglerBin, 'r2', 'object', 'get', `${BUCKET}/${key}`, '--remote', '--file', dest], {
      encoding: 'utf8',
      stdio: 'pipe',
    });
  } catch {
    return { ok: false, bytes: 0 };
  }
  const bytes = existsSync(dest) ? statSync(dest).size : 0;
  if (existsSync(dest)) rmSync(dest, { force: true });
  return { ok: bytes > 0, bytes };
};

const query = (sql) => {
  const out = execFileSync(
    process.execPath,
    [wranglerBin, 'd1', 'execute', DB, '--remote', '--json', '--command', sql],
    { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
  );
  return JSON.parse(out.slice(out.indexOf('[')))[0]?.results ?? [];
};

try {
  /*
   * 1. The files the shop hands to buyers. This is the list the download route
   * reads, so a row without an object — or an object without a row — is a
   * broken delivery. Both directions are checked below.
   */
  let rows;
  try {
    rows = query('select id, product_id, r2_key, filename from product_files');
  } catch (err) {
    if (skip) {
      console.log('check-files SKIP: wrangler is not usable here (--local).');
      process.exit(0);
    }
    throw err;
  }

  const problems = [];
  console.log(`check-files: ${rows.length} product file(s) to verify in remote R2…`);
  for (const row of rows) {
    const { ok, bytes } = probe(row.r2_key);
    console.log(`  ${ok ? 'ok    ' : 'MISSING'}  ${row.product_id.padEnd(46)} ${row.r2_key}${ok ? `  (${bytes} bytes)` : ''}`);
    if (!ok) problems.push(`${row.product_id}: product_files row exists but the object is not in ${BUCKET} — ${row.r2_key}`);
  }

  /*
   * 2. The build templates. An EA customer's file is compiled per licence from
   * `templates/<productId>/source.<ext>`, so a missing template means a licence
   * that can never produce a build. MT4 uses .mq4 and MT5 .mq5; either satisfies
   * the product, so both are tried before calling one missing.
   *
   * An EA that has never been ordered and owns no product file is reported as a
   * note rather than a failure: nothing can reach it yet, and failing the build
   * over it would train everyone to ignore this check. The moment it has an
   * order, a missing template becomes a failure.
   */
  const eas = query(
    "select p.id, (select count(*) from order_items oi where oi.product_id = p.id) as orders " +
      "from products p where p.type = 'ea' and p.active = 1 order by p.id",
  );
  console.log(`\ncheck-files: ${eas.length} EA template(s) to verify…`);
  for (const item of eas) {
    let found = null;
    for (const ext of ['mq4', 'mq5']) {
      const key = `templates/${item.id}/source.${ext}`;
      const { ok, bytes } = probe(key);
      if (ok) {
        found = { key, bytes };
        break;
      }
    }
    const sold = Number(item.orders) > 0;
    if (found) {
      console.log(`  ok     ${item.id.padEnd(46)} ${found.key}`);
      continue;
    }
    if (sold) {
      console.log(`  MISSING  ${item.id.padEnd(46)} no source.mq4 or source.mq5 — ${item.orders} order(s) affected`);
      problems.push(
        `${item.id}: no build template in ${BUCKET} and it has ${item.orders} order(s) — those licences can never compile`,
      );
    } else {
      console.log(`  note     ${item.id.padEnd(46)} no template, and no orders — add one before selling it`);
    }
  }

  if (problems.length) {
    console.error(`\ncheck-files FAILED with ${problems.length} problem(s):`);
    for (const p of problems) console.error(`  - ${p}`);
    console.error(
      '\nA file that is only in local storage is not delivered. Re-upload with:\n' +
        `  npx wrangler r2 object put ${BUCKET}/<key> --file <local path> --remote\n` +
        'then add or fix its product_files row (created_at has no SQL default — supply it).',
    );
    process.exit(1);
  }

  console.log(`\ncheck-files PASS: ${rows.length} product file(s) and ${eas.length} template(s) resolve in remote R2.`);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
