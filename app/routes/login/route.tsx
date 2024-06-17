import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import Typography from "components/General/Typography";
import Button from "components/Inputs/Button";
import Textfield from "components/Inputs/Textfield";
import { AuthorizationError } from "remix-auth";
import { redirectWithError, redirectWithSuccess } from "remix-toast";
import { authenticator } from "~/service/auth.server";
import { commitSession, getSession } from "~/service/session.server";

export const meta: MetaFunction = () => [{ title: "Login | Moneyku " }];

type MethodLoginState = "oauth" | "form";

export async function action({ request }: ActionFunctionArgs) {
  const { searchParams } = new URL(request.url);
  const methodLogin = searchParams.get("method-login") as MethodLoginState;

  if (methodLogin === "form") {
    try {
      const auth = await authenticator.authenticate("form", request, {
        throwOnError: true,
      });

      if (!auth.success || !auth.user) {
        return redirectWithError("/login", auth.message);
      }

      const session = await getSession(request.headers.get("cookie"));
      session.set(authenticator.sessionKey, auth);

      const headers = new Headers({
        "Set-Cookie": await commitSession(session),
      });

      return redirectWithSuccess(
        "/transaction",
        `Selamat datang ${auth.user.username}`,
        { headers }
      );
    } catch (error) {
      if (error instanceof Response) return error;
      if (error instanceof AuthorizationError) {
        console.error(error);
      }
    }
  } else if (methodLogin === "oauth") {
    return await authenticator.authenticate("google", request);
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/transaction",
  });
}

export default function LoginForm() {
  return (
    <div id="login-form">
      <Typography variant="h1" id="main-title" family="merriweather-bold">
        Moneyku
      </Typography>
      <div id="grid-layout">
        <form action="/login?method-login=form" method="POST" className="form">
          <Typography variant="h1" family="merriweather-bold">
            Login
          </Typography>

          <div>
            <Textfield
              forId="email"
              fieldType="text"
              label="Username atau Email"
              fontFamily="poppins-medium"
            />
          </div>

          <div>
            <Textfield
              forId="password"
              fieldType="password"
              label="Password"
              fontFamily="poppins-medium"
            />
          </div>
          <Link to={"/signup"}>
            <Typography variant="p" family="ubuntu-medium">
              Belum punya akun?
            </Typography>
          </Link>

          <Button color="success" id="login-button">
            Login
          </Button>

          <div>
            <p className="font-poppins-medium">Atau login dengan Google</p>
            <Form method="POST" action="/login?method-login=oauth">
              <button id="google-login" className="font-poppins-medium">
                <img src="/images/icon-google.png" alt="Google Sign In" />
                Masuk dengan Google
              </button>
            </Form>
          </div>
        </form>
        <div id="grid-image"></div>
      </div>
    </div>
  );
}
