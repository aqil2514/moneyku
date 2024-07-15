import React, { createContext, useContext, useState } from "react";
import { StatisticContextProps, TransactionCategory } from "../@types";
import { ChartData } from "~/@types/Statistic";

const StatisticContext = createContext<StatisticContextProps>(
  {} as StatisticContextProps
);

export const useStatisticData = () => {
  return useContext(StatisticContext);
};

export default function StatisticProvider({
  children,
  data,
}: {
  children: React.ReactNode;
  data: ChartData[];
}) {
  const [category, setCategory] = useState<TransactionCategory>("Pemasukan");
  return (
    <StatisticContext.Provider value={{ data, category, setCategory }}>
      {children}
    </StatisticContext.Provider>
  );
}
