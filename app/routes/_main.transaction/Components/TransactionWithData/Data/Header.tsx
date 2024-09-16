import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/id";

import { Transaction } from "~/@types/Transaction-Experimental";
import { Badge } from "components/ui/badge";
import React from "react";
import { currencyFormat } from "utils/general";

dayjs.extend(localizedFormat);
dayjs.locale("id");

const HeaderDate: React.FC<{ data: Transaction }> = ({ data }) => {
  const date = dayjs(data.transaction_at);

  const dayName = date.format("dddd");
  const dayDate = date.format("DD");
  const dayMonth = date.format("MM");
  const dayYear = date.format("YYYY");
  return (
    <div className="flex gap-2 items-center">
      <p>{dayDate}</p>
      <Badge className="font-bold">{dayName}</Badge>
      <p>
        {dayMonth}.{dayYear}
      </p>
    </div>
  );
};

const HeaderIncome: React.FC<{ data: Transaction }> = ({ data }) => {
  const amount = data.type_transaction === "Income" ? data.nominal.amount : 0;

  return (
    <div className="text-blue-600 font-bold font-poppins">
      {currencyFormat.format(amount)}
    </div>
  );
};

const HeaderOutcome: React.FC<{ data: Transaction }> = ({ data }) => {
    const amount = data.type_transaction === "Outcome" ? data.nominal.amount : 0;

  return (
    <div className="text-red-600 font-bold font-poppins">
      {currencyFormat.format(amount)}
    </div>
  );
};

export default function TransactionDataHeader({ data }: { data: Transaction }) {
  return (
    <div className="grid grid-cols-2 border-b-2 border-t-2 border-black p-2">
      <HeaderDate data={data} />
      <div className="flex justify-between">
      <HeaderIncome data={data} />
      <HeaderOutcome data={data} />
      </div>
    </div>
  );
}
