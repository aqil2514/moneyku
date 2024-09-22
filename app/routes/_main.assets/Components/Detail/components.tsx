import { DialogDescription } from "components/ui/dialog";
import React from "react";
import { Accounts } from "~/@types/Assets-Experimental";
import { Badge } from "components/ui/badge";
import { formatDate } from "utils";
import {
  useDBFE_AmountInput,
  useDBFE_ColorInput,
  useDetailBodyFormEdit,
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
import { Label } from "components/ui/label";
import { Input } from "components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import { defaultGroups } from "lib/default-db/accounts";
import { GeneralInputComponents } from "./interface";
import { HexColorPicker } from "react-colorful";

export const DetailBodyFormEdit: React.FC<{ account: Accounts }> = ({
  account,
}) => {
  const { fetcher } = useDetailBodyFormEdit();
  return (
    <ScrollArea className="max-h-[450px] animate-slide-left">
      <h3 className="text-center font-ubuntu text-xl font-bold underline">
        Edit Asset {account.name}
      </h3>
      <fetcher.Form className="flex flex-col gap-4">
        <DBFE_GeneralInput account={account} fieldKey="created_at" disabled />

        <DBFE_GeneralInput
          account={account}
          fieldKey="account_id"
          type="hidden"
        />
        <DBFE_GeneralInput account={account} fieldKey="name" />
        <DBFE_GeneralInput account={account} fieldKey="group" />
        <DBFE_GeneralInput account={account} fieldKey="amount" type="number" />
        <DBFE_GeneralInput account={account} fieldKey="color" />
        {/* Currency modifikasi lagi */}
        <DBFE_GeneralInput account={account} fieldKey="currency" />
        {/* Icon modifikasi lagi */}
        <DBFE_GeneralInput account={account} fieldKey="icon" />
        <DBFE_GeneralInput account={account} fieldKey="description" />
      </fetcher.Form>
    </ScrollArea>
  );
};

const DBFE_GeneralInput: React.FC<GeneralInputComponents> = ({
  account,
  fieldKey,
  type = "text",
  disabled,
}) => {
  const labelMap: Record<keyof Accounts, string> = {
    account_id: "",
    amount: "Jumlah Aset",
    color: "Warna Aset",
    created_at: "Aset Dibuat Pada",
    currency: "Mata Uang Aset",
    description: "Deskripsi",
    group: "Kategori Aset",
    icon: "Icon Aset",
    name: "Nama Aset",
  };

  const dateValue = formatDate(account.created_at);

  if (fieldKey === "group")
    return <DBFE_GroupSelect account={account} fieldKey={fieldKey} />;
  else if (fieldKey === "amount")
    return <DBFE_AmountInput account={account} fieldKey={fieldKey} />;
  else if (fieldKey === "color")
    return <DBFE_ColorInput account={account} fieldKey={fieldKey} />;

  return (
    <div id={`container-${fieldKey}`} className="flex flex-col gap-2 px-4">
      <Label htmlFor={fieldKey} className="font-poppins font-semibold">
        {labelMap[fieldKey]}
      </Label>
      <Input
        defaultValue={fieldKey === "created_at" ? dateValue : account[fieldKey]}
        type={type}
        required
        name={fieldKey}
        id={fieldKey}
        placeholder={`Masukkan ${fieldKey} aset`}
        disabled={disabled}
      />
    </div>
  );
};

const DBFE_AmountInput: React.FC<
  Pick<GeneralInputComponents, "account" | "fieldKey">
> = ({ account, fieldKey }) => {
  const { value, changeHandler } = useDBFE_AmountInput(
    String(account[fieldKey])
  );
  return (
    <div id={`container-${fieldKey}`} className="flex flex-col gap-2 px-4">
      <Label htmlFor={fieldKey} className="font-poppins font-semibold">
        Jumlah Aset
      </Label>
      <Input
        value={value}
        onChange={changeHandler}
        type="text"
        required
        name={fieldKey}
        id={fieldKey}
        placeholder={`Masukkan ${fieldKey} aset`}
      />
    </div>
  );
};

const DBFE_GroupSelect: React.FC<
  Pick<GeneralInputComponents, "account" | "fieldKey">
> = ({ account, fieldKey }) => {
  return (
    <div id={`container-${fieldKey}`} className="flex flex-col gap-2 px-4">
      <Label htmlFor={fieldKey} className="font-poppins font-semibold">
        Kategori Aset
      </Label>
      <Select name={fieldKey}>
        <SelectTrigger>
          <SelectValue placeholder={account[fieldKey]} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Kategori Aset</SelectLabel>
            {defaultGroups.map((group) => (
              <SelectItem key={group} value={group}>
                {group}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

const DBFE_ColorInput: React.FC<
  Pick<GeneralInputComponents, "account" | "fieldKey">
> = ({ account, fieldKey }) => {
  const { color, setColor, changeHandler, randomHandler } = useDBFE_ColorInput(
    account["color"]
  );
  return (
    <div id={`container-${fieldKey}`} className="flex flex-col gap-2 px-4">
      <Label htmlFor={fieldKey} className="font-poppins font-semibold">
        Warna Aset
      </Label>
      <div className="border rounded-md p-2 grid grid-cols-[25%_auto]">
        <HexColorPicker color={color} onChange={setColor} />
        <div className="flex flex-col gap-2 border rounded-sm px-2">
          <h2 className="font-bold font-playfair-display">Sample</h2>
          <div className="flex gap-2">
            <div
              style={{ backgroundColor: color }}
              className="w-8 h-8 rounded"
            />
            <p style={{ color }} className="font-bold font-poppins my-auto">{account.name}</p>
          </div>
          <Input
            value={color}
            onChange={changeHandler}
            type="text"
            required
            name={fieldKey}
            id={fieldKey}
            placeholder={`Masukkan warna aset`}
          />
          <div>
            <Button color="info" type="button" onClick={randomHandler}>
              Warna Acak
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
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

export const DetailBody: React.FC<{ account: Accounts }> = ({ account }) => {
  const { isEditing } = useAssetDetailData();
  if (isEditing) return <DetailBodyFormEdit account={account} />;

  return <DetailBodyTransactions account={account} />;
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
