import { useEffect, useState } from "react";
import { useFetcher } from "@remix-run/react";
import { assetCategoryData } from "./data";
import { BasicHTTPResponse } from "~/@types/General";
import Button from "components/Inputs/Button";
import { PopupProps } from "./A_Detail";
import { AssetsData } from "~/@types/Assets";

interface EditAssetResponse {
  data:BasicHTTPResponse<AssetsData>; 
  newAssetName: string | undefined;
}

export default function PopupEdit({
  data,
  setEditMode,
  setAssetName,
}: Pick<PopupProps, "data" | "setEditMode" | "setAssetName">) {
  const [selectValue, setSelectValue] = useState<string>(
    data ? data.group : ""
  );
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const isLoading = fetcher.state === "loading";
  const fetcherData = fetcher.data as EditAssetResponse;

  useEffect(() => {
    if (isLoading && fetcherData.data.status === "success") {
      if (fetcherData.newAssetName) {
        setAssetName(fetcherData.newAssetName);
      }
      setEditMode(false);
    }
  }, [isLoading, setEditMode, fetcherData, setAssetName]);

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
          <Button
            color="error"
            onClick={() => setEditMode(false)}
            type="button"
          >
            Kembali
          </Button>
          <Button color="success" disabled={isSubmitting}>
            {isSubmitting ? "Mengedit..." : "Konfirmasi"}
          </Button>
        </div>
      </fetcher.Form>
    </div>
  );
}
