import { Authenticator } from "remix-auth";
import { sessionStore } from "./session.server";
import { FormStrategy } from "remix-auth-form";
import axios, { isAxiosError } from "axios";
import serverEndpoint, { endpoint } from "lib/server";
import { AccountUser } from "~/@types/account";
import { GoogleStrategy } from "remix-auth-google";
import clientEndpoint from "lib/client-endpoint";

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error("Session Secret dibutuhkan");
}

type User = AccountUser;

async function login(email: string, password: string) {
  const isLocal = process.env.NODE_ENV === "development";
  const endpoint = isLocal ? serverEndpoint.local : serverEndpoint.production;

  try {
    const res = await axios.post(`${endpoint}/account/login`, {
      email,
      password,
    });

    const data: User = res.data.user;

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      return false;
    }
  }
}

const authenticator = new Authenticator<User | undefined | false>(sessionStore);

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
    const res = await axios.get(`${endpoint}/account/getUser`, {
      params: {
        email: profile.emails[0].value,
      },
    });
    const user: User = res.data.user;

    return user;
  }
);

authenticator.use(googleStrategy, "google");

export { authenticator };
