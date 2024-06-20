import { AccountUser } from "./account";

/**
 * Response standar dari semua response http
 */
export interface BasicResponse {
  success: boolean;
}

export interface ErrorResponse {
  message: string;
}

export interface ErrorValidationResponse extends ErrorResponse {
  notifMessage: string;
  path: string;
}

export interface LoginResult {
  user: AccountUser | null | undefined;
  success: boolean;
  message: string;
}

export interface ValidationResponse extends BasicResponse {
  data: null | unknown;
  errors: null | unknown;
  message: string;
}
