import { AccountUser } from "~/@types/account";
import { LoginResult } from "~/@types/general";
import { authenticator } from "~/service/auth.server";
import { getSession } from "~/service/session.server";

/**
 * Mengambil data user
 * @param request Request parameter
 * @returns User
 */
export async function getUser(request: Request): Promise<AccountUser | null> {
    const session = await getSession(request.headers.get("cookie"));
    const data: LoginResult | null = session.get(authenticator.sessionKey);
  
    if (!data || !data.user) return null;
  
    return data.user;
  }