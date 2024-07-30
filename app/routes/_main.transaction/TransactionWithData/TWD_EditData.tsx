import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useRevalidator } from "@remix-run/react";
import { ErrorValidationResponse } from "~/@types/General";
import { TransactionBodyType, TransactionType } from "~/@types/Transaction";
import { useTransactionData } from "../Transactions";
import EditDataProvider from "../Providers/EditDataProvider";
import {
  AssetTransaction,
  CategoryTransaction,
  DateTransaction,
  FooterButtons,
  InOutCategory,
  MainId,
  NominalTransaction,
  NoteTransaction,
  TransactionId,
} from "../Components/EditDataComponents";
import { getErrors } from "../utils-client";

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [priceChecked, setPriceChecked] = useState<
    "Pemasukan" | "Pengeluaran" | string
  >("");
  const [errors, setErrors] = useState<ErrorValidationResponse[]>([]);
  const revalidator = useRevalidator();
  const {
    dateTransaction,
    noteTransaction,
    typeTransaction,
    categoryTransaction,
    assetsTransaction,
    totalTransaction,
  } = getErrors(errors);

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

  useEffect(() => {
    getData(header);
  }, [header, globalData, selectedData, getData]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const res = await axios.putForm("/api/transaction", formData);
    const data = res.data.response;

    if (!data.success) {
      revalidator.revalidate();
      setErrors(data.data);
    } else {
      revalidator.revalidate();
      setEditPopup(false);
    }
  };

  return (
    <EditDataProvider header={header} index={index}>
      <div className="popup">
        <div className="popup-edit">
          <div className="popup-edit-header">
            <h3>Edit Data</h3>
          </div>

          <div className="popup-edit-body">
            <form onSubmit={submitHandler}>
              <MainId />
              <TransactionId />
              <DateTransaction errorMessage={dateTransaction} header={header} />
              <InOutCategory errorMessage={typeTransaction} />
              <NominalTransaction errorMessage={totalTransaction} />
              <CategoryTransaction errorMessage={categoryTransaction} />
              <AssetTransaction errorMessage={assetsTransaction} />
              <NoteTransaction errorMessage={noteTransaction} />

              <FooterButtons setEditPopup={setEditPopup} />
            </form>
          </div>
        </div>
      </div>
    </EditDataProvider>
  );
}