import Button from "components/Inputs/Button";
import React from "react";
import { TypeTransaction } from "~/@types/Transaction";
import { useFormData } from "../../Providers/AddDataProvider";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import { FaRegCalendar } from "react-icons/fa";
import { formatDate } from "utils";
import { Calendar } from "components/ui/calendar";
import { Label } from "components/ui/label";
import { Input } from "components/ui/input";
import { rupiahConvert } from "utils/client/general";
import { Checkbox } from "components/ui/checkbox";
import { Textarea } from "components/ui/textarea";
import { useFetcher } from "@remix-run/react";

interface TransactionTypeSelectProps {
  label: TypeTransaction;
}

interface AddDataFormProps {
  AddButton: JSX.Element;
  AddMoreButton: JSX.Element;
  CloseButton: JSX.Element;
}

export default function AddDataForm({
  AddButton,
  AddMoreButton,
  CloseButton,
}: AddDataFormProps) {
  const fetcher = useFetcher();
  const { category, date, formRef } = useFormData();

  return (
    // TODO : Pastiin ini ini. formRef beneran berguna apa enggak?
    <fetcher.Form method="POST" action="/api/transaction" ref={formRef}>
      {/* Tipe-tipe transaksi yang akan dibuat (Pemasukan, Pengeluaran, dan Transfer) */}
      <TransactionType />

      {/* Tipe transaksi yang akan dipilih. Untuk keperluan server */}
      <Input type="hidden" value={category} name="typeTransaction" readOnly />

      {/* Tanggal transaksi. Untuk keperluan server */}
      <Input
        type="hidden"
        value={date?.toISOString()}
        name="dateTransaction"
        readOnly
      />

      {/* Judul form transaksi */}
      <FormTitle />

      {/* Waktu transaksi itu terjadi */}
      <FormCalendar />

      {/* Nama transaksinya */}
      <FormName />

      {/* Nominal transaksi */}
      <FormNominal />

      {/* Biaya administrasi. Hanya aktif jika kategorinya adalah transfer */}
      {category === "Transfer" && <FormBill />}

      {/* Kategori transaksi */}
      <FormCategory />

      {/* Aset transaksi itu berasal */}
      <FormFromAsset />

      {/* Tujuan aset. Hanya aktif jika kategorinya adalah transfer */}
      {category === "Transfer" && <FormToAsset />}

      {/* Deskripsi transaksi */}
      <FormDescription />

      <div className="flex gap-4 my-4">
        {/* Tambahkan data transaksi */}
        {AddButton}

        {/* Tambahkan data transaksi dan langsung buat lagi */}
        {AddMoreButton}

        {/* Tutup dan batalkan transaksi */}
        {CloseButton}
      </div>
    </fetcher.Form>
  );
}

export const TypeTransactionSelect: React.FC<TransactionTypeSelectProps> = ({
  label,
}) => {
  const { category, setCategory } = useFormData();
  return (
    <Button
      color="info"
      type="button"
      variant={category === label ? "outlined" : "contained"}
      onClick={() => setCategory(label)}
    >
      {label}
    </Button>
  );
};

export const TransactionType = () => {
  return (
    <div className="flex gap-2">
      <TypeTransactionSelect label="Pemasukan" />
      <TypeTransactionSelect label="Pengeluaran" />
      <TypeTransactionSelect label="Transfer" />
    </div>
  );
};

export const FormBill = () => {
  const { nominalBill, setNominalBill, isBill, setIsBill } = useFormData();
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    return rupiahConvert(e, setNominalBill);
  };

  return (
    <>
      {isBill && (
        <div>
          <Label htmlFor="transaction-bill">Nominal Biaya</Label>
          <Input
            id="transaction-bill"
            name="billTransaction"
            value={nominalBill}
            onChange={changeHandler}
          />
        </div>
      )}
      <div className="items-top flex space-x-2">
        <Checkbox
          id="isBilled"
          checked={isBill}
          onCheckedChange={(e) => (e ? setIsBill(true) : setIsBill(false))}
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="isBilled"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Ada biaya?
          </label>
          <p className="text-sm text-muted-foreground">
            Misal, biaya admin, biaya transfer antar bank, biaya jasa, dsb.
          </p>
        </div>
      </div>
    </>
  );
};

export const FormCalendar = () => {
  const { date, setDate } = useFormData();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="my-2 border-2 border-slate-300 flex gap-2 p-2 items-center bg-white rounded-md hover:bg-gray-100 transition-all duration-200">
          <FaRegCalendar className="text-gray-500" />
          <p className="text-gray-700">
            {date ? formatDate(date) : "Tanggal Transaksi"}
          </p>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
        />
      </PopoverContent>
    </Popover>
  );
};

export const FormCategory = () => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="transaction-category">Kategori Transaksi</Label>
      <Input
        id="transaction-category"
        name="categoryTransaction"
        placeholder="Misal : Transportasi"
      />
    </div>
  );
};

export const FormDescription = () => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="transaction-description">Deskripsi Transaksi</Label>
      <Textarea
        placeholder="Misal: Bensin pertamax fulltank"
        id="transaction-description"
        name="descriptionTransaction"
      />
    </div>
  );
};

export const FormFromAsset = () => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="from-asset">Dari Aset</Label>
      <Input
        id="from-asset"
        name="fromAsset"
        placeholder="Misal : Dompet Transportasi"
      />
    </div>
  );
};

export const FormName = () => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="transaction-name">Nama Transaksi</Label>
      <Input
        id="transaction-name"
        name="noteTransaction"
        placeholder={"Misal : Beli bensin"}
      />
    </div>
  );
};

export const FormNominal = () => {
  const { nominal, setNominal } = useFormData();
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    return rupiahConvert(e, setNominal);
  };
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="transaction-nominal">Nominal Transaksi</Label>
      <Input
        id="transaction-nominal"
        name="totalTransaction"
        value={nominal}
        onChange={changeHandler}
      />
    </div>
  );
};

export const FormToAsset = () => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="to-asset">Ke Aset</Label>
      <Input
        id="to-asset"
        name="toAsset"
        placeholder="Misal : Dompet Transportasi"
      />
    </div>
  );
};

export const FormTitle = () => {
  const { category } = useFormData();
  return (
    <p className="font-poppins my-2 cursor-default font-semibold underline text-xl">
      {" "}
      {category}
    </p>
  );
};
