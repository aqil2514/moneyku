import { LoaderFunctionArgs, MetaFunction, defer } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { authenticator } from "~/service/auth.server";
import AssetsSkeleton from "./Core/Skeleton";
import { getDataPromise } from "utils/server/fetcher";
import AssetsProvider from "./Core/MainProvider";

export const meta: MetaFunction = () => [
  {
    title: "Asset | Moneyku",
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const data = getDataPromise(request);

  return defer({ data });
}

export default function AssetsPromise() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <Suspense fallback={<AssetsSkeleton />}>
      <Await errorElement={<p>Terjadi kesalahan</p>} resolve={data}>
        {(data) => (
          <AssetsProvider
            accountsData={data.data!.accounts}
            transactionsData={data.data!.transaction}
            categoriesData={data.data!.categories}
          />
        )}
      </Await>
    </Suspense>
  );
}
