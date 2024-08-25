import { Form, Link } from "@remix-run/react";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";

export const LoginFormTitle = () => {
  return (
    <div className="text-center mb-4">
      <h2 className="text-3xl font-semibold text-gray-800 mb-2">
        Login
      </h2>
      <sub className="text-sm text-gray-600">
        Mulai catat pengeluaran Anda sekarang!
      </sub>
    </div>
  );
};


export const InputUsername = () => {
  return (
    <div>
      <Label htmlFor="email">Username atau Email</Label>
      <Input
        type="text"
        id="email"
        placeholder="Username atau Email"
        name="email"
        required
      />
    </div>
  );
};

export const InputPassword = () => {
  return (
    <div>
      <Label htmlFor="password">Password</Label>
      <Input
        type="password"
        placeholder="Password"
        id="password"
        name="password"
        required
      />
    </div>
  );
};

export const GoogleLogin = () => {
  return (
    <div className="text-center">
      <p className="font-poppins-medium mb-2">Atau login dengan Google</p>
      <Form method="POST" action="/login?method-login=oauth">
        <button
          id="google-login"
          className="font-poppins-medium flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded shadow hover:bg-gray-100 transition duration-200 mx-auto"
        >
          <img
            src="/images/icon-google.png"
            alt="Google Sign In"
            className="w-5 h-5"
          />
          Masuk dengan Google
        </button>
      </Form>
    </div>
  );
};

export const SignupLink = () => {
  return (
    <Link
      to="/signup"
      className="block text-center underline text-blue-600 hover:text-blue-800 transition duration-200"
    >
      <p className="text-center underline">Belum punya akun?</p>
    </Link>
  );
};
