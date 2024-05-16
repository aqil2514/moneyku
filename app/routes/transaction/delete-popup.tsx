import React, { useCallback, useEffect, useState } from "react";
import { TransactionBodyType, TransactionType } from "./route";
import { IoIosWarning } from "react-icons/io";
import { Form } from "@remix-run/react";

const SelectedData = ({ data }: { data: TransactionBodyType }) => {
  return (
    <div>
      <p>
        <strong>Aset : </strong> {data.asset}
      </p>
      <p>
        <strong>Kategori : </strong> {data.category}
      </p>
      <p>
        <strong>Item : </strong> {data.item}
      </p>
      <p>
        <strong>Harga : </strong> {data.price}
      </p>
    </div>
  );
};

export default function DeletePopup({
  header,
  setDeletePopup,
  index,
}: {
  header: string;
  setDeletePopup: React.Dispatch<React.SetStateAction<boolean>>;
  index: number;
}) {
  const [globalData, setGlobalData] = useState<TransactionType>();
  const [selectedData, setSelectedData] = useState<TransactionBodyType>();
  const dateOption: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    weekday: "long",
    month: "long",
    year: "numeric",
  };
  const getData = useCallback(
    async (header: string) => {
      const endpoint = "http://localhost:3000";
      try {
        const res = await fetch(`${endpoint}/transaction/detail/${header}`);
        const data = await res.json();
        setGlobalData(data.data[0]);
        setSelectedData(data.data[0].body[index]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    [index]
  );

  useEffect(() => {
    if (!globalData) {
      getData(header);
    }
  }, [header, globalData, selectedData, getData]);
  return (
    <div className="popup">
      <div className="popup-delete">
        <div className="popup-delete-header">
          <h3>Data yang akan dihapus</h3>
        </div>
        <div className="popup-delete-body">
          {globalData ? (
            <p>
              <strong>Dibuat pada :</strong>{" "}
              {new Date(globalData.header).toLocaleDateString(
                "id-ID",
                dateOption
              )}
            </p>
          ) : null}
          {selectedData ? <SelectedData data={selectedData} /> : <p>Loading</p>}
        </div>
        <div className="popup-delete-footer">
          <div className="alert alert-warning">
            <IoIosWarning />
            <p>
              <strong>Warning :</strong> Data yang dihapus tidak dapat
              dikembalikan
            </p>
          </div>
          <div className="container container-flex">
            <button
              className="button-close"
              onClick={() => setDeletePopup(false)}
            >
              Batal
            </button>
            <Form method="DELETE" action="/transaction">
              <input type="hidden" name="header" value={header} />
              <input type="hidden" name="index" value={index} />
              <button
                className="button-navigation-1"
              >
                Hapus
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
