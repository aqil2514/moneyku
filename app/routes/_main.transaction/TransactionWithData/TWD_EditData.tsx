import React, { useState } from "react";
import { useFetcher } from "@remix-run/react";
import { BasicHTTPResponse, ErrorValidationResponse } from "~/@types/General";
import EditDataProvider from "../Providers/EditDataProvider";
import {
  AssetTransaction,
  CategoryTransaction,
  DateTransaction,
  FooterButtons,
  InOutCategory,
  MainId,
  NominalTransaction,
  NoteTransaction,
  TransactionId,
} from "../Components/EditDataComponents";
import { getErrors } from "../utils-client";
import Typography from "components/General/Typography";

interface EditPopupProps {
  index: number;
  header: string;
  setEditPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditPopup({
  index,
  header,
  setEditPopup,
}: EditPopupProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errors, setErrors] = useState<ErrorValidationResponse[]>([]); // Ini fix nanti
  const {
    dateTransaction,
    noteTransaction,
    typeTransaction,
    categoryTransaction,
    assetsTransaction,
    totalTransaction,
  } = getErrors(errors); // Ini fix juga nanti
  const fetcher = useFetcher<BasicHTTPResponse>();
  const isSubmitting = fetcher.state !== "idle";

  return (
    <EditDataProvider header={header} index={index}>
      <div className="popup">
        <div className="popup-edit">
          <div className="popup-edit-header">
            <h3>Edit Data</h3>
          </div>

          <div className="popup-edit-body relative">
            <fetcher.Form method="PUT" action="/api/transaction">
              <MainId />
              <TransactionId />
              <DateTransaction errorMessage={dateTransaction} header={header} />
              <InOutCategory errorMessage={typeTransaction} />
              <NominalTransaction errorMessage={totalTransaction} />
              <CategoryTransaction errorMessage={categoryTransaction} />
              <AssetTransaction errorMessage={assetsTransaction} />
              <NoteTransaction errorMessage={noteTransaction} />

              <FooterButtons setEditPopup={setEditPopup} />
            </fetcher.Form>
            {/* UI Loading nanti ajah */}
            {isSubmitting && (
              <div className="w-full h-full absolute top-0 left-0 opacity-45 bg-black rounded-xl flex justify-center items-center">
                <Typography
                  family="merriweather-bold"
                  variant="h3"
                  className="text-white"
                >
                  Editing...
                </Typography>
              </div>
            )}
          </div>
        </div>
      </div>
    </EditDataProvider>
  );
}
