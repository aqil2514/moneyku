import { DialogDescription } from "components/ui/dialog";
import React, { SetStateAction, useState } from "react";
import { Accounts } from "~/@types/Assets-Experimental";
import { Badge } from "components/ui/badge";
import { formatDate } from "utils";
import {
  useDBFE_AmountInput,
  useDBFE_ColorInput,
  useDBFE_IconInput,
  useDetailBodyFormEdit,
  useHeader,
} from "./logics";
import Button from "components/Inputs/Button";
import { BiEdit, BiTrash, BiUpload } from "react-icons/bi";
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
import { defaultCurrencies, defaultGroups } from "lib/default-db/accounts";
import { GeneralInputComponents } from "./interface";
import { HexColorPicker } from "react-colorful";
import { Textarea } from "components/ui/textarea";
import { CiLink } from "react-icons/ci";
import { FaMoneyBill } from "react-icons/fa";
import IconPicker from "components/General/IconPicker";
import { icons } from "lib/default-general/icons";

export const DetailBody: React.FC<{ account: Accounts }> = ({ account }) => {
  const { isEditing } = useAssetDetailData();
  if (isEditing) return <DetailBodyFormEdit account={account} />;

  return <DetailBodyTransactions account={account} />;
};

export const DetailBodyFormEdit: React.FC<{ account: Accounts }> = ({
  account,
}) => {
  const { fetcher, lastValidationHandler } = useDetailBodyFormEdit();
  const isLoading = fetcher.state !== "idle";

  // TODO 25-9 => Lihat Logics! Kalo dah selesai, buat UI Halaman Review
  // Referensi UI https://cdn.prod.website-files.com/621d2ed207575c12272d3694/623a173abd927b57ee537b78_61f887cd739d48a0f5658fc8_1*aQBbPVz9OdFqC9KMQS3uJw.jpeg

  return (
    <ScrollArea className="max-h-[450px] animate-slide-left">
      <h3 className="text-center font-ubuntu text-xl font-bold underline">
        Edit Asset {account.name}
      </h3>
      <fetcher.Form
        className="flex flex-col gap-4 pb-8"
        method="PUT"
        action="/api/asset/edit"
      >
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
        <DBFE_GeneralInput account={account} fieldKey="currency" />
        <DBFE_GeneralInput account={account} fieldKey="icon" />
        <DBFE_GeneralInput account={account} fieldKey="description" />
        <div>
          <Button
            onClick={lastValidationHandler}
            color="success"
            type="button"
            disabled={isLoading}
          >
            {isLoading ? "Mengubah Data..." : "Ubah Data"}
          </Button>
        </div>
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
  else if (fieldKey === "currency")
    return <DBFE_CurrencySelect account={account} fieldKey={fieldKey} />;
  else if (fieldKey === "description")
    return <DBFE_DescriptionTextarea account={account} fieldKey={fieldKey} />;
  else if (fieldKey === "icon")
    return <DBFE_IconInput account={account} fieldKey={fieldKey} />;

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
            <p style={{ color }} className="font-bold font-poppins my-auto">
              {account.name}
            </p>
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

const DBFE_CurrencySelect: React.FC<
  Pick<GeneralInputComponents, "account" | "fieldKey">
> = ({ account, fieldKey }) => {
  return (
    <div id={`container-${fieldKey}`} className="flex flex-col gap-2 px-4">
      <Label htmlFor={fieldKey} className="font-poppins font-semibold">
        Mata Uang Aset
      </Label>
      <Select name={fieldKey} defaultValue={account.currency}>
        <SelectTrigger>
          <SelectValue placeholder={account.currency} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Mata Uang Aset</SelectLabel>
            {defaultCurrencies.map((currency) => (
              <SelectItem key={currency} value={currency}>
                {currency}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

const DBFE_DescriptionTextarea: React.FC<
  Pick<GeneralInputComponents, "account" | "fieldKey">
> = ({ account, fieldKey }) => {
  return (
    <div id={`container-${fieldKey}`} className="flex flex-col gap-2 px-4">
      <Label htmlFor={fieldKey} className="font-poppins font-semibold">
        Deskripsi Aset
      </Label>
      <Textarea
        id={fieldKey}
        name={fieldKey}
        defaultValue={account.description}
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
      <Select name={fieldKey} defaultValue={account.group}>
        <SelectTrigger>
          <SelectValue placeholder={account.group} />
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

const DBFE_IconInput: React.FC<
  Pick<GeneralInputComponents, "account" | "fieldKey">
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
> = ({ account, fieldKey }) => {
  const { typeIcon, changeTypeIcon, value, setValue } = useDBFE_IconInput();
  return (
    <div id={`container-${fieldKey}`} className="flex flex-col gap-2 px-4">
      <Input type="hidden" name="icon-value" value={value} readOnly />
      <Input type="hidden" name="icon-type" value={typeIcon} readOnly />
      <Label htmlFor={fieldKey} className="font-poppins font-semibold">
        Icon Aset
      </Label>
      <div className="flex gap-4" id="icon-type-buttons">
        <Button
          type="button"
          variant={typeIcon === "default-icon" ? "outlined" : "contained"}
          data-typeIcon="default-icon"
          className={
            typeIcon === "default-icon" ? "cursor-default" : "cursor-pointer"
          }
          color="primary"
          onClick={changeTypeIcon}
        >
          <FaMoneyBill />
        </Button>
        <Button
          type="button"
          variant={typeIcon === "url" ? "outlined" : "contained"}
          data-typeIcon="url"
          className={typeIcon === "url" ? "cursor-default" : "cursor-pointer"}
          color="primary"
          onClick={changeTypeIcon}
        >
          <CiLink />
        </Button>
        <Button
          type="button"
          variant={typeIcon === "upload" ? "outlined" : "contained"}
          data-typeIcon="upload"
          className={
            typeIcon === "upload" ? "cursor-default" : "cursor-pointer"
          }
          color="primary"
          onClick={changeTypeIcon}
        >
          {<BiUpload />}
        </Button>
      </div>
      {typeIcon === "default-icon" && (
        <DBFE_IconInputDefaultIcon setValue={setValue} value={value} />
      )}
      {typeIcon === "url" && (
        <DBFE_IconInputURL setValue={setValue} value={value} />
      )}
      {typeIcon === "upload" && (
        <DBFE_IconInputFile setValue={setValue} value={value} />
      )}
    </div>
  );
};

const DBFE_IconInputDefaultIcon: React.FC<{
  value: string;
  setValue: React.Dispatch<SetStateAction<string>>;
}> = ({ value, setValue }) => {
  return (
    <>
      <div className="flex flex-col gap-4 border rounded-lg p-4">
        <h3 className="font-bold font-playfair-display text-lg underline">
          Pilih Icon Aset
        </h3>
        <IconPicker setValue={setValue} value={value} />
      </div>
      {value && (
        <div className="">
          <p>Icon yang dipilih:</p>
          <div className="border w-16 h-16 text-3xl bg-slate-300 flex justify-center items-center content-center">
            {icons.find((icon) => icon.name === value)?.icon}
          </div>
        </div>
      )}
    </>
  );
};

const DBFE_IconInputFile: React.FC<{
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
}> = ({ value, setValue }) => {
  const [filePreview, setFilePreview] = useState<string>("");

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Generate a preview URL for the selected file
      const fileURL = URL.createObjectURL(file);
      setFilePreview(fileURL);
      setValue(file.name); // Set file name or file path as the value
    }
  };

  return (
    <div className="flex flex-col gap-2 px-4">
      <label htmlFor="icon-file" className="font-poppins font-semibold">
        Unggah Ikon Aset :
      </label>
      <input
        id="icon-file"
        type="file"
        accept=".svg, .png, .jpg, .jpeg"
        onChange={handleFileChange}
        className="border p-2 rounded"
      />

      {/* Display file preview if a file is selected */}
      {filePreview && (
        <div className="mt-4">
          <h4 className="font-semibold">Pratinjau Ikon:</h4>
          <div className="flex justify-center items-center border rounded p-4">
            <img
              src={filePreview}
              alt="Icon preview"
              className="h-16 w-16 object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

const DBFE_IconInputURL: React.FC<{
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}> = ({ value, setValue }) => {
  return (
    <div className="flex flex-col gap-2 p-4 border rounded-md">
      <label htmlFor="icon-url" className="font-poppins font-semibold">
        URL Ikon Aset :
      </label>
      <input
        id="icon-url"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Masukkan URL ikon"
        className="border p-2 rounded"
      />

      {/* Display icon preview if URL is provided */}
      {value && (
        <div className="mt-4">
          <h4 className="font-semibold">Pratinjau Ikon:</h4>
          <div className="flex justify-center items-center border rounded p-4">
            <img
              src={value}
              alt="Icon preview"
              className="h-16 w-16 object-contain"
              onError={(e) => {
                // Handle error when icon URL is invalid
                e.currentTarget.src = "/images/no-image.png";
              }}
            />
          </div>
        </div>
      )}
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
