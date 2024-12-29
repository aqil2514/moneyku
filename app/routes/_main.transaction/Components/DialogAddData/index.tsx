import Button from "components/Inputs/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/ui/dialog";
import AddDataProvider from "../../Providers/AddDataProvider";
import AddDataForm from "./components";

export default function AddDataDialog() {
  return (
    <AddDataProvider>
      <Dialog>
        <DialogTrigger>
          <Button color="success">Tambah Data</Button>
        </DialogTrigger>
        <DialogContent className="max-w-5xl max-h-[600px] scrollbar-hide overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>Tambah Data</DialogTitle>
            <DialogDescription>Tambahkan data transaksi</DialogDescription>
          </DialogHeader>

          {/* FORM */}
          <AddDataForm
            AddButton={<AddData />}
            AddMoreButton={<AddMoreData />}
            CloseButton={<CloseForm />}
          />
        </DialogContent>
      </Dialog>
    </AddDataProvider>
  );
}

// TODO : Buat logic ini
const AddData = () => {
  return (
    <Button color="success" title="Menambahkan data catatan transaksi baru">
      Tambah
    </Button>
  );
};

const AddMoreData = () => {
  {
    /* TODO : Buat logic ini */
  }
  return (
    <Button
      color="info"
      title="Menambahkan data catatan transaksi baru dan membuat baru lagi"
    >
      Buat Lagi
    </Button>
  );
};

const CloseForm = () => (
  <DialogClose
    title="Batalkan penambahan data"
    className="flex gap-1 items-center px-4 py-2 rounded transition duration-200 bg-red-600 text-white hover:bg-red-700"
  >
    Kembali
  </DialogClose>
);
