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

/**
 * Menghasilkan hex color number secara random
 * @returns {string} Hex Color Number
 */
export function getRandomHexColor(): string {
  const hexCharacters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * hexCharacters.length);
    color += hexCharacters[randomIndex];
  }
  return color;
}