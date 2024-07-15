import { Link } from "@remix-run/react"
import Typography from "components/General/Typography"
import Button from "components/Inputs/Button"
import { LF_GoogleLogin, LF_InputPassword, LF_InputUsername, LoginFormTitle } from "./LF_Components"

const FormLogin = () => {
    return(
        <form action="/login?method-login=form" method="POST" className="form">
          <LoginFormTitle />
          <LF_InputUsername />
          <LF_InputPassword />

          <Link to={"/signup"}>
            <Typography variant="p" family="ubuntu-medium">
              Belum punya akun?
            </Typography>
          </Link>

          <Button color="success" id="login-button">
            Login
          </Button>

          <LF_GoogleLogin />
        </form>
    )
}

export default FormLogin;