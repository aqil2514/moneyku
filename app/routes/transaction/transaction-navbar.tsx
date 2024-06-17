import Typography from "components/General/Typography";
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
        <Typography variant="p" family="ubuntu-medium">Pemasukan</Typography>
        <Typography variant="p" family="poppins-medium">{currencyFormat.format(sumIncome)}</Typography>
      </section>
      <section className="outcome-section">
        <Typography variant="p" family="ubuntu-medium">Pengeluaran</Typography>
        <Typography variant="p" family="poppins-medium">{currencyFormat.format(sumOutcome)}</Typography>
      </section>
      <section className="total-section">
        <Typography variant="p" family="ubuntu-medium">Total</Typography>
        <Typography variant="p" family="poppins-medium">{currencyFormat.format(total)}</Typography>
      </section>
    </header>
  );
}
