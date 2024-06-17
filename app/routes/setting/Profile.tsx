import Typography from "components/General/Typography";
import { useSettingData } from "./route";
import Textfield from "components/Inputs/Textfield";
import { useState } from "react";
import Button from "components/Inputs/Button";
import { currencyData } from "../signup/data";

export default function ProfileSetting() {
  const { user } = useSettingData();
  const { username, email, config } = user;
  const { language, currency, purposeUsage } = config;
  const [isEditting, setIsEditting] = useState<boolean>(false);

  return (
    <div id="setting-page-profile">
      <Typography family="merriweather-bold" variant="h1">
        Pengaturan Profil
      </Typography>
      <Textfield
        fieldType="text"
        label="Username"
        forId="username"
        fontFamily="poppins-medium"
        defaultValue={username ? username : "Belum Dibuat"}
        onChange={() => setIsEditting(true)}
      />
      <Textfield
        fieldType="email"
        label="Email"
        forId="email"
        fontFamily="poppins-medium"
        defaultValue={email ? email : "Belum Dibuat"}
        onChange={() => setIsEditting(true)}
      />
      <div className="form-input-basic">
        <label htmlFor="asset-category" className="font-ubuntu-reguler">
          Kategori Aset
        </label>
        <select
          name="asset-category"
          id="asset-category"
          defaultValue={currency}
          className="font-poppins-medium"
          onChange={() => setIsEditting(true)}
        >
          {currencyData.map((d) => (
            <option value={d} key={d}>
              {d}
            </option>
          ))}
        </select>
      </div>
      <div className="form-input-basic">
        <label htmlFor="languagePreference" className="font-ubuntu-reguler">
          Preferensi Bahasa
        </label>
        <select
          name="languagePreference"
          id="languagePreference"
          defaultValue={language}
          className="font-poppins-medium"
          onChange={() => setIsEditting(true)}
        >
          <option value="EN">English</option>
          <option value="ID">Bahasa Indonesia</option>
        </select>
      </div>
      <div className="form-input-basic">
        <label htmlFor="languagePreference" className="font-ubuntu-reguler">
          Tujuan Penggunaan
        </label>
        <select
          name="purposeUsage"
          required
          defaultValue={purposeUsage}
          onChange={() => setIsEditting(true)}
        >
          <option value="Individu">Individu</option>
          <option value="Organization">Kelompok</option>
        </select>
      </div>
      <Button color="primary" disabled={!isEditting}>
        Kirim
      </Button>
    </div>
  );
}
