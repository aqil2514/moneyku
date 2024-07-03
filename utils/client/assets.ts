import { TransactionType } from "~/@types/Transaction";

/**
 * Filter data sesuai aset
 * @param data Data Transaksi
 * @param assetName Nama Aset
 * @returns Data transaksi yang sudah difilter peraset
 */
export function filterTransPerAsset(
    data: TransactionType[],
    assetName: string | undefined
  ) {
    const result: TransactionType[] = [];
  
  
    if (!assetName) throw new Error("Nama Aset belum dipilih");
  
    data.forEach((d) => {
      d.body.forEach((db) => {
        if (db.asset.trim() === assetName?.trim()) {
          result.push(d);
        }
      });
    });
    return result;
  }
  