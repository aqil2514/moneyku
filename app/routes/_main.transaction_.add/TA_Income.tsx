import { useFetcher } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import Button from "components/Inputs/Button";
import { AssetLists } from "./data";
import { BasicHTTPResponse, ErrorValidationResponse } from "~/@types/General";
import { getErrors } from "./utils";
import { useTransactionAddData } from "./Transaction";
import { rupiahConvert } from "utils/client/general";

const ErrorMessage = ({ message }: { message: string | null | undefined }) => {
  return message && typeof message === "string" ? (
    <em className="text-red-500">{message}</em>
  ) : (
    <></>
  );
};

export function IncomeTransaction() {
  const [nominal, setNominal] = useState<string>("Rp. 0");
  const [fetcherData, setFetcherData] = useState<ErrorValidationResponse[]>([]);

  const {assetData} = useTransactionAddData()

  const fetcher = useFetcher<BasicHTTPResponse<ErrorValidationResponse[]>>();
  const isSubmitting = fetcher.state === "submitting";

  const errors = getErrors(fetcherData);
  const {
    assetsTransaction,
    categoryTransaction,
    dateTransaction,
    noteTransaction,
    totalTransaction,
  } = errors;

  const changeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    return rupiahConvert(e, setNominal)
  }

  useEffect(() => {
    if (fetcher.data && fetcher.data.data) {
      setFetcherData(fetcher.data.data);
    }
  }, [fetcher.data]);

  return (
    <div className="main-page">
      <fetcher.Form
        className="form-basic"
        action="/transaction/add?type=Pemasukan"
        method="post"
      >
        <input type="hidden" name="type-data" value={"Pemasukan"} />
        <div className="form-date">
          <label htmlFor="transaction-date">Tanggal Transaksi</label>
          <input type="date" name="transaction-date" id="transaction-date" />
        </div>
        <ErrorMessage message={dateTransaction} />
        <div className="form-text">
          <label htmlFor="transaction-total">Nominal</label>
          <input
            type="text"
            value={nominal}
            onChange={changeHandler}
            name="transaction-total"
            id="transaction-total"
          />
        <ErrorMessage message={totalTransaction} />
        </div>
        <div className="form-text">
          <label htmlFor="transaction-category">Kategori Pemasukan</label>
          <input
            type="text"
            name="transaction-category"
            id="transaction-category"
          />
        </div>
        <ErrorMessage message={categoryTransaction} />

        <div className="form-text">
          <label htmlFor="transaction-assets">Aset</label>
          <input
            type="text"
            name="transaction-assets"
            id="transaction-assets"
            list="asset-list"
          />
        </div>
        <ErrorMessage message={assetsTransaction} />
        <div className="form-text">
          <label htmlFor="transaction-note">Catatan</label>
          <input type="text" name="transaction-note" id="transaction-note" />
        </div>
        <ErrorMessage message={noteTransaction} />
        <div>
          <Button color="primary" disabled={isSubmitting}>
            {isSubmitting ? "Menambah Pemasukan..." : "Tambah Pemasukan"}
          </Button>
        </div>
      </fetcher.Form>
      <AssetLists assetData={assetData} />
    </div>
  );
}
