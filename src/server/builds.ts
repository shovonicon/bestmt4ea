import { and, asc, eq } from 'drizzle-orm';
import type { Db } from '../db/client';
import { licenseBuilds, licenses, products } from '../db/schema';
import { markBuildReady, recordBuildReady } from './licenses';

/**
 * Compiled, account-bound EA builds.
 *
 * A build cannot be produced here: an `.ex4`/`.ex5` only comes out of MetaQuotes'
 * MetaEditor, which needs Windows. So this module holds the conventions a builder
 * (CI or a scheduled task on the owner's machine) works to, plus the one write path
 * both the builder and the admin UI share.
 *
 * The MQL source never enters version control: each product's template lives in the
 * private bucket at `templates/<productId>/source.mq4`, and is served to the builder
 * through a token-guarded endpoint.
 */

const TEMPLATE_DIR = 'templates';
const BUILD_DIR = 'builds';

export const BUILD_EXTENSIONS = ['.ex4', '.ex5', '.zip'];
export const MAX_BUILD_BYTES = 8 * 1024 * 1024;

/** Where a product's MQL source template lives in the private bucket. */
export function templateKeyFor(productId: string): string {
  return `${TEMPLATE_DIR}/${productId}/source.mq4`;
}

/** What the compiled file should be called, e.g. `ava-aigpt5-ea-90012345.ex4`. */
export function artifactNameFor(productSlug: string, accountNumber: string): string {
  const slug = String(productSlug).replace(/[^a-z0-9-]/gi, '-');
  const account = String(accountNumber).replace(/[^0-9]/g, '');
  return `${slug}-${account}.ex4`;
}

export function extensionOf(filename: string): string {
  const dot = filename.lastIndexOf('.');
  return dot === -1 ? '' : filename.slice(dot).toLowerCase();
}

export interface PendingBuild {
  buildId: string;
  productId: string;
  productSlug: string;
  productTitle: string;
  accountNumber: string;
  expiresAt: Date | null;
  templateKey: string;
  artifactName: string;
}

/**
 * Builds waiting for a compile, oldest first, carrying everything a builder needs:
 * which account and expiry to bind, which template to use, what to name the result.
 *
 * Restricted to ACTIVE licences: a build queued before a licence expired, was
 * suspended or was revoked must not be compiled — the artefact could never be
 * downloaded anyway (`authorizeBuildDownload` gates on ACTIVE), so compiling it
 * would just burn a build and leave an orphan object in the bucket.
 */
export async function listPendingBuilds(db: Db, limit = 25): Promise<PendingBuild[]> {
  const rows = await db
    .select({
      buildId: licenseBuilds.id,
      accountNumber: licenseBuilds.accountNumber,
      expiresAt: licenseBuilds.expirationDate,
      productId: products.id,
      productSlug: products.slug,
      productTitle: products.title,
    })
    .from(licenseBuilds)
    .innerJoin(licenses, eq(licenses.id, licenseBuilds.licenseId))
    .innerJoin(products, eq(products.id, licenses.productId))
    .where(and(eq(licenseBuilds.buildStatus, 'PENDING'), eq(licenses.status, 'ACTIVE')))
    .orderBy(asc(licenseBuilds.requestedAt))
    .limit(limit)
    .all();

  return rows.map((row) => ({
    buildId: row.buildId,
    productId: row.productId,
    productSlug: row.productSlug,
    productTitle: row.productTitle,
    accountNumber: row.accountNumber,
    expiresAt: row.expiresAt ?? null,
    templateKey: templateKeyFor(row.productId),
    artifactName: artifactNameFor(row.productSlug, row.accountNumber),
  }));
}

/** Keep a customer-supplied name usable as an object key: no separators, no surprises. */
function safeFilename(filename: string): string {
  const cleaned = String(filename)
    .replace(/[^A-Za-z0-9._-]/g, '_')
    .replace(/^\.+/, '');
  return cleaned || 'build.bin';
}

/**
 * Store a compiled artefact and flip its build to READY — the single write path
 * shared by the admin upload and the automated builder.
 *
 * One object per licence + account, named after the artefact, so the file the
 * customer downloads carries a sane name (`ava-aigpt5-ea-90012345.ex4`) rather than
 * an opaque key. A rebuild replaces that object — the newest build for an account is
 * what should be served — and the build row is repointed.
 */
export async function storeBuild(
  db: Db,
  bucket: R2Bucket,
  buildId: string,
  filename: string,
  bytes: ArrayBuffer | ArrayBufferView,
  actor: { type: 'admin' | 'system'; id?: string | null } = { type: 'system' }
): Promise<{ ok: true; key: string } | { ok: false; reason: string }> {
  const extension = extensionOf(filename);
  if (!BUILD_EXTENSIONS.includes(extension)) return { ok: false, reason: 'bad_extension' };
  if (bytes.byteLength === 0) return { ok: false, reason: 'empty_file' };
  if (bytes.byteLength > MAX_BUILD_BYTES) return { ok: false, reason: 'file_too_large' };

  const build = await db
    .select()
    .from(licenseBuilds)
    .where(eq(licenseBuilds.id, buildId))
    .get();
  if (!build) return { ok: false, reason: 'build_not_found' };

  const key = `${BUILD_DIR}/${build.licenseId}/${safeFilename(filename)}`;
  await bucket.put(key, bytes, { httpMetadata: { contentType: 'application/octet-stream' } });
  await markBuildReady(db, buildId, key);
  await recordBuildReady(db, build, key, actor.type, actor.id ?? null);

  return { ok: true, key };
}
