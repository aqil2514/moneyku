import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import Sidebar from "components/layout/Core/Sidebar";
import { getUser } from "utils/account";
import { authenticator } from "~/service/auth.server";

export async function loader({request}:LoaderFunctionArgs){
    await authenticator.isAuthenticated(request, {failureRedirect:"/login"});

    const user = await getUser(request);

    return json({user})
}

export default function MainLayout(){
    const {user} = useLoaderData<typeof loader>();
    return(
        <div className="grid grid-cols-[15%_auto] scrollbar-hide">
            <Sidebar user={user}/>
            <Outlet />
        </div>
    )
}