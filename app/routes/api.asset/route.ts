import { ActionFunctionArgs, redirect } from "@remix-run/node";
import axios from "axios";
import { endpoint } from "lib/server";
import {
  jsonWithError,
  jsonWithSuccess,
  redirectWithSuccess,
} from "remix-toast";
import { AccountDB } from "~/@types/account";
import { AssetFormValues } from "~/@types/assets";
import { authenticator } from "~/service/auth.server";
import { getSession } from "~/service/session.server";

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
  const session = await getSession(request.headers.get("cookie"));
  const user: AccountDB = session.get(authenticator.sessionKey);

  if (request.method === "PUT") {
    const data = await request.formData();
    const formData = getFormData(data);

    const res = await axios.put(`${endpoint}/assets`, {
      formData,
      userId: user.uid,
    });

    return redirectWithSuccess("/assets", res.data.msg);
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
  }

  return redirect("/assets");
}
