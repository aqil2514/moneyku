import { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { authenticator } from "~/service/auth.server";

export const meta: MetaFunction = () => [
  { title: "Login | Money Management " },
];

export async function action({ request }: ActionFunctionArgs) {
  return await authenticator.authenticate("form", request, {
    successRedirect: "/transaction",
    failureRedirect: "/login",
  });
}

export async function loader({request}:LoaderFunctionArgs){
  return await authenticator.isAuthenticated(request, {
    successRedirect:"/transaction"
  })
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

          <button>login</button>

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
