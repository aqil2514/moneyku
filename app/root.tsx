import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import style from "~/style.css?url";
import { LinksFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import React, { useEffect } from "react";
import { getToast } from "remix-toast";
import { ToastContainer, toast as notify } from "react-toastify";
import "@fontsource/libre-baskerville"
import toastStyles from "react-toastify/dist/ReactToastify.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: style },
  { rel: "stylesheet", href: toastStyles },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const { toast, headers } = await getToast(request);

  return json({ toast }, { headers });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { toast } = useLoaderData<typeof loader>();

  useEffect(() => {
    if (toast) {
      notify(toast.message, { type: toast.type });
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
        {children}
        <ToastContainer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
