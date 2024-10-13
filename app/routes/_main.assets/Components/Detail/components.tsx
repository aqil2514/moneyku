import { DialogDescription } from "components/ui/dialog";
import React from "react";
import { Accounts, FormAccounts } from "~/@types/Assets-Experimental";
import { Badge } from "components/ui/badge";
import { formatDate } from "utils";
import {
  useHeader,
} from "./logics";
import Button from "components/Inputs/Button";
import { BiEdit, BiTrash } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import { TransactionDataHeader } from "~/routes/_main.transaction/Components/TransactionWithData/components";
import { ScrollArea } from "components/ui/scroll-area";
import { useAssetData } from "../../Core/MainProvider";
import { currencyFormat } from "utils/general";
import { useAssetDetailData } from "../../Providers/AssetDetailProvider";
import DetailBodyFormEdit from "../FormEdit";

export const DetailBody: React.FC<{ account: FormAccounts }> = ({ account }) => {
  const { isEditing } = useAssetDetailData();
  if (isEditing) return <DetailBodyFormEdit account={account} />;

  return <DetailBodyTransactions account={account} />;
};


export const DetailBodyTransactions: React.FC<{ account: Accounts }> = ({
  account,
}) => {
  const { transactionsData, categoriesData } = useAssetData();

  const transactions = transactionsData.filter(
    (transaction) => transaction.nominal.account_id === account.account_id
  );

  return (
    <ScrollArea className="max-h-[450px] h-[450px] animate-slide-left">
      <div className="flex flex-col gap-4">
        {transactions.length === 0 ? (
          <p className="text-center font-playfair-display font-semibold">
            Belum ada transaksi pada aset {account.name}
          </p>
        ) : (
          transactions.map((d) => {
            const categoryName = categoriesData.find(
              (category) => category.category_id === d.category_id
            )?.name;

            return (
              <div key={d.id}>
                <TransactionDataHeader data={d} />
                <div className="flex justify-between">
                  <p>{categoryName}</p>
                  <p>{d.name_transaction}</p>
                  <p>{currencyFormat.format(d.nominal.amount)}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </ScrollArea>
  );
};

export const Header: React.FC<{ account: Accounts }> = ({ account }) => {
  const { imageUrl, handleImageError, handleEditClick, isEditing } =
    useHeader();

  return (
    <figure className="w-full flex gap-2 items-center">
      <img
        src={imageUrl}
        onError={handleImageError}
        style={{ backgroundColor: account.color }}
        alt="Icon aset belum ditambahkan"
        className="w-16 h-16 rounded-xl"
      />

      <div>
        <figcaption
          style={{ color: account.color }}
          className="font-playfair-display font-bold flex gap-4 items-center"
        >
          {account.name}
          <span className="flex gap-2">
            <Button color="info" onClick={handleEditClick}>
              {isEditing ? <MdCancel /> : <BiEdit />}
            </Button>
            <Button color="error">
              <BiTrash />
            </Button>
          </span>
        </figcaption>
        <DialogDescription>{account.description}</DialogDescription>
      </div>
    </figure>
  );
};

export const Group: React.FC<{ account: Accounts }> = ({ account }) => {
  return (
    <div className="flex gap-2">
      <Badge>{account.group}</Badge>
      <p>Dibuat pada : {formatDate(account.created_at)}</p>
    </div>
  );
};

export const LimitBorder: React.FC<{ account: Accounts }> = ({ account }) => {
  return (
    <div
      style={{ borderColor: account.color }}
      className="w-full border-t-[10px] border-double"
    />
  );
};
