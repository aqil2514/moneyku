import Typography from "components/General/Typography";
import { useTransactionData } from "./Transactions";
import TransactionNavbar from "./TNavbar";
import TransactionFilter from "./TFilter";
import TransactionData from "./TWD_Data";
import TransactionMenu from "./TMenu";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export default function TransactionWithData() {
  const { data, month } = useTransactionData();
  const selectedData = data.filter(
    (d) => new Date(d.header).getMonth() === month
  );

  const allBody = selectedData.map((d) => d.body);

  const allPrices = allBody
    .map((d) => d.map((x) => x.price))
    .join(",")
    .split(",")
    .map((d) => parseInt(d));

  return (
    <div id="transaction" className="main-page">
      <div className="flex justify-center border-double">
        <Typography family="playfair-bold" variant="h1">
          {/* {res.filterData ? `${res.filterData}` : "Transaksi"} */}
          Transaksi
        </Typography>
      </div>

      <TransactionNavbar price={allPrices} />

      <header className="flex gap-1 items-center">
        <TransactionFilter />
      </header>

      <ScrollArea className="max-h-[300px]" id="transaction-data">
        <TransactionData />
      </ScrollArea>

      <TransactionMenu />

    </div>
  );
}
