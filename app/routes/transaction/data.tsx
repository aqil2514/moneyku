import React from "react";
import TransactionDataBody from "./data-body";
import TransactionDataHeader from "./data-header";
import { useTransactionData } from "./route";

export default function TransactionData() {
  const { data } = useTransactionData();
  return (
    <div className="data">
      {data.map((d, i) => (
        <React.Fragment key={i++}>
          <TransactionDataHeader data={String(d.id)} body={d.body} />
          <TransactionDataBody data={d.body} header={String(d.id)} />
        </React.Fragment>
      ))}
    </div>
  );
}
