import { redirectWithToast } from "remix-toast";

export async function loader() {
  return redirectWithToast("/login", {
    message: "Harus login",
    description: "Harus login asjdoisajdioj",
    type: "error",
  });
}

export default async function Index() {
  return <></>;
}
