/**
 * URL construction — the single place the trailing-slash policy lives.
 *
 * The site adopted `trailingSlash: 'always'` so that exactly one URL serves each
 * page. Every internal link, canonical, breadcrumb, card href and structured-data
 * URL goes through `url()` / `absoluteUrl()` so they cannot drift apart, and so
 * a link can never point at the redirecting no-slash form of a page.
 *
 * Rules:
 *   - external (`https:`, `mailto:`, `tel:`, `//host`) values pass through
 *   - a path with a file extension (`/logo.png`, `/ads.txt`) is a file, not a
 *     route, and is left alone
 *   - everything else gets exactly one trailing slash, with `?query` and
 *     `#fragment` kept in place at the end
 */

import { site } from './site';

const PROTOCOL_OR_HOST = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
const HAS_FILE_EXT = /\.[a-z0-9]{1,6}$/i;

/** Normalise an internal path to its canonical, trailing-slash form. */
export function url(href: string): string {
  if (!href) return '/';
  const value = String(href).trim();
  if (!value) return '/';
  if (PROTOCOL_OR_HOST.test(value)) return value;
  if (!value.startsWith('/')) return value; // relative — resolved by the browser

  const cut = [value.indexOf('#'), value.indexOf('?')].filter((i) => i !== -1);
  const split = cut.length ? Math.min(...cut) : value.length;
  const path = value.slice(0, split);
  const suffix = value.slice(split);

  if (path === '/' || path === '') return `/${suffix}`;
  if (HAS_FILE_EXT.test(path)) return value;
  return `${path.replace(/\/+$/, '')}/${suffix}`;
}

/** Absolute URL for canonicals and structured data. */
export function absoluteUrl(href: string): string {
  const normalised = url(href);
  if (PROTOCOL_OR_HOST.test(normalised)) return normalised;
  return new URL(normalised, site.url).href;
}

/**
 * Canonical URL for a page.
 *
 * A `seo.canonical` from the WordPress export already points at the live
 * production URL, so it wins; otherwise the page canonicalises to itself. This
 * is what gives `/best-mt4-ea/` a self-canonical distinct from the homepage
 * rather than inheriting anything.
 *
 * Either way the result is re-serialised through `URL`, so an emoji path is
 * emitted percent-encoded — the form the edge actually serves and the same
 * value structured data uses. Emitting the decoded emoji in the tag while
 * schema carried the encoded URL made the two disagree.
 */
export function canonicalFor(pathname: string, override?: string): string {
  const value = override?.trim();
  if (!value) return absoluteUrl(pathname);
  try {
    return new URL(value).href;
  } catch {
    return value;
  }
}

/**
 * Resolve an image reference to an absolute URL.
 *
 * Featured and OG images come from the WordPress export and can be relative or
 * protocol-relative; schema and OG tags require absolute URLs.
 */
export function resolveImage(src?: string): string | undefined {
  if (!src) return undefined;
  const value = String(src).trim();
  if (!value) return undefined;
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith('//')) return `https:${value}`;
  if (value.startsWith('/')) return new URL(value, site.url).href;
  return new URL(`/${value}`, site.url).href;
}
