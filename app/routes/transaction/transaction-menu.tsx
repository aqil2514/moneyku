import { Link } from "@remix-run/react";
import { FaPlusCircle } from "react-icons/fa";

export default function TransactionMenu() {
  return (
    <Link to={"/transaction/add"} replace id="menu">
      <FaPlusCircle title="Tambah Transaksi" />
    </Link>
  );
}
