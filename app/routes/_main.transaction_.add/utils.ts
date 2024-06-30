import { ErrorValidationResponse } from "~/@types/general";
import {
  TransactionAddFormData,
  TransactionErrors,
} from "~/@types/transaction";

export function getErrors(errors: ErrorValidationResponse[]) {
  if (!errors) {
    const error: TransactionErrors = {
      dateTransaction: "",
      typeTransaction: "",
      totalTransaction: "",
      categoryTransaction: "",
      assetsTransaction: "",
      noteTransaction: "",
    };
    return error;
  }

  const totalError = errors.find((e) => e.path === "totalTransaction");
  const typeError = errors.find((e) => e.path === "typeTransaction");
  const dateError = errors.find((e) => e.path === "dateTransaction");
  const categoryError = errors.find((e) => e.path === "categoryTransaction");
  const assetsError = errors.find((e) => e.path === "assetsTransaction");
  const noteError = errors.find((e) => e.path === "noteTransaction");

  const error: TransactionErrors = {
    dateTransaction: dateError && dateError.message ? dateError.message : "",
    typeTransaction: typeError && typeError.message ? typeError.message : "",
    totalTransaction:
      totalError && totalError.message ? totalError.message : "",
    categoryTransaction:
      categoryError && categoryError.message ? categoryError.message : "",
    assetsTransaction:
      assetsError && assetsError.message ? assetsError.message : "",
    noteTransaction: noteError && noteError.message ? noteError.message : "",
  };
  return error;
}

export function getFormData(formData: FormData): TransactionAddFormData {
  const userId = String(formData.get("us"));
  const typeTransaction = String(formData.get("type-data"));
  const totalTransaction = Number(formData.get("transaction-total"));
  const dateTransaction = new Date(String(formData.get("transaction-date")));
  const categoryTransaction = String(formData.get("transaction-category"));
  const assetsTransaction = String(formData.get("transaction-assets"));
  const noteTransaction = String(formData.get("transaction-note"));
  const price =
    typeTransaction === "Pemasukan" ? totalTransaction : totalTransaction * -1;

  const result: TransactionAddFormData = {
    typeTransaction,
    totalTransaction,
    dateTransaction,
    categoryTransaction,
    assetsTransaction,
    noteTransaction,
    price,
    userId
  };

  return result;
}
