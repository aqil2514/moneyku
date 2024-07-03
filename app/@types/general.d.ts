import { AccountUser } from "./Account";

/**
 * Response standar dari semua response http
 */
export interface BasicResponse {
  success: boolean;
}

export interface BasicHTTPResponse<T = unknown>{
  status: "success" | "error" | "idle";
  statusCode?: number;
  message: string;
  data?: T;
}

export interface ErrorResponse {
  message: string;
}

export interface ErrorValidationResponse extends ErrorResponse {
  notifMessage: string;
  path: string;
}

export interface LoginResult {
  user: AccountUser;
  success: boolean;
  message: string;
}

export interface ValidationResponse extends BasicResponse {
  data: null | unknown;
  errors: null | unknown;
  message: string;
}
