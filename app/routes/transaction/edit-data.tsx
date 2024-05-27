import React, { useCallback, useEffect, useState } from "react";
import {
  TransactionBodyType,
  TransactionType,
  useTransactionData,
} from "./route";
import axios, { isAxiosError } from "axios";
import { useRevalidator } from "@remix-run/react";

interface EditPopupProps {
  index: number;
  header: string;
  setEditPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditPopup({
  index,
  header,
  setEditPopup,
}: EditPopupProps) {
  const { data } = useTransactionData();
  const [globalData, setGlobalData] = useState<TransactionType>();
  const [selectedData, setSelectedData] = useState<TransactionBodyType>();
  const [priceChecked, setPriceChecked] = useState<
    "Pemasukan" | "Pengeluaran" | string
  >("");
  const revalidator = useRevalidator();

  const getData = useCallback(
    (header: string) => {
      const sameGlobal = data.find((d) => d.header === header);
      if (!sameGlobal)
        throw new Error("Terjadi kesalahan saat pengambilan data");
      setGlobalData(sameGlobal);
      setSelectedData(globalData?.body[index]);
      if (selectedData) {
        const category = selectedData.price > 0 ? "Pemasukan" : "Pengeluaran";

        setPriceChecked(category);
      }
    },
    [index, data, globalData, selectedData]
  );

  const formattedDate = (header: string) => {
    const date = new Date(header);

    const result = date.toISOString().split("T")[0];

    return result;
  };

  useEffect(() => {
    getData(header);
  }, [header, globalData, selectedData, getData]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    try {
      const res = await axios.putForm("/api/transaction", formData);

      // TODO: Tambahin buat edit tipe transaksi, seperti pemasukan dan pengeluaran

      console.info(res.data);

      revalidator.revalidate();
      setEditPopup(false);
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error);
        setEditPopup(true);
      }
    }
  };

  return (
    <div className="popup">
      <div className="popup-edit">
        <div className="popup-edit-header">
          <h3>Edit Data</h3>
        </div>

        <div className="popup-edit-body">
          <form onSubmit={submitHandler}>
            <input type="hidden" name="main-id" defaultValue={globalData?.id} />
            <input
              type="hidden"
              name="transaction-uid"
              defaultValue={selectedData?.uid}
            />
            <div className="form-date">
              <label htmlFor="transaction-date">Tanggal Transaksi</label>
              <input
                type="date"
                name="transaction-date"
                id="transaction-date"
                defaultValue={formattedDate(header)}
              />
            </div>

            <div className="form-navigation">
              <input
                type="radio"
                name="transaction-type"
                id="income-type"
                value={"Pemasukan"}
                onChange={() => setPriceChecked("Pemasukan")}
                checked={priceChecked === "Pemasukan"}
              />
              <label htmlFor="income-type">Pemasukan</label>
              <input
                type="radio"
                name="transaction-type"
                id="outcome-type"
                value={"Pengeluaran"}
                onChange={() => setPriceChecked("Pengeluaran")}
                checked={priceChecked === "Pengeluaran"}
              />
              <label htmlFor="outcome-type">Pengeluaran</label>
            </div>

            <div className="form-text">
              <label htmlFor="transaction-total">Total</label>
              <input
                type="text"
                name="transaction-total"
                id="transaction-total"
                defaultValue={selectedData && String(selectedData.price).replace("-", "")}
              />
            </div>
            <div className="form-text">
              <label htmlFor="transaction-category">Kategori {priceChecked}</label>
              <input
                type="text"
                name="transaction-category"
                id="transaction-category"
                defaultValue={selectedData?.category}
              />
            </div>
            <div className="form-text">
              <label htmlFor="transaction-assets">Aset</label>
              <input
                type="text"
                name="transaction-assets"
                id="transaction-assets"
                defaultValue={selectedData?.asset}
              />
            </div>
            <div className="form-text">
              <label htmlFor="transaction-note">Catatan</label>
              <input
                type="text"
                name="transaction-note"
                id="transaction-note"
                defaultValue={selectedData?.item}
              />
            </div>
            <div style={{ margin: "1rem 0" }}>
              <button className="form-submit">Edit Data</button>
            </div>
          </form>
        </div>

        <div className="popup-edit-footer">
          <div className="container container-flex">
            <button
              className="button-close"
              onClick={() => setEditPopup(false)}
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
