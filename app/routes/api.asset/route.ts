import { ActionFunctionArgs } from "@remix-run/node";
import { jsonWithError, jsonWithSuccess, redirectWithError } from "remix-toast";
import apiHandler from "./utils";
import { authenticator } from "~/service/auth.server";
import { AssetApiHandler } from "~/@types/Assets";

type RequestMethodState = keyof AssetApiHandler;
export async function action({ request }: ActionFunctionArgs) {
  const isAuthenticated = await authenticator.isAuthenticated(request);

  if (!isAuthenticated) return redirectWithError("/login", "Anda belum login");

  const requestMethod = request.method.toLowerCase() as RequestMethodState;

  const res = await apiHandler[requestMethod](request);
  if (res.status !== "success") {
    return jsonWithError(res, res.message);
  }

  return jsonWithSuccess(res, res.message);
}