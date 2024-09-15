import { endpoint } from "lib/server";
import axios from "axios";
import { BasicHTTPResponse, GeneralDataResponse } from "~/@types/General";
import { getUser } from "utils/account";
import { makeHttpResponse } from "./http";

type GeneralEndpointParameter = "all" | "transaction" | "asset";

// Ini nanti ubah agar jadi general promise
export async function getDataPromise(
  request: Request,
  parameter: GeneralEndpointParameter = "all"
) {
  const user = await getUser(request);

  try {
    const { data } = await axios.get<BasicHTTPResponse<GeneralDataResponse>>(
      `${endpoint}/get-data/${parameter}`,
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
    throw new Error("Terjadi Kesalahan");
  }
}
