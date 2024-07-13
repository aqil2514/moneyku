import React, { createContext, useContext, useState } from "react";
import { DeleteModeContextProps, DeleteOption } from "../interface";
import { AssetsData } from "~/@types/Assets";
import { useFetcher } from "@remix-run/react";

const DeleteContext = createContext<DeleteModeContextProps>({} as DeleteModeContextProps);

export default function DeleteModeProvider({
    children,
    data
  }: {
      children: React.ReactNode;
      data: AssetsData | undefined;
  }){
    const [deleteOption, setDeleteOption] = useState<DeleteOption>("");
  const [assetName, setAssetName] = useState<string>("Pilih aset");
  const fetcher = useFetcher();

    return(
        <DeleteContext.Provider value={{data, assetName, deleteOption, setAssetName, setDeleteOption, fetcher}}>
            {children}
        </DeleteContext.Provider>
    )
}

export function useDeleteData(){
    return useContext(DeleteContext);
}