import { Authenticator } from "remix-auth";
import { sessionStore } from "./session.server";
import { FormStrategy } from "remix-auth-form";
import axios, { isAxiosError } from "axios";
import serverEndpoint, { endpoint } from "lib/server";
import { AccountUser } from "~/@types/account";
import { GoogleStrategy } from "remix-auth-google";
import clientEndpoint from "lib/client-endpoint";
import { LoginResult } from "~/@types/general";

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error("Session Secret dibutuhkan");
}

type User = AccountUser;

async function login(email: string, password: string):Promise<LoginResult> {
  const isLocal = process.env.NODE_ENV === "development";
  const endpoint = isLocal ? serverEndpoint.local : serverEndpoint.production;

  try {
    const res = await axios.post(`${endpoint}/account/login`, {
      email,
      password,
    });

    const data: User = res.data.user;

    return {user: data, success: true, message: "Login berhasil"};
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);
      const success = error.response?.data.success;
      const message = error.response?.data.message;
      return { user: null, success, message };
    }

    return {user:null, success: false, message:"Terjadi kesalahan"}
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

      // Cek apakah user data dikembalikan
      const user = res.data.user;

      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
      return false;
    }
  }
);

authenticator.use(googleStrategy, "google");

export { authenticator };
