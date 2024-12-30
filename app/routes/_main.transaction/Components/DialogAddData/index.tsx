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
import React, {
  createContext,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface DialogContextProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

const DialogContext = createContext<DialogContextProps>(
  {} as DialogContextProps
);

export default function AddDataDialog() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <AddDataProvider>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button color="success">Tambah Data</Button>
        </DialogTrigger>
        <DialogContent className="max-w-5xl max-h-[600px] scrollbar-hide overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>Tambah Data</DialogTitle>
            <DialogDescription>Tambahkan data transaksi</DialogDescription>
          </DialogHeader>

          {/* Penggunaan Context bawaan React agar tidak perlu penambahan props pada komponen props */}
          <DialogContext.Provider value={{ open, setOpen }}>
            {/* FORM */}
            <AddDataForm
              AddButton={<AddData />}
              AddMoreButton={<AddMoreData />}
              CloseButton={<CloseForm />}
            />
          </DialogContext.Provider>
        </DialogContent>
      </Dialog>
    </AddDataProvider>
  );
}

// TODO : Buat logic ini
const AddData = () => {
  const { setOpen } = useContext(DialogContext);

  const clickHandler = () => {
    setOpen(false);
  };

  return (
    <Button
      color="success"
      onClick={clickHandler}
      title="Menambahkan data catatan transaksi baru"
    >
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
