import { ActionFunctionArgs } from "@remix-run/node";
import axios, { isAxiosError } from "axios";
import { endpoint } from "lib/server";
import { jsonWithError, jsonWithSuccess } from "remix-toast";
import { getUser } from "utils/account";
import { TransactionFormData } from "~/@types/Transaction";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = getFormData(formData);
  const user = await getUser(request);

  if(!user) throw new Error("Data user tidak ditemukan")

  if (request.method === "PUT") {
    try {
      const res = await axios.put(`${endpoint}/transaction`, data, {
        headers: {
          "User-ID": String(user.uid),
        },
      });

      const response = {
        success: true,
        data: res.data,
      };

      return jsonWithSuccess({ response }, res.data.message);
    } catch (error) {
      if (isAxiosError(error)) {
        const errorValidation = error.response?.data.errors;
        const response = {
          success: false,
          data: errorValidation,
        };

        return jsonWithError({ response }, response.data[0].notifMessage);
      }
    }
  } else if (request.method === "DELETE") {
    const uid = formData.get("transaction-uid");
    const id = formData.get("main-id");

    try {
      const res = await axios.delete(`${endpoint}/transaction`, {
        data: { uid, id },
        headers: {
          "User-ID": String(user.uid),
        },
      });

      return jsonWithSuccess({ data: res.data }, res.data.message);
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error);
      }
    }
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
