import { useFetcher } from "@remix-run/react";
import React, { SetStateAction, useEffect } from "react";
import { BasicHTTPResponse } from "~/@types/General";
import Button from "components/Inputs/Button";
import { AssetsData } from "~/@types/Assets";
import {
  AssetColor,
  AssetDescription,
  AssetNameInput,
  AssetNominalInputs,
  AssetSelectCategory,
} from "./components";
import AddModeProvider from "./Providers/AddMode";

interface PopupAddProps {
  setAddMode: React.Dispatch<SetStateAction<boolean>>;
}

export default function PopupAdd({ setAddMode }: PopupAddProps) {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const data = fetcher.data as BasicHTTPResponse<AssetsData>;

  useEffect(() => {
    if (data && data.status === "success") setAddMode(false);
  }, [data, setAddMode]);

  return (
    <AddModeProvider>
      <div className="popup">
        <div className="popup-edit">
          <h3 className="font-ubuntu-bold text-center">Tambah Aset Baru</h3>
          <fetcher.Form method="POST" action="/api/asset" id="asset-form">
            <AssetNameInput />
            <AssetColor />
            <AssetNominalInputs />
            <AssetSelectCategory />
            <AssetDescription />

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
    </AddModeProvider>
  );
}
