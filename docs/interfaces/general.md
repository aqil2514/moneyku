# General Interface

## ApiHandler
ApiHandler adalah antarmuka untuk mendefinisikan handler API dengan metode HTTP utama: `POST`, `PUT`, `GET`, dan `DELETE`. Setiap metode menerima parameter objek dengan properti request bertipe Request dan mengembalikan `Promise<unknown>`.

```typescript
export interface ApiHandler {
  POST: (args: { request: Request }) => Promise<unknown>;
  PUT: (args: { request: Request }) => Promise<unknown>;
  GET: (args: { request: Request }) => Promise<unknown>;
  DELETE: (args: { request: Request }) => Promise<unknown>;
}
```

## MethodRequest
Tipe untuk HTTP utama: `POST`, `PUT`, `GET`, dan `DELETE`

```typescript
export type MethodRequest = "POST" | "PUT" | "DELETE" | "GET"
```