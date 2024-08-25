import { HttpResponseBuilder } from "~/@types/General";

export const makeHttpResponse: HttpResponseBuilder = {
  success(message, data, statusCode = 200) {
    return {
      message,
      status: "success",
      data,
      statusCode,
    };
  },
  error(message, data, statusCode = 400) {
    return {
      message,
      status: "error",
      data,
      statusCode,
    };
  },
};
