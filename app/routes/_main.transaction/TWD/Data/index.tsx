import dayjs from "dayjs";
import { useTransactionData } from "../../main";
import { ScrollArea } from "components/ui/scroll-area";
import TransactionDetail from "../Detail";

export default function TransactionData() {
  const { data } = useTransactionData();
  const sortedData = data.sort((a, b) => {
    const dateA = dayjs(a.transaction_at);
    const dateB = dayjs(b.transaction_at);
    return dateA.diff(dateB);
  });

  return (
    <ScrollArea className="w-full h-[480px] rounded-md mt-4">
      <main className="bg-white p-4 rounded-md flex flex-col gap-2">
        {sortedData.map((data) => <TransactionDetail data={data} key={data.id} /> )}
      </main>
    </ScrollArea>
  );
}
