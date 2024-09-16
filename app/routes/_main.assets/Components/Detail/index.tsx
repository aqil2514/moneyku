import { Badge } from "components/ui/badge";
import { DialogTitle } from "components/ui/dialog";
import { formatDate } from "utils";
import { Accounts } from "~/@types/Assets-Experimental";
import { useAssetData } from "../../Core/MainProvider";
import { HeaderAsset } from "./components";

export default function AssetDetail({ account }: { account: Accounts }) {
    const {transactionsData} = useAssetData();
    console.log(transactionsData.filter((transaction) => transaction.nominal.account_id === account.account_id))
  return (
    <>
      <DialogTitle>
        <HeaderAsset account={account} />
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
