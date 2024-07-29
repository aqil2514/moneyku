import { ErrorValidationResponse } from "~/@types/General";
import { TransactionErrors } from "~/@types/Transaction";

export function getErrors(errors: ErrorValidationResponse[]) {
    const errorMap = new Map<keyof TransactionErrors, string>(
      errors.map((e) => [e.path as keyof TransactionErrors, e.message])
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