import { LoaderFunctionArgs, MetaFunction, defer } from "@remix-run/node";
import { getUser } from "utils/account";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense, useContext } from "react";
import { authenticator } from "~/service/auth.server";
import Transactions from "./Transactions";
import { getTransactionPromise } from "utils/transaction";
import { TransactionDataResponse } from "~/@types/transaction";

export const meta: MetaFunction = () => [
  {
    title: "Transaksi | Moneyku",
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, { failureRedirect: "/login" });

  const transactionPromise = getTransactionPromise(request).then(
    (data) => new Promise((resolve) => setTimeout(() => resolve(data), 3000))
  ) as Promise<TransactionDataResponse>;
  const user = await getUser(request);

  return defer({
    data: transactionPromise,
    user,
  });
}

export default function TransactionRoute() {
  const { user, data } = useLoaderData<typeof loader>();
  console.log(user);
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Await resolve={data}>
        {(data) => <Transactions data={data.data} />}
      </Await>
    </Suspense>
  );
}

export function useTransactionData() {
  return useContext(TransactionContext);
}
