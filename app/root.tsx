import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation } from "@remix-run/react";

import style from "./style.css";
import { LinksFunction } from "@remix-run/node";
import Sidebar from "components/layout/Sidebar";
import React from "react";

export const link: LinksFunction = () => [{ rel: "stylesheet", href: style }];

export const exceptionPathName = ["/login", "/register"];

const activeStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "20% auto",
};

const nonActiveStyle: React.CSSProperties = {
  display: "block",
};

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
        <div style={isExceptionPath ? nonActiveStyle : activeStyle}>
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
