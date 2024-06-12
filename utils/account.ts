import { AccountDB } from "~/@types/account";
import { authenticator } from "~/service/auth.server";
import { getSession } from "~/service/session.server";

/**
 * Mengambil data user
 * @param request Request parameter
 * @returns User
 */
export async function getUser(request:Request){
    const session = await getSession(request.headers.get("cookie"));
    const user: AccountDB = session.get(authenticator.sessionKey);

    return user
}