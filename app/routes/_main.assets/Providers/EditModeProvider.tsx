import { createContext, useContext, useState } from "react";
import { EditModeContextProps } from "../interface";
import { useFetcher } from "@remix-run/react";
import { AssetsData } from "~/@types/Assets";

const EditContext = createContext<EditModeContextProps>(
  {} as EditModeContextProps
);

export default function EditModeProvider({
  children,
  data
}: {
    children: React.ReactNode;
    data: AssetsData | undefined;
}) {
  const fetcher = useFetcher();
  const [selectValue, setSelectValue] = useState<string>("");
  const [assetNominal, setAssetNominal] = useState<string>("Rp. 0");

  return (
    <EditContext.Provider
      value={{
        fetcher,
        selectValue,
        setSelectValue,
        assetNominal,
        setAssetNominal,
        data
      }}
    >
      {children}
    </EditContext.Provider>
  );
}

export function useEditData(){
    return useContext(EditContext);
}
