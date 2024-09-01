import { LoaderFunctionArgs, MetaFunction, defer } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { authenticator } from "~/service/auth.server";
import Transactions from "./main";
import { getTransactionPromise } from "utils/transaction";
import TransactionSkeleton from "./Skeleton";

export const meta: MetaFunction = () => [
  {
    title: "Transaksi | Moneyku",
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, { failureRedirect: "/login" });

  const transactionPromise = getTransactionPromise(request);

  return defer({
    data: transactionPromise,
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

