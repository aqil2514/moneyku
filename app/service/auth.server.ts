import { Authenticator } from "remix-auth";
import { sessionStore } from "./session.server";
import { FormStrategy } from "remix-auth-form";

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error("Session Secret dibutuhkan");
}

interface User {
  id: number;
  email: string;
  username: string;
}

async function login(email: string, password: string) {
  // Logika autentikasi akan ditempatkan di sini
  // Contoh sederhana:
  if (email === "user@example.com" && password === "password") {
    return {
      id: 1,
      username: "user",
      email: email,
      // Anda dapat menambahkan informasi pengguna lainnya sesuai kebutuhan
    };
  } else {
    // Jika autentikasi gagal, kembalikan null atau lemparkan error
    throw new Error("Invalid email or password");
  }
}

const authenticator = new Authenticator<User>(sessionStore);

const formStrategy = new FormStrategy(async ({ form }) => {
  const email = form.get("email") as string;
  const password = form.get("password") as string;

  const user = login(email, password);

  return user;
});

authenticator.use(formStrategy, "form");

export { authenticator };
