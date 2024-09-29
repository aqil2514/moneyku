import { useFetcher } from "@remix-run/react";
import { useState } from "react";
import { getRandomHexColor, rupiahConvert } from "utils/client/general";
import { formatCurrency } from "utils/general";
import { IconType } from "~/@types/Assets-Experimental";

export const useDetailBodyFormEdit = () => {
  const fetcher = useFetcher();
  const [reviewPage, setReviewPage] = useState<boolean>(false);

  const setFormData = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget as HTMLButtonElement;
    const formElement = target.closest("form");

    if (!formElement) return;

    const form = new FormData(formElement);

    const formData: { [key: string]: FormDataEntryValue } = {};

    form.forEach((value, key) => {
      formData[key] = value;
    });

    const jsonFormData = JSON.stringify(formData);

    localStorage.setItem("edit-asset", jsonFormData);

    setReviewPage(true);
  };

  return { fetcher, setFormData, reviewPage, setReviewPage };
};

export const useDBFEC_AmountInput = (defaultValue: string) => {
  const [value, setValue] = useState<string>(
    "Rp. " + formatCurrency(defaultValue)
  );

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    rupiahConvert(e, setValue);

  return { value, changeHandler };
};

export const useDBFEC_ColorInput = (defaultValue: string) => {
  const [color, setColor] = useState<string>(defaultValue);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  const randomHandler = () => {
    const color = getRandomHexColor();

    setColor(color);
  };

  return { color, setColor, changeHandler, randomHandler };
};

export const useDBFEC_IconInput = () => {
  const [typeIcon, setTypeIcon] = useState<IconType>("default-icon");
  const [value, setValue] = useState<string>("");

  const changeTypeIcon = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget as HTMLButtonElement;
    const iconType = target.dataset.typeicon as typeof typeIcon;

    setTypeIcon(iconType);
    setValue("");
  };

  return { value, setValue, typeIcon, changeTypeIcon };
};
