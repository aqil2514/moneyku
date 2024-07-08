import { ErrorValidationResponse } from "~/@types/General";
import {
  TransactionErrors,
} from "~/@types/Transaction";

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


  const errorsMap = new Map(errors.map((d) => [d.path, d.message]));

  const totalError = errorsMap.get("totalTransaction");
  const typeError = errorsMap.get("typeTransaction");
  const dateError = errorsMap.get("dateTransaction");
  const categoryError = errorsMap.get("categoryTransaction");
  const assetsError = errorsMap.get("assetsTransaction");
  const noteError = errorsMap.get("noteTransaction");

  const result: TransactionErrors = {
    dateTransaction: dateError,
    typeTransaction: typeError,
    totalTransaction: totalError,
    categoryTransaction: categoryError,
    assetsTransaction: assetsError,
    noteTransaction: noteError,
  };
  return result;
}

// export function getFormData(formData: FormData): TransactionAddFormData {
//   const userId = String(formData.get("us"));
//   const typeTransaction = String(formData.get("type-data"));
//   const totalTransaction = Number(formData.get("transaction-total"));
//   const billTransaction = Number(formData.get("bill"));
//   const dateTransaction = new Date(String(formData.get("transaction-date")));
//   const categoryTransaction = String(formData.get("transaction-category"));
//   const assetsTransaction = String(formData.get("transaction-assets"));
//   const fromAsset = String(formData.get("from-asset"));
//   const toAsset = String(formData.get("to-asset"));
//   const noteTransaction = String(formData.get("transaction-note"));
//   const descriptionTransaction = String(formData.get("transaction-description"));
//   const price =
//     typeTransaction === "Pemasukan" ? totalTransaction : totalTransaction * -1;

//   const result: TransactionAddFormData = {
//     typeTransaction,
//     totalTransaction,
//     dateTransaction,
//     categoryTransaction,
//     assetsTransaction,
//     noteTransaction,
//     price,
//     billTransaction,
//     userId,
//     toAsset,
//     descriptionTransaction,
//     fromAsset
//   };

//   return result;
// }
