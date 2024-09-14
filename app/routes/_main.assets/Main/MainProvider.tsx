import React, { createContext, useContext, useState } from "react";
import { MainAssetContext, SectionState } from "./interface";

const MainContext = createContext<MainAssetContext>({} as MainAssetContext);

export default function MainProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [section, setSection] = useState<SectionState>("asset");
  const [isHiding, setIsHiding] = useState<boolean>(false);

  const value: MainAssetContext = {
    section,
    setSection,
    isHiding,
    setIsHiding
  };
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
}

export function useMainAssetData(){
    return useContext(MainContext)
}