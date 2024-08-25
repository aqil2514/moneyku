import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { redirectWithError, redirectWithSuccess } from "remix-toast";
import { authenticator } from "~/service/auth.server";
import { commitSession, getSession } from "~/service/session.server";
import { LoginContainer, Title } from "./components";
import { MainWrapper } from "components/General/Container";

export const meta: MetaFunction = () => [{ title: "Login | Moneyku " }];

type MethodLoginState = "oauth" | "form";

export async function action({ request }: ActionFunctionArgs) {
  const { searchParams } = new URL(request.url);
  const methodLogin = searchParams.get("method-login") as MethodLoginState;

  if (methodLogin === "form") {
    const auth = await authenticator.authenticate("form", request, {
      throwOnError: true,
    });

    if (auth.status === "error") {
      return redirectWithError("/login", auth.message);
    }

    const session = await getSession(request.headers.get("cookie"));
    session.set(authenticator.sessionKey, auth.data);

    const headers = new Headers({
      "Set-Cookie": await commitSession(session),
    });

    return redirectWithSuccess(
      "/transaction",
      `Selamat datang ${auth.data?.username}`,
      { headers }
    );
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
    <MainWrapper id="login-form">
      <Title />
      <LoginContainer />
    </MainWrapper>
  );
}
