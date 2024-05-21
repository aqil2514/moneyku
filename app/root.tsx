import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation } from "@remix-run/react";

import style from "../public/styles/css/style.css?url";
import { LinksFunction } from "@remix-run/node";
import Sidebar from "components/layout/Sidebar";
import React from "react";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: style }];

export const exceptionPathName = ["/login", "/register"];


export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const pathName = location.pathname;
  const isExceptionPath = exceptionPathName.includes(pathName);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className={isExceptionPath ? "sidebar-off" : "sidebar-on"}>
          <Sidebar />
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
