import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import { endpoint } from "lib/server";
import { AccountUser } from "~/@types/account";
import { AssetsData } from "~/@types/assets";
import { authenticator } from "~/service/auth.server";
import { getSession } from "~/service/session.server";
import { currencyFormat } from "../transaction/route";

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

export default function Assets() {
  const { assetData } = useLoaderData<typeof loader>();
  return (
    <div className="main-page">
      <h1 className="font-playfair-bold title-page">Aset</h1>
      <div id="asset-container">
        {assetData.map((d) => (
          <div key={d.name} className="item-container">
            <p className="font-poppins-semibold">{d.name}</p>
            <hr />
            <p className="font-poppins-medium">
              {currencyFormat.format(d.amount)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
