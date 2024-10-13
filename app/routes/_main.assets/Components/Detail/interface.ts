import { Accounts, FormAccounts } from "~/@types/Assets-Experimental";

export interface GeneralInputComponents {
  account: Accounts;
  fieldKey: keyof Accounts;
  type?: React.HTMLInputTypeAttribute;
  disabled?: boolean;
  cacheData: FormAccounts
}
