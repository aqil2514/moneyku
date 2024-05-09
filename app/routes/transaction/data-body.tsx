import { TransactionType, currencyFormat } from "./route";

export default function TransactionDataBody({
  data,
}: {
  data: TransactionType["body"];
}) {
  const { category, item, asset, price } = data;
  const itemPrice = currencyFormat.format(price);

  return (
    <div className="body">
      <section>{category}</section>
      <section>
        <p>{item}</p>
        <p>{asset}</p>
      </section>
      <section>
        <p style={price < 0 ? {color: "red", fontWeight:"bold"} : {color:"blue", fontWeight:"bold"}}>{itemPrice.replace("-", "")}</p>
      </section>
    </div>
  );
}
