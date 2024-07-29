import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useRevalidator } from "@remix-run/react";
import { ErrorValidationResponse } from "~/@types/General";
import { TransactionBodyType, TransactionType } from "~/@types/Transaction";
import Button from "components/Inputs/Button";
import { useTransactionData } from "../Transactions";
import EditDataProvider from "../Providers/EditDataProvider";
import {
  DateTransaction,
  MainId,
  TransactionId,
} from "../Components/EditDataComponents";
import { getErrors } from "../utils-client";

interface EditPopupProps {
  index: number;
  header: string;
  setEditPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

// Ini berantakan nih. Rapihin nanti
// export default function EditPopup({
//   index,
//   header,
//   setEditPopup,
// }: EditPopupProps) {
//   const { data } = useTransactionData();
//   const [globalData, setGlobalData] = useState<TransactionType>();
//   const [selectedData, setSelectedData] = useState<TransactionBodyType>();
//   const [priceChecked, setPriceChecked] = useState<
//     "Pemasukan" | "Pengeluaran" | string
//   >("");
//   const [errors, setErrors] = useState<ErrorValidationResponse[]>([]);
//   const revalidator = useRevalidator();
//   const {
//     dateTransaction,
//     noteTransaction,
//     typeTransaction,
//     categoryTransaction,
//     assetsTransaction,
//     totalTransaction,
//   } = getErrors(errors);

//   const getData = useCallback(
//     (header: string) => {
//       const sameGlobal = data.find((d) => d.header === header);
//       if (!sameGlobal)
//         throw new Error("Terjadi kesalahan saat pengambilan data");
//       setGlobalData(sameGlobal);
//       setSelectedData(globalData?.body[index]);
//       if (selectedData) {
//         const category = selectedData.price > 0 ? "Pemasukan" : "Pengeluaran";

//         setPriceChecked(category);
//       }
//     },
//     [index, data, globalData, selectedData]
//   );

//   const formattedDate = (header: string) => {
//     const date = new Date(header);

//     const result = date.toISOString().split("T")[0];

//     return result;
//   };

//   useEffect(() => {
//     getData(header);
//   }, [header, globalData, selectedData, getData]);

//   const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.target as HTMLFormElement);

//     const res = await axios.putForm("/api/transaction", formData);
//     const data = res.data.response;

//     if (!data.success) {
//       revalidator.revalidate();
//       setErrors(data.data);
//     } else {
//       revalidator.revalidate();
//       setEditPopup(false);
//     }
//   };

//   return (
//     <div className="popup">
//       <div className="popup-edit">
//         <div className="popup-edit-header">
//           <h3>Edit Data</h3>
//         </div>

//         <div className="popup-edit-body">
//           <form onSubmit={submitHandler}>
//             <input type="hidden" name="main-id" defaultValue={globalData?.id} />
//             <input
//               type="hidden"
//               name="transaction-uid"
//               defaultValue={selectedData?.uid}
//             />
//             <div className="form-date">
//               <label htmlFor="transaction-date">Tanggal Transaksi</label>
//               <input
//                 type="date"
//                 name="transaction-date"
//                 id="transaction-date"
//                 defaultValue={formattedDate(header)}
//               />
//               <em style={{ color: "red" }}>{dateTransaction}</em>
//             </div>

//             <div className="form-navigation">
//               <input
//                 type="radio"
//                 name="transaction-type"
//                 id="income-type"
//                 value={"Pemasukan"}
//                 onChange={() => setPriceChecked("Pemasukan")}
//                 checked={priceChecked === "Pemasukan"}
//               />
//               <label htmlFor="income-type">Pemasukan</label>
//               <input
//                 type="radio"
//                 name="transaction-type"
//                 id="outcome-type"
//                 value={"Pengeluaran"}
//                 onChange={() => setPriceChecked("Pengeluaran")}
//                 checked={priceChecked === "Pengeluaran"}
//               />
//               <label htmlFor="outcome-type">Pengeluaran</label>
//               <em style={{ color: "red" }}>{typeTransaction}</em>
//             </div>

//             <div className="form-text">
//               <label htmlFor="transaction-total">Total</label>
//               <input
//                 type="text"
//                 name="transaction-total"
//                 id="transaction-total"
//                 defaultValue={
//                   selectedData && String(selectedData.price).replace("-", "")
//                 }
//               />
//               <em style={{ color: "red" }}>{totalTransaction}</em>
//             </div>
//             <div className="form-text">
//               <label htmlFor="transaction-category">
//                 Kategori {priceChecked}
//               </label>
//               <input
//                 type="text"
//                 name="transaction-category"
//                 id="transaction-category"
//                 defaultValue={selectedData?.category}
//               />
//               <em style={{ color: "red" }}>{categoryTransaction}</em>
//             </div>
//             <div className="form-text">
//               <label htmlFor="transaction-assets">Aset</label>
//               <input
//                 type="text"
//                 name="transaction-assets"
//                 id="transaction-assets"
//                 defaultValue={selectedData?.asset}
//               />
//               <em style={{ color: "red" }}>{assetsTransaction}</em>
//             </div>
//             <div className="form-text">
//               <label htmlFor="transaction-note">Catatan</label>
//               <input
//                 type="text"
//                 name="transaction-note"
//                 id="transaction-note"
//                 defaultValue={selectedData?.item}
//               />
//               <em style={{ color: "red" }}>{noteTransaction}</em>
//               <div className="popup-edit-footer" style={{ margin: "1rem 0" }}>
//                 <div className="container container-flex">
//                   <Button color="success">Edit Data</Button>

//                   <Button
//                     color="error"
//                     type="button"
//                     onClick={() => setEditPopup(false)}
//                   >
//                     Batal
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
export default function EditPopup({
  index,
  header,
  setEditPopup,
}: EditPopupProps) {
  const { data } = useTransactionData();
  const [globalData, setGlobalData] = useState<TransactionType>();
  const [selectedData, setSelectedData] = useState<TransactionBodyType>();
  const [priceChecked, setPriceChecked] = useState<
    "Pemasukan" | "Pengeluaran" | string
  >("");
  const [errors, setErrors] = useState<ErrorValidationResponse[]>([]);
  const revalidator = useRevalidator();
  const {
    dateTransaction,
    noteTransaction,
    typeTransaction,
    categoryTransaction,
    assetsTransaction,
    totalTransaction,
  } = getErrors(errors);

  const getData = useCallback(
    (header: string) => {
      const sameGlobal = data.find((d) => d.header === header);
      if (!sameGlobal)
        throw new Error("Terjadi kesalahan saat pengambilan data");
      setGlobalData(sameGlobal);
      setSelectedData(globalData?.body[index]);
      if (selectedData) {
        const category = selectedData.price > 0 ? "Pemasukan" : "Pengeluaran";

        setPriceChecked(category);
      }
    },
    [index, data, globalData, selectedData]
  );

  useEffect(() => {
    getData(header);
  }, [header, globalData, selectedData, getData]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const res = await axios.putForm("/api/transaction", formData);
    const data = res.data.response;

    if (!data.success) {
      revalidator.revalidate();
      setErrors(data.data);
    } else {
      revalidator.revalidate();
      setEditPopup(false);
    }
  };

  return (
    <EditDataProvider header={header} index={index}>
      <div className="popup">
        <div className="popup-edit">
          <div className="popup-edit-header">
            <h3>Edit Data</h3>
          </div>

          <div className="popup-edit-body">
            <form onSubmit={submitHandler}>
              <MainId />
              <TransactionId />
              <DateTransaction errorMessage={dateTransaction} header={header} />

              {/* Next lanjutin ini */}

              <div className="form-navigation">
                <input
                  type="radio"
                  name="transaction-type"
                  id="income-type"
                  value={"Pemasukan"}
                  onChange={() => setPriceChecked("Pemasukan")}
                  checked={priceChecked === "Pemasukan"}
                />
                <label htmlFor="income-type">Pemasukan</label>
                <input
                  type="radio"
                  name="transaction-type"
                  id="outcome-type"
                  value={"Pengeluaran"}
                  onChange={() => setPriceChecked("Pengeluaran")}
                  checked={priceChecked === "Pengeluaran"}
                />
                <label htmlFor="outcome-type">Pengeluaran</label>
                <em style={{ color: "red" }}>{typeTransaction}</em>
              </div>

              <div className="form-text">
                <label htmlFor="transaction-total">Total</label>
                <input
                  type="text"
                  name="transaction-total"
                  id="transaction-total"
                  defaultValue={
                    selectedData && String(selectedData.price).replace("-", "")
                  }
                />
                <em style={{ color: "red" }}>{totalTransaction}</em>
              </div>
              <div className="form-text">
                <label htmlFor="transaction-category">
                  Kategori {priceChecked}
                </label>
                <input
                  type="text"
                  name="transaction-category"
                  id="transaction-category"
                  defaultValue={selectedData?.category}
                />
                <em style={{ color: "red" }}>{categoryTransaction}</em>
              </div>
              <div className="form-text">
                <label htmlFor="transaction-assets">Aset</label>
                <input
                  type="text"
                  name="transaction-assets"
                  id="transaction-assets"
                  defaultValue={selectedData?.asset}
                />
                <em style={{ color: "red" }}>{assetsTransaction}</em>
              </div>
              <div className="form-text">
                <label htmlFor="transaction-note">Catatan</label>
                <input
                  type="text"
                  name="transaction-note"
                  id="transaction-note"
                  defaultValue={selectedData?.item}
                />
                <em style={{ color: "red" }}>{noteTransaction}</em>
                <div className="popup-edit-footer" style={{ margin: "1rem 0" }}>
                  <div className="container container-flex">
                    <Button color="success">Edit Data</Button>

                    <Button
                      color="error"
                      type="button"
                      onClick={() => setEditPopup(false)}
                    >
                      Batal
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </EditDataProvider>
  );
}

// function getErrors(errors: ErrorValidationResponse[]) {
//   const errorMap = new Map<keyof TransactionErrors, string>(
//     errors.map((e) => [e.path as keyof TransactionErrors, e.message])
//   );

//   const error: TransactionErrors = {
//     dateTransaction: errorMap.get("dateTransaction"),
//     typeTransaction: errorMap.get("typeTransaction"),
//     categoryTransaction: errorMap.get("categoryTransaction"),
//     assetsTransaction: errorMap.get("assetsTransaction"),
//     noteTransaction: errorMap.get("noteTransaction"),
//   };
//   return error;
// }
