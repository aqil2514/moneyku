export type TransactionId = `tr-${string}`;

export type TypeTransaction = 'Income' | 'Outcome' | 'Transfer'

/** Interface untuk transaksi */
export interface Transaction {
  /** ID Transaksi */
  id: TransactionId;
  /** Transaksi dibuat pada tanggal */
  created_at: string;
  /** Tanggal terjadinya transaksi */
  transaction_at: string;
  /** Transaksi diupdate pada tanggal */
  updated_at: string;
  /** Nama transaksi */
  name_transaction: string;
  /** Penjelasan transaksi */
  description?: string;
  /** Tipe transaksi */
  type_transaction: TypeTransaction;
  /** Kategori ID */
  category_id: `trc-${string}`;
  /** Tag Transaksi */
  tag?: string[];
  /** Informasi tambahan, seperti foto, pdf, atau link */
  attachment?: string;
  /** Nominal transaksi */
  nominal: {
    /** Asal akun */
    account_id: `acc-${string}`;
    /** Jumlah transaksi */
    amount: number;
    /** Mata uang */
    currency: string;
  };
}