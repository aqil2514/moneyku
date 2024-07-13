import { defer, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { ClientOnly } from "remix-utils/client-only";
import { authenticator } from "~/service/auth.server";
import { getStatisticPromise } from "utils/server/statistic";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import Skeleton from "./Skeleton";
import StatisticProvider from "./Providers/StatisticProvider";
import StatisticMain from "./S_Main";

export const meta: MetaFunction = () => [
  {
    title: "Statistik | Moneyku",
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  authenticator.isAuthenticated(request, { failureRedirect: "/login" });

  const chartData = getStatisticPromise(request);

  return defer({ data: chartData });
}

export default function StatisticRoute() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <Suspense fallback={<Skeleton />}>
      <Await resolve={data}>
        {(data) => (
          <StatisticProvider data={data}>
            <ClientOnly>{() => <StatisticMain />}</ClientOnly>
            {/* <ClientOnly>{() => <Skeleton />}</ClientOnly> */}
          </StatisticProvider>
        )}
      </Await>
    </Suspense>
  );
}
