import { AccountRegister } from "~/@types/account";

export function getFormData(formData: FormData):AccountRegister{
    const data: AccountRegister = {
        username: String(formData.get("username")),
        email: String(formData.get("email")),
        password: String(formData.get("password")),
        confirmPassword: String(formData.get("confirmPassword")),
        securityQuiz: String(formData.get("securityQuestion")),
        securityAnswer: String(formData.get("securityAnswer")),
        currency: formData.get("currencyPreference") as AccountRegister["currency"],
        language: formData.get("languagePreference") as AccountRegister["language"],
        purposeUsage: formData.get(
          "purposeUsage"
        ) as AccountRegister["purposeUsage"],
      };

      return data;
}