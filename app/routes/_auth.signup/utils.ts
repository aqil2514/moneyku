import { AccountRegister, AccountResponse } from "~/@types/Auth";

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

export function getErrors(errors: AccountResponse[] | undefined) {
  if (!errors) {
    return {
      usernameError: null,
      emailError: null,
      passwordError: null,
      confirmPasswordError: null,
      currencyError: null,
      languageError: null,
      purposeUsageError: null,
      accountFoundError: null,
    };
  }

  // Membuat Map dari errors
  const errorsMap = new Map(errors.map((d) => [d.path, d.message]));

  // Mengambil nilai error dari Map
  const getError = (field: string) => errorsMap.get(field);

  return {
    usernameError: getError("username"),
    emailError: getError("email"),
    passwordError: getError("password"),
    confirmPasswordError: getError("confirmPassword"),
    currencyError: getError("currency"),
    languageError: getError("language"),
    purposeUsageError: getError("purposeUsage"),
    accountFoundError: getError("account-found"),
  };
}
