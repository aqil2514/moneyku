import axios from "axios";
import { endpoint } from "lib/server";
import { getUser } from "utils/server/account";
import { makeHttpResponse } from "utils/server/http";
import { BasicHTTPResponse, GeneralDataResponse } from "~/@types/General";

export async function getTransactionPromise(request: Request) {
  const user = await getUser(request);

  console.log(user.uid);

  const res = await axios.get<BasicHTTPResponse<GeneralDataResponse>>(
    `${endpoint}/transaction`,
    {
      headers: { "User-ID": String(user.uid) },
    }
  );

  if (!res.data.data) {
    throw new Error("Data transaksi tidak ada");
  }
  const resData = res.data.data;

  console.log(resData);

  const response = makeHttpResponse.success<typeof resData>(
    "Ambil data sukses",
    resData
  );

  return response;
}
