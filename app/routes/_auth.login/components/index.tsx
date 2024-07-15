import Typography from "components/General/Typography"
import FormLogin from "./LoginForm"
import LoginImage from "./LoginImage"

export const Title = () => {
    return (
        <Typography variant="h1" id="main-title" family="merriweather-bold">
        Moneyku
      </Typography>
    )
}

export const LoginContainer = () => {
    return(
        <div id="grid-layout">
            <FormLogin />
            <LoginImage />
        </div>
    )
}