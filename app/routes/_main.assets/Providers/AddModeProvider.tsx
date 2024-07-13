import React, { createContext, useContext, useState } from "react";
import { AddModeContextProps } from "../interface";
import { useFetcher } from "@remix-run/react";

const AddModeContext = createContext<AddModeContextProps>(
  {} as AddModeContextProps
);

export default function AddModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const fetcher = useFetcher();
  const [selectValue, setSelectValue] = useState<string>("");
  const [assetNominal, setAssetNominal] = useState<string>("Rp. 0");
  return (
    <AddModeContext.Provider
      value={{
        fetcher,
        selectValue,
        setSelectValue,
        assetNominal,
        setAssetNominal,
      }}
    >
      {children}
    </AddModeContext.Provider>
  );
}

export function useAddModeData() {
  return useContext(AddModeContext);
}
