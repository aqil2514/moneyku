import { Accounts } from "~/@types/Assets-Experimental";

export interface GeneralInputComponents {
  account: Accounts;
  fieldKey: keyof Accounts;
  type?: React.HTMLInputTypeAttribute;
  disabled?: boolean;
}
