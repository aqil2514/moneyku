import React, { useEffect, useState } from "react";
import { useT_EditData } from "../Providers/EditDataProvider";
import { rupiahConvert } from "utils/client/general";
import { currencyFormat } from "utils/general";
import Button from "components/Inputs/Button";

export const AssetTransaction = ({
  errorMessage,
}: {
  errorMessage?: string;
}) => {
  const { selectedData } = useT_EditData();
  return (
    <div className="form-text">
      <label htmlFor="transaction-assets">Aset</label>
      <input
        type="text"
        name="transaction-assets"
        id="transaction-assets"
        defaultValue={selectedData?.asset}
      />
      <em style={{ color: "red" }}>{errorMessage}</em>
    </div>
  );
};

export const CategoryTransaction = ({
  errorMessage,
}: {
  errorMessage?: string;
}) => {
  const { priceChecked, selectedData } = useT_EditData();
  return (
    <div className="form-text">
      <label htmlFor="transaction-category">Kategori {priceChecked}</label>
      <input
        type="text"
        name="transaction-category"
        id="transaction-category"
        defaultValue={selectedData?.category}
      />
      <em style={{ color: "red" }}>{errorMessage}</em>
    </div>
  );
};

export const DateTransaction = ({
  header,
  errorMessage,
}: {
  header: string;
  errorMessage?: string;
}) => {
  const { formattedDate } = useT_EditData();
  return (
    <div className="form-date">
      <label htmlFor="transaction-date">Tanggal Transaksi</label>
      <input
        type="date"
        name="transaction-date"
        id="transaction-date"
        defaultValue={formattedDate(header)}
      />
      {errorMessage && <em style={{ color: "red" }}>{errorMessage}</em>}
    </div>
  );
};

export const FooterButtons = ({
  setEditPopup,
}: {
  setEditPopup: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="popup-edit-footer" style={{ margin: "1rem 0" }}>
      <div className="container container-flex">
        <Button color="success">Edit Data</Button>

        <Button color="error" type="button" onClick={() => setEditPopup(false)}>
          Batal
        </Button>
      </div>
    </div>
  );
};

export const InOutCategory = ({ errorMessage }: { errorMessage?: string }) => {
  const { priceChecked, setPriceChecked } = useT_EditData();
  return (
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
      <em style={{ color: "red" }}>{errorMessage}</em>
    </div>
  );
};

export const MainId = () => {
  const { globalData } = useT_EditData();
  return <input type="hidden" name="main-id" defaultValue={globalData.id} />;
};

export const NominalTransaction = ({
  errorMessage,
}: {
  errorMessage?: string;
}) => {
  const { selectedData } = useT_EditData();
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (selectedData) {
      setInputValue(currencyFormat.format(selectedData.price));
    }
  }, [selectedData]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    return rupiahConvert(e, setInputValue);
  };

  return (
    <div className="form-text">
      <label htmlFor="transaction-total">Total</label>
      <input
        type="text"
        name="transaction-total"
        id="transaction-total"
        value={inputValue}
        onChange={changeHandler}
      />
      <em style={{ color: "red" }}>{errorMessage}</em>
    </div>
  );
};

export const NoteTransaction = ({
  errorMessage,
}: {
  errorMessage?: string;
}) => {
  const { selectedData } = useT_EditData();
  return (
    <div className="form-text">
      <label htmlFor="transaction-note">Catatan</label>
      <input
        type="text"
        name="transaction-note"
        id="transaction-note"
        defaultValue={selectedData?.item}
      />
      <em style={{ color: "red" }}>{errorMessage}</em>
    </div>
  );
};

export const TransactionId = () => {
  const { selectedData } = useT_EditData();
  return (
    <input
      type="hidden"
      name="transaction-uid"
      defaultValue={selectedData?.uid}
    />
  );
};
