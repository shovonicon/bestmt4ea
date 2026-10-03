/// <reference types="astro/client" />

import type { ResolvedSession } from './lib/session';

declare global {
  namespace App {
    interface Locals {
      /** The resolved session for this request, or null when signed out. */
      session: ResolvedSession | null;
      /** Best-effort client IP, for rate-limit keys and audit. */
      clientIp: string;
      /** Per-request CSRF token, mirrored into a cookie by the middleware. */
      csrfToken: string;
    }
  }
}

export {};
