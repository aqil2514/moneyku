import React from "react";
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

export interface ApiHandler<T=unknown,E=unknown> {
  [method:string]: (args: {request:Request}) => Promise<T,E>;
  // POST: (args: { request: Request }) => Promise<unknown>;
  // PUT: (args: { request: Request }) => Promise<unknown>;
  // GET: (args: { request: Request }) => Promise<unknown>;
  // DELETE: (args: { request: Request }) => Promise<unknown>;
}

interface ApiHandlerPostResponse<T, E> {
  responseData: BasicHTTPResponse<T, E>;
  message: string;
}

export interface BasicHTTPResponse<Data = unknown, Error = unknown> {
  status: "success" | "error" | "idle";
  statusCode?: number;
  message: string;
  errors?: Error;
  data?: Data;
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

export interface FormValidation<T = unknown>{
  succes: boolean;
  errors?: FormValidationError[];
  data?: T;
}

export interface FormValidationError<T = string> {
  /** Nama field yang terjadi error */
  fieldName: T;
  /** Pesan error */
  message: string;
  /** Notifikasi pesan error */
  notifMessage: string;
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

export interface IconsPicker {
  name: string;
  icon: React.ReactNode;
}

export interface LoginResult {
  user: AccountUser;
  success: boolean;
  message: string;
}

export type MethodRequest = "POST" | "PUT" | "DELETE" | "GET";

export interface MiscData {
  readonly securityQuestionsData: string[];
  readonly currenciesData: string[];
}

export interface ValidationResponse extends BasicResponse {
  data: null | unknown;
  errors: null | unknown;
  message: string;
}
