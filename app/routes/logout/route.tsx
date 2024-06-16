import { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/service/auth.server";

export async function loader({request}: LoaderFunctionArgs){
    return await authenticator.logout(request, { redirectTo: "/login" });
}

export default function Logout(){
    return <></>
}