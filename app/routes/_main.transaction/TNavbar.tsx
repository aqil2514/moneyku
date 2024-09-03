import { SummaryTransaction } from "./Components/Navbar";
import { useTransactionData } from "./main";

export default function TransactionNavbar() {
  const { data } = useTransactionData();
  const price: number[] = data.length > 0 ? data.map((d) => d.nominal.amount) : [0];

  const sumIncome = price.reduce((acc, curr) => acc + (curr > 0 ? curr : 0), 0);
  const sumOutcome = price.reduce(
    (acc, curr) => acc + (curr < 0 ? Math.abs(curr) : 0),
    0
  );
  const total = sumIncome - sumOutcome;

  return (
    <header
      id="transaction-navbar"
      className="my-4 bg-white grid grid-cols-3 px-4 rounded py-2 "
    >
      <SummaryTransaction amount={sumIncome} color="green" text="Pemasukan" />
      <SummaryTransaction amount={sumOutcome} color="red" text="Pengeluaran" />
      <SummaryTransaction amount={total} color="black" text="Total" />
    </header>
  );
}
