/**
 * Inject AdSense units into a post body at fixed depths.
 *
 * Same placement model as the reference build (TBK): units land at fixed depths
 * through the body — 10%, 30%, 50% and 70% — so ad density scales with article
 * length instead of a fixed count. Only top-level block elements are counted, so
 * a unit never lands mid-list or mid-heading.
 *
 * Notes for this site:
 *  - Emits the same `[data-ad-unit]` markup `AdSlot.astro` renders, minus the
 *    width-wait (these units are always in flow and full width, so there is no
 *    "availableWidth=0" case to guard). It still claims `window.__adsenseRequested`,
 *    so the library loads exactly once per page whichever unit appears first.
 *  - Nothing is injected when `PUBLIC_ADSENSE_CLIENT` is unset, matching AdSlot.
 *  - Only posts use this. The layout's own in-article slot is removed so a post
 *    does not carry both.
 */

const BLOCK_TAGS = new Set(['h2', 'h3', 'h4', 'p', 'ul', 'ol', 'blockquote', 'pre', 'table']);
const PERCENTAGES = [0.1, 0.3, 0.5, 0.7];

/** Below this many blocks the units would crowd the body — inject nothing. */
const MIN_BLOCKS = 8;

function adNode({ client, slot, index }) {
  const script =
    `(function(){var c=${JSON.stringify(client)};` +
    `if(!window.__adsenseRequested){window.__adsenseRequested=true;` +
    `var s=document.createElement('script');s.async=true;s.crossOrigin='anonymous';` +
    `s.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client='+c;` +
    `document.head.appendChild(s);}` +
    `(window.adsbygoogle=window.adsbygoogle||[]).push({});})();`;

  return {
    type: 'element',
    tagName: 'div',
    properties: {
      className: ['ad-unit', 'in-article-ad', 'not-prose'],
      'data-ad-unit': '',
      'data-ad-index': String(index),
      'aria-label': 'Advertisement',
    },
    children: [
      {
        type: 'element',
        tagName: 'p',
        properties: { className: ['in-article-ad__label'] },
        children: [{ type: 'text', value: 'Advertisement' }],
      },
      {
        type: 'element',
        tagName: 'ins',
        properties: {
          className: ['adsbygoogle'],
          style: 'display:block',
          'data-ad-client': client,
          'data-ad-slot': slot,
          'data-ad-format': 'auto',
          'data-full-width-responsive': 'true',
        },
        children: [],
      },
      {
        type: 'element',
        tagName: 'script',
        properties: {},
        children: [{ type: 'text', value: script }],
      },
    ],
  };
}

export function rehypeInArticleAds({ client, slot } = {}) {
  return (tree) => {
    if (!client || !slot) return;

    const blockIndices = [];
    tree.children.forEach((node, i) => {
      if (node.type === 'element' && BLOCK_TAGS.has(node.tagName)) blockIndices.push(i);
    });

    const total = blockIndices.length;
    if (total < MIN_BLOCKS) return;

    const insertAfter = new Set();
    for (const pct of PERCENTAGES) {
      insertAfter.add(blockIndices[Math.min(total - 1, Math.max(0, Math.round(total * pct)))]);
    }

    // Insert from the end so the earlier indices stay valid as we splice.
    const sorted = Array.from(insertAfter).sort((a, b) => b - a);
    sorted.forEach((treeIndex, i) => {
      tree.children.splice(treeIndex + 1, 0, adNode({ client, slot, index: sorted.length - i }));
    });
  };
}
