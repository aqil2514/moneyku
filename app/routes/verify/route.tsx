import { LoaderFunctionArgs } from "@remix-run/node";
import { redirectWithError, redirectWithSuccess } from "remix-toast";
import { getUser } from "utils/account";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUser(request);
  const { searchParams } = new URL(request.url);
  const statusLogin = searchParams.get("status");
  const strategyLogin = searchParams.get("strategy");

  console.log(user);

  if(!user) throw new Error("Data user tidak ditemukan")

  if (strategyLogin === "google") {
    if (statusLogin === "success") {
      return redirectWithSuccess(
        "/transaction",
        `Selamat datang ${user.email}`
      );
    } else if (statusLogin === "failed") {
      return redirectWithError("/login", `Login gagal`);
    }
  } else if (strategyLogin === "form"){
    if(statusLogin === "success"){
      return redirectWithSuccess("/transaction", `Selamat datang ${user.username}`);
    } 
    return redirectWithError("/transaction", `Login gagal!`)
  }
}
