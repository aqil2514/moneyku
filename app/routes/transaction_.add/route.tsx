import { ActionFunctionArgs, MetaFunction, json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import * as fs from "fs";
import { TransactionBodyType, TransactionType } from "../transaction/route";
import { ClientOnly } from "remix-utils/client-only";
import Transaction from "./Transaction";

export const meta: MetaFunction = () => [{ title: "Tambah Transaksi | Money Management" }];

interface ErrorsTransaction {
  type: string;
  total: string;
  date: string;
}

export async function action({ request }: ActionFunctionArgs) {
  let oldData: TransactionType[] = [];

  if (fs.existsSync("fakeData.json") && fs.statSync("fakeData.json").size !== 0) {
    const jsonData = JSON.parse(fs.readFileSync("fakeData.json", "utf8")) as TransactionType | TransactionType[];

    Array.isArray(jsonData) ? (oldData = jsonData) : oldData.push(jsonData);
  }

  const formData = await request.formData();
  const typeTransaction = String(formData.get("type-data"));
  const totalTransaction = Number(formData.get("transaction-total"));
  const dateTransaction = new Date(String(formData.get("transaction-date")));
  const categoryTransaction = String(formData.get("transaction-category"));
  const assetsTransaction = String(formData.get("transaction-assets"));
  const noteTransaction = String(formData.get("transaction-note"));
  const price = typeTransaction === "Pemasukan" ? totalTransaction : totalTransaction * -1;

  const errors: ErrorsTransaction = {} as ErrorsTransaction;

  if (isNaN(dateTransaction.getTime())) {
    errors.date = "Tanggal belum diisi";
  }

  if (dateTransaction > new Date()) {
    errors.date = "Tanggal transaksi tidak boleh dari masa depan";
  }

  if (typeTransaction === "null") {
    errors.type = "Tipe transaksi belum dipilih";
  }

  if (isNaN(totalTransaction)) {
    errors.total = "Total Transaksi harus berupa angka";
  }

  if (totalTransaction === 0) {
    errors.total = "Total transaksi tidak boleh 0";
  }

  const sameDate = oldData.find((d) => {
    return d.header === dateTransaction.toString();
  });

  if (Object.keys(errors).length > 0) {
    return json({ errors });
  }

  const dataBody: TransactionBodyType = {
    asset: assetsTransaction,
    category: categoryTransaction,
    item: noteTransaction,
    price,
  };

  const finalData: TransactionType = {
    header: String(dateTransaction),
    body: [],
  };

  if (sameDate) {
    sameDate.body.push(dataBody);
    const index = oldData.findIndex((d) => d.header === String(dateTransaction));

    oldData[index] = sameDate;

    fs.writeFileSync("fakeData.json", JSON.stringify(oldData));
  } else {
    finalData.body.push(dataBody);
    oldData.push(finalData);
    fs.writeFileSync("fakeData.json", JSON.stringify(oldData));
  }

  return redirect("/transaction");
}

export default function AddTransaction() {

  return (
    <ClientOnly>
      {() => <Transaction />}
    </ClientOnly>
  );
}

export function IncomeTransaction() {
  const actionData = useActionData<typeof action>();
  const errors = actionData?.errors;
  return (
    <div className="main-page">
      <Form className="form-basic" action="/transaction/add?type=Pemasukan" method="post">
        <input type="hidden" name="type-data" value={"Pemasukan"} />
        <div className="form-date">
          <label htmlFor="transaction-date">Tanggal Transaksi</label>
          <input type="date" name="transaction-date" id="transaction-date" />
        </div>
        <em style={{ color: "red" }}>{errors?.date ? errors.date : null}</em>
        <div className="form-text">
          <label htmlFor="transaction-total">Total</label>
          <input type="text" name="transaction-total" id="transaction-total" />
          <em style={{ color: "red" }}>{errors?.total ? errors.total : null}</em>
        </div>
        <div className="form-text">
          <label htmlFor="transaction-category">Kategori Pemasukan</label>
          <input type="text" name="transaction-category" id="transaction-category" />
        </div>
        <div className="form-text">
          <label htmlFor="transaction-assets">Aset</label>
          <input type="text" name="transaction-assets" id="transaction-assets" />
        </div>
        <div className="form-text">
          <label htmlFor="transaction-note">Catatan</label>
          <input type="text" name="transaction-note" id="transaction-note" />
        </div>
        <button className="form-submit">Tambah Pemasukan</button>
      </Form>
    </div>
  );
}

export function OutcomeTransaction() {
  const actionData = useActionData<typeof action>();
  const errors = actionData?.errors;
  return (
    <div className="main-page">
      <Form className="form-basic" action="/transaction/add?type=Pengeluaran" method="post">
        <input type="hidden" name="type-data" value={"Pengeluaran"} />
        <div className="form-date">
          <label htmlFor="transaction-date">Tanggal Transaksi</label>
          <input type="date" name="transaction-date" id="transaction-date" />
        </div>
        <em style={{ color: "red" }}>{errors?.date ? errors.date : null}</em>
        <div className="form-text">
          <label htmlFor="transaction-total">Total</label>
          <input type="text" name="transaction-total" id="transaction-total" />
          <em style={{ color: "red" }}>{errors?.total ? errors.total : null}</em>
        </div>
        <div className="form-text">
          <label htmlFor="transaction-category">Kategori Pengeluaran</label>
          <input type="text" name="transaction-category" id="transaction-category" />
        </div>
        <div className="form-text">
          <label htmlFor="transaction-assets">Aset</label>
          <input type="text" name="transaction-assets" id="transaction-assets" />
        </div>
        <div className="form-text">
          <label htmlFor="transaction-note">Catatan</label>
          <input type="text" name="transaction-note" id="transaction-note" />
        </div>
        <button className="form-submit">Tambah Pengeluaran</button>
      </Form>
    </div>
  );
}
