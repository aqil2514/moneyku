import { createContext, useContext, useState } from "react";
import { AssetsData } from "~/@types/assets";
import Button from "components/Inputs/Button";
import { IncomeTransaction } from "./TA_Income";
import OutcomeTransaction from "./TA_Outcome";
import TransferTransaction from "./TA_Transfer";
import { TransactionAddContextProps, TypeTransaction } from "./interface";
import { buttonLists } from "./data";
import Typography from "components/General/Typography";

const TransactionAddContext = createContext<TransactionAddContextProps>(
  {} as TransactionAddContextProps
);


const TransactionChoice = ({ type }: { type: TypeTransaction }) => {
  if (type === "Pemasukan") return <IncomeTransaction />;
  else if(type === "Transfer") return <TransferTransaction />
  else if(type === "Pengeluaran") return <OutcomeTransaction />;

  return <div>
    <Typography family="playfair-black" variant="h1" >Pilih tipe transaksi yang diinginkan</Typography>
  </div>
};

export default function Transaction({
  assetData,
}: {
  assetData: AssetsData[];
}) {
  const [type, setType] = useState<TypeTransaction>(null);
  return (
    <TransactionAddContext.Provider value={{ assetData }}>
      <div id="transaction-add" className="main-page">
        <h1 id="transaction-add-title">Tambah Transaksi</h1>
        <h2>Tipe Transaksi</h2>
        <div className="form-navigation">
          {buttonLists.map((d) => (
            <section key={d.type}>
              <Button
              color={d.color}
              disabled={type === d.type}
              onClick={() => setType(d.type)}
            >
              {d.label}
            </Button>
            </section>
          ))}
        </div>

        <TransactionChoice type={type} />
      </div>
    </TransactionAddContext.Provider>
  );
}

export function useTransactionAddData() {
  return useContext(TransactionAddContext);
}
