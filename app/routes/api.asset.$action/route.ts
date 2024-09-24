import { ActionFunctionArgs, json } from "@remix-run/node";
import { delay } from "utils/general";

export async function action({ request, params }: ActionFunctionArgs) {
  const method = request.method;
  const { action } = params;

  if (method === "PUT" && action === "edit") {
    await delay(2000);
  }

  return json({ msg: "ok" });
}
