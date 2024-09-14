import { Badge } from "components/ui/badge";
import { DialogDescription, DialogTitle } from "components/ui/dialog";
import { formatDate } from "utils";
import { Accounts } from "~/@types/Assets-Experimental";
import { useAssetData } from "../AssetsProvider";

export default function AssetDetail({ account }: { account: Accounts }) {
    const {transactionsData} = useAssetData();
    console.log(transactionsData.filter((transaction) => transaction.nominal.account_id === account.account_id))
  return (
    <>
      <DialogTitle>
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
      </DialogTitle>
      {/* Group ditampilkan di sini */}
      <div className="flex gap-2">
        <Badge>{account.group}</Badge>
        <p>Dibuat pada : {formatDate(account.created_at)}</p>
      </div>
      <div
        style={{ borderColor: account.color }}
        className="w-full border-t-[10px] border-double"
      />
      
    </>
  );
}
