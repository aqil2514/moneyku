import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import React from "react";
import { securityQuestionsData } from "../data";

interface InputMessage {
  message: string;
}

export const ErrorMessage = ({
  message,
}: {
  message: string | null | undefined;
}) => {
  return message && typeof message === "string" ? (
    <em className="text-red-500 ">{message}</em>
  ) : (
    <></>
  );
};

export const InputEmail: React.FC<InputMessage> = ({ message }) => {
  return (
    <div>
      <Label>
        Alamat Email:
        <Input type="email" name="email" required placeholder="Alamat Email" />
        <ErrorMessage message={message} />
      </Label>
    </div>
  );
};

export const InputPassword: React.FC<InputMessage> = ({ message }) => {
  return (
    <div>
      <Label>
        Kata Sandi:
        <Input type="password" name="password" placeholder="Kata Sandi" required />
        <ErrorMessage message={message} />
      </Label>
    </div>
  );
};

export const InputPasswordConfirm: React.FC<InputMessage> = ({message}) => {
    return(
        <div>
          <Label>
            Konfirmasi Kata Sandi:
            <Input type="password" name="confirmPassword" placeholder="Konfirmasi kata sandi" required />
          </Label>
          <ErrorMessage message={message} />
        </div>
    )
}

export const InputSecurityQuestion: React.FC = () => {
    return(
        <div>
          <Label>
            Pertanyaan Keamanan:
            <select name="securityQuestion">
              <option value="no-question">Pertanyaan kemanan</option>
              {securityQuestionsData.sort().map((d, i) => (
                <option key={`security-question-${i++}`} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </Label>
        </div>
    )
}

export const InputUsername: React.FC<InputMessage> = ({ message }) => {
  return (
    <div>
      <Label>
        Nama Pengguna:
        <Input
          type="text"
          placeholder="Nama Pengguna"
          name="username"
          required
        />
        <ErrorMessage message={message} />
      </Label>
    </div>
  );
};
