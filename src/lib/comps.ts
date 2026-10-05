/**
 * Per-email $0 permission, for the owner's own end-to-end testing.
 *
 * `COMP_EMAILS` is a comma-separated allowlist in the Worker's environment
 * (`.dev.vars` locally, a secret in production). An order placed by a listed
 * customer settles immediately at $0 instead of going to a payment provider, so
 * the whole purchase → licence → build → download chain can be walked without
 * moving money.
 *
 * It is deliberately environment-gated rather than a flag on the customer row:
 * the list lives where only the owner can set it, it is not reachable from the
 * browser, and the value never lands in the repository. Every comped order is
 * still an ordinary order with a discount written against it and a payment row
 * at $0, so nothing about it is hidden afterwards.
 */

export function isCompEmail(list: string | undefined | null, email: string | undefined | null): boolean {
  if (!list || !email) return false;
  const wanted = email.trim().toLowerCase();
  if (!wanted) return false;
  return list
    .split(',')
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean)
    .includes(wanted);
}
