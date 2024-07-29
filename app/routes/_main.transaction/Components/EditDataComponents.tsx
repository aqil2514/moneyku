import { useT_EditData } from "../Providers/EditDataProvider";

export const MainId = () => {
  const { globalData } = useT_EditData();
  return <input type="hidden" name="main-id" defaultValue={globalData.id} />;
};

export const TransactionId = () => {
  const { selectedData } = useT_EditData();
  return (
    <input
      type="hidden"
      name="transaction-uid"
      defaultValue={selectedData?.uid}
    />
  );
};

export const DateTransaction = ({
  header,
  errorMessage,
}: {
  header: string;
  errorMessage: string | undefined;
}) => {
  const { formattedDate } = useT_EditData();
  return (
    <div className="form-date">
      <label htmlFor="transaction-date">Tanggal Transaksi</label>
      <input
        type="date"
        name="transaction-date"
        id="transaction-date"
        defaultValue={formattedDate(header)}
      />
      {errorMessage && <em style={{ color: "red" }}>{errorMessage}</em>}
    </div>
  );
};
