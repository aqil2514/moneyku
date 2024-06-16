import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
  json,
} from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { ClientOnly } from "remix-utils/client-only";
import Transaction from "./Transaction";
import serverEndpoint, { endpoint } from "lib/server";
import { authenticator } from "~/service/auth.server";
import { useState } from "react";
import { currencyFormat } from "../transaction/route";
import { ErrorValidationResponse } from "~/@types/general";
import { TransactionErrors } from "~/@types/transaction";
import { jsonWithError, redirectWithSuccess } from "remix-toast";
import axios from "axios";
import { AssetsData } from "~/@types/assets";
import Loading from "components/Loading/Loading";
import { getUser } from "utils/account";

export const meta: MetaFunction = () => [
  { title: "Tambah Transaksi | Moneyku" },
];

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const user = await getUser(request);

  if(!user) throw new Error("Data user tidak ditemukan");

  const res = await axios.get(`${endpoint}/assets/getAssets`, {
    params: {
      uid: user.uid as string,
    },
  });

  const assetData: AssetsData[] = res.data.assetData;

  return json({ assetData });
}

export async function action({ request }: ActionFunctionArgs) {
  const user = await getUser(request);

  if(!user) throw new Error("Data user tidak ditemukan");

  const formData = await request.formData();
  const typeTransaction = String(formData.get("type-data"));
  const totalTransaction = Number(formData.get("transaction-total"));
  const dateTransaction = new Date(String(formData.get("transaction-date")));
  const categoryTransaction = String(formData.get("transaction-category"));
  const assetsTransaction = String(formData.get("transaction-assets"));
  const noteTransaction = String(formData.get("transaction-note"));
  const price =
    typeTransaction === "Pemasukan" ? totalTransaction : totalTransaction * -1;

  const isLocal = process.env.NODE_ENV === "development";
  const endpoint = isLocal ? serverEndpoint.local : serverEndpoint.production;

  const res = await fetch(`${endpoint}/transaction/add`, {
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
      userId: user.uid,
    }),
  });

  if (res.status === 422) {
    const data = await res.json();
    const errors = data.errors;

    return jsonWithError({ data: null, errors }, errors[0].notifMessage);
  }

  const data = await res.json();

  if (res.status === 200) {
    return redirectWithSuccess("/transaction", "Transaksi berhasil ditambah");
  }

  return json({ data, errors: null });
}

export default function AddTransaction() {
  const { assetData } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isPending = navigation.state === "loading";
  return (
    <ClientOnly>
      {() => (
        <>
          {isPending && <Loading />}
          <Transaction assetData={assetData} />
        </>
      )}
    </ClientOnly>
  );
}

const AssetLists = ({ assetData }: { assetData: AssetsData[] }) => {
  return (
    <datalist id="asset-list">
      {assetData.map((d) => (
        <option value={d.name} key={d.name} />
      ))}
    </datalist>
  );
};

export function IncomeTransaction({ assetData }: { assetData: AssetsData[] }) {
  const [nominal, setNominal] = useState<string>("");
  const actionData = useActionData<typeof action>();
  const errors = getErrors(actionData?.errors);
  const {
    dateTransaction,
    noteTransaction,
    categoryTransaction,
    assetsTransaction,
    totalTransaction,
  } = errors;

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
        <em style={{ color: "red" }}>{dateTransaction}</em>
        <div className="form-text">
          <label htmlFor="transaction-total">Nominal</label>
          <input
            type="number"
            value={nominal}
            onChange={(e) => {
              setNominal(e.target.value);
            }}
            name="transaction-total"
            id="transaction-total"
          />
          <p>
            <strong>Jumlah dalam Rupiah : </strong>
            {currencyFormat.format(Number(nominal))}
          </p>
          <em style={{ color: "red" }}>{totalTransaction}</em>
        </div>
        <div className="form-text">
          <label htmlFor="transaction-category">Kategori Pemasukan</label>
          <input
            type="text"
            name="transaction-category"
            id="transaction-category"
          />
        </div>
        <em style={{ color: "red" }}>{categoryTransaction}</em>
        <div className="form-text">
          <label htmlFor="transaction-assets">Aset</label>
          <input
            type="text"
            name="transaction-assets"
            id="transaction-assets"
            list="asset-list"
          />
        </div>
        <em style={{ color: "red" }}>{assetsTransaction}</em>
        <div className="form-text">
          <label htmlFor="transaction-note">Catatan</label>
          <input type="text" name="transaction-note" id="transaction-note" />
        </div>
        <em style={{ color: "red" }}>{noteTransaction}</em>
        <div>
          <button className="form-submit">Tambah Pemasukan</button>
        </div>
      </Form>
      <AssetLists assetData={assetData} />
    </div>
  );
}

