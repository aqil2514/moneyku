import { createContext, useContext } from "react";
import { AssetsData } from "~/@types/Assets";
import { TransactionType } from "~/@types/Transaction";
import MainPage from "./A_Main";

interface AssetsProps {
  assetData: AssetsData[];
  transactionData: TransactionType[];
}

interface AssetsContextState extends AssetsProps {}

const AssetContext = createContext<AssetsContextState>(
  {} as AssetsContextState
);

export default function Assets({ assetData, transactionData }: AssetsProps) {
  return (
    <AssetContext.Provider value={{ assetData, transactionData }}>
      <MainPage />
    </AssetContext.Provider>
  );
}

export function useAssetContext(){
    return useContext(AssetContext);
}