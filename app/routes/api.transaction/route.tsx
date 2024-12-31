import { ActionFunctionArgs } from "@remix-run/node";
import { jsonWithError, jsonWithSuccess } from "remix-toast";
import { getUser } from "utils/server/account";
import { removeCurrencyFormat } from "utils/general";
import { TransactionAddFormData, TypeTransaction } from "~/@types/Transaction";
import {
  ApiHandler,
  BasicHTTPResponse,
  FormValidation,
  FormValidationError,
  MethodRequest,
} from "~/@types/General";
import { z } from "zod";

export const action = async ({ request }: ActionFunctionArgs) => {
  // const formData = await request.formData();
  // const data = getFormData(formData);
  const user = await getUser(request);
  const method = request.method as MethodRequest;

  if (!user) throw new Error("Data user tidak ditemukan");

  return await apiHandler[method]({ request });

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

// **********************
// **********************
// API HANDLER AREA START
// **********************
// **********************

const apiHandler: ApiHandler = {
  POST: async ({ request }) => postHandler({ request }),
  PUT: async ({ request }) => postHandler({ request }),
  GET: async ({ request }) => postHandler({ request }),
  DELETE: async ({ request }) => postHandler({ request }),
};

async function postHandler({ request }: { request: Request }) {
  const user = await getUser(request);
  const formData = await request.formData();
  const data = getFormData(formData, user.uid as string);

  const validation = await validateTransactionData(data);
  const isValidationSucces =
    validation.errors && validation.errors.length === 0;

  if (!isValidationSucces) {
    const responseData: BasicHTTPResponse<
      TransactionAddFormData,
      FormValidation
    > = {
      status: "error",
      message: validation.errors![0].notifMessage,
      errors: validation,
    };

    return jsonWithError(responseData, validation.errors![0].notifMessage);
  }

  const responseData: BasicHTTPResponse<
    TransactionAddFormData,
    FormValidation
  > = {
    status: "success",
    message: "Tambah data berhasil",
    data,
  };

  return jsonWithSuccess(responseData, responseData.message);
}

// **********************
// **********************
// API HANDLER AREA END
// **********************
// **********************

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

const transactionSchema = z.object({
  userId: z.string().min(1, "User ID tidak boleh kosong."),
  typeTransaction: z.string().min(1, "Jenis transaksi harus diisi."),
  dateTransaction: z.date({ message: "Tanggal tidak Valid" }),
  totalTransaction: z.number().positive("Total transaksi harus lebih dari 0."),
  categoryTransaction: z.string().min(1, "Kategori transaksi harus diisi."),
  noteTransaction: z.string().min(1, "Catatan transaksi tidak boleh kosong."),
  fromAsset: z.string().min(1, "Aset sumber harus diisi."),
  toAsset: z.string().min(1, "Aset tujuan harus diisi."),
  descriptionTransaction: z
    .string()
    .min(1, "Deskripsi transaksi tidak boleh kosong."),
});

const validateTransactionData = async (
  formData: TransactionAddFormData
): Promise<FormValidation<TransactionAddFormData>> => {
  const validation = await transactionSchema.spa(formData);
  const result: FormValidation<TransactionAddFormData> = {
    succes: false,
    errors: [],
  };

  // Jika validasinya sukses, errornya ada 0 atau tidak ada
  if (validation.success) return result;
  const issues = validation.error.issues;

  for (const issue of issues) {
    const error: FormValidationError = {
      fieldName: String(issue.path[0]),
      message: `${issue.code} : ${issue.message}`,
      notifMessage: issue.message,
    };

    result.errors!.push(error);
  }

  return result;
};
