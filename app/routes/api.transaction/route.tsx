import { ActionFunctionArgs } from "@remix-run/node";
import { jsonWithSuccess } from "remix-toast";
import { getUser } from "utils/server/account";
import { removeCurrencyFormat } from "utils/general";
import {
  TransactionAddFormData,
  TypeTransaction,
} from "~/@types/Transaction";

export const action = async ({ request }: ActionFunctionArgs) => {
  // const formData = await request.formData();
  // const data = getFormData(formData);
  const user = await getUser(request);
  const method = request.method;

  if (!user) throw new Error("Data user tidak ditemukan");

  if (method === "POST") return apiHandler[method]({ request });

  // if (request.method === "PUT") {
  //   try {
  //     const res = await axios.put(`${endpoint}/transaction`, data, {
  //       headers: {
  //         "User-ID": String(user.uid),
  //       },
  //     });

  //     const response = {
  //       success: true,
  //       data: res.data,
  //     };

  //     return jsonWithSuccess({ response }, res.data.message);
  //   } catch (error) {
  //     if (isAxiosError(error)) {
  //       const errorValidation = error.response?.data.errors;
  //       const response = {
  //         success: false,
  //         data: errorValidation,
  //       };

  //       return jsonWithError({ response }, response.data[0].notifMessage);
  //     }
  //   }
  // } else if (request.method === "DELETE") {
  //   const uid = formData.get("transaction-uid");
  //   const id = formData.get("main-id");

  //   try {
  //     const res = await axios.delete<BasicHTTPResponse>(
  //       `${endpoint}/transaction`,
  //       {
  //         data: { uid, id },
  //         headers: {
  //           "User-ID": String(user.uid),
  //         },
  //       }
  //     );

  //     return jsonWithSuccess({ data: res.data }, res.data.message);
  //   } catch (error) {
  //     if (isAxiosError(error)) {
  //       console.error(error);
  //     }
  //   }
  // }
};

const apiHandler = {
  POST: async ({ request }: { request: Request }) => postHandler({ request }),
};

async function postHandler({ request }: { request: Request }) {
  const user = await getUser(request);
  const formData = await request.formData();
  const data = getFormData(formData, user.uid as string);

  console.log(data);
  return jsonWithSuccess({ data: "OK" }, "OK");
}

/* Ambil semua data yang telah diisi dari client side */
const getFormData = (formData: FormData, userId: string) => {
  const data: TransactionAddFormData = {
    userId,
    typeTransaction: formData.get("typeTransaction") as TypeTransaction,
    dateTransaction: new Date(String(formData.get("dateTransaction"))),
    billTransaction: Number(formData.get("billTransaction")),
    categoryTransaction: String(formData.get("categoryTransaction")),
    fromAsset: String(formData.get("fromAsset")),
    toAsset: String(formData.get("toAsset")),
    noteTransaction: String(formData.get("noteTransaction")),
    totalTransaction: removeCurrencyFormat(
      String(formData.get("totalTransaction"))
    ),
    descriptionTransaction: String(formData.get("descriptionTransaction")),
  };

  return data;
};
