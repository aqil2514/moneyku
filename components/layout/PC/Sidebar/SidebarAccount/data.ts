import { AccountConfig, AccountUser } from "~/@types/Account";


interface ProfileDataArray {
    key: string;
    value: string;
  }
  
  export const profileDataArray = (
    username: string,
    config: AccountConfig,
    email: string
  ): ProfileDataArray[] => {
    const mapLanguage: Record<AccountUser["config"]["language"], string> = {
      ID: "Bahasa Indonesia",
      EN: "English Language",
    };
    const mapCurrency: Record<AccountUser["config"]["currency"], string> = {
      EUR: "Belum dikembangkan",
      IDR: "Rupiah",
      USD: "Dolar",
    };
  
    return [
      {
        key: "Nama Pengguna",
        value: username,
      },
      {
        key: "Email",
        value: email,
      },
      {
        key: "Preferensi Bahasa",
        value: config.language ? mapLanguage[config.language] : "Belum diatur",
      },
      {
        key: "Preferensi Mata Uang",
        value: config.currency ? mapCurrency[config.currency] : "Belum diatur",
      },
      {
        key: "Tujuan Penggunaan",
        value: config.purposeUsage ? config.purposeUsage : "Belum diatur",
      },
    ];
  };