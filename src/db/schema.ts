import { index, integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

/**
 * BESTMT4EA D1 schema (Drizzle / SQLite).
 *
 * Ported from the proven `BD MARKET SYSTEM` schema (accounts, catalogue, orders,
 * payments, entitlements, audit) and extended for EA licensing (licence keys,
 * MT5 account bindings, EX5 builds) and the self-hosted USDT (BEP-20) rail.
 *
 * Conventions kept from the reference:
 *  - money is an integer in minor units (USD cents) to avoid float drift;
 *  - a payment is trusted in exactly one place (`webhook_events.dedupe_key` makes
 *    settlement replay-safe);
 *  - catalogue values are snapshotted onto an order/entitlement so a later edit
 *    cannot rewrite what someone bought.
 */

const createdAt = () =>
  integer('created_at', { mode: 'timestamp_ms' }).notNull().$defaultFn(() => new Date());
const updatedAt = () =>
  integer('updated_at', { mode: 'timestamp_ms' }).notNull().$defaultFn(() => new Date());

/* ------------------------------------------------------------------ identity */

export const customers = sqliteTable(
  'customers',
  {
    id: text('id').primaryKey(),
    email: text('email').notNull(),
    name: text('name'),
    phone: text('phone'),
    /** Linked USDT (BEP-20 / BSC) wallet. One per account, set once, never changed. */
    usdtWalletAddress: text('usdt_wallet_address'),
    emailVerifiedAt: integer('email_verified_at', { mode: 'timestamp_ms' }),
    lastLoginAt: integer('last_login_at', { mode: 'timestamp_ms' }),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [
    uniqueIndex('customers_email_unique').on(t.email),
    // NULLs are distinct in SQLite, so an unlinked account is allowed; a linked
    // address can never appear on a second account.
    uniqueIndex('customers_usdt_wallet_unique').on(t.usdtWalletAddress),
  ]
);

export const adminUsers = sqliteTable(
  'admin_users',
  {
    id: text('id').primaryKey(),
    email: text('email').notNull(),
    passwordHash: text('password_hash').notNull(),
    totpSecret: text('totp_secret'),
    totpEnabledAt: integer('totp_enabled_at', { mode: 'timestamp_ms' }),
    role: text('role').notNull().default('admin'),
    disabledAt: integer('disabled_at', { mode: 'timestamp_ms' }),
    createdAt: createdAt(),
  },
  (t) => [uniqueIndex('admin_users_email_unique').on(t.email)]
);

export const adminRecoveryCodes = sqliteTable(
  'admin_recovery_codes',
  {
    id: text('id').primaryKey(),
    adminUserId: text('admin_user_id')
      .notNull()
      .references(() => adminUsers.id, { onDelete: 'cascade' }),
    codeHash: text('code_hash').notNull(),
    usedAt: integer('used_at', { mode: 'timestamp_ms' }),
    createdAt: createdAt(),
  },
  (t) => [index('admin_recovery_codes_admin_idx').on(t.adminUserId)]
);

export const sessions = sqliteTable(
  'sessions',
  {
    id: text('id').primaryKey(),
    tokenHash: text('token_hash').notNull(),
    subjectType: text('subject_type', { enum: ['customer', 'admin'] }).notNull(),
    subjectId: text('subject_id').notNull(),
    mfaVerified: integer('mfa_verified', { mode: 'boolean' }).notNull().default(false),
    uaHash: text('ua_hash'),
    ipHash: text('ip_hash'),
    createdAt: createdAt(),
    expiresAt: integer('expires_at', { mode: 'timestamp_ms' }).notNull(),
    revokedAt: integer('revoked_at', { mode: 'timestamp_ms' }),
  },
  (t) => [
    uniqueIndex('sessions_token_hash_unique').on(t.tokenHash),
    index('sessions_subject_idx').on(t.subjectType, t.subjectId),
  ]
);

export const loginTokens = sqliteTable(
  'login_tokens',
  {
    id: text('id').primaryKey(),
    email: text('email').notNull(),
    tokenHash: text('token_hash').notNull(),
    codeHash: text('code_hash').notNull(),
    expiresAt: integer('expires_at', { mode: 'timestamp_ms' }).notNull(),
    consumedAt: integer('consumed_at', { mode: 'timestamp_ms' }),
    ipHash: text('ip_hash'),
    createdAt: createdAt(),
  },
  (t) => [
    uniqueIndex('login_tokens_token_hash_unique').on(t.tokenHash),
    index('login_tokens_email_idx').on(t.email),
  ]
);

export const rateLimits = sqliteTable('rate_limits', {
  key: text('key').primaryKey(),
  windowStart: integer('window_start', { mode: 'timestamp_ms' }).notNull(),
  count: integer('count').notNull().default(0),
});

/* --------------------------------------------------------------- catalogue */

export const products = sqliteTable(
  'products',
  {
    id: text('id').primaryKey(),
    slug: text('slug').notNull(),
    type: text('type').notNull(),
    title: text('title').notNull(),
    summary: text('summary'),
    description: text('description'),
    platform: text('platform', { enum: ['MT4', 'MT5', 'MT4/MT5', 'none'] })
      .notNull()
      .default('MT5'),
    currency: text('currency').notNull().default('USD'),
    /** True for the free-download library (no entitlement required). */
    isFree: integer('is_free', { mode: 'boolean' }).notNull().default(false),
    active: integer('active', { mode: 'boolean' }).notNull().default(true),
    imageKey: text('image_key'),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [uniqueIndex('products_slug_unique').on(t.slug), index('products_type_idx').on(t.type)]
);

/** A purchasable tier. Price lives here, not on the product. */
export const productPlans = sqliteTable(
  'product_plans',
  {
    id: text('id').primaryKey(),
    productId: text('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    code: text('code').notNull(),
    label: text('label').notNull(),
    priceCents: integer('price_cents').notNull(),
    /** null = lifetime. */
    durationDays: integer('duration_days'),
    /** How many MT5 accounts a licence from this plan may bind (default 1, later 2). */
    maxAccounts: integer('max_accounts').notNull().default(1),
    badge: text('badge'),
    sortOrder: integer('sort_order').notNull().default(0),
    active: integer('active', { mode: 'boolean' }).notNull().default(true),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [
    uniqueIndex('product_plans_product_code_unique').on(t.productId, t.code),
    index('product_plans_product_idx').on(t.productId),
  ]
);

/** Version history for an EA. `isCurrent` marks the one new licences build from. */
export const productVersions = sqliteTable(
  'product_versions',
  {
    id: text('id').primaryKey(),
    productId: text('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    version: text('version').notNull(),
    releasedAt: integer('released_at', { mode: 'timestamp_ms' }),
    isCurrent: integer('is_current', { mode: 'boolean' }).notNull().default(false),
    r2Key: text('r2_key'),
    sha256: text('sha256'),
    changelog: text('changelog'),
    createdAt: createdAt(),
  },
  (t) => [
    uniqueIndex('product_versions_product_version_unique').on(t.productId, t.version),
    index('product_versions_product_idx').on(t.productId),
  ]
);

/** Free-library files and any generic download. Premium EX5s live in license_builds. */
export const productFiles = sqliteTable(
  'product_files',
  {
    id: text('id').primaryKey(),
    productId: text('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    versionId: text('version_id').references(() => productVersions.id, { onDelete: 'set null' }),
    r2Key: text('r2_key').notNull(),
    filename: text('filename').notNull(),
    version: text('version'),
    releasedAt: integer('released_at', { mode: 'timestamp_ms' }),
    createdAt: createdAt(),
  },
  (t) => [
    index('product_files_product_idx').on(t.productId),
    index('product_files_version_idx').on(t.versionId),
  ]
);

export const productFaqs = sqliteTable(
  'product_faqs',
  {
    id: text('id').primaryKey(),
    productId: text('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    question: text('question').notNull(),
    answer: text('answer').notNull(),
    sortOrder: integer('sort_order').notNull().default(0),
    createdAt: createdAt(),
  },
  (t) => [index('product_faqs_product_idx').on(t.productId)]
);

export const coupons = sqliteTable(
  'coupons',
  {
    id: text('id').primaryKey(),
    code: text('code').notNull(),
    type: text('type', { enum: ['percent', 'fixed'] }).notNull(),
    value: integer('value').notNull(),
    maxRedemptions: integer('max_redemptions'),
    redemptions: integer('redemptions').notNull().default(0),
    expiresAt: integer('expires_at', { mode: 'timestamp_ms' }),
    active: integer('active', { mode: 'boolean' }).notNull().default(true),
    createdAt: createdAt(),
  },
  (t) => [uniqueIndex('coupons_code_unique').on(t.code)]
);

/* ------------------------------------------------------------------ orders */

export const orders = sqliteTable(
  'orders',
  {
    id: text('id').primaryKey(),
    orderNumber: text('order_number').notNull(),
    customerId: text('customer_id')
      .notNull()
      .references(() => customers.id),
    status: text('status', { enum: ['pending', 'paid', 'failed', 'refunded', 'cancelled'] })
      .notNull()
      .default('pending'),
    subtotalCents: integer('subtotal_cents').notNull(),
    discountCents: integer('discount_cents').notNull().default(0),
    totalCents: integer('total_cents').notNull(),
    currency: text('currency').notNull().default('USD'),
    couponId: text('coupon_id').references(() => coupons.id),
    createdAt: createdAt(),
    paidAt: integer('paid_at', { mode: 'timestamp_ms' }),
  },
  (t) => [
    uniqueIndex('orders_order_number_unique').on(t.orderNumber),
    index('orders_customer_idx').on(t.customerId),
    index('orders_status_idx').on(t.status),
  ]
);

export const orderItems = sqliteTable(
  'order_items',
  {
    id: text('id').primaryKey(),
    orderId: text('order_id')
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade' }),
    productId: text('product_id')
      .notNull()
      .references(() => products.id),
    /** Snapshots of what was bought — an entitlement must reflect the purchased plan. */
    planId: text('plan_id').references(() => productPlans.id, { onDelete: 'set null' }),
    planLabel: text('plan_label'),
    durationDays: integer('duration_days'),
    maxAccounts: integer('max_accounts').notNull().default(1),
    titleSnapshot: text('title_snapshot').notNull(),
    unitPriceCents: integer('unit_price_cents').notNull(),
    quantity: integer('quantity').notNull().default(1),
  },
  (t) => [
    index('order_items_order_idx').on(t.orderId),
    index('order_items_product_idx').on(t.productId),
  ]
);

export const payments = sqliteTable(
  'payments',
  {
    id: text('id').primaryKey(),
    orderId: text('order_id')
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade' }),
    /** 'stripe' | 'usdt' | 'manual' | 'coupon' */
    provider: text('provider').notNull().default('stripe'),
    invoiceId: text('invoice_id').notNull(),
    transactionId: text('transaction_id'),
    paymentMethod: text('payment_method'),
    amountCents: integer('amount_cents').notNull(),
    status: text('status', { enum: ['initiated', 'completed', 'failed', 'refunded'] })
      .notNull()
      .default('initiated'),
    rawPayload: text('raw_payload', { mode: 'json' }).$type<Record<string, unknown>>(),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [
    uniqueIndex('payments_invoice_unique').on(t.invoiceId),
    index('payments_order_idx').on(t.orderId),
  ]
);

/** Duplicate/replay defence: the unique dedupe_key makes re-delivery a no-op. */
export const webhookEvents = sqliteTable(
  'webhook_events',
  {
    id: text('id').primaryKey(),
    provider: text('provider').notNull().default('stripe'),
    dedupeKey: text('dedupe_key').notNull(),
    invoiceId: text('invoice_id'),
    payload: text('payload', { mode: 'json' }).$type<Record<string, unknown>>(),
    receivedAt: createdAt(),
    processedAt: integer('processed_at', { mode: 'timestamp_ms' }),
    result: text('result'),
  },
  (t) => [uniqueIndex('webhook_events_dedupe_unique').on(t.dedupeKey)]
);

/* ------------------------------------------------------------- USDT BEP-20 */

export const cryptoPayments = sqliteTable(
  'crypto_payments',
  {
    id: text('id').primaryKey(),
    orderId: text('order_id')
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade' }),
    currency: text('currency').notNull().default('USDT'),
    network: text('network').notNull().default('BEP20'),
    walletAddress: text('wallet_address').notNull(),
    /** Snapshot of the payer's linked wallet when it exists; the matcher then requires a matching sender. */
    expectedSender: text('expected_sender'),
    /** Strings: the unique per-order fraction must survive exactly. */
    expectedAmount: text('expected_amount').notNull(),
    receivedAmount: text('received_amount'),
    txid: text('txid'),
    senderAddress: text('sender_address'),
    receiverAddress: text('receiver_address'),
    status: text('status', {
      enum: ['WAITING', 'DETECTED', 'CONFIRMING', 'PAID', 'EXPIRED', 'FAILED'],
    })
      .notNull()
      .default('WAITING'),
    createdAt: createdAt(),
    expiresAt: integer('expires_at', { mode: 'timestamp_ms' }).notNull(),
    detectedAt: integer('detected_at', { mode: 'timestamp_ms' }),
    confirmedAt: integer('confirmed_at', { mode: 'timestamp_ms' }),
  },
  (t) => [
    uniqueIndex('crypto_payments_txid_unique').on(t.txid),
    index('crypto_payments_order_idx').on(t.orderId),
    index('crypto_payments_status_idx').on(t.status),
  ]
);

export const paymentEvents = sqliteTable(
  'payment_events',
  {
    id: text('id').primaryKey(),
    provider: text('provider').notNull(),
    reference: text('reference').notNull(),
    kind: text('kind').notNull(),
    detail: text('detail', { mode: 'json' }).$type<Record<string, unknown>>(),
    createdAt: createdAt(),
  },
  (t) => [index('payment_events_reference_idx').on(t.reference)]
);

/* -------------------------------------------------- entitlements & licences */

export const entitlements = sqliteTable(
  'entitlements',
  {
    id: text('id').primaryKey(),
    customerId: text('customer_id')
      .notNull()
      .references(() => customers.id, { onDelete: 'cascade' }),
    productId: text('product_id')
      .notNull()
      .references(() => products.id),
    orderId: text('order_id').references(() => orders.id),
    source: text('source').notNull().default('purchase'),
    grantedAt: createdAt(),
    revokedAt: integer('revoked_at', { mode: 'timestamp_ms' }),
    expiresAt: integer('expires_at', { mode: 'timestamp_ms' }),
    downloadLimit: integer('download_limit'),
    downloadsUsed: integer('downloads_used').notNull().default(0),
  },
  (t) => [
    uniqueIndex('entitlements_customer_product_unique').on(t.customerId, t.productId),
    index('entitlements_customer_idx').on(t.customerId),
  ]
);

export const licenses = sqliteTable(
  'licenses',
  {
    id: text('id').primaryKey(),
    entitlementId: text('entitlement_id')
      .notNull()
      .references(() => entitlements.id, { onDelete: 'cascade' }),
    customerId: text('customer_id')
      .notNull()
      .references(() => customers.id, { onDelete: 'cascade' }),
    productId: text('product_id')
      .notNull()
      .references(() => products.id),
    licenseKey: text('license_key').notNull(),
    status: text('status', { enum: ['PENDING', 'ACTIVE', 'EXPIRED', 'SUSPENDED', 'REVOKED'] })
      .notNull()
      .default('PENDING'),
    maxAccounts: integer('max_accounts').notNull().default(1),
    startsAt: integer('starts_at', { mode: 'timestamp_ms' }),
    /** null = lifetime. */
    expiresAt: integer('expires_at', { mode: 'timestamp_ms' }),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
    revokedAt: integer('revoked_at', { mode: 'timestamp_ms' }),
  },
  (t) => [
    uniqueIndex('licenses_key_unique').on(t.licenseKey),
    index('licenses_customer_idx').on(t.customerId),
    index('licenses_entitlement_idx').on(t.entitlementId),
    index('licenses_status_idx').on(t.status),
  ]
);

export const licenseAccounts = sqliteTable(
  'license_accounts',
  {
    id: text('id').primaryKey(),
    licenseId: text('license_id')
      .notNull()
      .references(() => licenses.id, { onDelete: 'cascade' }),
    accountNumber: text('account_number').notNull(),
    broker: text('broker'),
    /**
     * No longer asked for. Whether a terminal is demo or live cannot be read from
     * an account number, and nothing in the build depends on it — so asking was one
     * more thing for a customer to get wrong. Left nullable for historical rows.
     */
    accountType: text('account_type', { enum: ['real', 'demo'] }),
    active: integer('active', { mode: 'boolean' }).notNull().default(true),
    createdAt: createdAt(),
    deactivatedAt: integer('deactivated_at', { mode: 'timestamp_ms' }),
  },
  (t) => [
    index('license_accounts_license_idx').on(t.licenseId),
    uniqueIndex('license_accounts_license_number_unique').on(t.licenseId, t.accountNumber),
  ]
);

export const licenseBuilds = sqliteTable(
  'license_builds',
  {
    id: text('id').primaryKey(),
    licenseId: text('license_id')
      .notNull()
      .references(() => licenses.id, { onDelete: 'cascade' }),
    productVersionId: text('product_version_id').references(() => productVersions.id, {
      onDelete: 'set null',
    }),
    accountNumber: text('account_number').notNull(),
    expirationDate: integer('expiration_date', { mode: 'timestamp_ms' }),
    r2Key: text('r2_key'),
    buildStatus: text('build_status', {
      enum: ['PENDING', 'BUILDING', 'READY', 'FAILED'],
    })
      .notNull()
      .default('PENDING'),
    error: text('error'),
    requestedAt: createdAt(),
    builtAt: integer('built_at', { mode: 'timestamp_ms' }),
  },
  (t) => [
    index('license_builds_license_idx').on(t.licenseId),
    index('license_builds_status_idx').on(t.buildStatus),
  ]
);

export const licenseEvents = sqliteTable(
  'license_events',
  {
    id: text('id').primaryKey(),
    licenseId: text('license_id')
      .notNull()
      .references(() => licenses.id, { onDelete: 'cascade' }),
    action: text('action').notNull(),
    actorType: text('actor_type', { enum: ['customer', 'admin', 'system'] }).notNull(),
    actorId: text('actor_id'),
    meta: text('meta', { mode: 'json' }).$type<Record<string, unknown>>(),
    createdAt: createdAt(),
  },
  (t) => [index('license_events_license_idx').on(t.licenseId)]
);

export const downloadEvents = sqliteTable(
  'download_events',
  {
    id: text('id').primaryKey(),
    /** null for a free (no-entitlement) download. */
    entitlementId: text('entitlement_id').references(() => entitlements.id, { onDelete: 'cascade' }),
    customerId: text('customer_id').notNull(),
    productFileId: text('product_file_id').notNull(),
    licenseBuildId: text('license_build_id'),
    ipHash: text('ip_hash'),
    uaHash: text('ua_hash'),
    createdAt: createdAt(),
  },
  (t) => [
    index('download_events_entitlement_idx').on(t.entitlementId),
    index('download_events_customer_idx').on(t.customerId),
  ]
);

/* ------------------------------------------------------- refunds / comms */

export const refunds = sqliteTable(
  'refunds',
  {
    id: text('id').primaryKey(),
    paymentId: text('payment_id')
      .notNull()
      .references(() => payments.id),
    amountCents: integer('amount_cents').notNull(),
    reason: text('reason'),
    status: text('status').notNull().default('pending'),
    providerRefundId: text('provider_refund_id'),
    createdAt: createdAt(),
    processedAt: integer('processed_at', { mode: 'timestamp_ms' }),
  },
  (t) => [index('refunds_payment_idx').on(t.paymentId)]
);

export const emailLogs = sqliteTable(
  'email_logs',
  {
    id: text('id').primaryKey(),
    toEmail: text('to_email').notNull(),
    template: text('template').notNull(),
    providerMessageId: text('provider_message_id'),
    status: text('status').notNull(),
    error: text('error'),
    createdAt: createdAt(),
  },
  (t) => [index('email_logs_to_idx').on(t.toEmail)]
);

export const auditLog = sqliteTable(
  'audit_log',
  {
    id: text('id').primaryKey(),
    adminUserId: text('admin_user_id'),
    action: text('action').notNull(),
    entity: text('entity'),
    entityId: text('entity_id'),
    meta: text('meta', { mode: 'json' }).$type<Record<string, unknown>>(),
    ipHash: text('ip_hash'),
    createdAt: createdAt(),
  },
  (t) => [index('audit_log_created_idx').on(t.createdAt)]
);

export const reviews = sqliteTable(
  'reviews',
  {
    id: text('id').primaryKey(),
    productId: text('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    customerId: text('customer_id').references(() => customers.id, { onDelete: 'cascade' }),
    reviewerName: text('reviewer_name'),
    rating: integer('rating').notNull(),
    body: text('body').notNull(),
    hiddenAt: integer('hidden_at', { mode: 'timestamp_ms' }),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [
    uniqueIndex('reviews_customer_product_unique').on(t.customerId, t.productId),
    index('reviews_product_idx').on(t.productId),
  ]
);

/* ---------------------------------------------------- performance (MyFxBook) */

export const performanceAccounts = sqliteTable(
  'performance_accounts',
  {
    id: text('id').primaryKey(),
    productId: text('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    myfxbookAccountId: text('myfxbook_account_id'),
    url: text('url'),
    widgetHtml: text('widget_html'),
    accountType: text('account_type', { enum: ['real', 'demo'] }),
    active: integer('active', { mode: 'boolean' }).notNull().default(true),
    lastSyncedAt: integer('last_synced_at', { mode: 'timestamp_ms' }),
    createdAt: createdAt(),
  },
  (t) => [index('performance_accounts_product_idx').on(t.productId)]
);

export const performanceSnapshots = sqliteTable(
  'performance_snapshots',
  {
    id: text('id').primaryKey(),
    accountId: text('account_id')
      .notNull()
      .references(() => performanceAccounts.id, { onDelete: 'cascade' }),
    capturedAt: integer('captured_at', { mode: 'timestamp_ms' }).notNull(),
    balanceCents: integer('balance_cents'),
    equityCents: integer('equity_cents'),
    profitCents: integer('profit_cents'),
    growthPct: text('growth_pct'),
    drawdownPct: text('drawdown_pct'),
    profitFactor: text('profit_factor'),
    winRatePct: text('win_rate_pct'),
    openTrades: integer('open_trades'),
    /** The full Myfxbook metric set for this capture (labels + formatted values). */
    raw: text('raw', { mode: 'json' }).$type<Record<string, unknown>>(),
    createdAt: createdAt(),
  },
  (t) => [
    index('performance_snapshots_account_idx').on(t.accountId),
    index('performance_snapshots_captured_idx').on(t.capturedAt),
  ]
);

export const trades = sqliteTable(
  'trades',
  {
    id: text('id').primaryKey(),
    accountId: text('account_id')
      .notNull()
      .references(() => performanceAccounts.id, { onDelete: 'cascade' }),
    myfxbookTradeId: text('myfxbook_trade_id'),
    symbol: text('symbol'),
    type: text('type'),
    lots: text('lots'),
    openPrice: text('open_price'),
    closePrice: text('close_price'),
    openTime: integer('open_time', { mode: 'timestamp_ms' }),
    closeTime: integer('close_time', { mode: 'timestamp_ms' }),
    profitCents: integer('profit_cents'),
    commissionCents: integer('commission_cents'),
    swapCents: integer('swap_cents'),
    createdAt: createdAt(),
  },
  (t) => [
    index('trades_account_idx').on(t.accountId),
    uniqueIndex('trades_account_trade_unique').on(t.accountId, t.myfxbookTradeId),
  ]
);

/* ------------------------------------------------------------------ types */

export type Customer = typeof customers.$inferSelect;
export type Product = typeof products.$inferSelect;
export type ProductPlan = typeof productPlans.$inferSelect;
export type ProductVersion = typeof productVersions.$inferSelect;
export type ProductFile = typeof productFiles.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;
export type Payment = typeof payments.$inferSelect;
export type CryptoPayment = typeof cryptoPayments.$inferSelect;
export type Entitlement = typeof entitlements.$inferSelect;
export type License = typeof licenses.$inferSelect;
export type LicenseAccount = typeof licenseAccounts.$inferSelect;
export type LicenseBuild = typeof licenseBuilds.$inferSelect;
export type AdminUser = typeof adminUsers.$inferSelect;
export type SessionRow = typeof sessions.$inferSelect;
export type Coupon = typeof coupons.$inferSelect;
export type Refund = typeof refunds.$inferSelect;
export type Review = typeof reviews.$inferSelect;
export type PerformanceAccount = typeof performanceAccounts.$inferSelect;
export type PerformanceSnapshot = typeof performanceSnapshots.$inferSelect;
export type Trade = typeof trades.$inferSelect;
