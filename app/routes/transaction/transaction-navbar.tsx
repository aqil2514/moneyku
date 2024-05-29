import { currencyFormat } from "./route";

export default function TransactionNavbar({
  price,
}: {
  price: number[];
}) {
  const sumIncome = price.reduce((acc, curr) => acc + (curr > 0 ? curr : 0), 0);
  const sumOutcome = price.reduce(
    (acc, curr) => acc + (curr < 0 ? Math.abs(curr) : 0),
    0
  );
  const total = sumIncome - sumOutcome;


  return (
    <header id="transaction-navbar">
      <section className="income-section">
        <p className="font-ubuntu-medium">Pemasukan</p>
        <p className="font-poppins-medium">{currencyFormat.format(sumIncome)}</p>
      </section>
      <section className="outcome-section">
        <p className="font-ubuntu-medium">Pengeluaran</p>
        <p className="font-poppins-medium">{currencyFormat.format(sumOutcome)}</p>
      </section>
      <section className="total-section">
        <p className="font-ubuntu-medium">Saldo</p>
        <p className="font-poppins-medium">{currencyFormat.format(total)}</p>
      </section>
    </header>
  );
}
