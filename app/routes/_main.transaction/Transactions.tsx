import { TransactionType } from "~/@types/Transaction";
import TransactionNoData from "./TNoData";
import TransactionWithData from "./TransactionWithData/TWithData";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { ContextMenu, ContextMenuContent } from "components/ui/context-menu";
import { ContextMenuTrigger } from "@radix-ui/react-context-menu";
import T_ContextMenuItem from "./T_ContextMenuItem";
import { useNavigate } from "@remix-run/react";
import dayjs from "dayjs";

interface TransactionContextType {
  editMode: boolean;
  deleteMode: boolean;
  menuActive: boolean;
  month: number;
  year: string;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteMode: React.Dispatch<React.SetStateAction<boolean>>;
  setMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
  setYear: React.Dispatch<React.SetStateAction<string>>;
  data: TransactionType[];
}

const TransactionContext = createContext<TransactionContextType>(
  {} as TransactionContextType
);

const currentYear = String(dayjs().year());
const currentMonth = dayjs().month();

export default function Transactions({ data }: { data: TransactionType[] }) {
  const [deleteMode, setDeleteMode] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [menuActive, setMenuActive] = useState<boolean>(false);
  const [month, setMonth] = useState<number>(currentMonth);
  const [year, setYear] = useState<string>(currentYear);

  const navigate = useNavigate();

  const addTransaction = useCallback(() => {
    navigate("/transaction/add");
  }, [navigate]);

  useEffect(() => {
    const keyboardEvents = (e: KeyboardEvent) => {

      if (e.ctrlKey && e.key === "b") {
        e.preventDefault();
        e.stopImmediatePropagation(); 
        addTransaction();
      }
    };

    window.addEventListener("keydown", keyboardEvents);

    return () => {
      window.removeEventListener("keydown", keyboardEvents);
    };
  }, [addTransaction]);
  return (
    <TransactionContext.Provider
      value={{
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
      }}
    >
      <ContextMenu>
        <ContextMenuTrigger>
          {data.length === 0 ? <TransactionNoData /> : <TransactionWithData />}
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
        <T_ContextMenuItem />
        </ContextMenuContent>
      </ContextMenu>
    </TransactionContext.Provider>
  );
}

export function useTransactionData() {
  return useContext(TransactionContext);
}
