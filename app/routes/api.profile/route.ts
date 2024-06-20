import { ActionFunctionArgs } from "@remix-run/node";
import axios, { isAxiosError } from "axios";
import { endpoint } from "lib/server";
import { jsonWithError, jsonWithSuccess } from "remix-toast";
import { AccountUser } from "~/@types/account";

type AccountProfile = Omit<AccountUser, "privacy">;

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = getFormData(formData);

  try{
    const res = await axios.put(`${endpoint}/account`, data);
    const message = "Profil akun berhasil diubah"
    return jsonWithSuccess({data:res.data, errors:null, message}, message);
  }catch(error){
    if(isAxiosError(error)){
        const message = error.response?.data.error[0].notifMessage
        const errors = error.response?.data.error
        return jsonWithError({data:null, errors, message}, message)
    }
  }

}

function getFormData(data: FormData) {
  const result: AccountProfile = {
    uid: String(data.get("user-id")),
    username: String(data.get("username")),
    email: String(data.get("email")),
    config: {
      currency: data.get("asset-category") as AccountUser["config"]["currency"],
      language: data.get(
        "languagePreference"
      ) as AccountUser["config"]["language"],
      purposeUsage: data.get(
        "purposeUsage"
      ) as AccountUser["config"]["purposeUsage"],
    },
  };

  return result;
}
