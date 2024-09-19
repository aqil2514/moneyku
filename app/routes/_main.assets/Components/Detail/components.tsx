import { DialogDescription } from "components/ui/dialog";
import React from "react";
import { Accounts } from "~/@types/Assets-Experimental";
import { Logic_HeaderAssetDetail } from "./logics";
import { Badge } from "components/ui/badge";
import { formatDate } from "utils";

export const Header: React.FC<{ account: Accounts }> = ({ account }) => {
  const { imageUrl, setImageUrl } = Logic_HeaderAssetDetail();

  return (
    <figure className="w-full flex gap-2 items-center">
      <img
        src={imageUrl}
        onError={() => setImageUrl("/images/no-image.png")}
        style={{ backgroundColor: account.color }}
        alt="Icon aset belum ditambahkan"
        className="w-16 h-16 rounded-xl"
      />

      <div>
        <figcaption
          style={{ color: account.color }}
          className="font-playfair-display font-bold"
        >
          {account.name}
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
