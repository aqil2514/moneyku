import { DialogClose, DialogTitle } from "components/ui/dialog";
import { Accounts } from "~/@types/Assets-Experimental";
import { useAssetData } from "../../Core/MainProvider";
import { LimitBorder, Group, Header } from "./components";
import { TransactionDataHeader } from "~/routes/_main.transaction/Components/TransactionWithData/components";
import { currencyFormat } from "utils/general";
import { ScrollArea } from "components/ui/scroll-area";
import Button from "components/Inputs/Button";

export default function AssetDetail({ account }: { account: Accounts }) {
  const { transactionsData, categoriesData } = useAssetData();

  const transactions = transactionsData.filter(
    (transaction) => transaction.nominal.account_id === account.account_id
  );

  return (
    <div className="flex flex-col gap-4">
      <DialogTitle>
        <Header account={account} />
      </DialogTitle>
      <Group account={account} />
      <LimitBorder account={account} />
      <ScrollArea className="max-h-[300px] h-[300px]">
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
      <div className="flex gap-4">
        <DialogClose>
          <Button color="error">Tutup</Button>
        </DialogClose>
      </div>
    </div>
  );
}
