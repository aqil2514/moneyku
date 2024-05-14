import React from "react";
import TransactionDataBody from "./data-body";
import TransactionDataHeader from "./data-header";
import { TransactionType } from "./route";

export default function TransactionData({ data, deleteMode }: { data: TransactionType[], deleteMode: boolean }) {
  return (
    <div className="data">
      {data.map((d, i) => (
        <React.Fragment key={i++}>
          <TransactionDataHeader data={d.header} body={d.body} />
          <TransactionDataBody data={d.body} deleteMode={deleteMode} />
        </React.Fragment>
      ))}
    </div>
  );

}
