import { Button } from "components/ui/button";
import { Label } from "components/ui/label";
import { RadioGroup, RadioGroupItem } from "components/ui/radio-group";
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
import { CiSettings } from "react-icons/ci";

export function TransactionConfig() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex gap-1 items-center">
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
            <Button type="submit">Terapkan perubahan</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
