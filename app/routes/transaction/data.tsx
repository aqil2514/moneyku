import TransactionDataBody from "./data-body";
import TransactionDataHeader from "./data-header";
import { TransactionType } from "./route";

export default function TransactionData({ data }: { data: TransactionType[] }) {

  return (
    <div className="data">
      {data.map((d) => (
        <>
      <TransactionDataHeader data={d.header} body={d.body} />
      <TransactionDataBody data={d.body} />
        </>
      ))}
    </div>
  );

  return(<></>)
}
