import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";
import { BasicHTTPResponse } from "~/@types/General";
import { PopupProps } from "./A_Detail";
import DeleteModeProvider from "./Providers/DeleteModeProvider";
import { DeleteAssetDetail, DeleteAssetFooter, DeleteAssetOption, DeleteAssetTitle, DeleteAssetWarning } from "./Components/DeleteModeComponents";

export default function PopupDelete({
  data,
  setDeleteMode,
  setAssetName: setActivate,
}: Pick<PopupProps, "data" | "setDeleteMode" | "setAssetName">) {
  const fetcher = useFetcher();
  const responseForm = fetcher.data as BasicHTTPResponse<null>;

  useEffect(() => {
    if (responseForm && responseForm.status === "success") {
      setDeleteMode(false);
      setActivate("");
    }
  }, [responseForm, setDeleteMode, setActivate]);

  return (
    <DeleteModeProvider data={data}>
      <div>
        <DeleteAssetTitle />
        <fetcher.Form method="DELETE" action="/api/asset">
        <DeleteAssetDetail />
        <DeleteAssetOption />
        <DeleteAssetWarning />
        <DeleteAssetFooter setDeleteMode={setDeleteMode} />

        </fetcher.Form>
      </div>
    </DeleteModeProvider>
  );
}
