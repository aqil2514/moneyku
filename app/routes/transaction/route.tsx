import { MetaFunction, json } from "@remix-run/node";
import TransactionMenu from "./transaction-menu";
import { useLoaderData } from "@remix-run/react";
import TransactionNavbar from "./transaction-navbar";
import TransactionData from "./data";
import serverEndpoint from "lib/server";

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

// export const loader = async () => {
//   if (!fs.existsSync("data.json") || fs.statSync("fakeData.json").size === 0) {
//     const data: TransactionType[] = [];
//     return json({ data });
//   }

//   const initData = JSON.parse(fs.readFileSync("fakeData.json", "utf8")) as TransactionType | undefined;

//   let response: TransactionType[] = [];
//   if (!initData) {
//     response = [];
//   } else {
//     Array.isArray(initData) ? (response = initData) : response.push(initData);
//   }

//   const data = response.sort((a, b) => {
//     const dateA = new Date(a.header);
//     const dateB = new Date(b.header);

//     const timeDiff = dateA.getTime() - dateB.getTime();
//     const dayDiff = timeDiff / (1000 * 60 * 60 * 24);
//     return dayDiff;
//   });

//   return json({ data });
// };

export const loader = async () => {
  try {
    const res = await fetch(`${serverEndpoint.cyclic}/transaction`);
    const data = await res.json();
    
    return json({ data });
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return json({ data: "Failed to fetch data" }, { status: 500 });
  }
};

export default function Transaction() {
  const res = useLoaderData<typeof loader>();
  const data = res.data as TransactionType[];
  const noPrice = [0];

  if (!data || data.length === 0)
    return (
      <div className="main-page">
        <h1>Transaksi</h1>

        <TransactionNavbar price={noPrice} />

        <main>
          <p style={{ textAlign: "center" }}>Belum ada transaksi. Ayo tambahkan</p>
        </main>

        <TransactionMenu />
      </div>
    );

  const allBody = data.map((d) => d.body);
  const allPrices = allBody
    .map((d) => d.map((x) => x.price))
    .join(",")
    .split(",")
    .map((d) => parseInt(d));

  return (
    <div className="main-page">
      <h1>Transaksi</h1>

      <TransactionNavbar price={allPrices} />

      <main>
        <TransactionData data={data} />
      </main>

      <TransactionMenu />
    </div>
  );

  return <></>;
}
