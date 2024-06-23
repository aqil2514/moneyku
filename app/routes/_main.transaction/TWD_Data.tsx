import React, { useEffect, useRef } from "react";
import { useTransactionData } from "./Transactions";
import { months } from "./TFilter";
import TransactionDataHeader from "./TWD_Header";
import TransactionDataBody from "./TWD_Body";

export default function TransactionData() {
  const { data, month, setMonth } = useTransactionData();
  const dataRef = useRef<null | HTMLDivElement>(null);
  const filteredData = data.filter((d) => {
    const dataMonth = d.header;
    const dataFormat = Number(dataMonth.split(":")[0].split("-")[1]) - 1;

    return month === dataFormat;
  }).sort((a,b) => {
    const dateA = new Date(a.header);
    const dateB = new Date(b.header);

    return dateA.getTime() - dateB.getTime()
  });


  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
        return;
      } else if (e.key === "ArrowLeft") {
        setMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
      }
    };

      window.addEventListener("keydown", keyDownHandler);

      return () => {
        window.removeEventListener("keydown", keyDownHandler);
      };
    
  }, [dataRef, month, setMonth]);

  if (!filteredData || filteredData.length === 0) {
    return <div>Tidak ada data transaksi di bulan {months[month]}</div>;
  }
  

  return (
    <div id="transaction-data-container" ref={dataRef}>
      {filteredData.map((d, i) => (
        <React.Fragment key={i++}>
          <TransactionDataHeader id={String(d.id)} body={d.body} />
          <TransactionDataBody body={d.body} id={String(d.id)} />
        </React.Fragment>
      ))}
    </div>
  );
}
