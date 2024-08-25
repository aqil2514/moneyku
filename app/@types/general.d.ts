/**
 * Response standar dari semua response http
 */
export interface BasicResponse {
  success: boolean;
}

export interface BasicHTTPResponse<T = unknown> {
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

/** Interface untuk api getFormData */
export interface FormDataHandler {
  /**
   * Mengambil semua data yang ada di Form Aset
   * @param formData Form data dari yang bersangkutan
   * @returns Data dengan bentuk AssetsFormValues
   */
  asset: (formData: FormData) => AssetFormValues;
  /**
   * Mengambil semua data yang ada di Form Aset
   * @param formData Form data dari yang bersangkutan
   * @returns Data dengan bentuk TransactionAddFormData
   */
  transaction: (formData: FormData) => TransactionAddFormData;
}

export interface HttpResponseBuilder {
  success: <T>(message: string, data: T, statusCode?: number) => BasicHTTPResponse<T>;
  error: <T>(message: string, data: T, statusCode?: number) => BasicHTTPResponse<T>;
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
