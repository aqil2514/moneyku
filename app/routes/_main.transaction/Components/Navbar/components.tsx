import { currencyFormat } from "utils/general";
import { DetailTransactionProps } from "../../Core/interface";

export function SummaryTransaction({
  amount,
  text,
  color,
}: DetailTransactionProps) {
  const colorMap: Record<typeof color, string> = {
    green: "text-green-400",
    black: "text-black",
    red: "text-red-400",
  };
  return (
    <section className="flex flex-col justify-center items-center">
      <p className="font-ubuntu font-bold">{text}</p>
      <p className={`font-poppins font-semibold ${colorMap[color]}`}>
        {currencyFormat.format(amount)}
      </p>
    </section>
  );
}
