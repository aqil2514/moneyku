import { createContext, useContext } from "react";
import MainPage from "../Main";
import { Accounts, Category } from "~/@types/Assets-Experimental";
import { Transaction } from "~/@types/Transaction-Experimental";

interface AssetsProps{
  accountsData : Accounts[];
  categoriesData: Category[];
  transactionsData :Transaction[];
}

interface AssetsContextState extends AssetsProps {}

const AssetContext = createContext<AssetsContextState>(
  {} as AssetsContextState
);

export default function AssetsProvider({ accountsData, transactionsData, categoriesData }: AssetsProps) {
  return (
    <AssetContext.Provider value={{ accountsData, transactionsData, categoriesData }}>
      <MainPage />
    </AssetContext.Provider>
  );
}

export function useAssetData(){
    return useContext(AssetContext);
}