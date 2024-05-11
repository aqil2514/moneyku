import { TransactionBodyType, currencyFormat } from "./route";

export default function TransactionDataBody({
  data,
}: {
  data: TransactionBodyType[];
}) {

  console.log(data);

  return (
    <div>
      {data.map((d,i) => {
        const itemPrice = currencyFormat.format(d.price);
        return(
        <div key={i} className="body">
      <section>{d.category}</section>
      <section>
        <p>{d.item}</p>
        <p>{d.asset}</p>
      </section>
      <section>
        <p style={d.price < 0 ? {color: "red", fontWeight:"bold"} : {color:"blue", fontWeight:"bold"}}>{itemPrice.replace("-", "")}</p>
      </section>
        </div>
      )})}
    </div>
  );

}
