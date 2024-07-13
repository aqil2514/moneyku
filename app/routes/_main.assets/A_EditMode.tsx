import { useEffect } from "react";
import { useFetcher } from "@remix-run/react";
import Button from "components/Inputs/Button";
import { PopupProps } from "./A_Detail";
import { AssetApiPut } from "~/@types/Assets";
import {
  AssetCategory,
  AssetColor,
  AssetDescription,
  AssetName,
  AssetNominal,
  OldAssetName,
} from "./Components/EditModeComponents";
import EditModeProvider from "./Providers/EditModeProvider";
import { AnimateSpinner } from "components/General/Animations";

export default function PopupEdit({
  data,
  setEditMode,
  setAssetName,
}: Pick<PopupProps, "data" | "setEditMode" | "setAssetName">) {

  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const isLoading = fetcher.state === "loading";
  const fetcherData = fetcher.data as AssetApiPut;

  useEffect(() => {
    if (isLoading && fetcherData.status === "success") {
      if (fetcherData.newName) {
        setAssetName(fetcherData.newName);
      }
      setEditMode(false);
    }
  }, [isLoading, setEditMode, fetcherData, setAssetName]);

  return (
    <EditModeProvider data={data}>
      <div style={{ position: "relative" }}>
        <h3 className="font-ubuntu-bold text-center">Edit Aset {data?.name}</h3>

        <fetcher.Form id="asset-form" method="PUT" action="/api/asset">
          <OldAssetName />
          <AssetName />
          <AssetColor />
          <AssetNominal />
          <AssetCategory />
          <AssetDescription />

          {isSubmitting && (
            <AnimateSpinner message="Editing..." />
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
    </EditModeProvider>
  );
}
