import dayjs from "dayjs";
import { useTransactionData } from "../../main";
import TransactionDataHeader from "./Header";

export default function TransactionData() {
  const { data } = useTransactionData();
  const sortedData = data.sort((a, b) => {
    const dateA = dayjs(a.transaction_at);
    const dateB = dayjs(b.transaction_at);
    return dateA.diff(dateB);
  });

  return (
    <main className="bg-white p-4 rounded-md mt-4">
      {sortedData.map((data) => {
        return (
          <div
            key={data.id}
            data-id={data.id}
            className="duration-200 p-4 rounded-md hover:cursor-pointer hover:bg-slate-200"
          >
            <TransactionDataHeader data={data} />
          </div>
        );
      })}
    </main>
  );
}
