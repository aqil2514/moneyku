import React from "react";
import { ChartData } from "~/@types/Statistic";

export interface StatisticContextProps {
  data: ChartData[];
  category: TransactionCategory;
  setCategory: React.Dispatch<React.SetStateAction<TransactionCategory>>
}

export type TransactionCategory = "Pemasukan" | "Pengeluaran" |"Transfer"