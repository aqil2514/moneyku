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
import AddDataProvider, { useFormData } from "../../Providers/AddDataProvider";
import AddDataForm from "./components";
import React, {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { FetcherWithComponents, useFetcher } from "@remix-run/react";
import { BasicHTTPResponse } from "~/@types/General";

interface DialogContextProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  fetcher: FetcherWithComponents<BasicHTTPResponse>;
}

export const DialogContext = createContext<DialogContextProps>(
  {} as DialogContextProps
);

export default function AddDataDialog() {
  const [open, setOpen] = useState<boolean>(false);
  const fetcher = useFetcher<BasicHTTPResponse>();

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
          <DialogContext.Provider value={{ open, setOpen, fetcher }}>
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

// TODO : FIX BUG  DI SNI
const AddData = () => {
  const { setOpen, fetcher } = useContext(DialogContext);
  const isLoading = fetcher.state !== "idle";

  useEffect(() => {
    if (fetcher.data && fetcher.data.status === "success") {
      setOpen(false);
    }
  }, [fetcher.data, setOpen]);

  const clickHandler = () => {
    if (!fetcher.data) return;

    console.log(fetcher.data)

    const status = fetcher.data.status;
    if (status === "error") {
      setOpen(true);
    }
  };

  return (
    <Button
      color="success"
      onClick={clickHandler}
      disabled={isLoading}
      title="Menambahkan data catatan transaksi baru"
    >
      {isLoading ? "Menambah Data..." : "Tambah"}
    </Button>
  );
};

// TODO : FIX BUG  DI SNI

const AddMoreData = () => {
  const { fetcher, setOpen } = useContext(DialogContext);
  const { formRef } = useFormData();
  const isLoading = fetcher.state !== "idle";

  useEffect(() => {
    if (fetcher.data && fetcher.data.status === "success" && formRef.current) {
      formRef.current.reset();  
      setOpen(true);
    }
  }, [fetcher.data, formRef, setOpen]);

  const clickHandler = () => {
    if (!fetcher.data) return;

    const status = fetcher.data.status;
    if (status === "success") {
      console.log(fetcher.data)
      formRef.current?.reset(); 
    }
  };

  return (
    <Button
      color="info"
      disabled={isLoading}
      onClick={clickHandler}
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
