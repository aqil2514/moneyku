import { DialogDescription } from "components/ui/dialog";
import React from "react";
import { Accounts } from "~/@types/Assets-Experimental";

export const HeaderAsset:React.FC<{account:Accounts}> = ({account}) => {
    return(
        <figure className="w-full flex gap-2 items-center">
          <img
            src="/images/no-image.png"
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
    )
}