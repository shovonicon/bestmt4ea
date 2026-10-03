import { site } from './site';
import { absoluteUrl, resolveImage } from './urls';
import type { CollectionEntry } from 'astro:content';

type Json = Record<string, unknown>;

export function organizationSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    description: site.description,
    sameAs: [site.reviewSiteUrl, site.telegram.community, site.myfxbook],
  };
}

/**
 * `dateModified` is deliberately absent: build time is not a modification, and
 * claiming it would tell search engines every page changed on every deploy.
 */
export function websiteSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
  };
}

export function breadcrumbSchema(trail: { name: string; url: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((node, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: node.name,
      item: `${site.url}${node.url}`,
    })),
  };
}

/** WooCommerce stock status -> schema.org availability. Unknown values are omitted. */
const STOCK_SCHEMA: Record<string, string> = {
  instock: 'https://schema.org/InStock',
  outofstock: 'https://schema.org/OutOfStock',
  onbackorder: 'https://schema.org/BackOrder',
  preorder: 'https://schema.org/PreOrder',
};

/**
 * Product schema for an EA.
 *
 * Three things this deliberately does NOT do, because each is a structured-data
 * error that also misrepresents the offer:
 *
 *  - it never publishes `price: 0`. A zero price in this catalogue is the free
 *    trial tier, not the product price; a product with no positive price at all
 *    gets no `offers` node rather than a false one
 *  - it never hardcodes availability. `InStock` came from nowhere; the real
 *    WooCommerce `stockStatus` is mapped, and an unknown value is omitted
 *  - it never names the site as the brand. These are licensed third-party
 *    systems, and the exported `brands` field holds platforms (MT4/MT5), not a
 *    manufacturer, so `brand` is omitted rather than invented
 *
 * `aggregateRating` is only emitted when there are genuine customer reviews
 * behind it, which is a Google requirement.
 */
export function productSchema(
  product: CollectionEntry<'products'>,
  opts: { currency?: string; min?: number; max?: number } = {},
): Json {
  const { currency = 'USD', min, max } = opts;
  const ratingCount = product.data.ratingCount ?? 0;
  const ratingAverage = product.data.ratingAverage;
  const hasRating = ratingCount > 0 && typeof ratingAverage === 'number';
  const image = resolveImage(product.data.featuredImage);
  const url = absoluteUrl(`/product/${product.data.slug}/`);

  const prices = [min, max].filter((value): value is number => typeof value === 'number' && value > 0);
  const low = prices.length ? Math.min(...prices) : undefined;
  const high = prices.length ? Math.max(...prices) : undefined;
  const availability = STOCK_SCHEMA[String(product.data.stockStatus ?? '').toLowerCase()];

  const offers =
    low != null
      ? {
          '@type': low === high ? 'Offer' : 'AggregateOffer',
          priceCurrency: currency,
          ...(low === high ? { price: low } : { lowPrice: low, highPrice: high }),
          ...(availability ? { availability } : {}),
          url,
        }
      : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.data.title,
    description: product.data.description,
    ...(image ? { image: [image] } : {}),
    ...(product.data.sku ? { sku: product.data.sku } : {}),
    ...(product.data.productCategories[0] ? { category: product.data.productCategories[0] } : {}),
    ...(offers ? { offers } : {}),
    ...(hasRating
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: ratingAverage,
            reviewCount: ratingCount,
          },
        }
      : {}),
  };
}

/**
 * Article schema.
 *
 * Dates come from the content itself (`publishedAt` / `updatedAt`), never from
 * build time, and every URL and image is absolute so the markup is valid
 * wherever the page is embedded.
 */
export function articleSchema(opts: {
  title: string;
  description?: string;
  url: string;
  published?: Date;
  updated?: Date;
  image?: string;
  author?: string;
}): Json {
  const canonical = absoluteUrl(opts.url);
  const image = resolveImage(opts.image);

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    url: canonical,
    ...(image ? { image: [image] } : {}),
    ...(opts.published ? { datePublished: opts.published.toISOString() } : {}),
    ...(opts.updated ? { dateModified: opts.updated.toISOString() } : {}),
    author: { '@type': 'Organization', name: opts.author ?? site.name, url: site.url },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
      logo: { '@type': 'ImageObject', url: absoluteUrl('/logo.png') },
    },
  };
}

/**
 * HowTo schema for a download page, built from the same `installSteps`
 * frontmatter the layout renders visibly — schema and page can never disagree.
 */
export function howToSchema(title: string, steps: { name: string; text: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to install ${title}`,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function breadcrumbTrail(
  items: { name: string; href?: string }[],
): { name: string; url: string }[] {
  return items.map((item) => ({ name: item.name, url: item.href ?? '/' }));
}
