import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "@remix-run/react";

import style from "~/style.css?url";
import { LinksFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import Sidebar from "components/layout/Core/Sidebar";
import React, { useEffect } from "react";
import { getToast } from "remix-toast";
import { ToastContainer, toast as notify } from "react-toastify";
import toastStyles from "react-toastify/dist/ReactToastify.css?url";
import { getUser } from "utils/account";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: style },
  { rel: "stylesheet", href: toastStyles },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const { toast, headers } = await getToast(request);
  const user = await getUser(request);

  if (!user) return json({ user: null, toast }, { headers });

  return json({ user, toast }, { headers });
}

export const exceptionPathName = ["/login", "/signup"];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const pathName = location.pathname;
  const isExceptionPath = exceptionPathName.includes(pathName);
  const { user, toast } = useLoaderData<typeof loader>();

  useEffect(() => {
    if (toast) {
      notify(toast.message, {type: toast.type});
    }
  }, [toast]);

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
          <Sidebar user={user} />
          {children}
          <ToastContainer />
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
