import React, { useEffect, useState } from "react";
import { useAssetDetailData } from "../../Providers/AssetDetailProvider";
import { useFetcher, useSearchParams } from "@remix-run/react";
import { getRandomHexColor, rupiahConvert } from "utils/client/general";
import { formatCurrency } from "utils/general";

export const useDetailBodyFormEdit = () => {
  const fetcher = useFetcher();

  return { fetcher };
};

export const useDBFE_AmountInput = (defaultValue: string) => {
  const [value, setValue] = useState<string>(
    "Rp. " + formatCurrency(defaultValue)
  );

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    rupiahConvert(e, setValue);

  return { value, changeHandler };
};

export const useDBFE_ColorInput = (defaultValue: string) => {
  const [color, setColor] = useState<string>(defaultValue);

  const changeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  }

  const randomHandler = () => {
    const color = getRandomHexColor();

    setColor(color)
  }

  return {color, setColor, changeHandler, randomHandler};
};

export const useHeader = () => {
  const { isEditing, setIsEditing } = useAssetDetailData();
  const [imageUrl, setImageUrl] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [urlSearchParams, setURLSearchParams] = useSearchParams();

  useEffect(() => {
    const actionParam = urlSearchParams.get("action");

    if (actionParam === "read") {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  }, [setIsEditing, urlSearchParams]);

  const handleImageError = () => {
    setImageUrl("/images/no-image.png");
  };

  const handleEditClick = () => {
    setIsEditing((prevIsEditing) => {
      const newIsEditing = !prevIsEditing;

      setURLSearchParams(
        (prevParams) => {
          const updatedSearchParams = new URLSearchParams(prevParams);

          // Ubah nilai action sesuai state `isEditing` yang baru
          if (newIsEditing) {
            updatedSearchParams.set("action", "edit");
          } else {
            updatedSearchParams.set("action", "read");
          }

          return updatedSearchParams;
        },
        { replace: true }
      );

      return newIsEditing;
    });
  };

  return { imageUrl, handleImageError, isEditing, handleEditClick };
};
