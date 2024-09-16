import dayjs from "dayjs";
import { Transaction, TypeTransaction } from "~/@types/Transaction-Experimental";
import { useTransactionData } from "../../Core/MainProvider";

export const Logic_HeaderDate = (data: Transaction) => {
  const date = dayjs(data.transaction_at);

  const dayName = date.format("dddd");
  const dayDate = date.format("DD");
  const dayMonth = date.format("MM");
  const dayYear = date.format("YYYY");

  return { dayName, dayDate, dayMonth, dayYear };
};

export const Logic_Amount = (
  data: Transaction,
  transactionType: Transaction["type_transaction"]
) => {
  const amount =
    data.type_transaction === transactionType ? data.nominal.amount : 0;

  return { amount };
};

export const Logic_TransactionData = () => {
  const { data } = useTransactionData();
  const sortedData = data.transaction.sort((a, b) => {
    const dateA = dayjs(a.transaction_at);
    const dateB = dayjs(b.transaction_at);
    return dateA.diff(dateB);
  });

  return { sortedData };
};

export const Logic_TransactionDataBody = (data: Transaction) => {
  const { assetName, categoryName } = Logic_TransactionDetail(data);

  const colorMap: Record<TypeTransaction, string> = {
    Income: "text-blue-500",
    Outcome: "text-red-500",
    Transfer: "text-black",
  };

  return { assetName, categoryName, colorMap };
};

export const Logic_TransactionDetail = (data: Transaction) => {
  const { data: generalData } = useTransactionData();
  const assetName = generalData.accounts.find(
    (account) => account.account_id === data.nominal.account_id
  )?.name;
  const categoryName = generalData.categories.find(
    (category) => category.category_id === data.category_id
  )?.name;

  return { assetName, categoryName };
};
