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
  data,
  header,
}: {
  data: TransactionBodyType[];
  header: string;
}) {
  const { deleteMode, editMode } = useTransactionData();
  const [deletePopup, setDeletePopup] = useState<boolean>(false);
  const [deleteIndex, setDeleteIndex] = useState<number>(0);
  const [editPopup, setEditPopup] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number>(0);
  const [headerData, setHeaderData] = useState<string>("");

  const deleteHandler = (
    e: React.MouseEvent<SVGElement | HTMLParagraphElement>
  ) => {
    const target = e.target as HTMLParagraphElement;
    const header = target.getAttribute("data-header");
    const index = Number(target.getAttribute("data-index"));

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
    const header = target.getAttribute("data-header");
    const index = Number(target.getAttribute("data-index"));

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
      {data.map((d, i) => {
        const itemPrice = currencyFormat.format(d.price);
        if (deleteMode)
          return (
            <div key={i} className="body-delete">
              {deleteMode && (
                <p
                  className="body-delete-icon"
                  onClick={deleteHandler}
                  aria-hidden
                  data-index={i++}
                  data-header={header}
                >
                  X
                </p>
              )}
              <section>{d.category}</section>
              <section>
                <p>{d.item}</p>
                <p>{d.asset}</p>
              </section>
              <section>
                <p
                  style={
                    d.price < 0
                      ? { color: "red", fontWeight: "bold" }
                      : { color: "blue", fontWeight: "bold" }
                  }
                >
                  {itemPrice.replace("-", "")}
                </p>
              </section>
            </div>
          );
        else if (editMode) {
          return (
            <div key={i} className="body-edit">
              {editMode && (
                <MdEdit
                  className="body-edit-icon"
                  onClick={editHandler}
                  aria-hidden
                  data-index={i++}
                  data-header={header}
                />
              )}
              <section>{d.category}</section>
              <section>
                <p>{d.item}</p>
                <p>{d.asset}</p>
              </section>
              <section>
                <p
                  style={
                    d.price < 0
                      ? { color: "red", fontWeight: "bold" }
                      : { color: "blue", fontWeight: "bold" }
                  }
                >
                  {itemPrice.replace("-", "")}
                </p>
              </section>
            </div>
          );
        }

        return (
          <div key={i} className="body">
            <section>{d.category}</section>
            <section>
              <p>{d.item}</p>
              <p>{d.asset}</p>
            </section>
            <section>
              <p
                style={
                  d.price < 0
                    ? { color: "red", fontWeight: "bold" }
                    : { color: "blue", fontWeight: "bold" }
                }
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
