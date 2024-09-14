import React from "react";

export type SectionState = "asset" | "category";

export interface ButtonHeaderProps {
  section: SectionState;
  icons: React.ReactNode;
}

export interface MainAssetContext {
  section: SectionState;
  setSection: React.Dispatch<React.SetStateAction<SectionState>>;
  isHiding: boolean;
  setIsHiding: React.Dispatch<React.SetStateAction<boolean>>;
}
