import TransactionNoData from "./TNoData";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ContextMenu, ContextMenuContent } from "components/ui/context-menu";
import { ContextMenuTrigger } from "@radix-ui/react-context-menu";
import T_ContextMenuItem from "./ContextMenu/Item";
import { useNavigate } from "@remix-run/react";
import dayjs from "dayjs";
import TransactionWithData from "./TWD";
import { GeneralDataResponse } from "~/@types/General";

interface TransactionContextType {
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

const TransactionContext = createContext<TransactionContextType>(
  {} as TransactionContextType
);

const currentYear = String(dayjs().year());
const currentMonth = dayjs().month();

export default function TransactionProvider({
  data,
}: {
  data: GeneralDataResponse;
}) {
  const [month, setMonth] = useState<number>(currentMonth);
  const [year, setYear] = useState<string>(currentYear);

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterType, setFilterType] = useState<
    "all" | "Income" | "Outcome" | "Transfer"
  >("all");

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

  const value: TransactionContextType = {
    data,
    month,
    setMonth,
    year,
    setYear,
    filterType,
    setFilterType,
    setSortOrder,
    sortOrder,
  };
  return (
    <TransactionContext.Provider value={value}>
      <ContextMenu>
        <ContextMenuTrigger>
          {data.transaction.length === 0 ? (
            <TransactionNoData />
          ) : (
            <TransactionWithData />
          )}
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
