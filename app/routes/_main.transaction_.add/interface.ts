import { ButtonComponentProps } from "components/Inputs/Button";
import { AssetsData } from "~/@types/assets";

export interface ButtonListProps{
    color: ButtonComponentProps["color"];
    type: TypeTransaction;
    label: string;
  }

export type TypeTransaction = "Pemasukan" | "Pengeluaran" | "Transfer" | null;

export interface TransactionAddContextProps {
    assetData: AssetsData[];
  }