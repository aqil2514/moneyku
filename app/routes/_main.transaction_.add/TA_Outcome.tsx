import { useFetcher } from "@remix-run/react";
import Button from "components/Inputs/Button";
import { useState } from "react";
import { currencyFormat } from "utils/general";
import { AssetsData } from "~/@types/assets";
import { AssetLists } from "./data";

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
//           <input type="hidden" name="type-data" value={"Pengeluaran"} />
//           <div className="form-date">
//             <label htmlFor="transaction-date">Tanggal Transaksi</label>
//             <input type="date" name="transaction-date" id="transaction-date" />
//           </div>
//           <div className="form-text">
//             <label htmlFor="transaction-total">Nominal</label>
//             <input
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
//             <input
//               type="text"
//               name="transaction-category"
//               id="transaction-category"
//             />
//           </div>
//           <div className="form-text">
//             <label htmlFor="transaction-assets">Aset</label>
//             <input
//               type="text"
//               name="transaction-assets"
//               id="transaction-assets"
//               list="asset-list"
//             />
//           </div>
//           <div className="form-text">
//             <label htmlFor="transaction-note">Catatan</label>
//             <input type="text" name="transaction-note" id="transaction-note" />
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
export default function OutcomeTransaction({ assetData }: { assetData: AssetsData[] }) {
    const [nominal, setNominal] = useState<string>("");
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state !== "idle";
  
    return (
      <div className="main-page">
        <fetcher.Form
          className="form-basic"
          action="/transaction/add?type=Pengeluaran"
          method="post"
        >
          <input type="hidden" name="type-data" value={"Pengeluaran"} />
          <div className="form-date">
            <label htmlFor="transaction-date">Tanggal Transaksi</label>
            <input type="date" name="transaction-date" id="transaction-date" />
          </div>
          <div className="form-text">
            <label htmlFor="transaction-total">Nominal</label>
            <input
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
          </div>
          <div className="form-text">
            <label htmlFor="transaction-category">Kategori Pengeluaran</label>
            <input
              type="text"
              name="transaction-category"
              id="transaction-category"
            />
          </div>
          <div className="form-text">
            <label htmlFor="transaction-assets">Aset</label>
            <input
              type="text"
              name="transaction-assets"
              id="transaction-assets"
              list="asset-list"
            />
          </div>
          <div className="form-text">
            <label htmlFor="transaction-note">Catatan</label>
            <input type="text" name="transaction-note" id="transaction-note" />
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