import React, { useEffect, useRef } from "react";
import { useTransactionData } from "../main";
import { months } from "../TFilter";
import TransactionDataHeader from "./Header";
import TransactionDataBody from "./Body";

export default function TransactionData() {
  const { data, month, setMonth, year } = useTransactionData();
  const dataRef = useRef<null | HTMLDivElement>(null);

  console.log(data)

  const filteredData = data
  .filter((d) => {
    const dataYear = d.updated_at.getFullYear();
    const dataMonthIndex = d.updated_at.getMonth(); // getMonth() sudah mengembalikan nilai 0-11

    return month === dataMonthIndex && Number(year) === dataYear;
  })
  .sort((a, b) => {
    return a.updated_at.getTime() - b.updated_at.getTime();
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
    return <div>Tidak ada data transaksi di bulan {months[month]} tahun {year}</div>;
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
