import React, { SetStateAction, useState } from "react";
import { useAssetContext } from "./route";
import { AssetsData } from "~/@types/assets";
import { Form } from "@remix-run/react";
import { assetCategoryData } from "./data";

interface DetailProps {
  assetName: string;
  setAssetName: React.Dispatch<SetStateAction<string>>;
}

interface PopupProps {
  data: AssetsData | undefined;
  setAssetName: React.Dispatch<SetStateAction<string>>;
  setEditMode: React.Dispatch<SetStateAction<boolean>>;
  setDeleteMode: React.Dispatch<SetStateAction<boolean>>;
}

const PopupDetail = ({ data, setAssetName, setEditMode }: PopupProps) => {
  return (
    <>
      <h3 className="font-ubuntu-bold text-center">Aset {data?.name}</h3>
      <div id="asset-detail">
        <p>
          <strong>Nama Aset</strong> : {data?.name}
        </p>
        <p>
          <strong>Total Aset</strong> : {data?.amount}
        </p>
        <p>
          <strong>Kelompok Aset</strong> : {data?.group}
        </p>
        <p>
          <strong>Deskripsi Aset</strong> : {data?.description}
        </p>
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
        <button
          className="button-close"
          onClick={() => alert("Hapus belum berfungsi")}
        >
          Hapus
        </button>
      </div>
    </>
  );
};

const PopupEdit = ({
  data,
  setEditMode,
}: Pick<PopupProps, "data" | "setEditMode">) => {
  const [selectValue, setSelectValue] = useState<string>(
    data ? data.group : ""
  );
  return (
    <>
      <h3 className="font-ubuntu-bold text-center">Edit Aset {data?.name}</h3>

      <Form id="asset-form">
        <div className="form-input-basic">
          <label htmlFor="aset-name">Nama Aset : </label>
          <input
            type="text"
            name="aset-name"
            id="aset-name"
            defaultValue={data?.name}
          />
        </div>
        <div>
          <label htmlFor="aset-nominal">Total Nominal Aset : </label>
          <input
            type="number"
            name="aset-nominal"
            id="aset-nominal"
            defaultValue={data?.amount}
          />
        </div>
        <div>
          <label htmlFor="asset-category">Kategori Aset</label>
          <select
            name="asset-category"
            id="asset-category"
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
          >
            {assetCategoryData.sort().map((d) => (
              <option value={d} key={d}>
                {d}
              </option>
            ))}
            <option value={undefined} disabled>
              ──────────
            </option>
            <option value="Lainnya">Lainnya</option>
          </select>
          {selectValue === "Lainnya" && (
            <>
              <label htmlFor="new-asset-category">Kategori Aset Baru</label>
              <input
                type="text"
                name="new-asset-category"
                id="new-asset-category"
              />
            </>
          )}
        </div>
        <div>
          <label htmlFor="aset-description">Deskripsi Aset : </label>
          <textarea
            name="aset-description"
            id="aset-description"
            defaultValue={data?.description}
          />
        </div>
        <div id="asset-footer" className="container-flex">
          <button
            className="button-close"
            onClick={() => setEditMode(false)}
            type="button"
          >
            Kembali
          </button>
          <button
            className="button-success"
            onClick={() => alert("Edit belum berfungsi")}
          >
            Konfirmasi
          </button>
        </div>
      </Form>
    </>
  );
};

export default function DetailPopup({ assetName, setAssetName }: DetailProps) {
  const { assetData } = useAssetContext();
  const [deleteMode, setDeleteMode] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const data = assetData.find((a) => a.name === assetName);
  return (
    <div className="popup">
      <div className="popup-edit">
        {!deleteMode && !editMode && (
          <PopupDetail
            data={data}
            setAssetName={setAssetName}
            setDeleteMode={setDeleteMode}
            setEditMode={setEditMode}
          />
        )}
        {editMode && <PopupEdit setEditMode={setEditMode} data={data} />}
      </div>
    </div>
  );
}
