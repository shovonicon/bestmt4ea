/**
 * Worker entry point: the adapter's server handler, with one check in front.
 *
 * `trailingSlash: 'always'` makes Astro answer a slashless request with a 301 to
 * the slashed URL before middleware runs. Old backlinks are mostly slashless
 * (`/product/tiger-x-pro-ea`), so each one took two hops: add the slash, then
 * follow the manifest rule. Matching the manifest here, first, answers those
 * requests in one hop. The matcher is slash-insensitive, so the rules are the
 * same ones middleware applies to slashed requests.
 */

import server from '@astrojs/cloudflare/entrypoints/server';
import { legacyResponse } from './lib/redirect-response';

type Fetch = NonNullable<typeof server.fetch>;

export default {
  fetch(...args: Parameters<Fetch>) {
    const url = new URL(args[0].url);
    if (!url.pathname.endsWith('/')) {
      const legacy = legacyResponse(url);
      if (legacy) return legacy;
    }
    return server.fetch(...args);
  },
};
