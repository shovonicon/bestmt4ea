import { desc, eq } from 'drizzle-orm';
import type { Db } from '../db/client';
import { orderItems, orders, productFiles, products } from '../db/schema';
import { getActiveEntitlement } from './entitlements';
import { getActiveLicense } from './licenses';

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

    const entitlement = await getActiveEntitlement(db, customerId, row.productId);
    if (!entitlement) continue;
    if (row.type === 'ea' && !(await getActiveLicense(db, customerId, row.productId))) continue;

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
