import { ClientOnly } from "remix-utils/client-only";
import AddDataDialog from "./Dialog/AddData";
import TransactionNavbar from "./TNavbar";
import MainWrapper from "components/General/Container";

export default function TransactionNoData() {
  const noPrice = [0];

  return (
    <ClientOnly>
      {() => (
        <MainWrapper className="p-4">
          <div className="flex justify-center border-double border-8 rounded-xl border-black">
            <h1 className="font-playfair-display text-center text-3xl font-bold">
              Transaksi
            </h1>
          </div>

          <TransactionNavbar price={noPrice} />

          <AddDataDialog />

          <main className="bg-white p-4 rounded-md mt-4">
            <p className="text-center font-ubuntu font-bold">
              Belum ada transaksi. Ayo tambahkan!
            </p>
          </main>
        </MainWrapper>
      )}
    </ClientOnly>
  );
}
