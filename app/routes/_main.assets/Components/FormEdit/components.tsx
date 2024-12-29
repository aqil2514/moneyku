import Button from "components/Inputs/Button";
import { Accounts, FormAccounts } from "~/@types/Assets-Experimental";
import {
  useDBFEC_AmountInput,
  useDBFEC_ColorInput,
  useDBFEC_IconInput,
} from "./logics";
import React, { SetStateAction, useEffect, useState } from "react";
import { GeneralInputComponents } from "../Detail/interface";
import { formatDate } from "utils";
import { Label } from "components/ui/label";
import { Input } from "components/ui/input";
import { HexColorPicker } from "react-colorful";
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
import { Textarea } from "components/ui/textarea";
import { FaMoneyBill } from "react-icons/fa";
import { CiLink } from "react-icons/ci";
import { BiUpload } from "react-icons/bi";
import IconPicker from "components/General/IconPicker";
import { icons } from "lib/default-general/icons";

export const DBFE_Edit: React.FC<{
  account: Accounts;
  isLoading: boolean;
  setFormData: (e: React.MouseEvent<HTMLButtonElement>) => void;
  cacheData: FormAccounts;
}> = ({ account, isLoading, setFormData, cacheData }) => {

  return (
    <>
      <DBFEC_GeneralInput cacheData={cacheData} account={account} fieldKey="created_at" disabled />

      <DBFEC_GeneralInput cacheData={cacheData}
        account={account}
        fieldKey="account_id"
        type="hidden"
      />

      <DBFEC_GeneralInput cacheData={cacheData} account={account} fieldKey="name" />
      <DBFEC_GeneralInput cacheData={cacheData} account={account} fieldKey="amount" type="number" />
      <DBFEC_GeneralInput cacheData={cacheData} account={account} fieldKey="currency" />
      <DBFEC_GeneralInput cacheData={cacheData} account={account} fieldKey="color" />
      <DBFEC_GeneralInput cacheData={cacheData} account={account} fieldKey="description" />
      <DBFEC_GeneralInput cacheData={cacheData} account={account} fieldKey="group" />
      <DBFEC_GeneralInput cacheData={cacheData} account={account} fieldKey="icon" />
      <div>
        <Button
          onClick={setFormData}
          color="success"
          type="button"
          disabled={isLoading}
        >
          Pratinjau
        </Button>
      </div>
    </>
  );
};

export const DBFEC_GeneralInput: React.FC<GeneralInputComponents> = ({
  account,
  fieldKey,
  type = "text",
  cacheData,
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
    return <DBFEC_GroupSelect cacheData={cacheData} account={account} fieldKey={fieldKey} />;
  else if (fieldKey === "amount")
    return <DBFEC_AmountInput account={account} fieldKey={fieldKey} />;
  else if (fieldKey === "color")
    return <DBFEC_ColorInput account={account} fieldKey={fieldKey} />;
  else if (fieldKey === "currency")
    return <DBFEC_CurrencySelect account={account} fieldKey={fieldKey} />;
  else if (fieldKey === "description")
    return <DBFEC_DescriptionTextarea account={account} fieldKey={fieldKey} />;
  else if (fieldKey === "icon")
    return <DBFEC_IconInput account={account} fieldKey={fieldKey} />;

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

export const DBFEC_AmountInput: React.FC<
  Pick<GeneralInputComponents, "account" | "fieldKey">
> = ({ account, fieldKey }) => {
  const { value, changeHandler } = useDBFEC_AmountInput(
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

export const DBFEC_ColorInput: React.FC<
  Pick<GeneralInputComponents, "account" | "fieldKey">
> = ({ account, fieldKey }) => {
  const { color, setColor, changeHandler, randomHandler } = useDBFEC_ColorInput(
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

export const DBFEC_CurrencySelect: React.FC<
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

export const DBFEC_DescriptionTextarea: React.FC<
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

export const DBFEC_GroupSelect: React.FC<
  Pick<GeneralInputComponents, "account" | "fieldKey" | "cacheData">
> = ({ account, fieldKey, cacheData }) => {
  const [selectedGroup, setSelectedGroup] = useState<string>(
    cacheData.group || account.group
  );

  useEffect(() => {
    setSelectedGroup(cacheData.group || account.group);
  }, [cacheData.group, account.group]);

  return (
    <div id={`container-${fieldKey}`} className="flex flex-col gap-2 px-4">
      <Label htmlFor={fieldKey} className="font-poppins font-semibold">
        Kategori Aset
      </Label>
      <Select
        name={fieldKey}
        value={selectedGroup}
        onValueChange={(value) => setSelectedGroup(value)}
      >
        <SelectTrigger>
          <SelectValue placeholder={selectedGroup} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Kategori Aset</SelectLabel>
            {/* Soon : Nanti ubah agar ambil arraynya dari database */}
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


export const DBFEC_IconInput: React.FC<
  Pick<GeneralInputComponents, "account" | "fieldKey">
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
> = ({ account, fieldKey }) => {
  const { typeIcon, changeTypeIcon, value, setValue } = useDBFEC_IconInput();
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
        <DBFEC_IconInputDefaultIcon setValue={setValue} value={value} />
      )}
      {typeIcon === "url" && (
        <DBFEC_IconInputURL setValue={setValue} value={value} />
      )}
      {typeIcon === "upload" && (
        <DBFEC_IconInputFile setValue={setValue} value={value} />
      )}
    </div>
  );
};

export const DBFEC_IconInputDefaultIcon: React.FC<{
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

export const DBFEC_IconInputFile: React.FC<{
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
      setValue(fileURL); // Set file name or file path as the value
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

export const DBFEC_IconInputURL: React.FC<{
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
