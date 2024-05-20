import React, { useState } from "react";
import {
  TransactionBodyType,
  currencyFormat,
  useTransactionData,
} from "./route";
import DeletePopup from "./delete-popup";
import { MdEdit } from "react-icons/md";
import EditPopup from "./edit-data";

// TODO : UID ADJUSMENT

export default function TransactionDataBody({
  body,
  id,
}: {
  id: string;
  body: TransactionBodyType[];
}) {
  const { deleteMode, editMode, data:allData } = useTransactionData();
  const [deletePopup, setDeletePopup] = useState<boolean>(false);
  const [deleteIndex, setDeleteIndex] = useState<number>(0);
  const [editPopup, setEditPopup] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number>(0);
  const [headerData, setHeaderData] = useState<string>("");

  const deleteHandler = (
    e: React.MouseEvent<SVGElement | HTMLParagraphElement>
  ) => {
    const target = e.target as HTMLParagraphElement;
    const id = target.getAttribute("data-id");
    const index = Number(target.getAttribute("data-index"));
    const header = allData.find((d) => d.id === id)?.header;

    if (header) {
      setHeaderData(header);
      setDeletePopup(true);
      setDeleteIndex(index);
      return;
    }

    setDeletePopup(false);
    setHeaderData("");
    setDeleteIndex(0);
  };

  const editHandler = (
    e: React.MouseEvent<SVGElement | HTMLParagraphElement>
  ) => {
    const target = e.target as HTMLParagraphElement;
    const id = target.getAttribute("data-id");
    const index = Number(target.getAttribute("data-index"));
    const header = allData.find((d) => d.id === id)?.header;

    if (header) {
      setHeaderData(header);
      setEditPopup(true);
      setEditIndex(index);
      return;
    }

    setEditPopup(false);
    setHeaderData("");
    setEditIndex(0);
  };

  return (
    <div>
      {body.map((d, i) => {
        const itemPrice = currencyFormat.format(d.price);
        const isEditMode = editMode && !deleteMode;
        const isDeleteMode = deleteMode && !editMode;

        return (
          <div
            key={i}
            className={`body${
              isEditMode ? "-edit" : isDeleteMode ? "-delete" : ""
            }`}
          >
            {isEditMode && (
              <MdEdit
                className="body-edit-icon"
                onClick={editHandler}
                aria-hidden
                data-index={i++}
                data-id={id}
              />
            )}
            {isDeleteMode && (
              <p
                className="body-delete-icon"
                onClick={deleteHandler}
                aria-hidden
                data-index={i++}
                data-id={id}
              >
                X
              </p>
            )}
            <section>{d.item}</section>
            <section>
              <p>{d.category}</p>
              <p>{d.asset}</p>
            </section>
            <section>
              <p
                style={{
                  color: d.price < 0 ? "red" : "blue",
                  fontWeight: "bold",
                }}
              >
                {itemPrice.replace("-", "")}
              </p>
            </section>
          </div>
        );
      })}
      {deletePopup && (
        <DeletePopup
          index={deleteIndex}
          header={headerData}
          setDeletePopup={setDeletePopup}
        />
      )}
      {editPopup && (
        <EditPopup
          index={editIndex}
          header={headerData}
          setEditPopup={setEditPopup}
        />
      )}
    </div>
  );
}
