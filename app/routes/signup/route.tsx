import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import axios from "axios";
import serverEndpoint from "lib/server";
import { AccountRegister } from "~/@types/account";
import { authenticator } from "~/service/auth.server";

export async function loader({request}:LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    "successRedirect": "/transaction"
  })
  return null;
}

export async function action({request}:ActionFunctionArgs){
  const formData = await request.formData();
  const data:AccountRegister = {
    "username": String(formData.get("username")),
    "email": String(formData.get("email")),
    "password": String(formData.get("password")),
    "confirmPassword": String(formData.get("confirmPassword")),
    "securityQuiz": String(formData.get("securityQuestion")),
    "securityAnswer": String(formData.get("securityAnswer")),
    "currency": formData.get("currencyPreference") as AccountRegister["currency"],
    "language": formData.get("languagePreference") as AccountRegister["language"] ,
    "purposeUsage": formData.get("purposeUsage") as AccountRegister["purposeUsage"],
  }

  const res = await axios.post(`${serverEndpoint.local}/account/register`, data);

  console.log(res)
  return null;
}

export default function Register() {
  return (
    <div id="signup-page">
      <h2>Form Pendaftaran</h2>
      <Form method="POST" action="/signup">
        <div>
          <label>
            Nama Pengguna:
            <input type="text" name="username" required />
          </label>
        </div>
        <div>
          <label>
            Alamat Email:
            <input type="email" name="email" required />
          </label>
        </div>
        <div>
          <label>
            Kata Sandi:
            <input type="password" name="password" required />
          </label>
        </div>
        <div>
          <label>
            Konfirmasi Kata Sandi:
            <input type="password" name="confirmPassword" required />
          </label>
        </div>
        <div>
          <label>
            Pertanyaan Keamanan:
            <input type="text" name="securityQuestion" />
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
              {/* Tambahkan mata uang lainnya sesuai kebutuhan */}
            </select>
          </label>
        </div>
        <div>
          <label>
            Preferensi Bahasa:
            <select name="languagePreference" required>
              <option value="">Pilih Bahasa</option>
              <option value="EN">English</option>
              <option value="ID">Bahasa Indonesia</option>
              {/* Tambahkan bahasa lainnya sesuai kebutuhan */}
            </select>
          </label>
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
        </div>
        <div>
        <button type="submit" className="button-navigation-1">Daftar</button>
        </div>
      </Form>
    </div>
  );
}
