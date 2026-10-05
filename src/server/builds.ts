import { and, asc, eq } from 'drizzle-orm';
import type { Db } from '../db/client';
import { licenseBuilds, licenses, products } from '../db/schema';
import { markBuildReady, recordBuildReady, TRIAL_ACCOUNT } from './licenses';

/**
 * Compiled, account-bound EA builds.
 *
 * A build cannot be produced here: an `.ex4`/`.ex5` only comes out of MetaQuotes'
 * MetaEditor, which needs Windows. So this module holds the conventions a builder
 * (CI or a scheduled task on the owner's machine) works to, plus the one write path
 * both the builder and the admin UI share.
 *
 * The MQL source never enters version control: each product's template lives in the
 * private bucket at `templates/<productId>/source.mq4` — or `source.mq5` for an MT5
 * product — and is served to the builder through a token-guarded endpoint.
 *
 * The template extension, the compiler and the artefact extension all follow the
 * product's platform: MQL5 sources only compile with the MT5 MetaEditor and only
 * produce `.ex5`.
 */

const TEMPLATE_DIR = 'templates';
const BUILD_DIR = 'builds';

export const BUILD_EXTENSIONS = ['.ex4', '.ex5', '.zip'];
export const MAX_BUILD_BYTES = 8 * 1024 * 1024;

/**
 * MQL5 is the only platform with a different source extension. The catalogue stores
 * `MT4`, `MT5`, or the legacy `MT4/MT5`; only an exact `MT5` is MQL5, so the legacy
 * value falls back to MQL4 rather than guessing.
 */
export function isMql5(platform?: string | null): boolean {
  return String(platform ?? '').trim().toUpperCase() === 'MT5';
}

/** The source extension MetaEditor needs for that platform. */
export function sourceExtensionFor(platform?: string | null): '.mq4' | '.mq5' {
  return isMql5(platform) ? '.mq5' : '.mq4';
}

/** The artefact MetaEditor produces from that source. */
export function compiledExtensionFor(platform?: string | null): '.ex4' | '.ex5' {
  return isMql5(platform) ? '.ex5' : '.ex4';
}

/** Where a product's MQL source template lives in the private bucket. */
export function templateKeyFor(productId: string, platform?: string | null): string {
  return `${TEMPLATE_DIR}/${productId}/source${sourceExtensionFor(platform)}`;
}

/**
 * What the compiled file should be called, e.g. `ava-aigpt5-ea-90012345.ex4` — or
 * `.ex5` for an MT5 build.
 *
 * A trial carries the demo marker instead of an account number, so it is named
 * `-demo` rather than handing the customer the raw marker. The marker is compared
 * before the digits are stripped, because it is not a positive number.
 */
export function artifactNameFor(
  productSlug: string,
  accountNumber: string,
  platform?: string | null
): string {
  const slug = String(productSlug).replace(/[^a-z0-9-]/gi, '-');
  const extension = compiledExtensionFor(platform);
  const raw = String(accountNumber).trim();
  if (raw === TRIAL_ACCOUNT) return `${slug}-demo${extension}`;
  return `${slug}-${raw.replace(/[^0-9]/g, '')}${extension}`;
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
  platform: string | null;
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
      platform: products.platform,
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
    platform: row.platform ?? null,
    accountNumber: row.accountNumber,
    expiresAt: row.expiresAt ?? null,
    templateKey: templateKeyFor(row.productId, row.platform),
    artifactName: artifactNameFor(row.productSlug, row.accountNumber, row.platform),
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
 * customer downloads carries a sane name (`ava-aigpt5-ea-90012345.ex4`, or `.ex5`
 * for an MT5 product) rather than an opaque key. A rebuild replaces that object —
 * the newest build for an account is what should be served — and the build row is
 * repointed.
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
