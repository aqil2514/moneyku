import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/ui/dialog";
import { Transaction } from "~/@types/Transaction-Experimental";
import TransactionDataHeader from "../Data/Header";
import TransactionDataBody from "../Data/Body,";
import { Badge } from "components/ui/badge";
import { BiInfoCircle } from "react-icons/bi";
import { currencyFormat, dateFormat } from "utils/general";
import Button from "components/Inputs/Button";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useTransactionData } from "../../../Core/MainProvider";

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <h3 className="font-playfair-display">{label}</h3>
      <p className="font-poppins font-semibold">{value}</p>
    </div>
  );
}

export default function TransactionDetail({ data }: { data: Transaction }) {
  const { data: generalData } = useTransactionData();
  const assetName = generalData.accounts.find(
    (account) => account.account_id === data.nominal.account_id
  )?.name;
  const categoryName = generalData.categories.find((category) => category.category_id === data.category_id)?.name
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          key={data.id}
          className="duration-200 p-4 rounded-md hover:cursor-pointer hover:bg-slate-200"
        >
          <TransactionDataHeader data={data} />
          <TransactionDataBody data={data} />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="relative">
          <div className="absolute w-full h-20 -z-10 rounded-b-full rounded-t-md opacity-50 bg-lime-200 -top-[10%] left-0" />
          <DialogTitle className="text-center">Detail Transaksi</DialogTitle>
          <DialogDescription className="text-center">
            Lihat Detail Transaksi {data.name_transaction}
          </DialogDescription>
          {/* Ini tuh nantinya harus ada pemeriksaan . Apakah di asetnya memiliki icon? Jika tidak buat yang di dengn huruf pertama dari nama ase , */}
          <div className="rounded-full bg-lime-400 h-16 w-16 mx-auto flex flex-col text-center items-center justify-center">
            <p className="text-white font-playfair-display">I</p>
          </div>
          <div className="flex justify-center gap-2 mt-2">
            <Badge>{assetName ? assetName : "Nama Aset"}</Badge>
            <Badge>{data.type_transaction}</Badge>
            <Badge>{categoryName ? categoryName : "Nama Kategori"}</Badge>
          </div>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <div className="bg-slate-100 px-4 py-2 rounded-lg flex gap-4 items-center font-bold">
            <BiInfoCircle />
            <h3 className="font-playfair-display">Detail Transaksi</h3>
          </div>
          <DetailRow label="Nama Transaksi" value={data.name_transaction} />
          <DetailRow
            label="Nominal"
            value={currencyFormat.format(data.nominal.amount)}
          />
          <DetailRow
            label="Tanggal Transaksi"
            value={dateFormat(data.transaction_at)}
          />
          <div className="w-full h-1 bg-slate-100" />
          <div>
            <h3 className="font-playfair-display">Detail</h3>
            <p className="font-poppins">{data.description}</p>
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button color="success" startIcon={<IoIosCloseCircleOutline />}>
              Tutup
            </Button>
          </DialogClose>
          <Button
            color="info"
            startIcon={<CiEdit />}
            onClick={() => alert("Under Development")}
          >
            Edit
          </Button>
          <Button
            color="error"
            startIcon={<MdDelete />}
            onClick={() => alert("Under DEvelopment")}
          >
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
