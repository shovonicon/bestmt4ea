import { and, desc, eq } from 'drizzle-orm';
import type { Db } from '../db/client';
import { licenseBuilds, licenses, orderItems, orders, productFiles, products } from '../db/schema';
import { getActiveEntitlement } from './entitlements';

/**
 * Read models for the customer portal. Everything a signed-in customer sees is
 * derived here so the pages stay thin and the access rules live in one place.
 */

export interface PortalDownload {
  fileId: string;
  filename: string;
  productId: string;
  productTitle: string;
  productSlug: string;
  kind: 'free' | 'licensed';
}

/**
 * Every file this customer may download: the whole free library, plus premium
 * files they hold an active entitlement for — and, for an EA, an active licence.
 */
export async function listCustomerDownloads(db: Db, customerId: string): Promise<PortalDownload[]> {
  const rows = await db
    .select({
      fileId: productFiles.id,
      filename: productFiles.filename,
      productId: products.id,
      productTitle: products.title,
      productSlug: products.slug,
      isFree: products.isFree,
      type: products.type,
    })
    .from(productFiles)
    .innerJoin(products, eq(products.id, productFiles.productId))
    .where(eq(products.active, true))
    .all();

  const out: PortalDownload[] = [];
  for (const row of rows) {
    if (row.isFree) {
      out.push({
        fileId: row.fileId,
        filename: row.filename,
        productId: row.productId,
        productTitle: row.productTitle,
        productSlug: row.productSlug,
        kind: 'free',
      });
      continue;
    }

    // A licensed EA is delivered as a compiled, account-bound build rather than a
    // shared file, so its `product_files` rows are never listed here — the portal
    // shows `listCustomerBuilds` instead. Serving the shared row would hand every
    // buyer the same binary, which cannot carry their account number or expiry.
    if (row.type === 'ea') continue;

    const entitlement = await getActiveEntitlement(db, customerId, row.productId);
    if (!entitlement) continue;

    out.push({
      fileId: row.fileId,
      filename: row.filename,
      productId: row.productId,
      productTitle: row.productTitle,
      productSlug: row.productSlug,
      kind: 'licensed',
    });
  }
  return out;
}

export interface PortalBuild {
  buildId: string;
  productTitle: string;
  productSlug: string;
  accountNumber: string;
  expiresAt: Date | null;
  requestedAt: Date;
  filename: string;
}

/**
 * The compiled builds this customer may download: READY, on a licence that is both
 * ACTIVE and theirs. A build carries their account number and expiry, so these are
 * the artefacts a purchased EA is actually delivered as.
 */
export async function listCustomerBuilds(db: Db, customerId: string): Promise<PortalBuild[]> {
  const rows = await db
    .select({
      buildId: licenseBuilds.id,
      accountNumber: licenseBuilds.accountNumber,
      expiresAt: licenseBuilds.expirationDate,
      r2Key: licenseBuilds.r2Key,
      requestedAt: licenseBuilds.requestedAt,
      productTitle: products.title,
      productSlug: products.slug,
    })
    .from(licenseBuilds)
    .innerJoin(licenses, eq(licenses.id, licenseBuilds.licenseId))
    .innerJoin(products, eq(products.id, licenses.productId))
    .where(
      and(
        eq(licenses.customerId, customerId),
        eq(licenses.status, 'ACTIVE'),
        eq(licenseBuilds.buildStatus, 'READY')
      )
    )
    .orderBy(desc(licenseBuilds.requestedAt))
    .all();

  return rows
    .filter((row) => Boolean(row.r2Key))
    .map((row) => ({
      buildId: row.buildId,
      productTitle: row.productTitle,
      productSlug: row.productSlug,
      accountNumber: row.accountNumber,
      expiresAt: row.expiresAt ?? null,
      requestedAt: row.requestedAt,
      filename: (row.r2Key as string).split('/').pop() ?? `build-${row.accountNumber}.ex4`,
    }));
}

export interface PortalOrderItem {
  title: string;
  quantity: number;
  unitPriceCents: number;
}

export interface PortalOrder {
  id: string;
  orderNumber: string;
  status: string;
  totalCents: number;
  currency: string;
  createdAt: Date;
  items: PortalOrderItem[];
}

export async function listOrdersForCustomer(db: Db, customerId: string): Promise<PortalOrder[]> {
  const rows = await db
    .select()
    .from(orders)
    .where(eq(orders.customerId, customerId))
    .orderBy(desc(orders.createdAt))
    .all();

  const out: PortalOrder[] = [];
  for (const order of rows) {
    const items = await db
      .select()
      .from(orderItems)
      .where(eq(orderItems.orderId, order.id))
      .all();
    out.push({
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      totalCents: order.totalCents,
      currency: order.currency,
      createdAt: order.createdAt,
      items: items.map((item) => ({
        title: item.titleSnapshot,
        quantity: item.quantity,
        unitPriceCents: item.unitPriceCents,
      })),
    });
  }
  return out;
}
