import { AssetFormValues } from "~/@types/Assets";
import { FormDataHandler } from "~/@types/General";

/**
 * Mengkapitalisasi huruf pertama dari setiap kata dalam string.
 * @param str - String yang akan dikapitalisasi
 * @returns String dengan setiap kata yang dikapitalisasi
 */
export const toCapitalizeWords = (str: string): string => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  export const currencyFormat = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getFormData:FormDataHandler = {
  asset(formData) {
    const formValues: AssetFormValues = {
      oldAssetName: formData.get("old-asset-name") as string,
      assetName: formData.get("asset-name") as string,
      assetNominal: Number(formData.get("asset-nominal")),
      assetCategory: formData.get("asset-category") as string,
      newAssetCategory: formData.get("new-asset-category") as string,
      assetDescription: encodeURIComponent(
        formData.get("asset-description") as string
      ),
    };
    return formValues;
  },
}