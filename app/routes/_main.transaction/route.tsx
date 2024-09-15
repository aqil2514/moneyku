import { LoaderFunctionArgs, MetaFunction, defer } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { authenticator } from "~/service/auth.server";
import Transactions from "./main";
import { getTransactionPromise } from "utils/transaction";
import TransactionSkeleton from "./Skeleton";
import { GeneralDataResponse } from "~/@types/General";

export const meta: MetaFunction = () => [
  {
    title: "Transaksi | Moneyku",
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, { failureRedirect: "/login" });

  const transactionPromise = getTransactionPromise(request);

  return defer({
    transactionPromise,
  });
}

export default function TransactionRoute() {
  const { transactionPromise: data } = useLoaderData<typeof loader>();

  return (
    <Suspense fallback={<TransactionSkeleton />}>
      <Await resolve={data}>
        {(resData) => {
          return <Transactions data={resData.data as GeneralDataResponse} />;
        }}
      </Await>
    </Suspense>
  );
}
