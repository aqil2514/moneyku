import { useFetcher } from "@remix-run/react";
import Typography from "components/General/Typography";
import Button from "components/Inputs/Button";
import Textfield from "components/Inputs/Textfield";
import { TbPasswordUser } from "react-icons/tb";

export default function UnvisibleNoPassword() {
  const fetcher = useFetcher();

  return (
    <div className="my-4">
      <Typography family="poppins-medium" variant="p">
        Akun anda belum memiliki Password
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
          value={"password-option"}
        />
        <Textfield
          forId="new-password"
          fontFamily="poppins-regular"
          fieldType="password"
          label="Password"
        />
        <Textfield
          forId="confirm-new-password"
          fontFamily="poppins-regular"
          fieldType="password"
          label="Konfirmasi Password"
        />
        <Button color="success" startIcon={<TbPasswordUser />}>
          Buat Password
        </Button>
      </fetcher.Form>
    </div>
  );
}
