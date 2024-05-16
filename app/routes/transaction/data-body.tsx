import React, { useState } from "react";
import { TransactionBodyType, currencyFormat } from "./route";
import DeletePopup from "./delete-popup";

export default function TransactionDataBody({
  data,
  deleteMode,
  header,
}: {
  data: TransactionBodyType[];
  deleteMode: boolean;
  header: string;
}) {
  const [deletePopup, setDeletePopup] = useState<boolean>(false);
  const [deleteIndex, setDeleteIndex] = useState<number>(0);
  const [headerData, setHeaderData] = useState<string>("");
  const deleteHandler = (e: React.MouseEvent<HTMLParagraphElement>) => {
    const target = e.target as HTMLParagraphElement;
    const header = target.getAttribute("data-header");
    const index = Number(target.getAttribute("data-index"));

    if (header) {
      setHeaderData(header);
      setDeletePopup(true);
      setDeleteIndex(index)
      return;
    }

    setDeletePopup(false);
    setHeaderData("");
    setDeleteIndex(0);
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
                  id="body-delete-icon"
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
      {deletePopup && <DeletePopup index={deleteIndex} header={headerData} setDeletePopup={setDeletePopup} />}
    </div>
  );
}
