import { useState } from "react";
import { IncomeTransaction, OutcomeTransaction } from "./route";
import { AssetsData } from "~/@types/assets";
import Button from "components/Inputs/Button";

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
          <Button
            color="primary"
            disabled={type === "Pengeluaran"}
            onClick={() => setType("Pengeluaran")}
          >
            Pengeluaran
          </Button>
        </section>
        <section>
          <Button
            color="primary"
            disabled={type === "Pemasukan"}
            onClick={() => setType("Pemasukan")}
          >
            Pemasukan
          </Button>
        </section>
      </div>
      {type === "Pemasukan" && <IncomeTransaction assetData={assetData} />}
      {type === "Pengeluaran" && <OutcomeTransaction assetData={assetData} />}
    </div>
  );
}
