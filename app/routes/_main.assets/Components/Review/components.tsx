import { icons } from "lib/default-general/icons";
import React from "react";
import { formatCurrency } from "utils/general";
import { FormAccounts } from "~/@types/Assets-Experimental";

export const DataMap: React.FC<{
  account: FormAccounts;
  colorScheme: "yellow" | "cyan";
  title: string;
}> = ({ account, colorScheme, title }) => {
  const accountMapping: Record<keyof FormAccounts, string> = {
    account_id: "Id Akun",
    name: "Nama Aset",
    group: "Kategori Aset",
    currency: "Mata Uang Aset",
    amount: "Jumlah Awal Aset",
    color: "Warna Aset",
    created_at: "Dibuat Pada",
    description: "Deskripsi Aset",
    "icon-type": "",
    "icon-value": "Icon Asset",
  };

  const accountKeys = Object.keys(account).filter(
    (key) => key !== "icon-type" && key !== "created_at"
  );

  return (
    <div
      className={`bg-${colorScheme}-100 border-4 border-dashed border-${colorScheme}-300 rounded-md p-4 text-${colorScheme}-600`}
    >
      <h3 className="font-ubuntu font-semibold underline underline-offset-2">
        {title}
      </h3>
      {accountKeys.map((key) => {
        // Diperlukan untuk memberikan tipe datanya
        const keyMap = key as keyof FormAccounts;

        // Diperlukan untuk penyesuain keseragaman data
        account.amount = "Rp. " + formatCurrency(String(account.amount));

        // Conditional Rendering
        if (key === "icon-value") {
          const accountType = account["icon-type"];
          const accountValue = account["icon-value"];
          return (
            <div key={"icon"} className="flex gap-1 items-center conce">
              <strong>{accountMapping[keyMap]} : </strong>
              {accountType === "default-icon" &&
                icons.find((icon) => icon.name === accountValue)?.icon}
              {accountType === "url" && (
                <img src={accountValue} alt={accountValue} className="w-16 h-16 block rounded-md" />
              )}
              {accountType === "upload" && (
                <img src={accountValue} alt={accountValue} className="w-16 h-16 block rounded-md" />
              )}
              {!accountValue && <p>Icon belum dipilih</p> }
            </div>
          );
        }

        if (key === "color")
          return (
            <div key={"color"} className="flex gap-1">
              <strong className="my-auto">Warna Aset :</strong>
              <p className="my-auto">{account.color}</p>
              <span
                style={{ backgroundColor: account.color }}
                className="w-8 h-8 rounded-md block"
              />
            </div>
          );

        return (
          <p key={key}>
            <strong>{accountMapping[keyMap]} : </strong>
            {account[keyMap] as string}
          </p>
        );
      })}
    </div>
  );
};
