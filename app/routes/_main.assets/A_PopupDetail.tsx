import { Form } from "@remix-run/react";
import { toast } from "react-toastify";
import Button from "components/Inputs/Button";
import { PopupProps } from "./A_Detail";
import { useAssetContext } from "./Assets";
import { currencyFormat } from "utils/general";
import { filterTransPerAsset } from "utils/client/assets";

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
    <div className="flex gap-2 justify-center">
      <div className={`w-6 rounded-sm`} style={{backgroundColor: data.color}} />
      <h3 className="font-ubuntu-bold text-center my-auto">Aset {data?.name}</h3>
    </div>
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
                <Button style={{ padding: "0.1rem 0.2rem" }} color="info" type="button" onClick={() => {
                  toast.info("Dalam pengembangan")
                }}>
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
