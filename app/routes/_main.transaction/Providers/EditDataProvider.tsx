import React, {
    createContext,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useState,
  } from "react";
  import {
    TransactionBodyType,
    TransactionFormData,
    TransactionType,
  } from "~/@types/Transaction";
  import { useTransactionData } from "../Provider";
  
  interface EditDataState {
    globalData: TransactionType;
    setGlobalData: React.Dispatch<SetStateAction<TransactionType>>;
    selectedData: TransactionBodyType;
    setSelectedData: React.Dispatch<SetStateAction<TransactionBodyType>>;
    priceChecked: TransactionFormData["typeTransaction"] | string;
    setPriceChecked: React.Dispatch<
      SetStateAction<TransactionFormData["typeTransaction"] | string>
    >;
    formattedDate: (header: string) => string;
  }
  
  const EditDataContext = createContext<EditDataState>({} as EditDataState);
  
  export default function EditDataProvider({
    children,
    index,
    header,
  }: {
    children: React.ReactNode;
    index: number;
    header: string;
  }) {
    const { data } = useTransactionData();
  
    const [globalData, setGlobalData] = useState<TransactionType>(
      {} as TransactionType
    );
    const [selectedData, setSelectedData] = useState<TransactionBodyType>(
      {} as TransactionBodyType
    );
    const [priceChecked, setPriceChecked] = useState<
      "Pemasukan" | "Pengeluaran" | string
    >("");
  
    const getData = useCallback(
      (header: string) => {
        const sameGlobal = data.find((d) => d.header === header);
        if (!sameGlobal)
          throw new Error("Terjadi kesalahan saat pengambilan data");
        setGlobalData(sameGlobal);
      },
      [data]
    );
  
    useEffect(() => {
      getData(header);
    }, [header, getData]);
  
    useEffect(() => {
      if (globalData && globalData.body && index >= 0 && index < globalData.body.length) {
        const selected = globalData.body[index];
        setSelectedData(selected);
        const category = selected.price > 0 ? "Pemasukan" : "Pengeluaran";
        setPriceChecked(category);
      } else {
        console.error("Index is out of bounds or body is undefined.");
      }
    }, [globalData, index]);
  
    const formattedDate = (header: string) => {
      const date = new Date(header);
      const result = date.toISOString().split("T")[0];
      return result;
    };
  
    const context: EditDataState = {
      globalData,
      setGlobalData,
      selectedData,
      setSelectedData,
      priceChecked,
      setPriceChecked,
      formattedDate,
    };
  
    return (
      <EditDataContext.Provider value={context}>
        {children}
      </EditDataContext.Provider>
    );
  }
  
  export function useT_EditData(){
      return useContext(EditDataContext);
  }
  