import { BasicHTTPResponse, HttpResponseBuilder } from "~/@types/General";

export const makeHttpResponse: HttpResponseBuilder = {
  success: <T>(message: string, data: T, statusCode: number = 200): BasicHTTPResponse<T> => ({
    message,
    status:"success",
    data,
    statusCode,
  }),
  error: <T>(message: string, data: T, statusCode: number = 400): BasicHTTPResponse<T> => ({
    message,
    data,
    status:"error",
    statusCode,
  }),
};
