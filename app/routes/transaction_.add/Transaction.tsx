import { useState } from "react";
import { IncomeTransaction, OutcomeTransaction } from "./route";

type TypeTransaction = "Pemasukan" | "Pengeluaran" | "Transfer" | null;
export default function Transaction() {
  const [type, setType] = useState<TypeTransaction>(null);
  return (
    <div className="main-page">
      <h1>Tambah Transaksi</h1>
      <h2>Tipe Transaksi</h2>
      <div className="form-navigation">
        <section>
          <button
            className={
              type === "Pengeluaran"
                ? "button-navigation-1 button-navigation-1-active"
                : "button-navigation-1"
            }
            onClick={() => setType("Pengeluaran")}
            id="outcome-data"
          >
            Pengeluaran
          </button>
        </section>
        <section>
          <button
            className={
              type === "Pemasukan"
                ? "button-navigation-1 button-navigation-1-active"
                : "button-navigation-1"
            }
            onClick={() => setType("Pemasukan")}
            id="income-data"
          >
            Pemasukan{" "}
          </button>
        </section>
      </div>
      {type === "Pemasukan" && <IncomeTransaction />}
      {type === "Pengeluaran" && <OutcomeTransaction />}
    </div>
  );
}
