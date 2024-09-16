import { LoaderFunctionArgs, MetaFunction, defer } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { authenticator } from "~/service/auth.server";
import TransactionSkeleton from "./Core/Skeleton";
import { GeneralDataResponse } from "~/@types/General";
import { getDataPromise } from "utils/server/fetcher";
import TransactionProvider from "./Core/MainProvider";

export const meta: MetaFunction = () => [
  {
    title: "Transaksi | Moneyku",
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, { failureRedirect: "/login" });

  const dataPromise = getDataPromise(request);

  return defer({
    dataPromise,
  });
}

export default function TransactionRoute() {
  const { dataPromise: data } = useLoaderData<typeof loader>();

  return (
    <Suspense fallback={<TransactionSkeleton />}>
      <Await resolve={data}>
        {(resData) => {
          return <TransactionProvider data={resData.data as GeneralDataResponse} />;
        }}
      </Await>
    </Suspense>
  );
}
