export interface Account {
  username: string;
  email: string;
  password: string;
}

export type AccountUser = Omit<AccountDB, "password">;

export interface AccountConfig {
  currency: CurrencyType;
  language: LanguageType;
  purposeUsage: PurposeUsageType;
}

export interface AccountPrivacy {
  securityQuiz: string;
  securityAnswer: string;
}

export interface AccountDB extends Account {
  uid?: string;
  config: AccountConfig;
  privacy: AccountPrivacy;
}

export interface AccountRegister extends Account {
  confirmPassword: string;
  securityQuiz: string;
  securityAnswer: string;
  currency: CurrencyType;
  language: LanguageType;
  purposeUsage: PurposeUsageType;
}

export interface AccountResponse{
    success: boolean;
    error: boolean;
    message: string | null;
    path: string;
  }

export type CurrencyType = "IDR" | "USD" | "EUR";

export type LanguageType = "ID" | "EN";

export type PurposeUsageType = "Individu" | "Organization";
