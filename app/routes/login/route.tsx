import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => [
  { title: "Login | Money Management " },
];

export default function LoginForm() {
  return (
    <div id="login-form">
      <h1 id="main-title">Money Management</h1>
      <div id="grid-layout">
        <form action="" className="form">
          <h1>Login</h1>

          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" id="username" />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" />
          </div>

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
