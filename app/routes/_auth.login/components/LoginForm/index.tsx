import Button from "components/Inputs/Button";
import {
  GoogleLogin,
  InputPassword,
  InputUsername,
  LoginFormTitle,
  SignupLink,
} from "./components";

const FormLogin = () => {
  return (
    <form action="/login?method-login=form" method="POST" className="p-4">
      <LoginFormTitle />
      <InputUsername />
      <InputPassword />

      <SignupLink />

      <Button color="success" className="block mx-auto my-4">
        Login
      </Button>

      <GoogleLogin />
    </form>
  );
};

export default FormLogin;
