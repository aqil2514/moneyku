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
