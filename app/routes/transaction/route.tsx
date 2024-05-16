import { ActionFunctionArgs, MetaFunction, json } from "@remix-run/node";
import TransactionMenu from "./transaction-menu";
import { useActionData, useLoaderData } from "@remix-run/react";
import TransactionNavbar from "./transaction-navbar";
import TransactionData from "./data";
import serverEndpoint from "lib/server";
import { ClientOnly } from "remix-utils/client-only";
import { useState } from "react";

export const meta: MetaFunction = () => [
  {
    title: "Transaksi | Money Management",
  },
];

export interface TransactionBodyType {
  category: string;
  asset: string;
  item: string;
  price: number;
}

// Ubah agar body menjadi array dan tangani errornya
export interface TransactionType {
  header: string;
  body: TransactionBodyType[];
}

export const currencyFormat = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export const loader = async () => {
  try {
    const isLocal = process.env.NODE_ENV === "development";
    const endpoint = isLocal ? serverEndpoint.local : serverEndpoint.cyclic;
    const res = await fetch(`${endpoint}/transaction`);

    const data = await res.json();

    return json({ data });
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return json({ data: "Failed to fetch data" }, { status: 500 });
  }
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const method = request.method;
  const formData = await request.formData();
  if (method === "DELETE") {
    const header = formData.get("header");
    const index = formData.get("index");

    const res = await fetch(`${serverEndpoint.local}/transaction`, {
      method: "DELETE",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        header,
        index,
      }),
    });

    const data = await res.json();

    return json(data);
  }
};

export default function Transaction() {
  const res = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  console.log(actionData)
  const [deleteMode, setDeleteMode] = useState<boolean>(false);
  const data = res.data as TransactionType[];
  const noPrice = [0];

  if (!data || data.length === 0)
    return (
      <ClientOnly>
        {() => (
          <div className="main-page">
            <h1>Transaksi</h1>

            <TransactionNavbar price={noPrice} />

            <main>
              <p style={{ textAlign: "center" }}>
                Belum ada transaksi. Ayo tambahkan
              </p>
            </main>

            <TransactionMenu
              setDeleteMode={setDeleteMode}
              deleteMode={deleteMode}
            />
          </div>
        )}
      </ClientOnly>
    );

  const allBody = data.map((d) => d.body);
  const allPrices = allBody
    .map((d) => d.map((x) => x.price))
    .join(",")
    .split(",")
    .map((d) => parseInt(d));

  return (
    <ClientOnly>
      {() => (
        <div className="main-page">
          <h1>Transaksi</h1>

          <TransactionNavbar price={allPrices} />

          <main>
            <TransactionData data={data} deleteMode={deleteMode} />
          </main>

          <TransactionMenu
            deleteMode={deleteMode}
            setDeleteMode={setDeleteMode}
          />
        </div>
      )}
    </ClientOnly>
  );

  return <></>;
}
