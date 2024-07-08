import React from "react";
import { formatCurrency } from "utils/general";

/**
 * Convert angka menjadi format rupiah
 * @param e Element HTML Input
 * @param setNominal API UseState untuk mengubah nominal
 */

export const rupiahConvert = (
  e: React.ChangeEvent<HTMLInputElement>,
  setNominal: React.Dispatch<React.SetStateAction<string>>
) => {
  const value = e.target.value;
  const formattedValue = `Rp. ${formatCurrency(value)}`;
  setNominal(formattedValue);
};
