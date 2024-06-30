import Typography from "components/General/Typography";
import Textfield from "components/Inputs/Textfield";
import { CheckboxWithText } from "./components";
import { useState } from "react";
import { AssetLists } from "./data";
import { useTransactionAddData } from "./Transaction";
import { useFetcher } from "@remix-run/react";
import Button from "components/Inputs/Button";

export default function TransferTransaction() {
  const { assetData } = useTransactionAddData();
  const [isBill, setIsBill] = useState<boolean>(false);
  const fetcher = useFetcher();

  return (
    <div className="main-page">
      <Typography variant="h1" family="merriweather-black">
        Transfer
      </Typography>

      <fetcher.Form>
        <div className="form-date">
          <label htmlFor="transaction-date">
            <Typography variant="p" family="poppins-medium">
              Tanggal Transaksi
            </Typography>
          </label>
          <input type="date" name="transaction-date" id="transaction-date" />
        </div>

        <Textfield
          fieldType="number"
          fontFamily="poppins-medium"
          forId="total-nominal"
          label="Total"
        />
        <CheckboxWithText isBill={isBill} setIsBill={setIsBill} />
        {isBill && (
          <Textfield
            fieldType="number"
            fontFamily="poppins-medium"
            forId="bill"
            label="Jumlah biaya"
          />
        )}

        <Textfield
          fieldType="text"
          fontFamily="poppins-medium"
          forId="from-asset"
          label="Dari Aset"
          list="asset-list"
        />

        <Textfield
          fieldType="text"
          fontFamily="poppins-medium"
          forId="to-asset"
          label="Ke Aset"
          list="asset-list"
        />

        <Textfield
          fieldType="text"
          fontFamily="poppins-medium"
          forId="note"
          label="Catatan"
        />

        <div className="form-input-basic">
          <label htmlFor="asset-description" className="font-ubuntu-reguler">
            Deskripsi Aset :{" "}
          </label>
          <textarea
            name="asset-description"
            id="asset-description"
            className="font-poppins-reguler"
            placeholder="Contoh: Alokasi keuangan"
          />
        </div>

        <div>
          <Button color="primary">Tambah Data</Button>
        </div>
      </fetcher.Form>

      <AssetLists assetData={assetData} />
    </div>
  );
}
