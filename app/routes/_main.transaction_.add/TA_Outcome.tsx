import { useFetcher } from "@remix-run/react";
import Button from "components/Inputs/Button";
import { useEffect, useState } from "react";
import { AssetLists } from "./data";
import { useTransactionAddData } from "./Transaction";
import { BasicHTTPResponse, ErrorValidationResponse } from "~/@types/General";
import { getErrors } from "./utils";
import { rupiahConvert } from "utils/client/general";

const ErrorMessage = ({ message }: { message: string | null | undefined }) => {
  return message && typeof message === "string" ? (
    <em className="text-red-500">{message}</em>
  ) : (
    <></>
  );
};

export default function OutcomeTransaction() {
  const [nominal, setNominal] = useState<string>("Rp. 0");
  const [fetcherData, setFetcherData] = useState<ErrorValidationResponse[]>([]);

  const fetcher = useFetcher<BasicHTTPResponse<ErrorValidationResponse[]>>();
  const isSubmitting = fetcher.state !== "idle";
  const { assetData } = useTransactionAddData();

  const changeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    return rupiahConvert(e, setNominal)
  }

  const errors = getErrors(fetcherData);
  const {
    assetsTransaction,
    categoryTransaction,
    dateTransaction,
    noteTransaction,
    totalTransaction,
  } = errors;

  useEffect(() => {
    if (fetcher.data && fetcher.data.data) {
      setFetcherData(fetcher.data.data);
    }
  }, [fetcher.data]);

  return (
    <div className="main-page">
      <fetcher.Form
        className="form-basic"
        action="/transaction/add?type=Pengeluaran"
        method="post"
      >
        <input
          disabled={isSubmitting}
          type="hidden"
          name="type-data"
          value={"Pengeluaran"}
        />
        <div className="form-date">
          <label htmlFor="transaction-date">Tanggal Transaksi</label>
          <input
            disabled={isSubmitting}
            type="date"
            name="transaction-date"
            id="transaction-date"
          />
          <ErrorMessage message={dateTransaction} />
        </div>
        <div className="form-text">
          <label htmlFor="transaction-total">Nominal</label>
          <input
            disabled={isSubmitting}
            type="text"
            value={nominal}
            onChange={changeHandler}
            name="transaction-total"
            id="transaction-total"
          />
          <ErrorMessage message={totalTransaction} />
        </div>
        <div className="form-text">
          <label htmlFor="transaction-category">Kategori Pengeluaran</label>
          <input
            disabled={isSubmitting}
            type="text"
            name="transaction-category"
            id="transaction-category"
          />
          <ErrorMessage message={categoryTransaction} />
        </div>
        <div className="form-text">
          <label htmlFor="transaction-assets">Aset</label>
          <input
            disabled={isSubmitting}
            type="text"
            name="transaction-assets"
            id="transaction-assets"
            list="asset-list"
          />
          <ErrorMessage message={assetsTransaction} />
        </div>
        <div className="form-text">
          <label htmlFor="transaction-note">Catatan</label>
          <input
            disabled={isSubmitting}
            type="text"
            name="transaction-note"
            id="transaction-note"
          />
          <ErrorMessage message={noteTransaction} />
        </div>
        <div>
          <Button color="primary" disabled={isSubmitting}>
            {isSubmitting ? "Menambah Pengeluaran..." : "Tambah Pengeluaran"}
          </Button>
        </div>
      </fetcher.Form>
      <AssetLists assetData={assetData} />
    </div>
  );
}
