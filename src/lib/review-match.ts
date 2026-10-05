/**
 * Match a review's free-text product name to a catalogue product.
 *
 * The reviews were collected against WooCommerce line items, so the name carries
 * plan and version suffixes ("... - Trial 30 days Demo", "[UPDATED]", "V1.05").
 * Both sides are reduced to a bare product name before comparing, so a trial
 * order and a paid order of the same system count towards the same product.
 */

/** Reduce a product or line-item name to its bare, comparable form. */
export function bareProductName(name: string | null | undefined): string {
  return String(name ?? '')
    .toLowerCase()
    .replace(/\[[^\]]*\]|\([^)]*\)/g, ' ') // [UPDATED], (Lifetime Premium)
    .split(':')[0] // "Name: AI Gold Scalper for MT5" -> "Name"
    .split(/\s*-\s+/)[0] // "Name - Trial 30 days Demo" and "Name- Trial" -> "Name"
    .replace(/[^a-z0-9& ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Names a product's reviews were collected under when they differ from its
 * current title (the AVA listing was renamed from "AVA AIGPT5 EA").
 */
const ALIASES: Record<string, string[]> = {
  'ava-aigpt5-ea': ['ava aigpt5 ea'],
};

/** The Windows VPS line items were retitled several times ("Powerful ... Best Price"). */
const isVpsName = (bare: string) => bare.includes('windows vps');

export function reviewMatchesProduct(
  reviewProductName: string | null | undefined,
  product: { slug: string; title: string },
): boolean {
  const review = bareProductName(reviewProductName);
  if (!review) return false;
  if (product.slug === 'vps') return isVpsName(review);
  return [bareProductName(product.title), ...(ALIASES[product.slug] ?? [])].includes(review);
}
