import { ActionFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { ClientOnly } from "remix-utils/client-only";
import Transaction from "./Transaction";
import serverEndpoint from "lib/server";

export const meta: MetaFunction = () => [
  { title: "Tambah Transaksi | Money Management" },
];

interface ErrorsTransaction {
  type: string;
  total: string;
  date: string;
}

interface ErrorIssue {
  code: string;
  expected: string;
  minimum: number;
  inclusive: boolean;
  exact: false;
  received: string;
  path: string[];
  message: string;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const typeTransaction = String(formData.get("type-data"));
  const totalTransaction = Number(formData.get("transaction-total"));
  const dateTransaction = new Date(String(formData.get("transaction-date")));
  const categoryTransaction = String(formData.get("transaction-category"));
  const assetsTransaction = String(formData.get("transaction-assets"));
  const noteTransaction = String(formData.get("transaction-note"));
  const price =
    typeTransaction === "Pemasukan" ? totalTransaction : totalTransaction * -1;

  const res = await fetch(`${serverEndpoint.local}/transaction/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      typeTransaction,
      totalTransaction,
      dateTransaction,
      categoryTransaction,
      assetsTransaction,
      noteTransaction,
      price,
    }),
  });

  if (res.status === 422) {
    const data = await res.json();
    const issues: ErrorIssue[] = data.error.issues;

    console.log(issues)

    const errors: ErrorsTransaction = {
      date: issues.find((p) => p.path[0].includes("date"))?.message as string,
      total: issues.find((p) => p.path[0].includes("price"))?.message as string,
      type: issues.find((p) => p.path[0].includes("type"))?.message as string,
    };

    console.log(errors)

    return json({ errors });
  }

  const data = await res.json();
  const issues = data.error.issues[0];

  console.log(issues);
  return json({ data });
}

export default function AddTransaction() {
  return <ClientOnly>{() => <Transaction />}</ClientOnly>;
}

export function IncomeTransaction() {
  const actionData = useActionData<typeof action>();
  let errors: ErrorsTransaction = {} as ErrorsTransaction;

  if (actionData && "errors" in actionData) {
    errors = actionData.errors;
  }

  console.log(errors);
  return (
    <div className="main-page">
      <Form
        className="form-basic"
        action="/transaction/add?type=Pemasukan"
        method="post"
      >
        <input type="hidden" name="type-data" value={"Pemasukan"} />
        <div className="form-date">
          <label htmlFor="transaction-date">Tanggal Transaksi</label>
          <input type="date" name="transaction-date" id="transaction-date" />
        </div>
        <em style={{ color: "red" }}>{errors?.date ? errors.date : null}</em>
        <div className="form-text">
          <label htmlFor="transaction-total">Total</label>
          <input type="text" name="transaction-total" id="transaction-total" />
          <em style={{ color: "red" }}>
            {errors?.total ? errors.total : null}
          </em>
        </div>
        <div className="form-text">
          <label htmlFor="transaction-category">Kategori Pemasukan</label>
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
        <button className="form-submit">Tambah Pemasukan</button>
      </Form>
    </div>
  );
}

export function OutcomeTransaction() {
  const actionData = useActionData<typeof action>();
  let errors:ErrorsTransaction = {} as ErrorsTransaction;

  if(actionData && "errors" in actionData){
    errors = actionData.errors;
  }
  return (
    <div className="main-page">
      <Form
        className="form-basic"
        action="/transaction/add?type=Pengeluaran"
        method="post"
      >
        <input type="hidden" name="type-data" value={"Pengeluaran"} />
        <div className="form-date">
          <label htmlFor="transaction-date">Tanggal Transaksi</label>
          <input type="date" name="transaction-date" id="transaction-date" />
        </div>
        <em style={{ color: "red" }}>{errors?.date ? errors.date : null}</em>
        <div className="form-text">
          <label htmlFor="transaction-total">Total</label>
          <input type="text" name="transaction-total" id="transaction-total" />
          <em style={{ color: "red" }}>
            {errors?.total ? errors.total : null}
          </em>
        </div>
        <div className="form-text">
          <label htmlFor="transaction-category">Kategori Pengeluaran</label>
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
        <button className="form-submit">Tambah Pengeluaran</button>
      </Form>
    </div>
  );
}
