import { getUser } from "./account";
import { endpoint } from "lib/server";
import axios from "axios";
import { BasicHTTPResponse, GeneralDataResponse } from "~/@types/General";
import { makeHttpResponse } from "./server/http";

export async function getTransactionPromise(request: Request) {
  const user = await getUser(request);

  try {
    const { data } = await axios.get<BasicHTTPResponse<GeneralDataResponse>>(
      `${endpoint}/get-data/all`,
      {
        headers: { "User-ID": String(user.uid) },
      }
    );

    if (!data.data) {
      throw new Error("Data transaksi tidak ada");
    }
    const resData = data.data;

    const response = makeHttpResponse.success<typeof resData>(
      "Ambil data sukses",
      resData
    );

    return response;
  } catch (error) {
    throw new Error("Terjadi Kesalahan")
  }
}
