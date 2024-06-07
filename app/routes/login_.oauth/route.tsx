import { ActionFunctionArgs } from "@remix-run/node";
import { redirectWithInfo } from "remix-toast";
import { authenticator } from "~/service/auth.server";

export const action = async ({request} : ActionFunctionArgs)=>{
    await authenticator.authenticate("google", request);

    return redirectWithInfo("/login", "OK");
}