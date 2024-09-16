import axios, { isAxiosError } from "axios";
import { endpoint } from "lib/server";
import { jsonWithError, jsonWithSuccess } from "remix-toast";
import { AccountUser } from "~/@types/Auth";
import { AccountSecurityProps, CD_SettingSecurityCore } from "~/@types/Setting";

interface SecurityProps {
  OldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  securityQuiz: string;
  securityAnswer: string;
}

/**
 * Tipe untuk pembuatan sistem keamanan
 */
interface NewSecurityProps {
  securityOption: "password-option" | "security-question-option";
  user: AccountUser;
  securityData: Omit<SecurityProps, "OldPassword">;
}

export async function createNewSecurity(state: NewSecurityProps) {
  const { securityData, securityOption, user } = state;
  try {
    const { data } = await axios.put(`${endpoint}/account/security`, {
      uid: user.uid,
      securityData,
      securityOption,
    });
    return jsonWithSuccess({ data }, data.message);
  } catch (error) {
    if (isAxiosError(error)) {
      const data = error.response?.data;
      return jsonWithError({ data }, data.message);
    }
  }
}

export function getDataForm(
  formData: FormData,
  user: AccountUser
): CD_SettingSecurityCore {
  const securityQuiz = formData.get("securityQuiz") as string;
  const securityAnswer = formData.get("securityAnswer") as string;
  const oldPassword = formData.get("old-password") as string;
  const newPassword = formData.get("new-password") as string;
  const confirmNewPassword = formData.get("confirm-new-password") as string;
  const cta = formData.get("cta") as CD_SettingSecurityCore["cta"];
  const securityOption = formData.get(
    "security-option"
  ) as CD_SettingSecurityCore["securityOption"];

  const securityData: AccountSecurityProps = {
    confirmNewPassword,
    newPassword,
    oldPassword,
    securityAnswer,
    securityQuiz,
  };
  const result: CD_SettingSecurityCore = {
    uid: user.uid as string,
    cta,
    securityData,
    securityOption,
  };
  
  return result;
}
