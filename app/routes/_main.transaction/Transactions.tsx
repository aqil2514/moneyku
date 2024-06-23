import { TransactionType } from "~/@types/transaction";
import TransactionNoData from "./TNoData";
import TransactionWithData from "./TWithData";
import { createContext, useContext, useState } from "react";

interface TransactionContextType {
    editMode: boolean;
    deleteMode: boolean;
    menuActive: boolean;
    month: number;
    year: number;
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    setDeleteMode: React.Dispatch<React.SetStateAction<boolean>>;
    setMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
    setMonth: React.Dispatch<React.SetStateAction<number>>;
    setYear: React.Dispatch<React.SetStateAction<number>>;
    data: TransactionType[];
  }

  const TransactionContext = createContext<TransactionContextType>(
    {} as TransactionContextType
  );

export default function Transactions({data} : {data:TransactionType[]}){
    const [deleteMode, setDeleteMode] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [menuActive, setMenuActive] = useState<boolean>(false);
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());

    return(
        <TransactionContext.Provider value={{
            data,
            editMode,
            setEditMode,
            deleteMode,
            setDeleteMode,
            month,
            setMonth,
            year,
            setYear,
            menuActive,
            setMenuActive,
          }}>
        {data.length === 0 ? <TransactionNoData />: <TransactionWithData />}
        </TransactionContext.Provider>
    )
}

export function useTransactionData() {
    return useContext(TransactionContext);
  }
  