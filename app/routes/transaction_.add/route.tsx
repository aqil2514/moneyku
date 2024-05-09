import {
  ActionFunctionArgs,
  MetaFunction,
  json,
  redirect,
} from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import * as fs from "fs";
import { TransactionType } from "../transaction/route";

export const meta: MetaFunction = () => [
  { title: "Tambah Transaksi | Money Management" },
];

interface ErrorsTransaction {
  type: string;
  total: string;
}

export async function action({ request }: ActionFunctionArgs) {
  const isThere = JSON.parse(fs.readFileSync("fakeData.json", "utf8")) as
    | TransactionType[]
    | undefined;

  const oldData = isThere && Array.isArray(isThere) ? isThere : [];

  const formData = await request.formData();
  const typeTransaction = String(formData.get("type-data"));
  const totalTransaction = Number(formData.get("transaction-total"));
  const dateTransaction = new Date(String(formData.get("transaction-date")));
  const categoryTransaction = String(formData.get("transaction-category"));
  const assetsTransaction = String(formData.get("transaction-assets"));
  const noteTransaction = String(formData.get("transaction-note"));
  const price =
    typeTransaction === "Pemasukan" ? totalTransaction : totalTransaction * -1;

  const errors: ErrorsTransaction = {} as ErrorsTransaction;

  if (typeTransaction === "null") {
    errors.type = "Tipe transaksi belum dipilih";
  }

  if (isNaN(totalTransaction)) {
    errors.total = "Total Transaksi harus berupa angka";
  }

  if (totalTransaction === 0) {
    errors.total = "Total transaksi tidak boleh 0";
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors });
  }

  const finalData: TransactionType = {
    header: String(dateTransaction),
    body: {
      asset: assetsTransaction,
      category: categoryTransaction,
      item: noteTransaction,
      price,
    },
  };

  oldData.push(finalData);

  fs.writeFileSync("fakeData.json", JSON.stringify(oldData));

  return redirect("/transaction");
}

export default function AddTransaction() {
  const actionData = useActionData<typeof action>();
  const errors = actionData?.errors;

  return (
    <div className="main-page">
      <h1>Tambah Transaksi</h1>
      <form action="/transaction/add" className="form-basic" method="post">
        <div className="form-radio">
          <section>
            <input
              type="radio"
              name="type-data"
              value={"Pengeluaran"}
              id="outcome-data"
            />
            <label htmlFor="outcome-data">Pengeluaran</label>
          </section>
          <section>
            <input
              type="radio"
              name="type-data"
              value={"Pemasukan"}
              id="income-data"
            />
            <label htmlFor="income-data">Pemasukan</label>
          </section>
        </div>
        <em style={{ color: "red" }}>{errors?.type ? errors?.type : null}</em>

        <div className="form-date">
          <label htmlFor="transaction-date">Tanggal Transaksi</label>
          <input type="date" name="transaction-date" id="transaction-date" />
        </div>
        <div className="form-text">
          <label htmlFor="transaction-total">Total</label>
          <input type="text" name="transaction-total" id="transaction-total" />
          <em style={{ color: "red" }}>
            {errors?.total ? errors.total : null}
          </em>
        </div>
        <div className="form-text">
          <label htmlFor="transaction-category">Kategori</label>
          <input
            type="text"
            name="transaction-category"
            id="transaction-category"
          />
        </div>
        <div className="form-text">
          <label htmlFor="transaction-assets">Aset</label>
          <input
            type="text"
            name="transaction-assets"
            id="transaction-assets"
          />
        </div>
        <div className="form-text">
          <label htmlFor="transaction-note">Catatan</label>
          <input type="text" name="transaction-note" id="transaction-note" />
        </div>
        <button type="submit" className="form-submit">
          Submit
        </button>
      </form>
    </div>
  );
}
