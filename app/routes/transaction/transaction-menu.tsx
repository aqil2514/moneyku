import { useNavigate } from "@remix-run/react";
import { FaEdit, FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useTransactionData } from "./route";

export default function TransactionMenu() {
  const navigation = useNavigate();
  const { deleteMode, setDeleteMode, editMode, setEditMode } =
    useTransactionData();

  return (
    <div id="menu">
      {deleteMode ? (
        <MdCancel
          id="delete-transaction"
          title="Batal hapus transaksi"
          onClick={() => {
            setDeleteMode(false);
            setEditMode(false);
          }}
        />
      ) : (
        <FaTrashAlt
          id="delete-transaction"
          title="Hapus transaksi"
          onClick={() => {
            setDeleteMode(true);
            setEditMode(false);
          }}
        />
      )}

      {editMode ? (
        <MdCancel
          id="edit-transaction"
          title="Batal edit transaksi"
          onClick={() => {
            setEditMode(false);
            setDeleteMode(false);
          }}
        />
      ) : (
        <FaEdit
          id="edit-transaction"
          onClick={() => {
            setEditMode(true);
            setDeleteMode(false);
          }}
          title="Edit Transaksi"
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
