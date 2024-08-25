import { Authenticator } from "remix-auth";
import { sessionStore } from "./session.server";
import { FormStrategy } from "remix-auth-form";
import axios, { isAxiosError } from "axios";
import serverEndpoint, { endpoint } from "lib/server";
import { GoogleStrategy } from "remix-auth-google";
import clientEndpoint from "lib/client-endpoint";
import { AccountUser } from "~/@types/Account";
import { BasicHTTPResponse } from "~/@types/General";
import { makeHttpResponse } from "utils/server/http";

/**
 * TODO:
 * 1. Buat validasi kalo email dan password kosong. Pastiin juga error handlingnya bagus
 * 2. Refactoring! Ada beberapa response yang berulang-ulang
 * 3. Typescript masih belum rapih
 * 4. Yang lain-lain juga deh gituain
 */

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error("Session Secret dibutuhkan");
}

type User = AccountUser;

async function login(
  email: string,
  password: string
): Promise<BasicHTTPResponse<User | unknown>> {
  if (!email) return makeHttpResponse.error("Email belum diisi", null);
  if (!password) return makeHttpResponse.error("Password belum diisi", null);

  try {
    const res = await axios.post<BasicHTTPResponse<User>>(
      `${endpoint}/auth/login`,
      {
        email,
        password,
      }
    );

    const data: User = res.data.data!;
    const response = makeHttpResponse.success("Login Berhasil", data);

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      const message = error.response?.data.message;
      const response = makeHttpResponse.error(message, null)
      return response;
    }

    const response: BasicHTTPResponse<typeof error> = makeHttpResponse.error("Terjadi kesalahan pada server", null, 500)
    return response;
  }
}

const authenticator = new Authenticator<LoginResult>(sessionStore);

const formStrategy = new FormStrategy(async ({ form }) => {
  const email = form.get("email") as string;
  const password = form.get("password") as string;

  const user = login(email, password);

  return user;
});

authenticator.use(formStrategy, "form");

const googleStrategy = new GoogleStrategy(
  {
    clientID: String(process.env.OAUTH_GOOGLE_CLIENT_ID),
    clientSecret: String(process.env.OAUTH_GOOGLE_CLIENT_SECRET),
    callbackURL: clientEndpoint,
  },
  async ({ profile }) => {
    try {
      // Pastikan endpoint dan parameter sudah benar
      const res = await axios.get(`${endpoint}/account/getUser`, {
        params: {
          email: profile.emails[0].value,
        },
      });

      const user = res.data.user;

      const result: LoginResult = {
        success: true,
        user,
        message: "Login berhasil",
      };

      // Cek apakah user data dikembalikan

      return result;
    } catch (error) {
      const result: LoginResult = {
        success: true,
        user: {} as User,
        message: "Login gagal",
      };
      console.error("Error fetching user:", error);
      return result;
    }
  }
);

authenticator.use(googleStrategy, "google");

export { authenticator };
