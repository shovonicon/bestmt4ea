/**
 * The price range a Product's `offers` node should carry.
 *
 * Two things had gone wrong by asking the content frontmatter for this:
 *
 *   - `fxcore100-ea` and `golden-deer-holy-grail-indicator` carry only the
 *     WooCommerce `regularPrice`/`salePrice` and no `priceMin`/`priceMax`, so
 *     both values arrived `undefined` and `productSchema` omitted the `offers`
 *     node entirely. A Product without `offers` earns no rich result at all.
 *   - every other EA sets `priceMin: 0` for its free trial. That is right for the
 *     *display* ("Free – $159.99"), but the schema filters zero out as a
 *     placeholder, so only `priceMax` survived and each system advertised its
 *     **most expensive lifetime tier** as its price.
 *
 * So the schema reads the licence plans — the paid tiers — and falls back to the
 * frontmatter only when a product has no plans. The display keeps using the
 * frontmatter, free trial included, which is a separate decision from what price
 * a search engine is told to show.
 *
 * A product with no positive price anywhere returns an empty range, and
 * `productSchema` then emits no `offers` rather than a false one.
 *
 * Deliberately free of `astro:*` and `import.meta` so a plain node script can
 * import it — `scripts/check-schema.mjs` does, to assert this for every product
 * without the pages having to be server-rendered first.
 */
export interface PriceRangeFrontmatter {
  priceMin?: number;
  priceMax?: number;
  salePrice?: string | number | null;
  regularPrice?: string | number | null;
}

export function productPriceRange(
  frontmatter: PriceRangeFrontmatter,
  plans: Array<{ price?: number | string | null }> = [],
): { min?: number; max?: number; offerCount?: number } {
  const positive = (value: unknown): number | undefined => {
    const n = Number(value);
    return Number.isFinite(n) && n > 0 ? n : undefined;
  };

  const paid = plans
    .map((plan) => positive(plan?.price))
    .filter((n): n is number => n !== undefined);

  if (paid.length) return { min: Math.min(...paid), max: Math.max(...paid), offerCount: paid.length };

  const fallback = [
    positive(frontmatter.salePrice),
    positive(frontmatter.regularPrice),
    positive(frontmatter.priceMin),
    positive(frontmatter.priceMax),
  ].filter((n): n is number => n !== undefined);

  return fallback.length ? { min: Math.min(...fallback), max: Math.max(...fallback) } : {};
}
