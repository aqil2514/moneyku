import React, { createContext, useContext } from "react";
import { StatisticContextProps } from "../@types";
import { ChartData } from "~/@types/Statistic";

const StatisticContext = createContext<StatisticContextProps>(
    {} as StatisticContextProps
  );

export const useStatisticData = () => {
    return useContext(StatisticContext);
  };

  export default function StatisticProvider({children, data}: {children:React.ReactNode, data:ChartData[]}){
    return(
        <StatisticContext.Provider value={{data}}>
            {children}
        </StatisticContext.Provider>
    )
  }