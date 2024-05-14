import { TransactionBodyType, currencyFormat } from "./route";

export default function TransactionDataBody({ data, deleteMode }: { data: TransactionBodyType[], deleteMode: boolean }) {
  return (
    <div>
      {data.map((d, i) => {
        const itemPrice = currencyFormat.format(d.price);
        // TODO : Akalin ini nanti. 
        return (
          <div key={i} className="body">
            {deleteMode && <p id="body-delete-icon">X</p>}
            <section>{d.category}</section>
            <section>
              <p>{d.item}</p>
              <p>{d.asset}</p>
            </section>
            <section>
              <p style={d.price < 0 ? { color: "red", fontWeight: "bold" } : { color: "blue", fontWeight: "bold" }}>{itemPrice.replace("-", "")}</p>
            </section>
          </div>
        );
      })}
    </div>
  );
}
