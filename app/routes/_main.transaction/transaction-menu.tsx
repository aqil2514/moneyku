import { useNavigate } from "@remix-run/react";
import { FaEdit, FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useTransactionData } from "./route";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { useEffect } from "react";

export default function TransactionMenu() {
  const navigation = useNavigate();
  const {
    deleteMode,
    setDeleteMode,
    editMode,
    setEditMode,
    data,
    menuActive,
    setMenuActive,
  } = useTransactionData();

  useEffect(() => {
    const transactionMenu = document.getElementById("transaction-menu");
    const transactionMenuTrigger = document.getElementById(
      "transaction-menu-trigger"
    );
    const clickHandler = (e: Event) => {

      // Fix ini nanti 
      if (
        menuActive &&
        e.target !== transactionMenu &&
        e.target !== transactionMenuTrigger &&
        !transactionMenu?.contains(e
        .target as Node) &&
        !transactionMenuTrigger?.contains(e.target as Node)
      ) {
        setMenuActive(false);
      }
    };

    if (menuActive) {
      window.addEventListener("click", clickHandler);
    }

    return () => {
      window.removeEventListener("click", clickHandler);
    };
  }, [menuActive, setMenuActive]);

  const isThere = data.length > 0;

  return (
    <>
      <div
        id="transaction-menu"
        className={`transaction-menu ${
          menuActive ? "transaction-menu-active" : ""
        }`}
      >
        {isThere && (
          <>
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
          </>
        )}

        <FaPlusCircle
          id="add-transaction"
          title="Tambah transaksi"
          onClick={() => navigation("/transaction/add")}
        />
      </div>
      <button
        id="transaction-menu-trigger"
        className={`font-poppins-bold transaction-trigger ${
          menuActive ? "transaction-trigger-hide" : ""
        }`}
        onClick={() => setMenuActive(true)}
      >
        <AiOutlineDoubleLeft />
      </button>
    </>
  );
}
