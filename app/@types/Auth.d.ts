export interface Account {
  username: string;
  email: string;
  password: string;
}

export type AccountUser = Omit<AccountDB, "password">;

export interface AccountStatusFlags {
  isVerified: boolean;
  isHavePassword: boolean;
  isHaveSecurityQuiz: boolean;
}

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
  readonly statusFlags: AccountStatusFlags;
}

export interface AccountRegister extends Account {
  confirmPassword: string;
  securityQuiz: string;
  securityAnswer: string;
  currency: CurrencyType;
  language: LanguageType;
  purposeUsage: PurposeUsageType;
}

export interface AccountResponse {
  success: boolean;
  message: string | null;
  notifMessage?: string;
  path: string;
}

export type CurrencyType = "IDR" | "USD" | "EUR";

export type LanguageType = "ID" | "EN";

export type PurposeUsageType = "Individu" | "Organization";
