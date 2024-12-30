# Route `/transaction`

Route ini digunakan untuk mengelola data transaksi dalam aplikasi. Fitur ini mencakup penambahan, pengeditan, penghapusan, dan pengambilan data transaksi.

---

## **File yang terkait**
- **[Main Route](/app/routes/_main.transaction/route.tsx)**  
  File utama yang menangani routing dan rendering halaman transaksi.
- **[API Endpoint](/app/routes/_main.transaction/route.tsx)**  
  File penanganan server-side untuk operasi seperti penambahan, pengeditan, dan penghapusan data transaksi.

---

## **Interfaces**
### **TransactionAddFormData**
Interface yang mendefinisikan struktur data form untuk menambahkan transaksi.

```typescript
/** Interface untuk data form tambah transaksi */
export interface TransactionAddFormData {
  userId: string; // ID pengguna yang membuat transaksi
  typeTransaction: TypeTransaction; // Jenis transaksi
  totalTransaction: number; // Total nominal transaksi (tidak boleh negatif)
  dateTransaction: Date; // Tanggal transaksi
  billTransaction?: number; // Tagihan yang terkait dengan transaksi (opsional)
  categoryTransaction: string; // Kategori transaksi
  noteTransaction: string; // Catatan tambahan untuk transaksi
  fromAsset: string; // Aset sumber (contoh: rekening bank, e-wallet)
  toAsset: string; // Aset tujuan (contoh: rekening bank lain, e-wallet)
  descriptionTransaction: string; // Deskripsi transaksi
}
