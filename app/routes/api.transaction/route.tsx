import { ActionFunctionArgs } from "@remix-run/node";
import { getUser } from "utils/server/account";
import { removeCurrencyFormat } from "utils/general";
import {
  Transaction,
  TransactionAddFormData,
  TypeTransaction,
} from "~/@types/Transaction";
import {
  ApiHandler,
  BasicHTTPResponse,
  FormValidation,
  FormValidationError,
  MethodRequest,
} from "~/@types/General";
import { z } from "zod";
import axios from "axios";
import { endpoint } from "lib/server";
import chalk from "chalk";
import { jsonWithError, jsonWithSuccess } from "remix-toast";

const log = console.log;

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await getUser(request);
  const method = request.method as MethodRequest;

  if (!user) throw new Error("Data user tidak ditemukan");

  try{
    const response = await apiHandler[method]({ request }) as BasicHTTPResponse<Transaction, FormValidation>;
    if(response.status === "error"){
      return jsonWithError(response, response.message)
    }

    return jsonWithSuccess(response, response.message)
  }
  catch(error){
    console.error("Error komunikasi dengan server:", error);
    throw new Error("Gagal komunikasi dengan server");
  }
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

async function postHandler({ request }: { request: Request }):Promise<BasicHTTPResponse<Transaction, FormValidation>>  {
  const user = await getUser(request);
  const formData = await request.formData();
  const data = getFormData(formData, user.uid as string);

  const validation = await validateTransactionData(data);
  const isValidationSucces =
    validation.errors && validation.errors.length === 0;

  if (!isValidationSucces) {
    const responseData: BasicHTTPResponse<
      Transaction,
      FormValidation
    > = {
      status: "error",
      message: validation.errors![0].notifMessage,
      errors: validation,
    };

    return responseData;
  }

  try {
    log(chalk.bgWhite.black("Komunikasi dengan server..."));
    const serverResponse = await axios.post<BasicHTTPResponse<Transaction>>(
      `${endpoint}/transaction`,
      data
    );

    log(chalk.bgGreenBright.green("Komunikasi dengan server berhasil!"));

    const responseData: BasicHTTPResponse<Transaction, FormValidation> = {
      status: "success",
      message: "Data transaksi berhasil dibuat",
      data: serverResponse.data.data,
    };

    log(chalk.bgCyan.blue("Data transaksi berhasil dibuat"));

    return responseData;
  } catch (error) {
    console.error("Error komunikasi dengan server:", error);
    throw new Error("Gagal komunikasi dengan server");
  }
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
  noteTransaction: z.string().min(1, "Nama transaksi tidak boleh kosong."),
  totalTransaction: z.number().positive("Total transaksi harus lebih dari 0."),
  categoryTransaction: z.string().min(1, "Kategori transaksi harus diisi."),
  fromAsset: z.string().min(1, "Aset sumber harus diisi."),
  toAsset: z.string().min(1, "Aset tujuan harus diisi."),
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

//Sengaja ga dihapus kemungkinan masih kepakek

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
