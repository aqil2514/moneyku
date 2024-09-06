import dayjs from "dayjs";
import { useTransactionData } from "../../main";
import TransactionDataHeader from "./Header";
import TransactionDataBody from "./Body,";
import { ScrollArea } from "components/ui/scroll-area";
import { Transaction } from "~/@types/Transaction-Experimental";

export default function TransactionData() {
  const { data } = useTransactionData();
  const sortedData = data.sort((a, b) => {
    const dateA = dayjs(a.transaction_at);
    const dateB = dayjs(b.transaction_at);
    return dateA.diff(dateB);
  });

  const dataMap = new Map<string, Transaction>(data.map((d) => [d.id, d]));

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const dataset = e.currentTarget.dataset;
    const transactionId = dataset.id as string;
    const transaction = dataMap.get(transactionId);

    if (!transaction) return alert("Tidak ada transaksi yang dipilih");

    const nameTransaction = transaction.name_transaction;
    alert(`${nameTransaction} dipilih! Tampilin interaktivitasnya nanti`);
  };

  return (
    <ScrollArea className="w-full h-[480px] rounded-md overflow-y-hidden mt-4">
      <main className="bg-white p-4 rounded-md">
        {sortedData.map((data) => {
          return (
            <button
              key={data.id}
              data-id={data.id}
              onClick={handleClick}
              className="duration-200 p-4 rounded-md hover:cursor-pointer hover:bg-slate-200 block w-full"
            >
              <TransactionDataHeader data={data} />
              <TransactionDataBody data={data} />
            </button>
          );
        })}
      </main>
    </ScrollArea>
  );
}
