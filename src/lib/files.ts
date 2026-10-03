/**
 * Hosted-file helpers.
 *
 * Downloads with `fileKey` live in the R2 bucket behind the public domain in
 * `PUBLIC_R2_PUBLIC_URL` (set in `wrangler.jsonc`); `https://files.bestmt4ea.com`
 * is the production fallback so a build with no env var still resolves.
 */

const r2PublicBase = (import.meta.env.PUBLIC_R2_PUBLIC_URL || 'https://files.bestmt4ea.com').replace(/\/+$/, '');

/** Resolve a hosted file key to its public URL (exactly one `/` at the join). */
export function publicUrl(fileKey: string): string {
  const key = String(fileKey).trim().replace(/^\/+/, '');
  return key ? `${r2PublicBase}/${key}` : r2PublicBase;
}

/** True when a download is hosted by us (has a `fileKey`) rather than linked out. */
export function isHosted(download: { fileKey?: string }): boolean {
  return Boolean(download.fileKey);
}
