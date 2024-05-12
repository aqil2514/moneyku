import { TransactionBodyType, TransactionType, currencyFormat } from "./route";

const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

export default function TransactionDataHeader({ data, body }: { data: TransactionType["header"]; body: TransactionBodyType[] }) {
  const allPrices = body.map((d) => d.price);
  const plus = allPrices.filter((p) => p > 0);
  const minus = allPrices.filter((p) => p < 0);
  const incomePrice = plus.reduce((acc, curr) => acc + curr, 0);
  const outcomePrice = minus.reduce((acc, curr) => acc + curr, 0);

  const newDate = new Date(data);
  const day = dayNames[newDate.getDay()];
  const date = newDate.getDate().toString().padStart(2, "0");
  const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
  const year = newDate.getFullYear();

  const income = currencyFormat.format(incomePrice > 0 ? incomePrice : 0);
  const outcome = currencyFormat.format(outcomePrice < 0 ? outcomePrice : 0);

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
