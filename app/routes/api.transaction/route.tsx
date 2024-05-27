import { ActionFunctionArgs, json } from "@remix-run/node";
import axios, { isAxiosError } from "axios";
import { endpoint } from "lib/server";
import { jsonWithError, jsonWithSuccess } from "remix-toast";
import { AccountDB } from "~/@types/account";
import { TransactionFormData } from "~/@types/transaction";
import { authenticator } from "~/service/auth.server";
import { getSession } from "~/service/session.server";

// TODO: Eror handling di sini belum diatur

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = getFormData(formData);

  const session = await getSession(request.headers.get("cookie"));
  const user: AccountDB = session.get(authenticator.sessionKey);

  if (request.method === "PUT") {
    try {
      const res = await axios.put(`${endpoint}/transaction`, data, {
        headers: {
          "User-ID": String(user.uid),
        },
      });
  
      return jsonWithSuccess( {data: res.data}, res.data.message);
      
    } catch (error) {
      if(isAxiosError(error)){
        return jsonWithError(error, "error woi")
      }
    }
  } else if (request.method === "DELETE") {
    const uid = formData.get("transaction-uid");
    const id = formData.get("main-id");

    const res = await axios.delete(`${endpoint}/transaction`, {
      data: { uid, id },
      headers: {
        "User-ID": String(user.uid),
      },
    });
    return json({ message: res.data.message });
  }
};

function getFormData(formData: FormData) {
  const result: TransactionFormData = {
    idTransaction: String(formData.get("main-id")),
    uidTransaction: String(formData.get("transaction-uid")),
    dateTransaction: new Date(String(formData.get("transaction-date"))),
    totalTransaction: Number(formData.get("transaction-total")),
    categoryTransaction: String(formData.get("transaction-category")),
    assetsTransaction: String(formData.get("transaction-assets")),
    noteTransaction: String(formData.get("transaction-note")),
    typeTransaction: String(
      formData.get("transaction-type")
    ) as TransactionFormData["typeTransaction"],
  };
  return result;
}