export function OutcomeTransaction({ assetData }: { assetData: AssetsData[] }) {
  const [nominal, setNominal] = useState<string>("");

  const actionData = useActionData<typeof action>();
  const errors = getErrors(actionData?.errors);
  const {
    dateTransaction,
    noteTransaction,
    categoryTransaction,
    assetsTransaction,
    totalTransaction,
  } = errors;
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
        <em style={{ color: "red" }}>{dateTransaction}</em>
        <div className="form-text">
          <label htmlFor="transaction-total">Nominal</label>
          <input
            type="number"
            value={nominal}
            onChange={(e) => {
              setNominal(e.target.value);
            }}
            name="transaction-total"
            id="transaction-total"
          />
          <p>
            <strong>Jumlah dalam Rupiah : </strong>
            {currencyFormat.format(Number(nominal))}
          </p>
          <em style={{ color: "red" }}>{totalTransaction}</em>
        </div>
        <div className="form-text">
          <label htmlFor="transaction-category">Kategori Pengeluaran</label>
          <input
            type="text"
            name="transaction-category"
            id="transaction-category"
          />
        </div>
        <em style={{ color: "red" }}>{categoryTransaction}</em>
        <div className="form-text">
          <label htmlFor="transaction-assets">Aset</label>
          <input
            type="text"
            name="transaction-assets"
            id="transaction-assets"
            list="asset-list"
          />
        </div>
        <em style={{ color: "red" }}>{assetsTransaction}</em>
        <div className="form-text">
          <label htmlFor="transaction-note">Catatan</label>
          <input type="text" name="transaction-note" id="transaction-note" />
        </div>
        <em style={{ color: "red" }}>{noteTransaction}</em>
        <div>
          <button className="form-submit">Tambah Pengeluaran</button>
        </div>
      </Form>
      <AssetLists assetData={assetData} />
    </div>
  );
}

function getErrors(errors: ErrorValidationResponse[]) {
  if (!errors) {
    const error: TransactionErrors = {
      dateTransaction: "",
      typeTransaction: "",
      totalTransaction: "",
      categoryTransaction: "",
      assetsTransaction: "",
      noteTransaction: "",
    };
    return error;
  }

  const totalError = errors.find((e) => e.path === "totalTransaction");
  const typeError = errors.find((e) => e.path === "typeTransaction");
  const dateError = errors.find((e) => e.path === "dateTransaction");
  const categoryError = errors.find((e) => e.path === "categoryTransaction");
  const assetsError = errors.find((e) => e.path === "assetsTransaction");
  const noteError = errors.find((e) => e.path === "noteTransaction");

  const error: TransactionErrors = {
    dateTransaction: dateError && dateError.message ? dateError.message : "",
    typeTransaction: typeError && typeError.message ? typeError.message : "",
    totalTransaction:
      totalError && totalError.message ? totalError.message : "",
    categoryTransaction:
      categoryError && categoryError.message ? categoryError.message : "",
    assetsTransaction:
      assetsError && assetsError.message ? assetsError.message : "",
    noteTransaction: noteError && noteError.message ? noteError.message : "",
  };
  return error;
}
