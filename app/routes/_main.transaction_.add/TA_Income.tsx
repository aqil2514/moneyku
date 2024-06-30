import { useActionData, useFetcher } from "@remix-run/react";
import { useState } from "react";
import { AssetsData } from "~/@types/assets";
import { action } from "./route";
import { getErrors } from "../_auth.signup/route";
import { currencyFormat } from "utils/general";
import Button from "components/Inputs/Button";
import { AssetLists } from "./data";

export function IncomeTransaction({ assetData }: { assetData: AssetsData[] }) {
    const [nominal, setNominal] = useState<string>("");
    const actionData = useActionData<typeof action>();
    const errors = getErrors(actionData?.errors);
    const {
      dateTransaction,
      noteTransaction,
      categoryTransaction,
      assetsTransaction,
      totalTransaction,
    } = errors;
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";
  
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
          <em style={{ color: "red" }}>{dateTransaction}</em>
          <div className="form-text">
            <label htmlFor="transaction-total">Nominal</label>
            <input
              type="number"
              value={nominal}
              onChange={(e) => {
                setNominal(e.target.value);
              }}
              name="transaction-total"
              id="transaction-total"
            />
            <p>
              <strong>Jumlah dalam Rupiah : </strong>
              {currencyFormat.format(Number(nominal))}
            </p>
            <em style={{ color: "red" }}>{totalTransaction}</em>
          </div>
          <div className="form-text">
            <label htmlFor="transaction-category">Kategori Pemasukan</label>
            <input
              type="text"
              name="transaction-category"
              id="transaction-category"
            />
          </div>
          <em style={{ color: "red" }}>{categoryTransaction}</em>
          <div className="form-text">
            <label htmlFor="transaction-assets">Aset</label>
            <input
              type="text"
              name="transaction-assets"
              id="transaction-assets"
              list="asset-list"
            />
          </div>
          <em style={{ color: "red" }}>{assetsTransaction}</em>
          <div className="form-text">
            <label htmlFor="transaction-note">Catatan</label>
            <input type="text" name="transaction-note" id="transaction-note" />
          </div>
          <em style={{ color: "red" }}>{noteTransaction}</em>
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