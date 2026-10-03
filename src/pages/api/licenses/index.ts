import type { APIRoute } from 'astro';
import { getDb } from '../../../db/client';
import { listActiveAccounts, listLicensesForCustomer } from '../../../server/licenses';
import { json, jsonError } from '../../../lib/http';

export const prerender = false;

/** The signed-in customer's licences, with their bound accounts. */
export const GET: APIRoute = async ({ locals }) => {
  const session = locals.session;
  if (!session || session.subjectType !== 'customer') return jsonError(401, 'unauthorized');

  const db = getDb();
  const rows = await listLicensesForCustomer(db, session.subjectId);
  const licenses = [];
  for (const license of rows) {
    const accounts = await listActiveAccounts(db, license.id);
    licenses.push({
      id: license.id,
      key: license.licenseKey,
      status: license.status,
      productId: license.productId,
      expiresAt: license.expiresAt ? license.expiresAt.getTime() : null,
      accounts: accounts.map((account) => ({
        accountNumber: account.accountNumber,
        broker: account.broker,
        accountType: account.accountType,
      })),
    });
  }
  return json({ licenses });
};
