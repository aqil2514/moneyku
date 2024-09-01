import Button from "components/Inputs/Button";
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
import AddDataForm from "./Form";

export default function AddDataDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button color="success">Tambah Data</Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[600px] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Tambah Data</DialogTitle>
          <DialogDescription>Tambahkan data transaksi</DialogDescription>
        </DialogHeader>
        <AddDataForm />
        <DialogFooter>
          <DialogClose>
            <Button color="error">Kembali</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
