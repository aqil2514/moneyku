export interface TransactionFormData {
  idTransaction?: string;
  uidTransaction?: string;
  typeTransaction: "Pemasukan" | "Pengeluaran"; // Tipe transaksi harus salah satu dari kedua nilai ini
  totalTransaction: number | null; // Total transaksi, diasumsikan sebagai bilangan bulat
  dateTransaction: Date | null; // Tanggal transaksi, bisa null jika tidak disertakan
  categoryTransaction: string | null; // Kategori transaksi, diambil dari formulir
  assetsTransaction: string | null; // Aset transaksi, diambil dari formulir
  noteTransaction: string | null; // Catatan transaksi, diambil dari formulir
}

export interface TransactionErrors{
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

/**
 * Interface untuk tipe data yang dikembalikan oleh fungsi getTransactionData.
 */
export interface TransactionDataResponse {
  data: TransactionType[];
  user: AccountUser;
  success: boolean;
  status?: number;
}