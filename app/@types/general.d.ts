import { Accounts, Category } from "./Assets-Experimental";
import { Transaction } from "./Transaction-Experimental";

/**
 * Response ini dibuat untuk interface response dari endpoint '/api/get-data/:query'
 * @author Muhamad Aqil Maulana
 * @Date Dibuat pada: 15 September 2024
 */
export interface GeneralDataResponse {
  transaction: Transaction[];
  accounts: Accounts[];
  categories: Category[];
}

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

/**
 * Interface untuk membangun respons HTTP dengan metode standar untuk sukses dan error.
 *
 * @interface HttpResponseBuilder
 */
export interface HttpResponseBuilder {
  /**
   * Membangun respons sukses.
   *
   * @param {string} message - Pesan yang menjelaskan status sukses.
   * @param {T} data - Data yang akan dikembalikan dalam respons.
   * @param {number} [statusCode=200] - Kode status HTTP (opsional, default adalah 200).
   * @returns {BasicHTTPResponse<T>} - Respons HTTP yang berhasil.
   *
   * @template T - Tipe data yang dikembalikan dalam respons.
   */
  success: <T>(
    message: string,
    data: T,
    statusCode?: number
  ) => BasicHTTPResponse<T>;

  /**
   * Membangun respons error.
   *
   * @param {string} message - Pesan yang menjelaskan kesalahan.
   * @param {T} data - Data tambahan yang relevan dengan kesalahan (opsional).
   * @param {number} [statusCode=500] - Kode status HTTP (opsional, default adalah 500).
   * @returns {BasicHTTPResponse<T>} - Respons HTTP yang gagal.
   *
   * @template T - Tipe data yang dikembalikan dalam respons.
   */
  error: <T>(
    message: string,
    data: T,
    statusCode?: number
  ) => BasicHTTPResponse<T>;
}

export interface LoginResult {
  user: AccountUser;
  success: boolean;
  message: string;
}

export interface MiscData {
  readonly securityQuestionsData: string[];
  readonly currenciesData: string[];
}

export interface ValidationResponse extends BasicResponse {
  data: null | unknown;
  errors: null | unknown;
  message: string;
}
