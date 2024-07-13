import { FetcherWithComponents } from "@remix-run/react";
import React from "react";

export interface AddModeContextProps{
    selectValue: string;
    setSelectValue: React.Dispatch<React.SetStateAction<string>>;
    assetNominal: string;
    setAssetNominal: React.Dispatch<React.SetStateAction<string>>;
    fetcher: FetcherWithComponents<unknown>;
}