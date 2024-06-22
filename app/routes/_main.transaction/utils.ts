import { endpoint } from "lib/server";
import {  AccountUser } from "~/@types/account";
import { TransactionType } from "./route";

/**
 * Interface untuk tipe data yang dikembalikan oleh fungsi getTransactionData.
 */
interface TransactionDataResponse {
  data: TransactionType[];
  user: AccountUser;
  success: boolean;
  status?: number;
}

/**
 * Mengambil data transaksi untuk pengguna yang diberikan.
 *
 * @param {AccountDB} user - Objek pengguna yang sedang mengakses data transaksi.
 * @returns {Promise<TransactionDataResponse>} Data transaksi yang didekripsi atau pesan kesalahan jika gagal.
 */
export async function getTransactionData(
  user: AccountUser
): Promise<TransactionDataResponse> {
  try {
    const res = await fetch(`${endpoint}/transaction`, {
      headers: { "User-ID": String(user.uid) },
    });

    const resData = await res.json();

    if (!resData.success) {
      return { data: [], user, success: false };
    }

    const data: TransactionType[] = resData.data;

    return { data, user, success: true };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return { data: [], user, success: false, status: 500 };
  }
}

/**
 * Mengambil data transaksi yang difilter berdasarkan aset untuk pengguna yang diberikan.
 *
 * @param {AccountDB} user - Objek pengguna yang sedang mengakses data transaksi.
 * @param {string} assetFilter - Nama aset yang digunakan untuk memfilter transaksi.
 * @returns {Promise<TransactionType[]>} Data transaksi yang difilter berdasarkan aset.
 */
export async function getTransPerAssetData(
  user: AccountUser,
  assetFilter: string
): Promise<TransactionDataResponse> {
  const data = await getTransactionData(user);

  if (data.status === 500) {
    return { data: [], user, success: false, status: 500 };
  } else if (!data.success) {
    return { data: [], user, success: false };
  }

  const transactionData = data.data;
  // Filter transaksi berdasarkan assetFilter
  const filteredTransaction = transactionData
    .map((transaction) => ({
      ...transaction,
      body: transaction.body.filter(
        (tb) => tb.asset.trim() === assetFilter.trim()
      ),
    }))
    .filter((transaction) => transaction.body.length > 0);

  return { data: filteredTransaction, success: true, user: user };
}
