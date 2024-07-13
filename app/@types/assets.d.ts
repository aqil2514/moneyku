import React from "react";
import { BasicHTTPResponse } from "./General";

export interface AssetApiHandler {
  delete: (request: Request) => Promise<BasicHTTPResponse<null>>;
  post: (request: Request) => Promise<BasicHTTPResponse<AssetsData>>;
  put: (request: Request) => Promise<AssetApiPut>;
}

export interface AssetApiPut extends BasicHTTPResponse<AssetsData> {
  newName: string;
}

export interface AssetsData {
  group: string;
  amount: number;
  description: string;
  name: string;
  themeColor: string;
}

export interface FormAddState {
  element: React.ElementType;
  type: "text" | "number";
  forId: string;
  placeHolder: string;
  isRequired?: boolean;
  disabled?: boolean;
}

export interface AssetFormValues {
  oldAssetName: string;
  assetName: string;
  assetNominal: number;
  assetCategory: string;
  newAssetCategory?: string;
  assetDescription: string;
}

export interface AssetResponse {
  assetData: AssetsData[];
  transactionData: TransactionType[];
}
