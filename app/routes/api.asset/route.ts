import { ActionFunctionArgs, redirect } from "@remix-run/node";
import axios from "axios";
import { endpoint } from "lib/server";
import { redirectWithSuccess } from "remix-toast";
import { AccountDB } from "~/@types/account";
import { AssetFormValues } from "~/@types/assets";
import { authenticator } from "~/service/auth.server";
import { getSession } from "~/service/session.server";

const getFormData = (formData: FormData): AssetFormValues => {
  const formValues: AssetFormValues = {
    oldAssetName: formData.get("old-asset-name") as string,
    assetName: formData.get("asset-name") as string,
    assetNominal: Number(formData.get("asset-nominal")),
    assetCategory: formData.get("asset-category") as string,
    newAssetCategory: formData.get("new-asset-category") as string,
    assetDescription: formData.get("asset-description") as string,
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

    return redirectWithSuccess("/assets", res.data.msg)
    } else if(request.method === "DELETE"){
    const formData = await request.formData();
    const assetName = String(formData.get("asset-name"));

    const res = await axios.delete(`${endpoint}/assets?asset-name=${assetName}&user-id=${user.uid}`)
      
      return redirectWithSuccess("/assets", res.data.msg)
  }

  return redirect("/assets");
}
