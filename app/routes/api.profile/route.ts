import { ActionFunctionArgs } from "@remix-run/node";
import axios, { isAxiosError } from "axios";
import { endpoint } from "lib/server";
import { jsonWithError, jsonWithSuccess } from "remix-toast";
import { AccountUser } from "~/@types/Auth";
import { LoginResult } from "~/@types/General";
import { authenticator } from "~/service/auth.server";
import { commitSession, getSession } from "~/service/session.server";

type AccountProfile = Omit<AccountUser, "privacy" | "statusFlags">;

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = getFormData(formData);

  try {
    const res = await axios.put(`${endpoint}/account`, data);
    const message = "Profil akun berhasil diubah";

    const session = await getSession(request.headers.get("cookie"));
    const newUser: AccountUser = res.data.data;
    const newSession: LoginResult = {
      success: true,
      message,
      user: newUser,
    };

    session.set(authenticator.sessionKey, newSession);
    const cookie = await commitSession(session);

    return jsonWithSuccess({ data: res.data, errors: null, message }, message, {
      headers: {
        "Set-Cookie": cookie,
      },
    });
  } catch (error) {
    if (isAxiosError(error)) {
      const message = error.response?.data.message;
      const errors = error.response?.data.error;
      return jsonWithError({ data: null, errors, notifMessage: message, message }, message);
    }
  }
}

function getFormData(data: FormData) {
  const result: AccountProfile = {
    uid: String(data.get("user-id")),
    username: String(data.get("username")),
    email: String(data.get("email")),
    config: {
      currency: data.get("asset-category") as AccountUser["config"]["currency"],
      language: data.get(
        "languagePreference"
      ) as AccountUser["config"]["language"],
      purposeUsage: data.get(
        "purposeUsage"
      ) as AccountUser["config"]["purposeUsage"],
    },
  };

  return result;
}
