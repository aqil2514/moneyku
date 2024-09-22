import React, { SetStateAction } from "react";

export const useIconPicker = (
  value: string,
  setValue: React.Dispatch<SetStateAction<string>>
) => {

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget as HTMLButtonElement;
    const dataset = target.dataset;
    const iconName = dataset.iconname as string;

    setValue(iconName);
  };

  return { value, clickHandler };
};
