import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import axios, { isAxiosError } from "axios";
import serverEndpoint from "lib/server";
import { jsonWithError, redirectWithSuccess } from "remix-toast";
import { AccountRegister, AccountResponse } from "~/@types/account";
import { authenticator } from "~/service/auth.server";
import { securityQuestionsData } from "./data";
import Button from "components/Inputs/Button";

export const meta: MetaFunction = () => [{ title: "Signup | Moneyku" }];

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/transaction",
  });
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data: AccountRegister = {
    username: String(formData.get("username")),
    email: String(formData.get("email")),
    password: String(formData.get("password")),
    confirmPassword: String(formData.get("confirmPassword")),
    securityQuiz: String(formData.get("securityQuestion")),
    securityAnswer: String(formData.get("securityAnswer")),
    currency: formData.get("currencyPreference") as AccountRegister["currency"],
    language: formData.get("languagePreference") as AccountRegister["language"],
    purposeUsage: formData.get(
      "purposeUsage"
    ) as AccountRegister["purposeUsage"],
  };

  const isLocal = process.env.NODE_ENV === "development";
  const endpoint = isLocal ? serverEndpoint.local : serverEndpoint.production;

  try {
    const res = await axios.post(`${endpoint}/account/register`, data);

    const { sucess } = res.data;

    if (sucess)
      return redirectWithSuccess(
        "/login",
        "Akun berhasil dibuat. Silahkan login!"
      );
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 422) {
        const validationError: AccountResponse[] = error.response?.data.result;
        return jsonWithError(
          { validationError },
          validationError[0].notifMessage as string
        );
      }
    }
  }

  return null;
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
  } = getErrors(error?.validationError);

  return (
    <div id="signup-page">
      <h2>Form Pendaftaran</h2>
      <Form method="POST" action="/signup">
        <div>
          <label>
            Nama Pengguna:
            <input type="text" name="username" required />
            <em style={{ color: "red" }}>{usernameError}</em>
          </label>
        </div>
        <div>
          <label>
            Alamat Email:
            <input type="email" name="email" required />
            <em style={{ color: "red" }}>{emailError}</em>
          </label>
        </div>
        <div>
          <label>
            Kata Sandi:
            <input type="password" name="password" required />
            <em style={{ color: "red" }}>{passwordError}</em>
          </label>
        </div>
        <div>
          <label>
            Konfirmasi Kata Sandi:
            <input type="password" name="confirmPassword" required />
          </label>
          <em style={{ color: "red" }}>{confirmPasswordError}</em>
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
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="IDR">IDR</option>
            </select>
          </label>
          <em style={{ color: "red" }}>{currencyError}</em>
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
          <em style={{ color: "red" }}>{languageError}</em>
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
          <em style={{ color: "red" }}>{purposeUsageError}</em>
        </div>

        <em style={{ color: "red" }}>{accountFoundError}</em>
        <div>
          <Button color="success" type="submit">
            Daftar
          </Button>
        </div>
      </Form>
    </div>
  );
}

function getErrors(errors: AccountResponse[] | undefined) {
  const usernameError = errors?.find((e) => e.path === "username")?.message;
  const emailError = errors?.find((e) => e.path === "email")?.message;
  const passwordError = errors?.find((e) => e.path === "password")?.message;
  const confirmPasswordError = errors?.find(
    (e) => e.path === "confirmPassword"
  )?.message;
  const currencyError = errors?.find((e) => e.path === "currency")?.message;
  const languageError = errors?.find((e) => e.path === "language")?.message;
  const purposeUsageError = errors?.find(
    (e) => e.path === "purposeUsage"
  )?.message;
  const accountFoundError = errors?.find(
    (e) => e.path === "account-found"
  )?.message;

  return {
    usernameError,
    emailError,
    passwordError,
    confirmPasswordError,
    currencyError,
    languageError,
    purposeUsageError,
    accountFoundError,
  };
}
