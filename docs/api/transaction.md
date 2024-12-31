# Endpoint `/api/transaction`
Endpoint ini untuk penanganan dari route [/transaction](../pages/transaction.md)

## Functions and Methods

### apiHandler
Untuk penanganan API.

```typescript
const apiHandler: ApiHandler = {
  POST: async ({ request }) => postHandler({ request }),
  PUT: async ({ request }) => postHandler({ request }),
  GET: async ({ request }) => postHandler({ request }),
  DELETE: async ({ request }) => postHandler({ request }),
};
```

### getFormData
Untuk mengambil semua data yang telah diisi dari sisi klien

```typescript
/* Ambil semua data yang telah diisi dari client side */
const getFormData = (formData: FormData, userId: string) => {
  const data: TransactionAddFormData = {
    userId,
    typeTransaction: formData.get("typeTransaction") as TypeTransaction,
    dateTransaction: new Date(String(formData.get("dateTransaction"))),
    billTransaction: Number(formData.get("billTransaction")),
    categoryTransaction: String(formData.get("categoryTransaction")),
    fromAsset: String(formData.get("fromAsset")),
    toAsset: String(formData.get("toAsset")),
    noteTransaction: String(formData.get("noteTransaction")),
    totalTransaction: removeCurrencyFormat(
      String(formData.get("totalTransaction"))
    ),
    descriptionTransaction: String(formData.get("descriptionTransaction")),
  };

  return data;
};
```