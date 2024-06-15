import { useState } from "react";
import { IncomeTransaction, OutcomeTransaction } from "./route";
import { AssetsData } from "~/@types/assets";

type TypeTransaction = "Pemasukan" | "Pengeluaran" | "Transfer" | null;
export default function Transaction({
  assetData,
}: {
  assetData: AssetsData[];
}) {
  const [type, setType] = useState<TypeTransaction>(null);
  return (
    <div id="transaction-add" className="main-page">
      <h1 id="transaction-add-title">Tambah Transaksi</h1>
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
      {type === "Pemasukan" && <IncomeTransaction assetData={assetData} />}
      {type === "Pengeluaran" && <OutcomeTransaction assetData={assetData} />}
    </div>
  );
}
