/**
 * Inject the in-article AdSense unit — and the affiliate banners — into a post
 * body at fixed depths.
 *
 * The page carries exactly **one** AdSense unit, placed at 53% of the body:
 * past the answer box, the takeaways and the download card, and clear of both
 * banners (Exness at 30%, RoboForex at 75%). One unit keeps the page well inside
 * AdSense's ad-to-content guidance.
 *
 * Banners are creatives, not ad units: no label, no disclosure line of their own.
 *
 * Only top-level block elements are counted, so nothing lands mid-list,
 * mid-heading or inside a table.
 *
 * Notes for this site:
 *  - Emits the same `[data-ad-unit]` markup `AdSlot.astro` renders, and claims
 *    `window.__adsenseRequested`, so the library loads exactly once per page.
 *  - The ask is width-guarded and sets `data-ad-requested`. Width only — never
 *    height. An empty `ins.adsbygoogle` has no intrinsic height; the box it gets
 *    is the one AdSense reserves, so requiring height before asking deadlocks it.
 *  - Nothing is injected when `PUBLIC_ADSENSE_CLIENT` is unset, matching AdSlot.
 *    Banners are independent of AdSense and render regardless.
 *  - Only posts use this.
 */

const BLOCK_TAGS = new Set(['h2', 'h3', 'h4', 'p', 'ul', 'ol', 'blockquote', 'pre', 'table']);

/** The single AdSense unit on a post. */
const AD_AT = 0.53;

/** Below this many blocks the unit would crowd the body — inject nothing. */
const MIN_BLOCKS = 8;

function bannerNode({ href, image, alt, width = 728, height = 90 }) {
  return {
    type: 'element',
    tagName: 'div',
    properties: { className: ['post-banner', 'not-prose'] },
    children: [
      {
        type: 'element',
        tagName: 'a',
        properties: {
          href,
          rel: 'sponsored nofollow noopener',
          target: '_blank',
          className: ['post-banner__link'],
        },
        children: [
          {
            type: 'element',
            tagName: 'img',
            properties: {
              src: image,
              alt,
              width: String(width),
              height: String(height),
              loading: 'lazy',
              decoding: 'async',
            },
            children: [],
          },
        ],
      },
    ],
  };
}

function adNode({ client, slot, index }) {
  const script =
    `(function(){var c=${JSON.stringify(client)};` +
    `if(!window.__adsenseRequested){window.__adsenseRequested=true;` +
    `var s=document.createElement('script');s.async=true;s.crossOrigin='anonymous';` +
    `s.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client='+c;` +
    `document.head.appendChild(s);}` +
    `var u=document.currentScript&&document.currentScript.closest('[data-ad-unit]');` +
    `var ins=u&&u.querySelector('ins.adsbygoogle');if(!ins)return;` +
    `var go=function(){if(ins.dataset.adRequested==='1')return;` +
    `if(!(ins.offsetWidth>0))return;` +
    `ins.dataset.adRequested='1';` +
    `try{(window.adsbygoogle=window.adsbygoogle||[]).push({});}catch(e){}};` +
    `if(ins.offsetWidth>0){go();}` +
    `else{var n=0,t=setInterval(function(){` +
    `if(ins.offsetWidth>0){clearInterval(t);go();}` +
    `else if(++n>40){clearInterval(t);}},500);}})();`;

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

export function rehypeInArticleAds({ client, slot, banners = [] } = {}) {
  return (tree) => {
    const blockIndices = [];
    tree.children.forEach((node, i) => {
      if (node.type === 'element' && BLOCK_TAGS.has(node.tagName)) blockIndices.push(i);
    });

    const total = blockIndices.length;
    if (total < MIN_BLOCKS) return;

    /** Block index at a fraction of the body. */
    const at = (pct) =>
      blockIndices[Math.min(total - 1, Math.max(0, Math.round(total * pct)))];

    const inserts = [];

    for (const banner of banners) {
      if (!banner?.href || !banner?.image) continue;
      const fraction = Number(banner.at);
      if (!Number.isFinite(fraction)) continue;
      inserts.push({ at: at(fraction), node: bannerNode(banner) });
    }

    if (client && slot) {
      inserts.push({ at: at(AD_AT), node: adNode({ client, slot, index: 1 }) });
    }

    /* Insert from the end so earlier indices stay valid as we splice. */
    inserts
      .sort((a, b) => b.at - a.at)
      .forEach(({ at: treeIndex, node }) => {
        tree.children.splice(treeIndex + 1, 0, node);
      });
  };
}
