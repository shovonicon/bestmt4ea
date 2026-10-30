/**
 * Resolve `affiliate:<key>` links in markdown against the affiliate registry.
 *
 * Content must not carry tracking URLs — `src/lib/affiliates.ts` is the only
 * place they live. A post writes `[Open an account](affiliate:roboforex)` and
 * this plugin swaps in the registry URL, applies the sponsored rel and opens
 * the link in a new tab. An unknown key is left as `#` with a data attribute so
 * it fails visibly in review instead of silently linking somewhere wrong.
 *
 * Runs as a rehype plugin inside `markdown.processor` (see astro.config.mjs).
 */

const PREFIX = 'affiliate:';

function walk(node, visit) {
  visit(node);
  const children = node.children;
  if (!children) return;
  for (const child of children) walk(child, visit);
}

export function rehypeAffiliateLinks(options = {}) {
  const registry = options.affiliates ?? {};

  return (tree) => {
    walk(tree, (node) => {
      if (node.type !== 'element' || node.tagName !== 'a') return;
      const href = node.properties?.href;
      if (typeof href !== 'string' || !href.startsWith(PREFIX)) return;

      const key = href.slice(PREFIX.length).trim();
      const offer = registry[key];

      if (!offer || !offer.url) {
        node.properties.href = '#';
        node.properties['data-affiliate-missing'] = key;
        return;
      }

      node.properties.href = offer.url;
      node.properties.rel = ['sponsored', 'nofollow', 'noopener'];
      node.properties.target = '_blank';
      node.properties['data-affiliate'] = key;
    });
  };
}
