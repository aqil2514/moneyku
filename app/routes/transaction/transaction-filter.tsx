import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { useTransactionData } from "./route";
import React from "react";

export const months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export default function TransactionFilter() {
  const { month, setMonth } = useTransactionData();
  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const nav = target.getAttribute("data-nav") as "left" | "right";

    if (nav === "left") {
      setMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
      return;
    }
    setMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
  };
  return (
    <div className="container-filter" style={{margin: "1rem"}}>
      <button data-nav="left" onClick={clickHandler}>
        <FaArrowAltCircleLeft />
      </button>
      <p>{months[month]}</p>
      <button data-nav="right" onClick={clickHandler}>
        <FaArrowAltCircleRight />
      </button>
    </div>
  );
}
