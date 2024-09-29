export type IconType = "default-icon" | "url" | "upload";

export interface Accounts {
  /** ID Akun */
  account_id: `acc-${string}`;
  /** Nama akunnya */
  name: string;
  /** Jumlah nominal uang yang ada di akun ini */
  amount: number | string;
  /** Jenis mata uang pada akun ini */
  currency: string;
  /** Sumber icon dari akun ini */
  icon?: {
    type: IconType;
    value: string;
  };
  /** Warna dari akun ini */
  color: `#${string}`;
  /** Deskripsi akun ini */
  description: string;
  /** Grup dari akun ini, misal: Tunai, E-Wallet, Bank */
  group: string;
  /** Akun ini dibuat */
  created_at: string;
}

export interface Category {
  /** ID unik untuk kategori */
  category_id: `trc-${string}`;
  /** Nama kategori */
  name: string;
  /** Deskripsi singkat mengenai kategori */
  description?: string;
  /** Warna atau kode warna untuk kategori ini */
  color: `#${string}`;
  /** Icon yang terkait dengan kategori ini */
  icon: string | URL;
  /** Tanggal kapan kategori ini dibuat */
  created_at: string;
}
