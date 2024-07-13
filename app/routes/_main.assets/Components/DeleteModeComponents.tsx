import { IoIosWarning } from "react-icons/io";
import { useAssetContext } from "../Assets";
import { useDeleteData } from "../Providers/DeleteModeProvider";
import Button from "components/Inputs/Button";
import React from "react";

export const DeleteAssetDetail = () => {
  const { data } = useDeleteData();
  return (
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
  );
};

export const DeleteAssetFooter=({setDeleteMode}: {setDeleteMode:React.Dispatch<React.SetStateAction<boolean>>}) => {
    const {fetcher, data} = useDeleteData();
    const isSubmitting = fetcher.state === "submitting";

    return(
        <div id="asset-footer" className="container-flex">
            <input type="hidden" name="asset-name" value={data?.name} />
            <Button
              color="error"
              onClick={() => setDeleteMode(false)}
              type="button"
            >
              Kembali
            </Button>
            <Button color="success" disabled={isSubmitting}>
              {isSubmitting ? "Menghapus" : "Konfirmasi"}
            </Button>
          </div>
    )
}

export const DeleteAssetOption = () => {
    const {assetName, setAssetName, deleteOption, setDeleteOption, data} = useDeleteData();
    const {assetData} = useAssetContext();
    const assetOptions = assetData.filter((d) => d.name !== data?.name);

    return(
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
    )
}

export const DeleteAssetTitle = () => {
  const { data } = useDeleteData();
  return (
    <h3 className="font-ubuntu-bold text-center popup-delete-header">
      Hapus Aset {data?.name}
    </h3>
  );
};

export const DeleteAssetWarning = () => {
    const {assetName, deleteOption} = useDeleteData();
    return(
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
    )
}