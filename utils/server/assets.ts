import axios from "axios";
import { endpoint } from "lib/server";
import { getUser } from "../account";
import { TransactionType } from "~/@types/Transaction";
import { AssetResponse, AssetsData } from "~/@types/Assets";
import { BasicHTTPResponse } from "~/@types/General";

type ResponseData = {
  assetData: AssetsData[];
  transactionData: TransactionType[];
};

export async function getAssetsPromise(
  request: Request
): Promise<AssetResponse> {
  const user = await getUser(request);
  const res = await axios.get<BasicHTTPResponse<ResponseData>>(
    `${endpoint}/assets/getAssets`,
    {
      params: {
        uid: user.uid as string,
      },
    }
  );

  console.log(res.data)

  if (!res.data.data)
    throw new Error("Terjadi kesalahan saat pengambilan data");

  const assetData: AssetsData[] = res.data.data.assetData;
  const transactionData: TransactionType[] = res.data.data.transactionData;

  return { assetData, transactionData };
}
