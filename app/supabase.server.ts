import { createServerClient, parse, serialize } from "@supabase/ssr";
import { supabaseKey, supabaseUrl } from "lib/db";

export const createSupabaseServerClient = (request: Request) => {
  const cookies = parse(request.headers.get("Cookie") ?? "");
  const headers = new Headers();

  const supabaseClient = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(key) {
        return cookies[key];
      },
      set(key, value, options) {
        headers.append("Set-Cookie", serialize(key, value, options));
      },
      remove(key, options) {
        headers.append("Set-Cookie", serialize(key, "", options));
      },
    },
  });

  return { supabaseClient, headers };
};
