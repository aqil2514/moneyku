# Change Log

## Minggu, 29/12/2024
### Route yang diupdate 
- [/transaction](./pages/transaction.md)

### Perubahan yang dilakukan
- Penambahan dokumentasi pada [komponen](/app/routes/_main.transaction/Components/DialogAddData/components.tsx) 'AddDataForm'
- Refactoring

## Senin, 30/12/2024
### Route yang diupdate : 
- [/transaction](./pages/transaction.md)
- [/api/transaction](./api/transaction.md)

### Perubahan yang dilakukan
- Pembuatan dokumentasi baru untuk Endpoint [/api/transaction](./api/transaction.md).
- Pembuatan interface `FormValidationError` untuk penanganan error saat validasi form.
- Pembuatan interface `TransactionAddFormData` untuk pengisian data form transaksi.
- Pembuatan context `DialogContext` untuk penanganan Context yang ada pada child dari komponen `AddDataDialog`.
- Pembaruan fungsi `getFormData` agar sesuai dengan interface `TransactionAddFormData`.
- Refactoring fungsi `action` pada Endpoint [/api/transaction](./api/transaction.md).

## Selasa, 31/12/2024
### Route yang diupdate : 
- [/api/transaction](./api/transaction.md)

### Perubahan yang dilakukan
- Refactoring method yang ada pada endpoint [/api/transacation](/app/routes/api.transaction/route.tsx)
- Pembuatan interface `ApiHandler`
- Pembuatan type `MethodRequest`