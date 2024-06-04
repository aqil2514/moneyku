import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import { endpoint } from "lib/server";
import { AccountUser } from "~/@types/account";
import { AssetsData } from "~/@types/assets";
import { authenticator } from "~/service/auth.server";
import { getSession } from "~/service/session.server";
import { ClientOnly } from "remix-utils/client-only";
import MainPage from "./main";
import { createContext, useContext } from "react";

export const meta: MetaFunction = () => [
  {
    title: "Asset | Moneyku",
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const session = await getSession(request.headers.get("cookie"));
  const user: AccountUser = session.get(authenticator.sessionKey);

  const res = await axios.get(`${endpoint}/assets/getAssets`, {
    params: {
      uid: user.uid as string,
    },
  });

  const assetData: AssetsData[] = res.data.assetData;

  return json({ assetData });
}

interface AssetContextType {
  assetData: AssetsData[];
}

const AssetContext = createContext<AssetContextType>({} as AssetContextType);

export default function Assets() {
  const { assetData } = useLoaderData<typeof loader>();
  return (
    <ClientOnly>
      {() => (
        <AssetContext.Provider value={{ assetData }}>
          <MainPage />
        </AssetContext.Provider>
      )}
    </ClientOnly>
  );
}

export function useAssetContext() {
  return useContext(AssetContext);
}
