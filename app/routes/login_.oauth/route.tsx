import { ActionFunctionArgs } from "@remix-run/node";
import { redirectWithInfo } from "remix-toast";
import { authenticator } from "~/service/auth.server";

export const action = async ({request} : ActionFunctionArgs)=>{
    const auth = await authenticator.authenticate("google", request);

    console.log(auth)
    return redirectWithInfo("/login", "OK");
}