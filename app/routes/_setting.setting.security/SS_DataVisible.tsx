import Textfield from "components/Inputs/Textfield";
import { useSettingData } from "../_setting/route"
import { useState } from "react";
import Alert from "components/Feedback/Alert";
import { CiWarning } from "react-icons/ci";
import { BiInfoCircle } from "react-icons/bi";
import Button from "components/Inputs/Button";
import Typography from "components/General/Typography";

export default function DataVisible(){
    const { user } = useSettingData();
  const privacy = user.privacy;

    const isHavePrivacy = Object.keys(privacy).length > 0;
  const [isVisible_SA, setIsVisible_SA] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);

  const changeHandler = () => {
    setAlert(true);

    setTimeout(() => setAlert(false), 3000);
  };
    return(
        <div>
        <input type="hidden" readOnly value={user.uid} />
        <Textfield
          fieldType="text"
          fontFamily="poppins-regular"
          forId="securityQuiz"
          label="Pertanyaan Keamanan"
          readOnly
          onKeyDown={changeHandler}
          value={isHavePrivacy ? privacy.securityQuiz : ""}
          placeholder="Masukkan pertanyaan keamanan"
        />
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
            onKeyDown={changeHandler}
            readOnly
            value={isHavePrivacy ? "Click tombol di bawah untuk melanjutkan" : ""}
          />
        </div>
        <Textfield
          fieldType="password"
          forId="password"
          label="Password"
          fontFamily="poppins-medium"
          readOnly
          value={"************************"}
          onKeyDown={changeHandler}
        />
        {alert && (
          <Typography
            variant="p"
            family="poppins-medium-italic"
            className="text-cyan-500"
          >
            Ingin ubah data? Klik tombol di bawah
          </Typography>
        )}
        {/* Client tidak dapat mengubah data dan data yang ada di halaman ini bukanlah data sebenarnya, hanya semacam formalitas saja. Jika ingin mengubah data keamanan, client harus klik tombol di bawah dan nanti mereka akan dimintai password mereka. Setelah berhasil, halaman akan merender data sensitif. */}
        <Button color="primary" type="button">
          Atur Keamanan
        </Button>
      </div>
    )
}