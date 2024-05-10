import { MetaFunction, json } from "@remix-run/node";
import TransactionMenu from "./transaction-menu";
import TransactionData from "./data";
import * as fs from "fs";
import { useLoaderData } from "@remix-run/react";
import TransactionNavbar from "./transaction-navbar";

export const meta: MetaFunction = () => [
  {
    title: "Transaksi | Money Management",
  },
];

export interface TransactionType {
  header: string;
  body: {
    category: string;
    asset: string;
    item: string;
    price: number;
  };
}

export const currencyFormat = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export const loader = async () => {
  const isThere = JSON.parse(fs.readFileSync("fakeData.json", "utf8")) as TransactionType[] | undefined;

  const data = isThere && Array.isArray(isThere) ? isThere : [];

  return json({ data });
};

export default function Transaction() {
  const data = useLoaderData<typeof loader>();
  const allPrice = data.data.map((d) => d.body.price);
  const fakeData = data.data;

  return (
    <div className="main-page">
      <h1>Transaksi</h1>

      <TransactionNavbar price={allPrice} />

      <main>
        {fakeData.map((data, i: number) => (
          <TransactionData key={i++} data={data} />
        ))}
      </main>

      <TransactionMenu />
    </div>
  );
}
