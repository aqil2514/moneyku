import { Label } from "@radix-ui/react-label";
import { useFetcher } from "@remix-run/react";
import { Input } from "components/ui/input";
import { useState } from "react";
import { TypeTransaction } from "~/@types/Transaction";
import { TransactionType } from "../../Components/AddDataForm";
import { rupiahConvert } from "utils/client/general";
import { Textarea } from "components/ui/textarea";
import { Checkbox } from "components/ui/checkbox";
import { Calendar } from "components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import { FaRegCalendar } from "react-icons/fa";
import { formatDate } from "utils";

export default function AddDataForm() {
  const fetcher = useFetcher();
  const [category, setCategory] = useState<TypeTransaction>("Pemasukan");
  const [nominal, setNominal] = useState<string>("Rp. 0");
  const [isBill, setIsBill] = useState<boolean>(false);
  const [date, setDate] = useState<Date>();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    return rupiahConvert(e, setNominal);
  };

  return (
    <fetcher.Form>
      <TransactionType category={category} setCategory={setCategory} />
      <Input type="hidden" value={category} name="typeTransaction" readOnly />
      <Input
        type="hidden"
        value={date?.toISOString()}
        name="dateTransaction"
        readOnly
      />

      <p className="font-poppins my-2 cursor-default font-semibold underline text-xl">
        {" "}
        {category}
      </p>

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

      <Label htmlFor="transaction-name">Nama Transaksi</Label>
      <Input
        id="transaction-name"
        name="noteTransaction"
        placeholder={"Misal : Beli bensin"}
      />

      <Label htmlFor="transaction-nominal">Nominal Transaksi</Label>
      <Input
        id="transaction-nominal"
        name="totalTransaction"
        value={nominal}
        onChange={changeHandler}
      />

      {category === "Transfer" && (
        <>
          {isBill && (
            <div>
              <Label htmlFor="transaction-bill">Nominal Biaya</Label>
              <Input
                id="transaction-bill"
                name="billTransaction"
                value={nominal}
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
      )}

      <Label htmlFor="transaction-category">Kategori Transaksi</Label>
      <Input
        id="transaction-category"
        name="categoryTransaction"
        placeholder="Misal : Transportasi"
      />

      <Label htmlFor="from-asset">Dari Aset</Label>
      <Input
        id="from-asset"
        name="fromAsset"
        placeholder="Misal : Dompet Transportasi"
      />

      {category === "Transfer" && (
        <>
          <Label htmlFor="to-asset">Ke Aset</Label>
          <Input
            id="to-asset"
            name="toAsset"
            placeholder="Misal : Dompet Transportasi"
          />
        </>
      )}

      <Label htmlFor="transaction-description">Deskripsi Transaksi</Label>
      <Textarea
        placeholder="Misal: Bensin pertamax fulltank"
        id="transaction-description"
        name="descriptionTransaction"
      />
    </fetcher.Form>
  );
}
