import TransactionDataBody from "./data-body";
import TransactionDataHeader from "./data-header";
import { TransactionType } from "./route";

export default function TransactionData({ data }: { data: TransactionType }) {
  const { header, body } = data;

  return (
    <div className="data">
      <TransactionDataHeader data={header} price={body.price} />
      <TransactionDataBody data={body} />
    </div>
  );
}
