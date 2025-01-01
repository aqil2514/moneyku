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
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { FetcherWithComponents, useFetcher } from "@remix-run/react";
import { BasicHTTPResponse } from "~/@types/General";
import { toast } from "react-toastify";

interface DialogContextProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  fetcher: FetcherWithComponents<BasicHTTPResponse>;
  isMultiple: boolean;
  setIsMultiple: React.Dispatch<SetStateAction<boolean>>;
}

export const DialogContext = createContext<DialogContextProps>(
  {} as DialogContextProps
);

export default function AddDataDialog() {
  const [open, setOpen] = useState<boolean>(false);
  const [isMultiple, setIsMultiple] = useState<boolean>(false);
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
          <DialogContext.Provider
            value={{ open, setOpen, fetcher, isMultiple, setIsMultiple }}
          >
            {/* FORM */}
            <AddDataForm AddButton={<AddData />} CloseButton={<CloseForm />} />
          </DialogContext.Provider>
        </DialogContent>
      </Dialog>
    </AddDataProvider>
  );
}

// Komponen button Tambah Data
const AddData = () => {
  const { setOpen, fetcher, isMultiple, setIsMultiple } =
    useContext(DialogContext);
  const { formRef, setCategory, setNominal, setNominalBill, setIsBill, setDate } = useFormData();
  const isLoading = fetcher.state !== "idle";

  const resetAllFields = useCallback(() => {
    setCategory("Pemasukan");
    setNominal("Rp. 0");
    setNominalBill("Rp. 0");
    setIsBill(false);
    setDate(undefined);
    formRef.current?.reset(); // Jika form memiliki elemen HTML yang perlu di-reset
  }, [setCategory, setNominal, setNominalBill, setIsBill, setDate, formRef]);

  useEffect(() => {
    if (!fetcher.data) return;

    const { status } = fetcher.data;

    if (status === "error") {
      setOpen(true);
    } else if (status === "success") {
      if (isMultiple && formRef.current) {
        setOpen(true);
        resetAllFields()
      } else if (!isMultiple) {
        setOpen(false);
        resetAllFields()
      }
      
      toast.success(fetcher.data.message)
      fetcher.load("/api/transaction")
    }
  }, [fetcher.data, setOpen, isMultiple, setIsMultiple, formRef, fetcher, resetAllFields]);

  return (
    <Button
      color="success"
      disabled={isLoading}
      title="Menambahkan data catatan transaksi baru"
    >
      {isLoading ? "Menambah Data..." : "Tambah"}
    </Button>
  );
};

// Komponen button tutup dialog
const CloseForm = () => (
  <DialogClose
    title="Batalkan penambahan data"
    className="flex gap-1 items-center px-4 py-2 rounded transition duration-200 bg-red-600 text-white hover:bg-red-700"
  >
    Kembali
  </DialogClose>
);
