import { ActionFunctionArgs } from "@remix-run/node";
import { jsonWithError, jsonWithSuccess } from "remix-toast";
import { getUser } from "utils/account";
import { getDataForm } from "./security-utils";
import axios, { isAxiosError } from "axios";
import { endpoint } from "lib/server";
import { BasicHTTPResponse, LoginResult } from "~/@types/General";
import { AccountDB, AccountUser } from "~/@types/Account";
import { commitSession, getSession } from "~/service/session.server";
import { authenticator } from "~/service/auth.server";


export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const user = await getUser(request);
  const securityFormData = getDataForm(formData, user);

  try {
    const { data } = await axios.put<BasicHTTPResponse<AccountDB>>(
      `${endpoint}/account/security`,
      securityFormData
    );

    const user:AccountUser = data.data as AccountUser;

    const newSession: LoginResult = {
      success: true,
      message: data.message,
      user: user,
    };

    const session = await getSession(request.headers.get("cookie"));
    session.set(authenticator.sessionKey, newSession);
    session.unset("securityVerified");
    const headers = new Headers({
      "Set-Cookie": await commitSession(session),
    });

    return jsonWithSuccess({ data }, data.message, { headers });
  } catch (error) {
    if (isAxiosError(error)) {
      const data: BasicHTTPResponse = error.response?.data;
      return jsonWithError({ data }, data.message);
    }
  }
}
