import React, { SetStateAction, useEffect, useState } from "react";
import { useAssetContext } from "./route";
import { AssetsData } from "~/@types/assets";
import { useFetcher } from "@remix-run/react";
import { assetCategoryData } from "./data";
import PopupDetail from "./PopupDetail";
import PopupDelete from "./PopupDelete";

interface DetailProps {
  assetName: string;
  setAssetName: React.Dispatch<SetStateAction<string>>;
}

export interface PopupProps {
  data: AssetsData | undefined;
  setAssetName: React.Dispatch<SetStateAction<string>>;
  setEditMode: React.Dispatch<SetStateAction<boolean>>;
  setDeleteMode: React.Dispatch<SetStateAction<boolean>>;
}

const PopupEdit = ({
  data,
  setEditMode,
}: Pick<PopupProps, "data" | "setEditMode">) => {
  const [selectValue, setSelectValue] = useState<string>(
    data ? data.group : ""
  );
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const isLoading = fetcher.state === "loading";

  useEffect(() => {
    if (isLoading) {
      setEditMode(false);
    }
  }, [isLoading, setEditMode]);

  return (
    <div style={{ position: "relative" }}>
      <h3 className="font-ubuntu-bold text-center">Edit Aset {data?.name}</h3>

      <fetcher.Form id="asset-form" method="PUT" action="/api/asset">
        <input
          type="hidden"
          name="old-asset-name"
          id="old-asset-name"
          readOnly
          value={data?.name}
          disabled={isSubmitting}
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
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
                disabled={isSubmitting}
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
            disabled={isSubmitting}
          />
        </div>
        {isSubmitting && (
          <div className="flex gap-1">
            <div className="popup-spinner"></div>
            <p className="my-auto font-playfair-bold text-info">Editing...</p>
          </div>
        )}
        <div id="asset-footer" className="container-flex">
          <button
            className="button-close"
            onClick={() => setEditMode(false)}
            type="button"
          >
            Kembali
          </button>
          <button className="button-success">
            {isSubmitting ? "Mengedit..." : "Konfirmasi"}
          </button>
        </div>
      </fetcher.Form>
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
          <PopupDelete setAssetName={setAssetName} setDeleteMode={setDeleteMode} data={data} />
        )}
      </div>
    </div>
  );
}
