import { useFetcher } from "@remix-run/react";
import Button from "components/Inputs/Button";
import { useEffect, useState } from "react";
import { currencyFormat } from "utils/general";
import { AssetLists } from "./data";
import { useTransactionAddData } from "./Transaction";
import { BasicHTTPResponse, ErrorValidationResponse } from "~/@types/general";
import { getErrors } from "./utils";


const ErrorMessage = ({message}:{message:string | null | undefined}) => {
  return message && typeof message === "string" ? <em className="text-red-500">{message}</em> : <></>
}

// export default function OutcomeTransaction({ assetData }: { assetData: AssetsData[] }) {
//     const [nominal, setNominal] = useState<string>("");
//     const {errors} = useTransactionAddData();
//     const fetcher = useFetcher();
//     const isSubmitting = fetcher.state === "submitting";

//     const error = getErrors(errors as ErrorValidationResponse[]);
//     const {
//       dateTransaction,
//       noteTransaction,
//       categoryTransaction,
//       assetsTransaction,
//       totalTransaction,
//     } = error;
//     return (
//       <div className="main-page">
//         <fetcher.Form
//           className="form-basic"
//           action="/transaction/add?type=Pengeluaran"
//           method="post"
//         >
//           <input disabled={isSubmitting} type="hidden" name="type-data" value={"Pengeluaran"} />
//           <div className="form-date">
//             <label htmlFor="transaction-date">Tanggal Transaksi</label>
//             <input disabled={isSubmitting} type="date" name="transaction-date" id="transaction-date" />
//           </div>
//           <div className="form-text">
//             <label htmlFor="transaction-total">Nominal</label>
//             <input disabled={isSubmitting}
//               type="number"
//               value={nominal}
//               onChange={(e) => {
//                 setNominal(e.target.value);
//               }}
//               name="transaction-total"
//               id="transaction-total"
//             />
//             <p>
//               <strong>Jumlah dalam Rupiah : </strong>
//               {currencyFormat.format(Number(nominal))}
//             </p>
//           </div>
//           <div className="form-text">
//             <label htmlFor="transaction-category">Kategori Pengeluaran</label>
//             <input disabled={isSubmitting}
//               type="text"
//               name="transaction-category"
//               id="transaction-category"
//             />
//           </div>
//           <div className="form-text">
//             <label htmlFor="transaction-assets">Aset</label>
//             <input disabled={isSubmitting}
//               type="text"
//               name="transaction-assets"
//               id="transaction-assets"
//               list="asset-list"
//             />
//           </div>
//           <div className="form-text">
//             <label htmlFor="transaction-note">Catatan</label>
//             <input disabled={isSubmitting} type="text" name="transaction-note" id="transaction-note" />
//           </div>
//           <div>
//             <Button color="primary" disabled={isSubmitting}>
//               {isSubmitting ? "Menambah Pengeluaran..." : "Tambah Pengeluaran"}
//             </Button>
//           </div>
//         </fetcher.Form>
//         <AssetLists assetData={assetData} />
//       </div>
//     );
//   }
export default function OutcomeTransaction() {
  const [nominal, setNominal] = useState<string>("");
  const [fetcherData, setFetcherData] = useState<ErrorValidationResponse[]>([]);
  
  const fetcher = useFetcher<BasicHTTPResponse<ErrorValidationResponse[]>>();
  const isSubmitting = fetcher.state !== "idle";
  const { assetData } = useTransactionAddData();

  const errors = getErrors(fetcherData);
  const {
    assetsTransaction,
    categoryTransaction,
    dateTransaction,
    noteTransaction,
    totalTransaction,
  } = errors;
  
  useEffect(() =>{
    if(fetcher.data && fetcher.data.data){
      setFetcherData(fetcher.data.data)
    }
  }, [fetcher.data])

  return (
    <div className="main-page">
      <fetcher.Form
        className="form-basic"
        action="/transaction/add?type=Pengeluaran"
        method="post"
      >
        <input disabled={isSubmitting} type="hidden" name="type-data" value={"Pengeluaran"} />
        <div className="form-date">
          <label htmlFor="transaction-date">Tanggal Transaksi</label>
          <input disabled={isSubmitting} type="date" name="transaction-date" id="transaction-date" />
          <ErrorMessage message={dateTransaction} />
        </div>
        <div className="form-text">
          <label htmlFor="transaction-total">Nominal</label>
          <input disabled={isSubmitting}
            type="number"
            value={nominal}
            onChange={(e) => {
              setNominal(e.target.value);
            }}
            name="transaction-total"
            id="transaction-total"
          />
          <p>
            <strong>Jumlah dalam Rupiah : </strong>
            {currencyFormat.format(Number(nominal))}
          </p>
          <ErrorMessage message={totalTransaction} />
        </div>
        <div className="form-text">
          <label htmlFor="transaction-category">Kategori Pengeluaran</label>
          <input disabled={isSubmitting}
            type="text"
            name="transaction-category"
            id="transaction-category"
          />
                    <ErrorMessage message={categoryTransaction} />

        </div>
        <div className="form-text">
          <label htmlFor="transaction-assets">Aset</label>
          <input disabled={isSubmitting}
            type="text"
            name="transaction-assets"
            id="transaction-assets"
            list="asset-list"
          />
                    <ErrorMessage message={assetsTransaction} />
        </div>
        <div className="form-text">
          <label htmlFor="transaction-note">Catatan</label>
          <input disabled={isSubmitting} type="text" name="transaction-note" id="transaction-note" />
          <ErrorMessage message={noteTransaction} />
        </div>
        <div>
          <Button color="primary" disabled={isSubmitting}>
            {isSubmitting ? "Menambah Pengeluaran..." : "Tambah Pengeluaran"}
          </Button>
        </div>
      </fetcher.Form>
      <AssetLists assetData={assetData} />
    </div>
  );
}
