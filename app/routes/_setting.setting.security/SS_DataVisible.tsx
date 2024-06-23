import Textfield from "components/Inputs/Textfield";
import { useSettingData } from "../_setting/route";
import { useState } from "react";
import Alert from "components/Feedback/Alert";
import { CiWarning } from "react-icons/ci";
import { BiInfoCircle } from "react-icons/bi";
import Button from "components/Inputs/Button";
import Typography from "components/General/Typography";
import { Form, useFetcher } from "@remix-run/react";
import { securityQuestionsData } from "../_auth.signup/data";

export default function DataVisible() {
  const { user } = useSettingData();
  const privacy = user.privacy;

  const isHavePrivacy = Object.keys(privacy).length > 0;
  const [isVisible_SA, setIsVisible_SA] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const fetcher = useFetcher();

  return (
    <div>
      <fetcher.Form>
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
        <Textfield
          fieldType="password"
          forId="password"
          label="Password"
          fontFamily="poppins-medium"
          onChange={() => setIsEditing(true)}
          defaultValue={"********************"}
        />
        <div className="flex items-center gap-4">
          <Button color="primary" disabled={!isEditing}>
            {isEditing ? "Ubah Keamanan" : "Belum ada perubahan"}
          </Button>
          <Form>
            <Button color="error" name="sessionDelete" value={"delete"}>
              Hapus Sesi
            </Button>
          </Form>
        </div>
      </fetcher.Form>
    </div>
  );
}
