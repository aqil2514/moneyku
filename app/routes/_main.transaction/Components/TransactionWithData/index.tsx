import { ClientOnly } from "remix-utils/client-only";
import MainWrapper from "components/General/Container";
import TransactionNavbar from "../Navbar";
import AddDataDialog from "../DialogAddData";
import { TransactionConfig, TransactionData } from "./components";

export default function TransactionWithData() {
  return (
    <ClientOnly>
      {() => (
        <MainWrapper className="p-4">
          <div className="flex justify-center border-double border-8 rounded-xl border-black">
            <h1 className="font-playfair-display text-center text-3xl font-bold">
              Transaksi
            </h1>
          </div>

          <TransactionNavbar />

          <div className="flex gap-4">
            <AddDataDialog />
            <TransactionConfig />
          </div>

          <TransactionData />
        </MainWrapper>
      )}
    </ClientOnly>
  );
}
