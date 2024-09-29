import React from "react";
import { formatCurrency } from "utils/general";
import { Accounts } from "~/@types/Assets-Experimental";

export const DataMap: React.FC<{
  account: Accounts;
  colorScheme: "yellow" | "cyan";
  title: string;
}> = ({ account, colorScheme, title }) => {
  const accountMapping: Record<keyof Accounts, string> = {
    account_id: "Id Akun",
    name: "Nama Aset",
    group: "Kategori Aset",
    currency: "Mata Uang Aset",
    amount: "Jumlah Awal Aset",
    color: "Warna Aset",
    created_at: "Dibuat Pada",
    description: "Deskripsi Aset",
    icon: "Icon Aset",
  };

  const accountKeys = Object.keys(account).filter((key) => key !== "icon-type" && key !== "created_at");

  return (
    <div
      className={`bg-${colorScheme}-100 border-4 border-dashed border-${colorScheme}-300 rounded-md p-4 text-${colorScheme}-600`}
    >
      <h3 className="font-ubuntu font-semibold underline underline-offset-2">
        {title}
      </h3>
      {accountKeys.map((key) => {
        // Diperlukan untuk memberikan tipe datanya
        let keyMap = key as keyof Accounts;
        if (key === "icon-value") keyMap = "icon";

        // Diperlukan untuk penyesuain keseragaman data
        account.amount = "Rp. " + formatCurrency(String(account.amount));

        // Conditional Rendering
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
