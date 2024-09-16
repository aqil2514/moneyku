import React from "react";
import {
  Transaction,
} from "~/@types/Transaction-Experimental";
import { currencyFormat, dateFormat } from "utils/general";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { Badge } from "components/ui/badge";
import { ScrollArea } from "components/ui/scroll-area";
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
import { BiInfoCircle } from "react-icons/bi";
import Button from "components/Inputs/Button";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CiEdit, CiSettings } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "components/ui/sheet";
import { RadioGroup, RadioGroupItem } from "components/ui/radio-group";
import { Label } from "components/ui/label";
import { Logic_Amount, Logic_HeaderDate, Logic_TransactionData, Logic_TransactionDataBody, Logic_TransactionDetail } from "./logics";

dayjs.extend(localizedFormat);
dayjs.locale("id");

// <<<<< Inner Components >>>>>

const DetailRow: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => {
  return (
    <div className="flex justify-between">
      <h3 className="font-playfair-display">{label}</h3>
      <p className="font-poppins font-semibold">{value}</p>
    </div>
  );
};

const HeaderDate: React.FC<{ data: Transaction }> = ({ data }) => {
  const { dayDate, dayMonth, dayName, dayYear } = Logic_HeaderDate(data);

  return (
    <div className="flex gap-2 items-center">
      <p>{dayDate}</p>
      <Badge className="font-bold">{dayName}</Badge>
      <p>
        {dayMonth}.{dayYear}
      </p>
    </div>
  );
};

const HeaderIncome: React.FC<{ data: Transaction }> = ({ data }) => {
  const { amount } = Logic_Amount(data, "Income");

  return (
    <div className="text-blue-600 font-bold font-poppins">
      {currencyFormat.format(amount)}
    </div>
  );
};

const HeaderOutcome: React.FC<{ data: Transaction }> = ({ data }) => {
  const { amount } = Logic_Amount(data, "Outcome");

  return (
    <div className="text-red-600 font-bold font-poppins">
      {currencyFormat.format(amount)}
    </div>
  );
};

const TransactionDetail: React.FC<{ data: Transaction }> = ({ data }) => {
  const { assetName, categoryName } = Logic_TransactionDetail(data);

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
};

// <<<<< Exports Components >>>>>

export const TransactionConfig: React.FC = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button color="info" className="flex gap-1 items-center">
          <CiSettings />
          <p>Konfigurasi</p>
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-1/2">
        <SheetHeader>
          <SheetTitle>Pengaturan Transaksi</SheetTitle>
          <SheetDescription>
            Ubah pengaturan bagaimana data akan ditampilkan.
          </SheetDescription>
        </SheetHeader>
        <div>
          <h3>Urutkan data berdasatkan</h3>
          <RadioGroup defaultValue="filter-all">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="filter-all" id="filter-all" />
              <Label htmlFor="filter-all">Tampilkan semua</Label>
            </div>
          </RadioGroup>
          Lanjutin nanti. Tampilin data aja dulu
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button color="success" type="submit">
              Terapkan perubahan
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export const TransactionData: React.FC = () => {
  const { sortedData } = Logic_TransactionData();

  return (
    <ScrollArea className="w-full h-[480px] rounded-md mt-4">
      <main className="bg-white p-4 rounded-md flex flex-col gap-2">
        {sortedData.map((data) => (
          <TransactionDetail data={data} key={data.id} />
        ))}
      </main>
    </ScrollArea>
  );
};

export const TransactionDataHeader: React.FC<{ data: Transaction }> = ({
  data,
}) => {
  return (
    <div className="grid grid-cols-2 border-b-2 border-t-2 border-black p-2">
      <HeaderDate data={data} />
      <div className="flex justify-between">
        <HeaderIncome data={data} />
        <HeaderOutcome data={data} />
      </div>
    </div>
  );
};

export const TransactionDataBody: React.FC<{ data: Transaction }> = ({
  data,
}) => {
  const { assetName, categoryName, colorMap } = Logic_TransactionDataBody(data);

  return (
    <div className="grid grid-cols-3">
      <div className="font-poppins font-semibold flex items-center">
        <p>{categoryName ? categoryName : "Nama Kategori"}</p>
      </div>
      <div className="font-poppins font-semibold flex flex-col text-center items-center justify-center">
        <p>{data.name_transaction}</p>
        {/* Nanti tampilinnya langsung nama aset ajah, jangan kode begini */}
        <p>{assetName ? assetName : "Nama Aset"}</p>
      </div>
      <div
        className={`font-semibold font-poppins flex justify-end items-center ${
          colorMap[data.type_transaction]
        }`}
      >
        <p>{currencyFormat.format(data.nominal.amount)}</p>
      </div>
    </div>
  );
};
