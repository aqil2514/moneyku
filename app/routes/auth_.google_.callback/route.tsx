import { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/service/auth.server";

export const loader = ({ request }: LoaderFunctionArgs) => {
  return authenticator.authenticate("google", request, {
    successRedirect: "/transaction",
    failureRedirect: "/login",
  });
};
