import { AccountUser } from "~/@types/Account";
import { LoginResult } from "~/@types/General";
import { authenticator } from "~/service/auth.server";
import { getSession } from "~/service/session.server";

/**
 * Mengambil data user
 * @param request Request parameter
 * @returns User
 */
export async function getUser(request: Request): Promise<AccountUser> {
    const session = await getSession(request.headers.get("cookie"));
    const data: LoginResult = session.get(authenticator.sessionKey);
  
    return data.user;
  }