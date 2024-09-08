import { LoaderFunctionArgs, MetaFunction, defer } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { getAssetsPromise } from "utils/server/assets";
import { authenticator } from "~/service/auth.server";
import Assets from "./Assets";
import AssetsSkeleton from "./A_Skeleton";

export const meta: MetaFunction = () => [
  {
    title: "Asset | Moneyku",
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const data = getAssetsPromise(request);

  return defer({ data });
}

export default function AssetsPromise() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <Suspense fallback={<AssetsSkeleton />}>
      <Await errorElement={<p>Terjadi kesalahan</p>} resolve={data}>
        {(data) => (
          <Assets
            assetData={data.assetData}
            transactionData={data.transactionData}
          />
        )}
      </Await>
    </Suspense>
  );
}
