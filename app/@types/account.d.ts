export interface AccountRegister {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  securityQuiz: string;
  securityAnswer: string;
  currency: "IDR" | "USD" | "EUR";
  language: "ID" | "EN";
  purposeUsage: "Individu" | "Organization";
}
