import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
  json,
} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import axios, { isAxiosError } from "axios";
import { endpoint } from "lib/server";
import { jsonWithError, redirectWithSuccess } from "remix-toast";
import { AccountResponse } from "~/@types/Account";
import { authenticator } from "~/service/auth.server";
import Button from "components/Inputs/Button";
import { getErrors, getFormData } from "./utils";
import { BasicHTTPResponse } from "~/@types/General";
import { ErrorMessage, InputCurrency, InputEmail, InputLanguage, InputPassword, InputPasswordConfirm, InputSecurityAnswer, InputSecurityQuestion, InputUsage, InputUsername } from "./components";
import MainWrapper from "components/General/Container";

export const meta: MetaFunction = () => [{ title: "Signup | Moneyku" }];

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/transaction",
  });
  return null;
  
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = getFormData(formData);

  try {
    const res = await axios.post<BasicHTTPResponse<AccountResponse[]>>(
      `${endpoint}/auth/register`,
      data
    );

    const { status } = res.data;

    if (status === "success")
      return redirectWithSuccess(
        "/login",
        "Akun berhasil dibuat. Silahkan login!"
      );
  } catch (error) {
    if (isAxiosError(error)) {
      const errorData: BasicHTTPResponse<AccountResponse[]> =
        error.response?.data;
      if (error.response?.status === 422) {
        const validationError = errorData.data as AccountResponse[];
        const message = validationError[0].notifMessage as string;
        return jsonWithError(
          {
            status: "error",
            message,
            data: validationError,
          } as BasicHTTPResponse<AccountResponse[]>,
          message
        );
      }

      return jsonWithError(
        {
          message: "No Action",
          status: "idle",
          data: {} as AccountResponse[],
        } as BasicHTTPResponse<AccountResponse[]>,
        "Terjadi kesalahan pada server"
      );
    }
  }

  return json({
    message: "No Action",
    status: "idle",
    data: {} as AccountResponse[],
  } as BasicHTTPResponse<AccountResponse[]>);
}

export default function Register() {
  const error = useActionData<typeof action>();
  const {
    usernameError,
    emailError,
    passwordError,
    confirmPasswordError,
    currencyError,
    languageError,
    purposeUsageError,
    accountFoundError,
  } = getErrors(error?.data);

  return (
    // Nanti dibiki multiform step gitu 
    // Referensi https://codepen.io/atakan/pen/nPOZZR
    <MainWrapper className="p-4">
      <h2 className="font-libre-baskerville text-center font-bold my-2">Form Pendaftaran</h2>
      <div className="bg-white rounded-xl w-1/2 mx-auto p-4">
      <Form method="POST" action="/signup">
        <InputUsername message={usernameError as string} />
        <InputEmail message={emailError as string}/>
        <InputPassword message={passwordError as string} />
        <InputPasswordConfirm message={confirmPasswordError as string} />
        <InputSecurityQuestion />
        <InputSecurityAnswer />
        <InputCurrency message={currencyError as string} />
        <InputLanguage message={languageError as string} />
        <InputUsage message={purposeUsageError as string} />

        <ErrorMessage message={accountFoundError} />
        <div>
          <Button color="success" type="submit">
            Daftar
          </Button>
        </div>
      </Form>
      </div>
    </MainWrapper>
  );
}