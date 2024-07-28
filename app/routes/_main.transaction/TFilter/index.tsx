import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { useTransactionData } from "../Transactions";

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
  const clickHandler = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
      return;
    } else if (direction === "next") {
      setMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    }
  };
  return (
    <div className="container-filter font-poppins-medium" style={{ margin: "1rem" }}>
      <button onClick={() => clickHandler("prev")}>
        <FaArrowAltCircleLeft />
      </button>
      <p>{months[month]}</p>
      <button onClick={() => clickHandler("next")}>
        <FaArrowAltCircleRight />
      </button>
    </div>
  );
}
