/**
 * Hosted-file helpers.
 *
 * Downloads with `fileKey` live in the public R2 bucket. The base URL comes from
 * `PUBLIC_R2_PUBLIC_URL` — read from `.env` at build time — and the fallback is
 * the same value, so a build without the variable still produces working links.
 * (`wrangler.jsonc` holds the runtime copy for the Worker.)
 *
 * The public bucket is `bestmt4ea-public`; `bestmt4ea-files` is private and
 * holds builds and templates, which are served through the Worker instead.
 */

const r2PublicBase = (
  import.meta.env.PUBLIC_R2_PUBLIC_URL || 'https://pub-ed5ef2cd173044a19dc984efa5452986.r2.dev'
).replace(/\/+$/, '');

/** Resolve a hosted file key to its public URL (exactly one `/` at the join). */
export function publicUrl(fileKey: string): string {
  const key = String(fileKey).trim().replace(/^\/+/, '');
  return key ? `${r2PublicBase}/${key}` : r2PublicBase;
}

/** True when a download is hosted by us (has a `fileKey`) rather than linked out. */
export function isHosted(download: { fileKey?: string }): boolean {
  return Boolean(download.fileKey);
}
