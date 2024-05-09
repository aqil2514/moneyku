import { TransactionType, currencyFormat } from "./route";

const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

export default function TransactionDataHeader({ data, price }: { data: TransactionType["header"]; price: TransactionType["body"]["price"] }) {
  const newDate = new Date(data);
  const day = dayNames[newDate.getDay()];
  const date = newDate.getDate().toString().padStart(2, "0");
  const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
  const year = newDate.getFullYear();

  const income = currencyFormat.format(price > 0 ? price : 0);
  const outcome = currencyFormat.format(price < 0 ? price : 0);

  return (
    <header>
      <div className="date">
        <p>{date}</p>
        <p>{day}</p>
        <p>
          {month}.{year}
        </p>
      </div>
      <div className="income">
        <p>{income}</p>
      </div>
      <div className="outcome">
        <p>{outcome}</p>
      </div>
    </header>
  );
}
