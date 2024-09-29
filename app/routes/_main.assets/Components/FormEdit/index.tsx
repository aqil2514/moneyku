import { ScrollArea } from "@radix-ui/react-scroll-area";
import { FormAccounts } from "~/@types/Assets-Experimental";
import { useDetailBodyFormEdit } from "./logics";
import { DBFE_Edit } from "./components";
import FormEditReview from "../Review";

export default function DetailBodyFormEdit({ account }: { account: FormAccounts }) {
  const { fetcher, reviewPage, setFormData, setReviewPage } =
    useDetailBodyFormEdit();
  const isLoading = fetcher.state !== "idle";

  return (
    <ScrollArea className="max-h-[450px] animate-slide-left">
      <h3 className="text-center font-ubuntu text-xl font-bold underline">
        {reviewPage ? "Konfirmasi Edit Aset" : "Edit Aset"} {account.name}
      </h3>
      <fetcher.Form
        className="flex flex-col gap-4 pb-8"
        method="PUT"
        action="/api/asset/edit"
      >
        {!reviewPage ? (
          <DBFE_Edit
            isLoading={isLoading}
            setFormData={setFormData}
            account={account}
          />
        ) : (
          <FormEditReview setReviewPage={setReviewPage} oldData={account} isLoading={isLoading} />
        )}
      </fetcher.Form>
    </ScrollArea>
  );
}
