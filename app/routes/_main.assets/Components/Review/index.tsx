import React from "react";
import { Accounts } from "~/@types/Assets-Experimental";
import { useDBFE_Review } from "./logics";
import Button from "components/Inputs/Button";
import { DataMap } from "./components";

export default function FormEditReview({
  setReviewPage,
  oldData,
}: {
  setReviewPage: React.Dispatch<React.SetStateAction<boolean>>;
  oldData: Accounts;
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

      <div>
        <Button color="info" onClick={backHandler}>
          Kembali
        </Button>
      </div>
    </div>
  );
}
