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
    <header id="navbar">
      <section className="income-section">
        <p>Pemasukan</p>
        <p>{currencyFormat.format(sumIncome)}</p>
      </section>
      <section className="outcome-section">
        <p>Pengeluaran</p>
        <p>{currencyFormat.format(sumOutcome)}</p>
      </section>
      <section className="total-section">
        <p>Saldo</p>
        <p>{currencyFormat.format(total)}</p>
      </section>
    </header>
  );
}
