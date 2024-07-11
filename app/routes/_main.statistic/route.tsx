import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { ClientOnly } from "remix-utils/client-only";
import Statistic from "./Statistic";
import { authenticator } from "~/service/auth.server";
import { getStatisticPromise } from "utils/server/statistic";
import { useLoaderData } from "@remix-run/react";
import { createContext, useContext } from "react";
import { ChartData } from "~/@types/Statistic";

export const meta: MetaFunction = () => [
  {
    title: "Statistik | Moneyku",
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  authenticator.isAuthenticated(request, { failureRedirect: "/login" });

  const chartData = await getStatisticPromise(request);

  return json(chartData);
}

interface StatisticContextProps {
  data: ChartData[];
}

const StatisticContext = createContext<StatisticContextProps>(
  {} as StatisticContextProps
);

export const useStatisticData = () => {
  return useContext(StatisticContext);
}

export default function StatisticRoute() {
  const data = useLoaderData<typeof loader>();
  return (
    <StatisticContext.Provider value={{ data }}>
      <ClientOnly>{() => <Statistic />}</ClientOnly>
    </StatisticContext.Provider>
  );
} 