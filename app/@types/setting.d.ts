/**
 * Client Data Setting Security
 *
 * Interface yang mengambil tipe data yang dikirim oleh Client
 */
export interface CD_SettingSecurity {
    uid: string;
    password: string;
    securityOption: "password-option" | "security-question-option";
  }
  
  type Security = Omit<CD_SettingSecurity, "password" | "securityOption">
  
  export interface AccountSecurityProps {
    oldPassword: string;
    newPassword?: string;
    confirmNewPassword?: string;
    securityQuiz?: string;
    securityAnswer: string;
  }

type securityOptionState = "password-option" | "security-question-option";

  
  export interface CD_SettingSecurityCore extends Security {
    cta: "create-new-security" | "verify-security" | "change-security";
    securityData: AccountSecurityProps;
    securityOption: securityOptionState
  }