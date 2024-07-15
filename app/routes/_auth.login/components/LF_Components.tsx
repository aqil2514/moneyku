import { Form } from "@remix-run/react"
import Typography from "components/General/Typography"
import Textfield from "components/Inputs/Textfield"

export const LoginFormTitle = () => {
    return(<Typography variant="h1" family="merriweather-bold">
        Login
      </Typography>)
}

export const LF_InputUsername = () => {
    return(
        <div>
            <Textfield
              forId="email"
              fieldType="text"
              label="Username atau Email"
              fontFamily="poppins-medium"
            />
          </div>
    )
}

export const LF_InputPassword = () => {
    return(
        <div>
            <Textfield
              forId="password"
              fieldType="password"
              label="Password"
              fontFamily="poppins-medium"
            />
          </div>
    )
}

export const LF_GoogleLogin = () => {
    return(
        <div>
            <p className="font-poppins-medium">Atau login dengan Google</p>
            <Form method="POST" action="/login?method-login=oauth">
              <button id="google-login" className="font-poppins-medium">
                <img src="/images/icon-google.png" alt="Google Sign In" />
                Masuk dengan Google
              </button>
            </Form>
          </div>
    )
}