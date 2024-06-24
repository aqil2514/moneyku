import { useFetcher } from "@remix-run/react";
import Typography from "components/General/Typography";
import Button from "components/Inputs/Button";
import Textfield from "components/Inputs/Textfield";
import { MdOutlineSecurity } from "react-icons/md";

export default function UnvisibleSecurityQuiz() {
  const fetcher = useFetcher();
  return (
    <div className="my-4">
      <Typography family="poppins-medium" variant="p">
        Akun anda belum memiliki pertanyaan keamanan
      </Typography>
      <fetcher.Form method="POST" action="/api/security">
        <input
          type="hidden"
          readOnly
          name="cta"
          value={"create-new-security"}
        />
        <input
          type="hidden"
          readOnly
          name="security-option"
          value={"security-question-option"}
        />
        <Textfield
          forId="securityQuiz"
          fieldType="text"
          fontFamily="poppins-regular"
          label="Pertanyaan Keamanan"
        />
        <Textfield
          forId="securityAnswer"
          fieldType="text"
          fontFamily="poppins-regular"
          label="Jawaban Pertanyaan Keamanan"
        />
        <Button color="success" startIcon={<MdOutlineSecurity />}>
          Buat Pertanyaan Keamanan
        </Button>
      </fetcher.Form>
    </div>
  );
}
