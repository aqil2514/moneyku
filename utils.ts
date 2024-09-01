import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a Date object into a human-readable string in Indonesian.
 *
 * @param {Date} date - The Date object to format.
 * @returns {string} The formatted date string in the format "Hari, Tanggal Bulan Tahun".
 */
export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formatter = new Intl.DateTimeFormat("id-ID", options);

  return formatter.format(date);
}
