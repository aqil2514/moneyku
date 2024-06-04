import React, { SetStateAction } from "react";
import { useAssetContext } from "./route";

interface DetailProps {
  assetName: string;
  setAssetName: React.Dispatch<SetStateAction<string>>;
}
export default function DetailPopup({ assetName, setAssetName }: DetailProps) {
  const { assetData } = useAssetContext();
  const data = assetData.find((a) => a.name === assetName);
  return (
    <div className="popup">
      <div className="popup-edit">
        <h3 className="font-ubuntu-bold text-center">Aset {data?.name}</h3>
        <div id="asset-detail">
          <p>
            <strong>Nama Aset</strong> : {data?.name}
          </p>
          <p>
            <strong>Total Aset</strong> : {data?.amount}
          </p>
          <p>
            <strong>Deskripsi Aset</strong> : {data?.description}
          </p>
          <p>
            <strong>Kelompok Aset</strong> : {data?.group}
          </p>
        </div>

        <div id="asset-footer" className="container-flex">
          <button
            className="button-navigation-1"
            onClick={() => setAssetName("")}
          >
            Tutup
          </button>
          <button className="button-success" onClick={() => alert("Edit belum berfungsi")}>
            Edit
          </button>
          <button className="button-close" onClick={() => alert("Hapus belum berfungsi")}>
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
