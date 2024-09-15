import axios from "axios";
import { endpoint } from "lib/server";
import { getUser } from "./account";
import { BasicHTTPResponse } from "~/@types/General";
import { Accounts, Category } from "~/@types/Assets-Experimental";
import { Transaction } from "~/@types/Transaction-Experimental";

interface AssetsResponse {
  accounts: Accounts[];
  categories: Category[];
  transactions: Transaction[];
}

export async function getAssetsPromise(
  request: Request
): Promise<AssetsResponse> {
  const user = await getUser(request);
  const res = await axios.get<BasicHTTPResponse<AssetsResponse>>(
    `${endpoint}/assets/getAssets`,
    {
      params: {
        uid: user.uid as string,
      },
    }
  );

  if (!res.data.data)
    throw new Error("Terjadi kesalahan saat pengambilan data");

  const accounts: Accounts[] = res.data.data.accounts;
  const transactions: Transaction[] = res.data.data.transactions;
  const categories: Category[] = res.data.data.categories;

  const data:AssetsResponse = { accounts, transactions, categories }

  return data;
}
