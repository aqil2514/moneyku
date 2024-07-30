import { ErrorValidationResponse } from "~/@types/General";
import { TransactionErrors } from "~/@types/Transaction";

export function getErrors(errors: ErrorValidationResponse[]) {
  type KeyMaps = keyof TransactionErrors;
  
  const errorMap = new Map<KeyMaps, string>(
    errors.map((e) => [e.path as KeyMaps, e.message])
  );

  const error: TransactionErrors = {
    dateTransaction: errorMap.get("dateTransaction"),
    typeTransaction: errorMap.get("typeTransaction"),
    categoryTransaction: errorMap.get("categoryTransaction"),
    assetsTransaction: errorMap.get("assetsTransaction"),
    noteTransaction: errorMap.get("noteTransaction"),
  };
  return error;
}
