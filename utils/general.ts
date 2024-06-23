/**
 * Mengkapitalisasi huruf pertama dari setiap kata dalam string.
 * @param str - String yang akan dikapitalisasi
 * @returns String dengan setiap kata yang dikapitalisasi
 */
export const toCapitalizeWords = (str: string): string => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  export const currencyFormat = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
