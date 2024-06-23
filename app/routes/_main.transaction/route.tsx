import { LoaderFunctionArgs, MetaFunction, defer } from "@remix-run/node";
import { getUser } from "utils/account";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { authenticator } from "~/service/auth.server";
import Transactions from "./Transactions";
import { getTransactionPromise } from "utils/transaction";
import { TransactionDataResponse } from "~/@types/transaction";
import TransactionSkeleton from "./T_Skeleton";

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
  const { data } = useLoaderData<typeof loader>();
  return (
    <Suspense fallback={<TransactionSkeleton />}>
      <Await resolve={data}>
        {(data) => <Transactions data={data.data} />}
      </Await>
    </Suspense>
  );
}

