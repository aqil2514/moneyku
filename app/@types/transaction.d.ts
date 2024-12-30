export type TypeTransaction = "Pemasukan" | "Pengeluaran" | "Transfer";

/** Interface untuk data form tambah transaksi */
export interface TransactionAddFormData {
  userId: string; // ID pengguna yang membuat transaksi
  typeTransaction: TypeTransaction; // Jenis transaksi
  totalTransaction: number; // Total nominal transaksi (tidak boleh negatif)
  dateTransaction: Date; // Tanggal transaksi
  billTransaction: number; // Tagihan yang terkait dengan transaksi (opsional)
  categoryTransaction: string; // Kategori transaksi
  noteTransaction: string; // Catatan tambahan untuk transaksi
  fromAsset: string; // Aset sumber (contoh: rekening bank, e-wallet)
  toAsset: string; // Aset tujuan (contoh: rekening bank lain, e-wallet)
  descriptionTransaction: string; // Deskripsi transaksi
}

export interface TransactionErrors {
  typeTransaction?: string;
  totalTransaction?: string;
  dateTransaction?: string;
  categoryTransaction?: string;
  assetsTransaction?: string;
  noteTransaction?: string;
}

export interface TransactionType {
  id?: string;
  header: string;
  body: TransactionBodyType[];
}

export interface TransactionBodyType {
  uid: string;
  category: string;
  asset: string;
  item: string;
  price: number;
}
