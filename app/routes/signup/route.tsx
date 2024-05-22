/* eslint-disable jsx-a11y/label-has-associated-control */
// file: app/routes/register.js

import { useState } from "react";

// Penyesuaian di sini
function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    securityQuestion: "",
    securityAnswer: "",
    currencyPreference: "",
    languagePreference: "",
    userPurpose: "",
  });

  //@ts-expect-error Fix nanti
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //@ts-expect-error Fix nanti
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan validasi form di sini sebelum mengirim data
    console.log(formData); // Tampilkan data yang akan dikirim ke server
    // Kirim data ke server
  };

  return (
    <div>
      <h2>Form Pendaftaran</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nama Pengguna:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Alamat Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Kata Sandi:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Konfirmasi Kata Sandi:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Pertanyaan Keamanan:</label>
          <input
            type="text"
            name="securityQuestion"
            value={formData.securityQuestion}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Jawaban Pertanyaan Keamanan:</label>
          <input
            type="text"
            name="securityAnswer"
            value={formData.securityAnswer}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Preferensi Mata Uang:</label>
          <select
            name="currencyPreference"
            value={formData.currencyPreference}
            onChange={handleChange}
            required
          >
            <option value="">Pilih Mata Uang</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="IDR">IDR</option>
            {/* Tambahkan mata uang lainnya sesuai kebutuhan */}
          </select>
        </div>
        <div>
          <label>Preferensi Bahasa:</label>
          <select
            name="languagePreference"
            value={formData.languagePreference}
            onChange={handleChange}
            required
          >
            <option value="">Pilih Bahasa</option>
            <option value="en">English</option>
            <option value="id">Bahasa Indonesia</option>
            {/* Tambahkan bahasa lainnya sesuai kebutuhan */}
          </select>
        </div>
        <div>
          <label>Tujuan Penggunaan:</label>
          <select
            name="userPurpose"
            value={formData.userPurpose}
            onChange={handleChange}
            required
          >
            <option value="">Pilih Tujuan</option>
            <option value="individual">Individu</option>
            <option value="group">Kelompok</option>
          </select>
        </div>
        <button type="submit">Daftar</button>
      </form>
    </div>
  );
}

export default Register;
