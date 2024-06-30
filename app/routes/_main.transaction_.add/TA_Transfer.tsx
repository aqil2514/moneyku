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
  const isSubmitting = fetcher.state !== "idle";

  return (
    <div className="main-page">
      <Typography variant="h1" family="merriweather-black">
        Transfer
      </Typography>

      <fetcher.Form action="/transaction/add?type=Transfer" method="post">
        <input
          disabled={isSubmitting}
          type="hidden"
          name="type-data"
          value={"Transfer"}
        />

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
          forId="transaction-total"
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
          forId="transaction-note"
          label="Catatan"
        />

        <div className="form-input-basic">
          <label
            htmlFor="transaction-description"
            className="font-ubuntu-reguler"
          >
            Deskripsi :{" "}
          </label>

          <textarea
            name="transaction-description"
            id="transaction-description"
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
