import React from "react";
import { Accounts, Category } from "~/@types/Assets-Experimental";
import { Transaction } from "~/@types/Transaction-Experimental";

export type SectionState = "asset" | "category";

// export type PageSection = "detail" | "edit" | "confirm" | "idle";

export interface ButtonHeaderProps {
  section: SectionState;
  icons: React.ReactNode;
}

export interface MainAssetContext {
  section: SectionState;
  setSection: React.Dispatch<React.SetStateAction<SectionState>>;
  isHiding: boolean;
  setIsHiding: React.Dispatch<React.SetStateAction<boolean>>;
  accountsData: Accounts[];
  categoriesData: Category[];
  transactionsData: Transaction[];
  // page: PageSection;
  // setPage: React.Dispatch<React.SetStateAction<PageSection>>;
}
