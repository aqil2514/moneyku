import { SummaryTransaction } from "./Components/Navbar";
import { useTransactionData } from "./Provider";

export default function TransactionNavbar() {
  const { data: generalData } = useTransactionData();
  const data = generalData.transaction;

  // Pisahkan antara data pemasukan dan data pengeluaran
  const incomeData = data.filter((d) => d.type_transaction === "Income");
  const outcomeData = data.filter((d) => d.type_transaction === "Outcome");

  // Ambil hanya ke data harga dari kedua data yang telah difilter tersebut
  const incomeAmount = incomeData.map((d) => d.nominal.amount);
  const outcomeAmount = outcomeData.map((d) => d.nominal.amount);

  // Jumlahkan semua datanya
  const sumIncome = incomeAmount.reduce((acc, curr) => acc + (curr > 0 ? curr : 0), 0);
  const sumOutcome = outcomeAmount.reduce((acc, curr) => acc + (curr > 0 ? curr : 0), 0);

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
