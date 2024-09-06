import { currencyFormat } from "utils/general";
import { Transaction, TypeTransaction } from "~/@types/Transaction-Experimental";

export default function TransactionDataBody({ data }: { data: Transaction }) {
    const colorMap:Record<TypeTransaction, string> = {
        Income: "text-blue-500",
        Outcome: "text-red-500",
        Transfer: "text-black"
    }
  return (
    <div className="grid grid-cols-3">
      <div className="font-poppins font-semibold flex items-center">
        {/* Nanti tampilinnya langsung nama kategori ajah, jangan kode begini */}
        <p>{data.category_id}</p>
      </div>
      <div className="font-poppins font-semibold flex flex-col text-center items-center justify-center">
        <p>{data.name_transaction}</p>
        {/* Nanti tampilinnya langsung nama aset ajah, jangan kode begini */}
        <p>{data.nominal.account_id}</p>
      </div>
      <div className={`font-semibold font-poppins flex justify-end items-center ${colorMap[data.type_transaction]}`}>
        <p>{currencyFormat.format(data.nominal.amount)}</p>
      </div>
    </div>
  );
}
