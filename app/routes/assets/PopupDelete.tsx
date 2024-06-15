import { useFetcher } from "@remix-run/react";
import { PopupProps } from "./DetailPopup";
import { useEffect, useState } from "react";
import { IoIosWarning } from "react-icons/io";
import { useAssetContext } from "./route";
import { BasicResponse } from "~/@types/general";

type DeleteOption = "delete-transaction" | "move-transaction" | "";

export default function PopupDelete({
  data,
  setDeleteMode,
  setAssetName: setActivate,
}: Pick<PopupProps, "data" | "setDeleteMode" | "setAssetName">) {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const [deleteOption, setDeleteOption] = useState<DeleteOption>("");
  const [assetName, setAssetName] = useState<string>("Pilih aset");
  const { assetData } = useAssetContext();
  const assetOptions = assetData.filter((d) => d.name !== data?.name);
  const responseForm = fetcher.data as BasicResponse;

  useEffect(() => {
    if (responseForm && responseForm.success) {
      setDeleteMode(false);
      setActivate("");
    }
  }, [responseForm, setDeleteMode, setActivate]);

  return (
    <div>
      <h3 className="font-ubuntu-bold text-center popup-delete-header">
        Hapus Aset {data?.name}
      </h3>
      <fetcher.Form method="DELETE" action="/api/asset">
        <div id="asset-detail" className="popup-delete-body">
          <p>
            <strong>Nama Aset</strong> : {data?.name}
          </p>
          <p>
            <strong>Total Aset</strong> : {data?.amount}
          </p>
          <p>
            <strong>Kelompok Aset</strong> : {data?.group}
          </p>
          <p style={{ whiteSpace: "pre-wrap" }}>
            <strong>Deskripsi Aset</strong> : <br />
            {data?.description}
          </p>
        </div>
        <div>
          <p className="font-poppins-reguler">
            Bagaimana dengan transaksi yang ada di aset ini?
          </p>
          <div className="flex gap-1">
            <div className="flex gap-1">
              <input
                type="radio"
                name="delete-option"
                id="delete-transaction"
                checked={deleteOption === "delete-transaction"}
                onChange={() => setDeleteOption("delete-transaction")}
                value={"delete-transaction"}
                required
              />
              <label htmlFor="delete-transaction">Hapus</label>
            </div>
            <div className="flex gap-1">
              <input
                type="radio"
                name="delete-option"
                id="move-transaction"
                checked={deleteOption === "move-transaction"}
                onChange={() => setDeleteOption("move-transaction")}
                value={`move-transaction-to-${assetName}`}
                required
              />
            </div>
            <label htmlFor="move-transaction">Pindahkan ke</label>
          </div>
          {deleteOption === "move-transaction" && (
            <div className="form-input-basic">
              <select
                name="selected-asset"
                id="selected-asset"
                onChange={(e) => setAssetName(e.target.value)}
              >
                <option value={undefined}>Pilih aset</option>
                {assetOptions.map((d) => (
                  <option value={d.name} key={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div className="alert alert-warning">
          <IoIosWarning />
          <p>
            <strong>Warning :</strong>
            <br /> Data yang dihapus tidak dapat dikembalikan. <br />
            {deleteOption === "delete-transaction"
              ? "Semua data transkasi di sini akan dihapus"
              : assetName === "Pilih aset"
              ? "Belum ada aset yang dipilih"
              : `Semua data transaksi ini akan dipindahkan ke aset ${assetName}`}
          </p>
        </div>

        <div id="asset-footer" className="container-flex">
          <input type="hidden" name="asset-name" value={data?.name} />
          <button
            className="button-close"
            onClick={() => setDeleteMode(false)}
            type="button"
          >
            Kembali
          </button>
          <button className="button-success" disabled={isSubmitting}>
            {isSubmitting ? "Menghapus" : "Konfirmasi"}
          </button>
        </div>
      </fetcher.Form>
    </div>
  );
}
