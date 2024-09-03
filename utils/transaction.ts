import { getUser } from "./account";
import { endpoint } from "lib/server";
import axios from "axios";
import { Transaction } from "~/@types/Transaction-Experimental";
import { BasicHTTPResponse } from "~/@types/General";
import { makeHttpResponse } from "./server/http";

// export async function getTransactionPromise(request:Request):Promise<TransactionDataResponse>{
//     const user = await getUser(request);

//     try {
//         const res = await fetch(`${endpoint}/transaction`, {
//           headers: { "User-ID": String(user.uid) },
//         });

//         const resData = await res.json();

//         if (!resData.success) {
//           return { data: [], user, success: false };
//         }

//         const data: TransactionType[] = resData.data;

//         return { data, user, success: true };
//       } catch (error) {
//         console.error("Failed to fetch data:", error);
//         return { data: [], user, success: false, status: 500 };
//       }
// }

export async function getTransactionPromise(request: Request) {
  const user = await getUser(request);

  try {
    const res = await axios.get<BasicHTTPResponse<Transaction[]>>(`${endpoint}/transaction`, {
      headers: { "User-ID": String(user.uid) },
    });

    const data = res.data.data;

    if(!data){
      throw new Error("Data transaksi tidak ada");
    }

    const response = makeHttpResponse.success<Transaction[]>("Ambil data sukses", data);

    return response;
  } catch (error) {
    const response = makeHttpResponse.error<Transaction[]>("Ambil data gagal", []);
    return response;
  }
}
