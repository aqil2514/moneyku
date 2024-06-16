import { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/service/auth.server";

export const loader = ({ request }: LoaderFunctionArgs) => {
  return authenticator.authenticate("google", request, {
    successRedirect: "/verify?status=success&strategy=google",
    failureRedirect: "/verify?status=failed&strategy=google",
  });
};
