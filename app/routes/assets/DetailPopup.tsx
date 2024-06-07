import React, { SetStateAction, useState } from "react";
import { useAssetContext } from "./route";
import { AssetsData } from "~/@types/assets";
import { Form } from "@remix-run/react";
import { assetCategoryData } from "./data";
import { IoIosWarning } from "react-icons/io";

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

const PopupDetail = ({
  data,
  setAssetName,
  setEditMode,
  setDeleteMode,
}: PopupProps) => {
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
        <button className="button-close" onClick={() => setDeleteMode(true)}>
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

  // Next tingkatin UX di sini
  return (
    <>
      <h3 className="font-ubuntu-bold text-center">Edit Aset {data?.name}</h3>

      <Form id="asset-form" method="PUT" action="/api/asset">
        <input
          type="hidden"
          name="old-asset-name"
          id="old-asset-name"
          readOnly
          value={data?.name}
        />
        <div className="form-input-basic">
          <label htmlFor="asset-name" className="font-ubuntu-reguler">
            Nama Aset :{" "}
          </label>
          <input
            type="text"
            name="asset-name"
            id="asset-name"
            defaultValue={data?.name}
            className="font-poppins-reguler"
          />
        </div>
        <div className="form-input-basic">
          <label htmlFor="asset-nominal" className="font-ubuntu-reguler">
            Total Nominal Aset :{" "}
          </label>
          <input
            type="number"
            name="asset-nominal"
            id="asset-nominal"
            defaultValue={data?.amount}
            className="font-poppins-reguler"
          />
        </div>
        <div className="form-input-basic">
          <label htmlFor="asset-category" className="font-ubuntu-reguler">
            Kategori Aset
          </label>
          <select
            name="asset-category"
            id="asset-category"
            value={selectValue}
            className="font-poppins-reguler"
            onChange={(e) => setSelectValue(e.target.value)}
          >
            {assetCategoryData.sort().map((d) => (
              <option value={d} key={d} className="font-poppins-reguler">
                {d}
              </option>
            ))}
            <option value={undefined} disabled>
              ──────────
            </option>
            <option value="Lainnya" className="font-poppins-reguler">
              Lainnya
            </option>
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
        <div className="form-input-basic">
          <label htmlFor="asset-description" className="font-ubuntu-reguler">
            Deskripsi Aset :{" "}
          </label>
          <textarea
            name="asset-description"
            id="asset-description"
            defaultValue={data?.description}
            className="font-poppins-reguler"
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
          <button className="button-success">Konfirmasi</button>
        </div>
      </Form>
    </>
  );
};

const PopupDelete = ({
  data,
  setDeleteMode,
}: Pick<PopupProps, "data" | "setDeleteMode">) => {
  return (
    <div>
      <h3 className="font-ubuntu-bold text-center popup-delete-header">
        Hapus Aset {data?.name}
      </h3>
      <Form method="DELETE" action="/api/asset">
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
          <p>
            <strong>Deskripsi Aset</strong> : {data?.description}
          </p>
        </div>
        <div className="alert alert-warning">
          <IoIosWarning />
          <p>
            <strong>Warning :</strong> Data yang dihapus tidak dapat
            dikembalikan
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
          <button className="button-success">Konfirmasi</button>
        </div>
      </Form>
    </div>
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
        {deleteMode && (
          <PopupDelete setDeleteMode={setDeleteMode} data={data} />
        )}
      </div>
    </div>
  );
}
