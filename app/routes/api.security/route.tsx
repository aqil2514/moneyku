import { ActionFunctionArgs } from "@remix-run/node";
import axios, { isAxiosError } from "axios";
import { endpoint } from "lib/server";
import { jsonWithError, jsonWithInfo, jsonWithSuccess } from "remix-toast";
import { getUser } from "utils/account";
import { BasicHTTPResponse } from "~/@types/general";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const user = await getUser(request);
  const securityQuiz = formData.get("securityQuiz");
  const securityAnswer = formData.get("securityAnswer");
  const oldPassword = formData.get("old-password");
  const newPassword = formData.get("new-password");
  const confirmNewPassword = formData.get("confirm-new-password");

  const clientData = {
    uid: user.uid,
    securityQuiz,
    securityAnswer,
    oldPassword,
    newPassword,
    confirmNewPassword,
  };

  try {
    const { data } = await axios.put<BasicHTTPResponse>(
      `${endpoint}/account/security`,
      clientData
    );

    return jsonWithSuccess({ data }, data.message);
  } catch (error) {
    if (isAxiosError(error)) {
      const data: BasicHTTPResponse = error.response?.data;

      return jsonWithError({ data }, data.message);
    }
  }

  return jsonWithInfo({ mesage: "ok" }, "Ok");
}
