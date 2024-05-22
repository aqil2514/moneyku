import { createCookieSessionStorage } from "@remix-run/node";

const sessionStore = createCookieSessionStorage({
  cookie: {
    name: "__session",
    secrets: ["super-secret-secret"],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
  },
});

export default sessionStore;