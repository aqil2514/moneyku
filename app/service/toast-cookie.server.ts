import { createCookieSessionStorage } from "@remix-run/node";
import { createToastUtilsWithCustomSession } from "remix-toast";

const session = createCookieSessionStorage({
  cookie: {
    name: "toast-notification",
    secrets: ["super-secret"],
  },
});

export const {
  redirectWithToast,
  redirectWithSuccess,
  redirectWithError,
  redirectWithInfo,
  redirectWithWarning,
  jsonWithSuccess,
  jsonWithError,
  jsonWithInfo,
  jsonWithWarning,
} = createToastUtilsWithCustomSession(session);
