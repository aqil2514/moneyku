import { FetcherWithComponents } from "@remix-run/react";
import React from "react";
import { AssetsData } from "~/@types/Assets";

export interface AddModeContextProps{
    selectValue: string;
    setSelectValue: React.Dispatch<React.SetStateAction<string>>;
    assetNominal: string;
    setAssetNominal: React.Dispatch<React.SetStateAction<string>>;
    fetcher: FetcherWithComponents<unknown>;
}

export interface EditModeContextProps extends AddModeContextProps {
    data: AssetsData | undefined;
    selectValue: string;
    setSelectValue: React.Dispatch<React.SetStateAction<string>>;
}