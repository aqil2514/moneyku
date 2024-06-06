export interface AssetsData {
  group: string;
  amount: number;
  description: string;
  name: string;
}

export interface AssetFormValues {
  oldAssetName: string;
  assetName: string;
  assetNominal: number;
  assetCategory: string;
  newAssetCategory?: string;
  assetDescription: string;
}
