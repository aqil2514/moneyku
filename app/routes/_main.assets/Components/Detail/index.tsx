import { DialogClose, DialogTitle } from "components/ui/dialog";
import { Accounts } from "~/@types/Assets-Experimental";
import { LimitBorder, Group, Header, DetailBody } from "./components";
import Button from "components/Inputs/Button";
import AssetDetailProvider from "../../Providers/AssetDetailProvider";

export default function AssetDetail({ account }: { account: Accounts }) {
  return (
    <AssetDetailProvider>
      <div className="flex flex-col gap-4 overflow-x-hidden">
        <DialogTitle>
          <Header account={account} />
        </DialogTitle>
        <Group account={account} />
        <LimitBorder account={account} />
        <DetailBody account={account} />
        <div className="flex gap-4">
          <DialogClose>
            <Button color="error">Tutup</Button>
          </DialogClose>
        </div>
      </div>
    </AssetDetailProvider>
  );
}
