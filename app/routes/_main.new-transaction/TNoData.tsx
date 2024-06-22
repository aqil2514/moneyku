import Typography from "components/General/Typography";
import TransactionNavbar from "./TNavbar";
import { ClientOnly } from "remix-utils/client-only";
import TransactionMenu from "./TMenu";

export default function TransactionNoData() {
  const noPrice = [0];

  return (
    <div id="transaction" className="main-page">
      <div className="flex justify-center border-double">
        <Typography family="playfair-bold" variant="h1">
          Transaksi
        </Typography>
      </div>


      <TransactionNavbar price={noPrice} />
      
      <ClientOnly>
        {() => <TransactionMenu />}
      </ClientOnly>
      <main>
        <p style={{ textAlign: "center" }}>
          Belum ada transaksi. Ayo tambahkan
        </p>
      </main>
    </div>
  );
}
