import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
  defer,
} from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { ClientOnly } from "remix-utils/client-only";
import Transaction from "./Transaction";
import { endpoint } from "lib/server";
import { authenticator } from "~/service/auth.server";
import { Suspense } from "react";
import { jsonWithError, redirectWithSuccess } from "remix-toast";
import { getUser } from "utils/account";
import { getAssetsPromise } from "utils/server/assets";
import TransactionAddSkeleton from "./TA_Skeleton";
import axios, { isAxiosError } from "axios";
import { BasicHTTPResponse, ErrorValidationResponse } from "~/@types/General";
import { getFormData } from "utils/general";

export const meta: MetaFunction = () => [
  { title: "Tambah Transaksi | Moneyku" },
];

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const assetPromise = getAssetsPromise(request);

  return defer({ assetPromise });
}

// export async function action({ request }: ActionFunctionArgs) {
//   const user = await getUser(request);

//   if (!user) throw new Error("Data user tidak ditemukan");

//   const formData = await request.formData();
//   const typeTransaction = String(formData.get("type-data"));
//   const totalTransaction = Number(formData.get("transaction-total"));
//   const dateTransaction = new Date(String(formData.get("transaction-date")));
//   const categoryTransaction = String(formData.get("transaction-category"));
//   const assetsTransaction = String(formData.get("transaction-assets"));
//   const noteTransaction = String(formData.get("transaction-note"));
//   const price =
//     typeTransaction === "Pemasukan" ? totalTransaction : totalTransaction * -1;

//   const isLocal = process.env.NODE_ENV === "development";
//   const endpoint = isLocal ? serverEndpoint.local : serverEndpoint.production;

//   const res = await fetch(`${endpoint}/transaction/add`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       typeTransaction,
//       totalTransaction,
//       dateTransaction,
//       categoryTransaction,
//       assetsTransaction,
//       noteTransaction,
//       price,
//       userId: user.uid,
//     }),
//   });

//   if (res.status === 422) {
//     const data = await res.json();
//     const errors = data.errors;

//     return jsonWithError({ data: null, errors }, errors[0].notifMessage);
//   }

//   const data = await res.json();

//   if (res.status === 200) {
//     return redirectWithSuccess("/transaction", "Transaksi berhasil ditambah");
//   }

//   return json({ data, errors: null });
// }

export async function action({ request }: ActionFunctionArgs) {
  
  try {
    const user = await getUser(request);
    const formData = await request.formData();
    const data = getFormData.transaction(formData);

    if (!user) throw new Error("Data user tidak ditemukan");

    data.userId = user.uid as string;

    await axios.post(`${endpoint}/transaction/add`, data);

    return redirectWithSuccess("/transaction", "Transaksi berhasil ditambah");
  } catch (error) {
    if (isAxiosError(error)) {
      const data: ErrorValidationResponse[] = error.response?.data.data;
      const message = data[0].notifMessage;

      const response: BasicHTTPResponse<ErrorValidationResponse[]> = {
        message,
        status: "error",
        data,
      };

      return jsonWithError(response, message);
    }

    return jsonWithError(
      {
        message: "Terjadi kesalahan pada server",
        status: "error",
        data: null,
      } as BasicHTTPResponse,
      "Terjadi kesalahan pada server."
    );
  } 
}

export default function AddTransaction() {
  const { assetPromise } = useLoaderData<typeof loader>();

  return (
    <Suspense fallback={<TransactionAddSkeleton />}>
      <Await resolve={assetPromise}>
        {(assetData) => (
          <ClientOnly>
            {() => (
              <>
                <Transaction assetData={assetData.assetData} />
              </>
            )}
          </ClientOnly>
        )}
      </Await>
    </Suspense>
  );
}
