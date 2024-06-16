import { ActionFunctionArgs, redirect } from "@remix-run/node";
import axios, { isAxiosError } from "axios";
import { endpoint } from "lib/server";
import { jsonWithError, jsonWithSuccess } from "remix-toast";
import { getUser } from "utils/account";
import { AssetFormValues } from "~/@types/assets";

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

  if(!user) throw new Error("Data user tidak ditemukan")

  if (request.method === "PUT") {
    const data = await request.formData();
    const formData = getFormData(data);
    const { oldAssetName, assetName } = formData;
    const newAssetName = oldAssetName === assetName ? undefined : assetName;

    try{
      const res = await axios.put(`${endpoint}/assets`, {
        formData,
        userId: user.uid,
      });
  
      return jsonWithSuccess({ success: true, newAssetName }, res.data.msg);
    }catch (error) {
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
      return jsonWithError({ success: false }, "Nama aset belum diisi");
    }
    if (formData.assetCategory === "Lainnya" && !formData.newAssetCategory?.trim()) {
      return jsonWithError(
        { success: false },
        "Kategori asset belum ditentukan"
      );
    }
    if (!formData.assetDescription.trim()) {
      return jsonWithError(
        { success: false },
        "Deskripsi asset belum ditentukan"
      );
    }

    try {
      const res = await axios.post(`${endpoint}/assets`, {
        formData,
        userId: user.uid,
      });

      return jsonWithSuccess({ success: res.data.success }, res.data.message);
    } catch (error) {
      if (isAxiosError(error)) {
        const statusCode = error.response?.status;
        if (statusCode === 409) {
          const message = error.response?.data.message;
          return jsonWithError({ success: false }, message);
        }
      }
    }
  }

  return redirect("/assets");
}
