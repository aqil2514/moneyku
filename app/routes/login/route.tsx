import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import { Link } from "@remix-run/react";
import { authenticator } from "~/service/auth.server";
import { commitSession, getSession } from "~/service/session.server";

export const meta: MetaFunction = () => [
  { title: "Login | Money Management " },
];

export async function action({ request }: ActionFunctionArgs) {
  const auth = await authenticator.authenticate("form", request, {
    failureRedirect: "/login",
  });

  const session = await getSession(request.headers.get("cookie"));
  session.set(authenticator.sessionKey, auth);

  const headers = new Headers({ "Set-Cookie": await commitSession(session) });

  return redirect("/transaction", { headers });
}

export async function loader({ request }: LoaderFunctionArgs) {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/transaction",
  });
}

export default function LoginForm() {
  return (
    <div id="login-form">
      <h1 id="main-title">Money Management</h1>
      <div id="grid-layout">
        <form action="/login" method="POST" className="form">
          <h1>Login</h1>

          <div>
            <label htmlFor="email">Email:</label>
            <input type="text" name="email" id="email" />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" />
          </div>
          <Link to={"/signup"}>Belum punya akun?</Link>

          <button className="button-success">Login</button>

          <div>
            <p>Atau login dengan Google</p>
            <button id="google-login" type="button">
              <img src="/images/icon-google.png" alt="Google Sign In" />
              Masuk dengan Google
            </button>
          </div>
        </form>
        <div id="grid-image"></div>
      </div>
    </div>
  );
}
