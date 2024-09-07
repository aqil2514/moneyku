import Typography from "components/General/Typography";
import { useTransactionData } from "../main";
import TransactionNavbar from "../TNavbar";
import TransactionFilter from "../TFilter";
import TransactionData from "./Data";
import TransactionMenu from "../TMenu";
import dayjs from "dayjs";
import { ScrollArea } from "components/ui/scroll-area";

export default function TransactionWithData() {
  const { data, month, year } = useTransactionData();
  const selectedData = data.filter(
    (d) => {
      const date = dayjs(d.updated_at);
      return date.month() === month && String(date.year()) === year;
    }
  );

  const allPrices = selectedData
    .map((d) => d.nominal.amount)
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
