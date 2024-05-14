import { useNavigate } from "@remix-run/react";
import React, { SetStateAction } from "react";
import { FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

export default function TransactionMenu({
  deleteMode,
  setDeleteMode,
}: {
  deleteMode: boolean;
  setDeleteMode: React.Dispatch<SetStateAction<boolean>>;
}) {
  const navigation = useNavigate();
  return (
    <div id="menu">
      {deleteMode ? (
        <MdCancel
          id="delete-transaction"
          title="Batal hapus transaksi"
          onClick={() => setDeleteMode(false)}
        />
      ) : (
        <FaTrashAlt
          id="delete-transaction"
          title="Hapus transaksi"
          onClick={() => setDeleteMode(true)}
        />
      )}
      <FaPlusCircle
        id="add-transaction"
        title="Tambah transaksi"
        onClick={() => navigation("/transaction/add", { replace: true })}
      />
    </div>
  );
}
