import { useSidebarData } from "./SidebarProvider";
import { AccountConfig, AccountUser } from "~/@types/Account";

interface ProfileDataArray {
  key: string;
  value: string;
}

const profileDataArray = (
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

export const Profile = () => {
  const { user } = useSidebarData();
  if (!user) throw new Error("Data user tidak ada");
  const { username, config, email } = user;
  const userData = profileDataArray(username, config, email);

  return (
    <div className="p-2">
      <div className="border-4 border-double mb-4 rounded-sm">
        <h1 className="font-playfair-display text-center">Profil Pengguna </h1>
      </div>
      {userData.map((data, i) => (
        <div className="flex gap-1" key={i}>
          <strong>{data.key} </strong>
          <p>{data.value} </p>
        </div>
      ))}
    </div>
  );
};
