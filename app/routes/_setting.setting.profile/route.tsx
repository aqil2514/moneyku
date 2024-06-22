import { useEffect, useState } from "react";
import { currencyData } from "~/routes/_auth.signup/data";
import Typography from "components/General/Typography";
import Textfield from "components/Inputs/Textfield";
import Button from "components/Inputs/Button";
import { useSettingData } from "../_setting/route";
import { useFetcher } from "@remix-run/react";

interface ResponseForm {
  data: unknown | null;
  errors: ErrorResponseForm[] | string | null;
  message: string;
}

interface ErrorResponseForm {
  message: string;
  notifMessage: string;
  path: string;
}

interface ErrorMapping {
  username?: string;
  email?: string;
  category?: string;
  language?: string;
  purposeUsage?: string;
}

export default function ProfileSetting() {
  const { user } = useSettingData();
  const { username, email, config } = user;
  const { language, currency, purposeUsage } = config;
  const [errorResponse, setErrorResponse] = useState<ErrorResponseForm[]>([]);
  const [errorMapping, setErrorMapping] = useState<ErrorMapping>(
    {} as ErrorMapping
  );
  const [isEditting, setIsEditting] = useState<boolean>(false);
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data) {
      const { errors } = fetcher.data as ResponseForm;
      if (!errors) {
        setErrorResponse([]);
      } else {
        setErrorResponse(errors as ErrorResponseForm[]);
      }
    }
  }, [fetcher.data]);
  useEffect(() => {
    if (!errorResponse) {
      setErrorMapping({} as ErrorMapping);
      return;
    }

    const ER_Map = new Map(errorResponse.map((d) => [d.path, d.message]));
    if (errorResponse) {
      setErrorMapping({
        username: ER_Map.get("username"),
        category: ER_Map.get("category"),
        email: ER_Map.get("email"),
        language: ER_Map.get("language"),
        purposeUsage: ER_Map.get("purposeUsage"),
      });
      return;
    }
  }, [errorResponse]);

  return (
    <div id="setting-page-profile">
      <Typography family="merriweather-bold" variant="h1">
        Profil
      </Typography>
      <fetcher.Form method="PUT" action="/api/profile">
        <input type="hidden" name="user-id" value={user.uid} readOnly />
        <Textfield
          fieldType="text"
          label="Username"
          forId="username"
          fontFamily="poppins-medium"
          defaultValue={username ? username : "Belum Dibuat"}
          onChange={() => setIsEditting(true)}
        />
        {errorMapping.username && (
          <Typography variant="p" family="ubuntu-regular-italic" color="danger">
            {errorMapping.username}
          </Typography>
        )}
        <Textfield
          fieldType="email"
          label="Email"
          forId="email"
          fontFamily="poppins-medium"
          defaultValue={email ? email : "Belum Dibuat"}
          onChange={() => setIsEditting(true)}
        />
        {errorMapping.email && (
          <Typography variant="p" family="ubuntu-regular-italic" color="danger">
            {errorMapping.email}
          </Typography>
        )}
        <div className="form-input-basic">
          <label htmlFor="asset-category" className="font-ubuntu-reguler">
            Mata Uang
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
        {errorMapping.category && (
          <Typography variant="p" family="ubuntu-regular-italic" color="danger">
            {errorMapping.category}
          </Typography>
        )}
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
        {errorMapping.language && (
          <Typography variant="p" family="ubuntu-regular-italic" color="danger">
            {errorMapping.language}
          </Typography>
        )}
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
        {errorMapping.purposeUsage && (
          <Typography variant="p" family="ubuntu-regular-italic" color="danger">
            {errorMapping.purposeUsage}
          </Typography>
        )}
        <Button color="primary" disabled={!isEditting}>
          Kirim
        </Button>
      </fetcher.Form>
    </div>
  );
}
