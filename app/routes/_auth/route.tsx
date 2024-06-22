import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { authenticator } from "~/service/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/transaction",
  });
}

export default function AuthLayout() {
  return <Outlet />;
}
