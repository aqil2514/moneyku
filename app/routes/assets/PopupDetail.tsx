import { Form } from "@remix-run/react";
import { currencyFormat } from "../transaction/route";
import { PopupProps } from "./DetailPopup";
import { useAssetContext } from "./route";
import { filterTransPerAsset } from "./utils";

export default function PopupDetail({
  data,
  setAssetName,
  setEditMode,
  setDeleteMode,
}: PopupProps) {
  const { transactionData } = useAssetContext();

  const transPerAsset = filterTransPerAsset(transactionData, data?.name);
  const totalTransaction: number = transPerAsset.length;

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
        <div className="flex">
          <p>
            <strong>Jumlah Transaksi : </strong>
            {totalTransaction === 0
              ? `Belum ada transaksi di aset ${data?.name}`
              : `${totalTransaction} transaksi`}
          </p>
          {totalTransaction !== 0 && (
            <Form method="GET" action="/transaction" replace>
              <input type="hidden" name="asset" id="asset" value={data?.name} />
              <button>lihat transaksi</button>
            </Form>
          )}
        </div>
      </div>

      <div id="asset-footer" className="container-flex">
        <button
          className="button-navigation-1"
          onClick={() => setAssetName("")}
        >
          Tutup
        </button>
        <button className="button-success" onClick={() => setEditMode(true)}>
          Edit
        </button>
        <button className="button-close" onClick={() => setDeleteMode(true)}>
          Hapus
        </button>
      </div>
    </>
  );
}
