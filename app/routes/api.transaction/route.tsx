import { ActionFunctionArgs, json } from "@remix-run/node";
import axios from "axios";
import serverEndpoint from "lib/server";
import { TransactionFormData } from "~/@types/transaction";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = getFormData(formData);

  if (request.method === "PUT") {
    const res = await axios.put(`${serverEndpoint.production}/transaction`, data);

    return json({ message: res.data.message });
  } else if (request.method === "DELETE") {
    const uid = formData.get("transaction-uid");
    const id = formData.get("main-id");

    const res = await axios.delete(`${serverEndpoint.production}/transaction`, {
      data: { uid, id },
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
    typeTransaction:
      Number(formData.get("transaction-total")) < 0
        ? "Pengeluaran"
        : "Pemasukan",
  };
  return result;
}
