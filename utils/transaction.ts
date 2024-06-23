import { TransactionDataResponse, TransactionType } from "~/@types/transaction";
import { getUser } from "./account";
import { endpoint } from "lib/server";

export async function getTransactionPromise(request:Request):Promise<TransactionDataResponse>{
    const user = await getUser(request);

    try {
        const res = await fetch(`${endpoint}/transaction`, {
          headers: { "User-ID": String(user.uid) },
        });
    
        const resData = await res.json();
    
        if (!resData.success) {
          return { data: [], user, success: false };
        }
    
        const data: TransactionType[] = resData.data;
    
        return { data, user, success: true };
      } catch (error) {
        console.error("Failed to fetch data:", error);
        return { data: [], user, success: false, status: 500 };
      }
}