import React from "react";
import { FormAccounts } from "~/@types/Assets-Experimental";
import { useDBFE_Review } from "./logics";
import Button from "components/Inputs/Button";
import { DataMap } from "./components";

export default function FormEditReview({
  setReviewPage,
  oldData,
  isLoading
}: {
  setReviewPage: React.Dispatch<React.SetStateAction<boolean>>;
  oldData: FormAccounts;
  isLoading: boolean;
}) {
  const { formData, backHandler } = useDBFE_Review(setReviewPage);

  return (
    <div className="flex flex-col gap-4 my-4">
      {formData && (
        <div className="grid grid-cols-2 gap-4">
          <DataMap account={oldData} colorScheme="yellow" title="Data Lama" />
          <DataMap account={formData} colorScheme="cyan" title="Data Baru" />
        </div>
      )}

      <div className="flex gap-4">
        <Button color="info" onClick={backHandler} disabled={isLoading}>
          Kembali
        </Button>
        <Button color="success" disabled={isLoading}>{isLoading ? "Mengubah Data..." : "Ubah Data"}</Button>
      </div>
    </div>
  );
}
