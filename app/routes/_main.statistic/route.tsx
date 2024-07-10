import { MetaFunction } from "@remix-run/node";
import { ClientOnly } from "remix-utils/client-only";
import Statistic from "./Statistic";

export const meta: MetaFunction = () => [
  {
    title: "Statistik | Moneyku",
  },
];

export default function Transaction() {
    return (
        <ClientOnly>
            {() => <Statistic /> }
        </ClientOnly>
  );
}
