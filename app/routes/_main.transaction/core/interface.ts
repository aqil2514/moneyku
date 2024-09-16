import { GeneralDataResponse } from "~/@types/General";

export interface TransactionContextType {
    month: number;
    year: string;
    setMonth: React.Dispatch<React.SetStateAction<number>>;
    setYear: React.Dispatch<React.SetStateAction<string>>;
    sortOrder: "asc" | "desc";
    setSortOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
    filterType: "all" | "Income" | "Outcome" | "Transfer";
    setFilterType: React.Dispatch<
      React.SetStateAction<"all" | "Income" | "Outcome" | "Transfer">
    >;
    data: GeneralDataResponse;
  }
  

  export interface DetailTransactionProps {
    amount: number;
    text: string;
    color: "green" | "red" | "black";
  }