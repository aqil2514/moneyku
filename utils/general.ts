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

export const formatCurrency = (value: string) => {
  const numberString = value.replace(/[^,\d]/g, "").toString();
  const split = numberString.split(",");
  const remainder = split[0].length % 3;
  const currency = split[0].substr(0, remainder);
  const thousands = split[0].substr(remainder).match(/\d{3}/gi);

  if (thousands) {
    const separator = remainder ? "." : "";
    const formattedCurrency = currency + separator + thousands.join(".");
    return split[1] != undefined ? formattedCurrency + "," + split[1] : formattedCurrency;
  }

  return currency;
};

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getFormData: FormDataHandler = {
  asset(formData) {
    const removeCurrencyFormat = (value:string) => {
      return Number(value.replace(/[Rp. ]/g, ""));
    };

    const formValues: AssetFormValues = {
      oldAssetName: formData.get("old-asset-name") as string,
      assetName: formData.get("asset-name") as string,
      assetNominal: removeCurrencyFormat(formData.get("asset-nominal") as string),
      assetCategory: formData.get("asset-category") as string,
      newAssetCategory: formData.get("new-asset-category") as string,
      assetDescription: encodeURIComponent(
        formData.get("asset-description") as string
      ),
    };

    console.log(formValues)
    return formValues;
  },
};
