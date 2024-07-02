import { ActionFunctionArgs, redirect } from "@remix-run/node";
import axios, { isAxiosError } from "axios";
import { endpoint } from "lib/server";
import { jsonWithError, jsonWithSuccess } from "remix-toast";
import { getUser } from "utils/account";
import { AssetFormValues, AssetsData } from "~/@types/assets";
import { BasicHTTPResponse } from "~/@types/general";

/**
 * Memproses data dari form ke menjadi object
 * @param formData Form yang sesuai dengan format interface AssetFormValues
 * @returns Object Asset Form Values
 */
const getFormData = (formData: FormData): AssetFormValues => {
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
};

export async function action({ request }: ActionFunctionArgs) {
  const user = await getUser(request);

  if (!user) throw new Error("Data user tidak ditemukan");

  if (request.method === "PUT") {
    const data = await request.formData();
    const formData = getFormData(data);
    const { oldAssetName, assetName } = formData;
    const newAssetName = oldAssetName === assetName ? undefined : assetName;

    try {
      const res = await axios.put(`${endpoint}/assets`, {
        formData,
        userId: user.uid,
      });

      return jsonWithSuccess({ success: true, newAssetName }, res.data.msg);
    } catch (error) {
      if (isAxiosError(error)) {
        const statusCode = error.response?.status;
        if (statusCode === 409) {
          const message = error.response?.data.message;
          return jsonWithError({ success: false }, message);
        }
      }
    }
  } else if (request.method === "DELETE") {
    const formData = await request.formData();
    const assetName = String(formData.get("asset-name"));
    const deleteOption = String(formData.get("delete-option"))
      .toLowerCase()
      .replaceAll(" ", "-");

    if (deleteOption.includes("pilih-aset"))
      return jsonWithError(
        { success: false },
        "Anda belum memilih aset tujuan"
      );
    if (!deleteOption || deleteOption === "null")
      return jsonWithError(
        { success: false },
        "Anda belum memilih opsi tujuan"
      );

    const res = await axios.delete(
      `${endpoint}/assets?asset-name=${assetName}&user-id=${user.uid}&delete-option=${deleteOption}`
    );

    return jsonWithSuccess({ success: true, data: res.data }, res.data.msg);
  } else if (request.method === "POST") {
    const data = await request.formData();
    const formData = getFormData(data);

    if (!formData.assetName.trim()) {
      const result: BasicHTTPResponse<AssetsData> = {
        message: "Nama Aset belum diisi",
        status: "error",
        data: {} as AssetsData,
      };
      return jsonWithError(result, result.message);
    }
    if (
      formData.assetCategory === "Lainnya" &&
      !formData.newAssetCategory?.trim()
    ) {
      const result: BasicHTTPResponse<AssetsData> = {
        message: "Kategori asset belum ditentukan",
        status: "error",
        data: {} as AssetsData,
      };
      return jsonWithError(result, result.message);
    }
    if (!formData.assetDescription.trim()) {
      const result: BasicHTTPResponse<AssetsData> = {
        message: "Kategori asset belum ditentukan",
        status: "error",
        data: {} as AssetsData,
      };
      return jsonWithError(result, result.message);
    }

    try {
      const res = await axios.post<BasicHTTPResponse<AssetsData>>(
        `${endpoint}/assets`,
        {
          formData,
          userId: user.uid,
        }
      );

      return jsonWithSuccess(res.data, res.data.message);
    } catch (error) {
      if (isAxiosError(error)) {
        const data: BasicHTTPResponse<AssetsData> = error.response?.data;
        return jsonWithError(data, data.message);
      }
    }
  }

  return redirect("/assets");
}
