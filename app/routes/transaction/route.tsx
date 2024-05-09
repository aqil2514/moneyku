import { MetaFunction } from "@remix-run/node";
import TransactionMenu from "./transaction-menu";
import TransactionData from "./data";

export const meta: MetaFunction = () => [
  {
    title: "Transaksi | Money Management",
  },
];

export interface TransactionType {
  header: Date;
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

const fakeData: TransactionType[] = [
  {
    header: new Date(2024, 4, 1),
    body: {
      category: "Gajian",
      asset: "Bank BRI",
      item: "Gajian",
      price: 10000000,
    },
  },
  {
    header: new Date(2024, 4, 2),
    body: {
      category: "Investasi",
      asset: "Bank Jago",
      item: "Deposito Syariah",
      price: -1000000,
    },
  },
  {
    header: new Date(2024, 4, 3),
    body: {
      category: "Investasi",
      asset: "Bank Jago",
      item: "Bahana Liquid",
      price: -500000,
    },
  },
  {
    header: new Date(2024, 4, 4),
    body: {
      category: "Transportasi",
      asset: "Dompoet Transportasi",
      item: "Bensin",
      price: -35000,
    },
  },
  {
    header: new Date(2024, 4, 5),
    body: {
      category: "Kebutuhan Harian",
      asset: "Dompet Kebutuhan",
      item: "Skincare",
      price: -50000,
    },
  },
];

export default function Transaction() {
  return (
    <div className="main-page">
      <h1>Transaksi</h1>

      <header id="navbar">
        <section>
          <p>Pemasukan</p>
          <p>Rp. 3.000.000</p>
        </section>
        <section>
          <p>Pengeluaran</p>
          <p>Rp. 2.000.000</p>
        </section>
        <section>
          <p>Saldo</p>
          <p>Rp. 1.000.000</p>
        </section>
      </header>

      <main>
        {fakeData.map((data, i: number) => (
          <TransactionData key={i++} data={data} />
        ))}
      </main>

      <TransactionMenu />
    </div>
  );
}
