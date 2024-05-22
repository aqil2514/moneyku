import { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import sessionStore from "~/service/session.server";

export const meta: MetaFunction = () => [
  { title: "Login | Money Management " },
];

export async function action({request}:ActionFunctionArgs){
  const setHeader = request.headers.get("Cookie");
  const cookie = await sessionStore.getSession(setHeader);

  console.log(cookie)

  return null;
}

export default function LoginForm() {
  return (
    <div id="login-form">
      <h1 id="main-title">Money Management</h1>
      <div id="grid-layout">
        <form action="/login" method="POST" className="form">
          <h1>Login</h1>

          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" id="username" />
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
