import axios from "axios";
import { endpoint } from "lib/server";
import { getUser } from "../account";
import { TransactionType } from "~/@types/Transaction";
import { AssetResponse, AssetsData } from "~/@types/Assets";

export async function getAssetsPromise(request: Request):Promise<AssetResponse>{
    const user = await getUser(request);
    const res = await axios.get(`${endpoint}/assets/getAssets`, {
        params: {
          uid: user.uid as string,
        },
      });
    
      const assetData: AssetsData[] = res.data.assetData;
      const transactionData: TransactionType[] = res.data.transactionData;

      return {assetData, transactionData}
}
