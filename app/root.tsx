import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData, useLocation } from "@remix-run/react";

import style from "../public/styles/css/style.css?url";
import { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import Sidebar from "components/layout/Sidebar";
import React from "react";
import { getSession } from "./service/session.server";
import { authenticator } from "./service/auth.server";
import { AccountDB } from "./@types/account";

export async function loader({request}:LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("cookie"));

  const user:AccountDB = session.get(authenticator.sessionKey);

  if(!user) return {user:null};

  return {user};
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: style }];

export const exceptionPathName = ["/login", "/signup"];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const pathName = location.pathname;
  const isExceptionPath = exceptionPathName.includes(pathName);
  const {user} = useLoaderData<typeof loader>()


  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className={isExceptionPath ? "" : "sidebar-on"}>
          <Sidebar user={user}/>
          {children}
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
