import Textfield from "components/Inputs/Textfield";
import { useSettingData } from "../_setting/route";
import { useState } from "react";
import Alert from "components/Feedback/Alert";
import { CiWarning } from "react-icons/ci";
import { BiInfoCircle } from "react-icons/bi";
import Button from "components/Inputs/Button";
import { useFetcher, useNavigate } from "@remix-run/react";
import { securityQuestionsData } from "../_auth.signup/data";

export default function DataVisible() {
  const { user } = useSettingData();
  const privacy = user.privacy;

  const isHavePrivacy = Object.keys(privacy).length > 0;
  const [isVisible_SA, setIsVisible_SA] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isPasswordEdited, setIsPasswordEdited] = useState<boolean>(false);
  const fetcher = useFetcher();
  const navigate = useNavigate();

  return (
    <div>
      <fetcher.Form method="PUT" action="/api/security">
        <input type="hidden" readOnly defaultValue={user.uid} />
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
            defaultValue={isHavePrivacy ? user.privacy.securityAnswer : ""}
            onChange={() => setIsEditing(true)}
          />
        </div>
        <Button
          color="primary"
          className="h-6"
          onClick={() => setIsPasswordEdited(!isPasswordEdited)}
          type="button"
        >
          {isPasswordEdited ? "Batal" : "Ubah Password"}
        </Button>
        <Textfield
          fieldType="password"
          forId="old-password"
          label={isPasswordEdited ? "Password Lama" : "Password"}
          fontFamily="poppins-medium"
          disabled={!isPasswordEdited}
          onChange={() => setIsEditing(true)}
          placeholder={
            isPasswordEdited
              ? "Masukkan Password Lama"
              : "Sengaja tidak ditampilkan"
          }
        />
        {isPasswordEdited && (
          <>
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
        )}
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
    </div>
  );
}
