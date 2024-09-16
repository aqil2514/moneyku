import Textfield from "components/Inputs/Textfield";
import { useSettingData } from "../_setting/route";
import { createContext, useContext, useState } from "react";
import Alert from "components/Feedback/Alert";
import { CiWarning } from "react-icons/ci";
import { BiInfoCircle } from "react-icons/bi";
import Button from "components/Inputs/Button";
import { useFetcher, useNavigate } from "@remix-run/react";
import { securityQuestionsData } from "../_auth.signup/data";
import { CD_SettingSecurityCore } from "~/@types/Setting";
import { AccountPrivacy } from "~/@types/Auth";

interface DataVisibleProps {
  privacy: AccountPrivacy;
  isHavePrivacy: boolean;
  isVisible_SA: boolean;
  setIsVisible_SA: React.Dispatch<React.SetStateAction<boolean>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  isPasswordEdited: boolean;
  setIsPasswordEdited: React.Dispatch<React.SetStateAction<boolean>>;
}

const DataVisibleContext = createContext<DataVisibleProps>(
  {} as DataVisibleProps
);

const ChangePassword = () => {
  const { setIsEditing } = useContext(DataVisibleContext);
  return (
    <>
      <Textfield
        fieldType="password"
        forId="old-password"
        label="Password Lama"
        fontFamily="poppins-medium"
        onChange={() => setIsEditing(true)}
        placeholder="Masukkan password lama"
      />
      <Textfield
        fieldType="password"
        forId="new-password"
        label="Password Baru"
        fontFamily="poppins-medium"
        onChange={() => setIsEditing(true)}
        placeholder="Masukkan password baru"
      />
      <Textfield
        fieldType="password"
        forId="confirm-new-password"
        label="Konfirmasi Password Baru"
        fontFamily="poppins-medium"
        onChange={() => setIsEditing(true)}
        placeholder="Konfirmasi password baru"
      />
    </>
  );
};

const ChangeSecurityAnswer = () => {
  const {
    isHavePrivacy,
    isVisible_SA,
    setIsVisible_SA,
    setIsEditing,
    privacy,
  } = useContext(DataVisibleContext);
  return (
    <>
      <Textfield
        fieldType="text"
        fontFamily="poppins-regular"
        forId="securityQuiz"
        label="Pertanyaan Keamanan"
        list="security-question-data"
        defaultValue={isHavePrivacy ? privacy.securityQuiz : ""}
        placeholder="Masukkan pertanyaan keamanan"
        onChange={() => setIsEditing(true)}
      />

      <datalist id="security-question-data">
        {securityQuestionsData.map((d) => (
          <option value={d} key={d} />
        ))}
      </datalist>

      {!isHavePrivacy && (
        <Alert type="warning" className="relative flex items-center">
          <CiWarning /> Pertanyaan keamanan belum dibuat{" "}
          <BiInfoCircle
            title="Kembangin ini nanti"
            className="cursor-pointer"
          />
        </Alert>
      )}

      <div>
        <Button
          color="primary"
          className="h-6"
          type="button"
          onClick={() => setIsVisible_SA(!isVisible_SA)}
        >
          {isVisible_SA ? "Sembunyikan" : "Tampilkan"}
        </Button>

        <Textfield
          fieldType={isVisible_SA ? "text" : "password"}
          forId="securityAnswer"
          fontFamily="poppins-regular"
          label="Jawaban Pertanyaan Keamanan"
          placeholder="Masukkan jawabannya"
          defaultValue={isHavePrivacy ? privacy.securityAnswer : ""}
          onChange={() => setIsEditing(true)}
        />
      </div>
    </>
  );
};

export default function DataVisible() {
  const { user } = useSettingData();
  const privacy = user.privacy;

  const fetcher = useFetcher();
  const navigate = useNavigate();

  const isHavePrivacy = Object.keys(privacy).length > 0;
  const [isVisible_SA, setIsVisible_SA] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isPasswordEdited, setIsPasswordEdited] = useState<boolean>(false);

  const securityOption: CD_SettingSecurityCore["securityOption"] =
    isPasswordEdited ? "password-option" : "security-question-option";

  const clickHandler = () => {
    setIsPasswordEdited(!isPasswordEdited);
    setIsEditing(false);
  };

  return (
    <DataVisibleContext.Provider
      value={{
        isEditing,
        isHavePrivacy,
        isPasswordEdited,
        isVisible_SA,
        privacy,
        setIsEditing,
        setIsPasswordEdited,
        setIsVisible_SA,
      }}
    >
      <fetcher.Form method="PUT" action="/api/security">
        <input type="hidden" readOnly defaultValue={user.uid} />
        <input type="hidden" name="cta" readOnly value={"change-security"} />
        <input
          type="hidden"
          name="security-option"
          readOnly
          value={securityOption}
        />

        <Button
          color="primary"
          className="h-6"
          onClick={clickHandler}
          type="button"
        >
          {isPasswordEdited ? "Ubah Security Answer" : "Ubah Password"}
        </Button>

        {isPasswordEdited ? <ChangePassword /> : <ChangeSecurityAnswer />}

        <div className="flex items-center gap-4">
          <Button color="primary" disabled={!isEditing}>
            {isEditing ? "Ubah Keamanan" : "Belum ada perubahan"}
          </Button>
          <Button
            color="error"
            type="button"
            onClick={() =>
              navigate("/setting/security?sessionDelete=delete", {
                replace: true,
              })
            }
          >
            Hapus Sesi
          </Button>
        </div>
      </fetcher.Form>
    </DataVisibleContext.Provider>
  );
}
