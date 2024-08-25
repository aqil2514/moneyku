import { Authenticator } from "remix-auth";
import { sessionStore } from "./session.server";
import { FormStrategy } from "remix-auth-form";
import axios, { isAxiosError } from "axios";
import { endpoint } from "lib/server";
import { AccountUser } from "~/@types/Account";
import { BasicHTTPResponse } from "~/@types/General";
import { makeHttpResponse } from "utils/server/http";

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error("Session Secret dibutuhkan");
}

type User = AccountUser;

async function login(
  email: string,
  password: string
): Promise<BasicHTTPResponse<User>> {
  if (!email)
    return makeHttpResponse.error<User>("Email belum diisi", {} as User);
  if (!password)
    return makeHttpResponse.error<User>("Password belum diisi", {} as User);

  try {
    const res = await axios.post<BasicHTTPResponse<User>>(
      `${endpoint}/auth/login`,
      {
        email,
        password,
      }
    );

    const data = res.data.data!;
    const response = makeHttpResponse.success(
      "Login Berhasil",
      data as typeof data
    );

    return response;
  } catch (error) {
    console.error(error);
    if (isAxiosError(error)) {
      const message = error.response?.data.message;
      const httpCode = error.response?.status;
      const response = makeHttpResponse.error<User>(
        message,
        {} as User,
        httpCode
      );

      return response;
    }

    const response: BasicHTTPResponse<User> = makeHttpResponse.error<User>(
      "Terjadi kesalahan pada server",
      {} as User,
      500
    );
    return response;
  }
}

const authenticator = new Authenticator<BasicHTTPResponse<User>>(sessionStore);

const formStrategy = new FormStrategy<BasicHTTPResponse<User>>(
  async ({ form }) => {
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const userLogin = await login(email, password);

    return userLogin;
  }
);

authenticator.use(formStrategy, "form");

// const googleStrategy = new GoogleStrategy(
//   {
//     clientID: String(process.env.OAUTH_GOOGLE_CLIENT_ID),
//     clientSecret: String(process.env.OAUTH_GOOGLE_CLIENT_SECRET),
//     callbackURL: clientEndpoint,
//   },
//   async ({ profile }) => {
//     try {
//       // Pastikan endpoint dan parameter sudah benar
//       const res = await axios.get(`${endpoint}/account/getUser`, {
//         params: {
//           email: profile.emails[0].value,
//         },
//       });

//       const user = res.data.user;

//       const result: LoginResult = {
//         success: true,
//         user,
//         message: "Login berhasil",
//       };

//       // Cek apakah user data dikembalikan

//       return result;
//     } catch (error) {
//       const result: LoginResult = {
//         success: true,
//         user: {} as User,
//         message: "Login gagal",
//       };
//       console.error("Error fetching user:", error);
//       return result;
//     }
//   }
// );

// authenticator.use(googleStrategy, "google");

export { authenticator };
