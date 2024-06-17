import React, { useCallback, useEffect, useState } from "react";
import {
  TransactionBodyType,
  TransactionType,
  useTransactionData,
} from "./route";
import { IoIosWarning } from "react-icons/io";
import axios, { isAxiosError } from "axios";
import { useFetcher } from "@remix-run/react";
import Button from "components/Inputs/Button";

const SelectedData = ({ data }: { data: TransactionBodyType }) => {
  return (
    <div>
      <p>
        <strong>Aset : </strong> {data.asset}
      </p>
      <p>
        <strong>Kategori : </strong> {data.category}
      </p>
      <p>
        <strong>Item : </strong> {data.item}
      </p>
      <p>
        <strong>Harga : </strong> {data.price}
      </p>
    </div>
  );
};

export default function DeletePopup({
  header,
  setDeletePopup,
  index,
}: {
  header: string;
  setDeletePopup: React.Dispatch<React.SetStateAction<boolean>>;
  index: number;
}) {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const { data } = useTransactionData();
  const [globalData, setGlobalData] = useState<TransactionType>();
  const [selectedData, setSelectedData] = useState<TransactionBodyType>();
  const dateOption: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    weekday: "long",
    month: "long",
    year: "numeric",
  };

  const getData = useCallback(
    (header: string) => {
      const sameGlobal = data.find((d) => d.header === header);
      if (!sameGlobal)
        throw new Error("Terjadi kesalahan saat pengambilan data");
      setGlobalData(sameGlobal);
      setSelectedData(globalData?.body[index]);
    },
    [index, data, globalData]
  );

  useEffect(() => {
    getData(header);
  }, [header, globalData, selectedData, getData]);

  const deleteHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    try {
      const res = await axios.delete(`/api/transaction`, { data: formData });

      console.info(res);
      location.reload();
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error);
      }
    }
  };

  return (
    <div className="popup">
      <div className="popup-delete">
        <div className="popup-delete-header">
          <h3>Data yang akan dihapus</h3>
        </div>
        <div className="popup-delete-body">
          {globalData ? (
            <p>
              <strong>Dibuat pada :</strong>{" "}
              {new Date(globalData.header).toLocaleDateString(
                "id-ID",
                dateOption
              )}
            </p>
          ) : null}
          {selectedData ? <SelectedData data={selectedData} /> : <p>Loading</p>}
        </div>
        <div className="popup-delete-footer">
          <div className="alert alert-warning">
            <IoIosWarning />
            <p>
              <strong>Warning :</strong> Data yang dihapus tidak dapat
              dikembalikan
            </p>
          </div>
          <div className="container container-flex">
            <Button color="primary"
              onClick={() => setDeletePopup(false)}
            >
              Batal
            </Button>
            <fetcher.Form method="DELETE" onSubmit={deleteHandler}>
              <input type="hidden" name="main-id" id="main-id" value={globalData?.id} />
              <input
                type="hidden"
                name="transaction-uid"
                id="transaction-uid"
                value={selectedData?.uid}
              />
              <Button color="error" disabled={isSubmitting}>
                {isSubmitting ? "Menghapus Data..." : "Hapus Data"}
              </Button>
            </fetcher.Form>
          </div>
        </div>
      </div>
    </div>
  );
}
