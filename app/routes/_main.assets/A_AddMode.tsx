import { useFetcher } from "@remix-run/react";
import React, { SetStateAction, useEffect, useState } from "react";
import { BasicResponse } from "~/@types/general";
import Button from "components/Inputs/Button";
import { assetCategoryData } from "./data";

interface PopupAddProps {
  setAddMode: React.Dispatch<SetStateAction<boolean>>;
}

export default function PopupAdd({ setAddMode }: PopupAddProps) {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const [selectValue, setSelectValue] = useState<string>("");
  const data = fetcher.data as BasicResponse;

  useEffect(() => {
    if (data && data.success === true) setAddMode(false);
  }, [data, setAddMode]);

  return (
    <div className="popup">
      <div className="popup-edit">
        <h3 className="font-ubuntu-bold text-center">Tambah Aset Baru</h3>
        <fetcher.Form method="POST" action="/api/asset" id="asset-form">
          <div className="form-input-basic">
            <label htmlFor="asset-name" className="font-ubuntu-reguler">
              Nama Aset :{" "}
            </label>
            <input
              type="text"
              name="asset-name"
              id="asset-name"
              placeholder="Masukkan nama aset"
              required
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
              placeholder="Masukkan nominal awal aset"
              id="asset-nominal"
              required
              defaultValue={0}
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
              required
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
                  placeholder="Nama kategori aset baru"
                  required
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
              className="font-poppins-reguler"
              placeholder="Contoh: Aset khusus untuk transportasi"
              required
              disabled={isSubmitting}
            />
          </div>

          <div id="asset-footer" className="container-flex">
            <Button
              color="error"
              onClick={() => setAddMode(false)}
              type="button"
            >
              Kembali
            </Button>
            <Button color="success" disabled={isSubmitting}>
              {isSubmitting ? "Menambahkan..." : "Konfirmasi"}
            </Button>
          </div>
        </fetcher.Form>
      </div>
    </div>
  );
}
