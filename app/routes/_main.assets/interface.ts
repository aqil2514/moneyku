import { FetcherWithComponents } from "@remix-run/react";
import React from "react";
import { AssetsData } from "~/@types/Assets";

export type DeleteOption = "delete-transaction" | "move-transaction" | "";

export interface AddModeContextProps {
  selectValue: string;
  setSelectValue: React.Dispatch<React.SetStateAction<string>>;
  assetNominal: string;
  setAssetNominal: React.Dispatch<React.SetStateAction<string>>;
  fetcher: FetcherWithComponents<unknown>;
}

export interface DeleteModeContextProps {
  data: AssetsData | undefined;
  deleteOption: DeleteOption;
  setDeleteOption: React.Dispatch<React.SetStateAction<DeleteOption>>;
  assetName: string;
  setAssetName: React.Dispatch<React.SetStateAction<string>>;
  fetcher: AddModeContextProps["fetcher"];
}

export interface EditModeContextProps extends AddModeContextProps {
  data: AssetsData | undefined;
  selectValue: string;
  setSelectValue: React.Dispatch<React.SetStateAction<string>>;
}
