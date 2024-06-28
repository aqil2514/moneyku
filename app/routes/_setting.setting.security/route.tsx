import Typography from "components/General/Typography";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
  json,
} from "@remix-run/node";

import {
  jsonWithError,
  jsonWithSuccess,
  redirectWithSuccess,
} from "remix-toast";
import { getUser } from "utils/account";
import axios, { isAxiosError } from "axios";
import { endpoint } from "lib/server";
import { BasicHTTPResponse } from "~/@types/general";
import { commitSession, getSession } from "~/service/session.server";
import { useLoaderData } from "@remix-run/react";
import DataVisible from "./SS_DataVisible";
import UnvisibleData from "./SS_DataUnvisible";
import { CD_SettingSecurityCore, securityOptionState } from "~/@types/setting";

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
    return redirectWithSuccess("/setting/security", "Session berhasil dihapus", {
      headers,
    });
  }

  const securityVerified:boolean = session.get("securityVerified");

  return json({ securityVerified });
}

export async function action({ request }: ActionFunctionArgs) {
  const user = await getUser(request);
  const formData = await request.formData();

  const securityOption = formData.get("security-option") as securityOptionState;
  const password = formData.get("password") as string;
  const securityAnswer = formData.get("securityAnswer") as string;

  const clientData: CD_SettingSecurityCore = {
    cta: "verify-security",
    securityOption,
    securityData: {
      oldPassword: password,
      securityAnswer,
    },
    uid: user.uid as string,
  };

  try {
    const { data } = await axios.post<BasicHTTPResponse>(
      `${endpoint}/setting/security`,
      clientData
    );

    const session = await getSession(request.headers.get("Cookie"));
    session.set("securityVerified", true);
    const headers = new Headers({ "Set-Cookie": await commitSession(session) });

    return jsonWithSuccess({ data }, data.message, { headers });
  } catch (error) {
    if (isAxiosError(error)) {
      const data: BasicHTTPResponse = error.response?.data;
      console.error(error);
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
