import React, { createContext, useContext, useRef, useState } from "react";
import { TypeTransaction } from "~/@types/Transaction";

interface AddDataContextProps {
  category: TypeTransaction;
  setCategory: React.Dispatch<React.SetStateAction<TypeTransaction>>;
  nominal: string;
  setNominal: React.Dispatch<React.SetStateAction<string>>;
  nominalBill: string;
  setNominalBill: React.Dispatch<React.SetStateAction<string>>;
  isBill: boolean;
  setIsBill: React.Dispatch<React.SetStateAction<boolean>>;
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  formRef: React.MutableRefObject<HTMLFormElement | null>;
}

const AddDataContext = createContext<AddDataContextProps>(
  {} as AddDataContextProps
);

export default function AddDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [category, setCategory] = useState<TypeTransaction>("Pemasukan");
  const [nominal, setNominal] = useState<string>("Rp. 0");
  const [nominalBill, setNominalBill] = useState<string>("Rp. 0");
  const [isBill, setIsBill] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>();
  const formRef = useRef<null | HTMLFormElement>(null);

  const value: AddDataContextProps = {
    category,
    setCategory,
    nominal,
    setNominal,
    nominalBill,
    setNominalBill,
    isBill,
    setIsBill,
    date,
    setDate,
    formRef,
  };
  return (
    <AddDataContext.Provider value={value}>{children}</AddDataContext.Provider>
  );
}

export function useFormData() {
  return useContext(AddDataContext);
}
