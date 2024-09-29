import { createContext, useContext, useState } from "react";
import MainPage from "../Components/Main";
import { MainAssetContext, SectionState } from "./interface";

const AssetContext = createContext<MainAssetContext>({} as MainAssetContext);

export default function AssetsProvider({
  accountsData,
  transactionsData,
  categoriesData,
}: Pick<
  MainAssetContext,
  "accountsData" | "categoriesData" | "transactionsData"
>) {
  const [section, setSection] = useState<SectionState>("asset");
  const [isHiding, setIsHiding] = useState<boolean>(false);
  // const [page, setPage] = useState<PageSection>("idle")

  const value: MainAssetContext = {
    accountsData,
    categoriesData,
    isHiding,
    section,
    setIsHiding,
    setSection,
    transactionsData,
    // page,
    // setPage
  };
  return (
    <AssetContext.Provider value={value}>
      <MainPage />
    </AssetContext.Provider>
  );
}

export function useAssetData() {
  return useContext(AssetContext);
}
