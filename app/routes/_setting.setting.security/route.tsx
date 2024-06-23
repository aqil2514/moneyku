import Typography from "components/General/Typography";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
  json,
} from "@remix-run/node";

import { jsonWithError, redirectWithSuccess } from "remix-toast";
import { getUser } from "utils/account";
import axios, { isAxiosError } from "axios";
import { endpoint } from "lib/server";
import { BasicHTTPResponse } from "~/@types/general";
import { commitSession, getSession } from "~/service/session.server";
import { useLoaderData } from "@remix-run/react";
import DataVisible from "./SS_DataVisible";
import UnvisibleData from "./SS_DataUnvisible";

export const meta: MetaFunction = () => [{ title: "Keamanan | Moneyku" }];

export async function loader({ request }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url);
  const sessionDelete = searchParams.get("sessionDelete");
  const session = await getSession(request.headers.get("Cookie"));

  if (sessionDelete && sessionDelete === "delete") {
    session.unset("securityVerified");
    const headers = new Headers({
      "Set-Cookie": await commitSession(session),
    });
    return redirectWithSuccess(
      "/setting/security",
      "Session berhasil dihapus",
      { headers }
    );
  }

  const securityVerified = session.get("securityVerified");

  return json({ securityVerified });
}

export async function action({ request }: ActionFunctionArgs) {
  const user = await getUser(request);
  const formData = await request.formData();

  const securityOption = formData.get("security-option");
  const password = formData.get("password");
  const securityAnswer = formData.get("securityAnswer");

  const clientData = {
    securityAnswer,
    password,
    securityOption,
    uid: user.uid,
  };

  try {
    const { data } = await axios.post<BasicHTTPResponse>(
      `${endpoint}/setting/security`,
      clientData
    );

    const session = await getSession(request.headers.get("Cookie"));
    session.set("securityVerified", true);
    const headers = new Headers({ "Set-Cookie": await commitSession(session) });

    return redirectWithSuccess("/setting/security", data.message, { headers });
  } catch (error) {
    if (isAxiosError(error)) {
      const data: BasicHTTPResponse = error.response?.data;
      return jsonWithError({ data }, data.message);
    }
  }

  // TODO : Lanjutin nanti
  // TODO : Gimana kalo user loginnya pakek email? Kan awalnya ga ada password tuh
  // TODO : Gimana kalo clientnnya lupa password?
}

export default function Security() {
  const { securityVerified } = useLoaderData<typeof loader>();

  return (
    <div id="setting-page-security">
      <Typography variant="h1" family="merriweather-bold">
        Keamanan
      </Typography>

      {securityVerified ? <DataVisible /> : <UnvisibleData />}
    </div>
  );
}
