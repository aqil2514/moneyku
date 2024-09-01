import Button from "components/Inputs/Button";
import React from "react";
import { TypeTransaction } from "~/@types/Transaction";

interface TransactionTypeSelectProps {
  category: TypeTransaction;
  setCategory: React.Dispatch<React.SetStateAction<TypeTransaction>>;
  label: TypeTransaction;
}

export const TypeTransactionSelect: React.FC<TransactionTypeSelectProps> = ({
  category,
  setCategory,
  label,
}) => {
  return (
    <Button
      color="info"
      variant={category === label ? "outlined" : "contained"}
      onClick={() => setCategory(label)}
    >
      {label}
    </Button>
  );
};

export const TransactionType: React.FC<
  Omit<TransactionTypeSelectProps, "label">
> = ({ category, setCategory }) => {
  return (
    <div className="flex gap-2">
      <TypeTransactionSelect
        category={category}
        setCategory={setCategory}
        label="Pemasukan"
      />
      <TypeTransactionSelect
        category={category}
        setCategory={setCategory}
        label="Pengeluaran"
      />
      <TypeTransactionSelect
        category={category}
        setCategory={setCategory}
        label="Transfer"
      />
    </div>
  );
};
