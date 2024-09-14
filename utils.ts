import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a Date object or date string into a human-readable string in Indonesian.
 *
 * @param {Date|string} date - The Date object or string to format.
 * @returns {string} The formatted date string in the format "Hari, Tanggal Bulan Tahun".
 */
export function formatDate(date: Date | string): string {
  // Ensure the input is a valid Date object
  const formattedDate = new Date(date);
  
  // Check if the date is invalid
  if (isNaN(formattedDate.getTime())) {
    throw new Error("Invalid date format");
  }

  // Define options for formatting
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Create formatter and return formatted date string
  const formatter = new Intl.DateTimeFormat("id-ID", options);
  return formatter.format(formattedDate);
}
