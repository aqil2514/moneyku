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
import { currencyData, securityQuestionsData } from "./data";
import Button from "components/Inputs/Button";
import { getFormData } from "./utils";
import { BasicHTTPResponse } from "~/@types/General";

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
      `${endpoint}/account/register`,
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

const ErrorMessage = ({message}:{message:string | null | undefined}) => {
  return message && typeof message === "string" ? <em className="text-red-500">{message}</em> : <></>
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
    <div id="signup-page">
      <h2>Form Pendaftaran</h2>
      <Form method="POST" action="/signup">
        <div>
          <label>
            Nama Pengguna:
            <input type="text" name="username" required />
            <ErrorMessage message={usernameError} />
          </label>
        </div>
        <div>
          <label>
            Alamat Email:
            <input type="email" name="email" required />
            <ErrorMessage message={emailError} />
          </label>
        </div>
        <div>
          <label>
            Kata Sandi:
            <input type="password" name="password" required />
            <ErrorMessage message={passwordError} />
          </label>
        </div>
        <div>
          <label>
            Konfirmasi Kata Sandi:
            <input type="password" name="confirmPassword" required />
          </label>
          <ErrorMessage message={confirmPasswordError} />
          </div>
        <div>
          <label>
            Pertanyaan Keamanan:
            <select name="securityQuestion">
              <option value="no-question">Pertanyaan kemanan</option>
              {securityQuestionsData.sort().map((d, i) => (
                <option key={`security-question-${i++}`} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Jawaban Pertanyaan Keamanan:
            <input type="text" name="securityAnswer" />
          </label>
        </div>
        <div>
          <label>
            Preferensi Mata Uang:
            <select name="currencyPreference" required>
              <option value="">Pilih Mata Uang</option>
              {currencyData.map((d) => (
                <option value={d} key={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>
          <ErrorMessage message={currencyError} />
          </div>
        <div>
          <label>
            Preferensi Bahasa:
            <select name="languagePreference" required>
              <option value="">Pilih Bahasa</option>
              <option value="EN">English</option>
              <option value="ID">Bahasa Indonesia</option>
            </select>
          </label>
          <ErrorMessage message={languageError} />
          </div>
        <div>
          <label>
            Tujuan Penggunaan:
            <select name="purposeUsage" required>
              <option value="">Pilih Tujuan</option>
              <option value="Individu">Individu</option>
              <option value="Organization">Kelompok</option>
            </select>
          </label>
          <ErrorMessage message={purposeUsageError} />
          </div>

          <ErrorMessage message={accountFoundError} />
          <div>
          <Button color="success" type="submit">
            Daftar
          </Button>
        </div>
      </Form>
    </div>
  );
}

export function getErrors(errors: AccountResponse[] | undefined) {
  if (!errors) {
    return {
      usernameError: null,
      emailError: null,
      passwordError: null,
      confirmPasswordError: null,
      currencyError: null,
      languageError: null,
      purposeUsageError: null,
      accountFoundError: null,
    };
  }
  
  // Membuat Map dari errors
  const errorsMap = new Map(errors.map((d) => [d.path, d.message]));

  // Mengambil nilai error dari Map
  const getError = (field: string) => errorsMap.get(field);

  return {
    usernameError: getError("username"),
    emailError: getError("email"),
    passwordError: getError("password"),
    confirmPasswordError: getError("confirmPassword"),
    currencyError: getError("currency"),
    languageError: getError("language"),
    purposeUsageError: getError("purposeUsage"),
    accountFoundError: getError("account-found"),
  };
}
