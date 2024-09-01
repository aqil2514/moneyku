import { useFetcher } from "@remix-run/react";
import { Input } from "components/ui/input";
import {
  FormBill,
  FormCalendar,
  FormCategory,
  FormDescription,
  FormFromAsset,
  FormName,
  FormNominal,
  FormTitle,
  FormToAsset,
  TransactionType,
} from "../../Components/AddDataForm";
import { useFormData } from "./AddDataProvider";

export default function AddDataForm() {
  const fetcher = useFetcher();
  const { category, date } = useFormData();

  return (
    <fetcher.Form>
      <TransactionType />
      <Input type="hidden" value={category} name="typeTransaction" readOnly />
      <Input
        type="hidden"
        value={date?.toISOString()}
        name="dateTransaction"
        readOnly
      />

      <FormTitle />
      <FormCalendar />
      <FormName />
      <FormNominal />

      {category === "Transfer" && <FormBill />}

      <FormCategory />

      <FormFromAsset />

      {category === "Transfer" && <FormToAsset />}

      <FormDescription />
    </fetcher.Form>
  );
}
