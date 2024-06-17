import { Form } from "@remix-run/react";
import { currencyFormat } from "../transaction/route";
import { PopupProps } from "./DetailPopup";
import { useAssetContext } from "./route";
import { filterTransPerAsset } from "./utils";
import { toast } from "react-toastify";
import Button from "components/Inputs/Button";

export default function PopupDetail({
  data,
  assetName,
  setAssetName,
  setEditMode,
  setDeleteMode,
}: PopupProps) {
  const { transactionData, assetData } = useAssetContext();

  const transPerAsset = filterTransPerAsset(transactionData, assetName);
  const totalTransaction: number = transPerAsset.length;

  if (!data) {
    return (
      <div>
        <p>Memuat detail aset...</p>
        <div id="asset-footer" className="container-flex">
          <Button
            color="primary"
            onClick={() => setAssetName("")}
          >
            Tutup
          </Button>
        </div>
      </div>
    );
  }

  const deleteHandler = () => {
    if (assetData.length <= 1) return toast.error("Minimal harus ada 1 Asset");
    setDeleteMode(true);
  };

  return (
    <>
      <h3 className="font-ubuntu-bold text-center">Aset {data?.name}</h3>
      <div id="asset-detail">
        <p>
          <strong>Nama Aset</strong> : {data?.name}
        </p>
        <p>
          <strong>Total Aset</strong> :{" "}
          {data && currencyFormat.format(data.amount)}
        </p>
        <p>
          <strong>Kelompok Aset</strong> : {data?.group}
        </p>
        <p style={{ whiteSpace: "pre-wrap" }}>
          <strong style={{ display: "block" }}>Deskripsi Aset : </strong>
          {data?.description}
        </p>
        <div className="flex items-center gap-1">
          <p>
            <strong>Jumlah Transaksi : </strong>
            {totalTransaction === 0
              ? `Belum ada transaksi di aset ${data?.name}`
              : `${totalTransaction} transaksi`}
          </p>
          {totalTransaction !== 0 && (
            <Form method="GET" action="/transaction" replace>
              <div>
                <input
                  type="hidden"
                  name="asset"
                  id="asset"
                  value={data?.name}
                />
                <Button style={{ padding: "0.1rem 0.2rem" }} color="info">
                  lihat transaksi
                </Button>
              </div>
            </Form>
          )}
        </div>
      </div>

      <div id="asset-footer" className="container-flex">
        <Button color="primary" onClick={() => setAssetName("")}>
          Tutup
        </Button>
        <Button color="success" onClick={() => setEditMode(true)}>
          Edit
        </Button>
        <Button color="error" onClick={deleteHandler}>
          Hapus
        </Button>
      </div>
    </>
  );
}
