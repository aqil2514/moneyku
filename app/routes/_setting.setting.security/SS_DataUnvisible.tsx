import Textfield from "components/Inputs/Textfield";
import Alert from "components/Feedback/Alert";
import { PiNoteDuotone } from "react-icons/pi";
import Button from "components/Inputs/Button";
import { FaUnlockAlt } from "react-icons/fa";
import { useSettingData } from "../_setting/route";
import { useState } from "react";
import Typography from "components/General/Typography";
import UnvisibleNoPassword from "./SS_UnvisibleNoPassword";
import UnvisibleSecurityQuiz from "./SS_UnvisibleSecurityQuiz";
import { useFetcher } from "@remix-run/react";
import { securityOptionState } from "~/@types/setting";

export default function UnvisibleData() {
  const {
    user,
    user: {
      statusFlags: { isHavePassword, isHaveSecurityQuiz },
    },
  } = useSettingData();
  const [securityOption, setSecurityOption] =
    useState<securityOptionState>("password-option");
    const [passwordInput, setPasswordInput] = useState<string>("")
    const [answerInput, setAnswerInput] = useState<string>("")
    const fetcher = useFetcher();

  return (
    <div>
      <Alert type="info" className="flex items-center gap-1">
        {" "}
        <PiNoteDuotone /> Beritahu kami bahwa ini memang Anda
      </Alert>
      <div className="flex gap-4">
        <div>
          <input
            type="radio"
            value={"password-option"}
            checked={securityOption === "password-option"}
            name="security-option"
            id="password-option"
            onChange={() => setSecurityOption("password-option")}
          />
          <label htmlFor="password-option">Password</label>
        </div>
        <div>
          <input
            type="radio"
            name="security-option"
            id="security-question-option"
            value={"security-question-option"}
            checked={securityOption === "security-question-option"}
            onChange={() => setSecurityOption("security-question-option")}
          />
          <label htmlFor="security-question-option">Pertanyaan Keamanan</label>
        </div>
      </div>
      {securityOption === "password-option" &&
        (isHavePassword ? (
          <Textfield
            fieldType="password"
            fontFamily="poppins-medium"
            forId="password"
            onChange={(e) => setPasswordInput(e.target.value)}
            label="Password"
          />
        ) : (
          <UnvisibleNoPassword />
        ))}
      {securityOption === "security-question-option" &&
        (isHaveSecurityQuiz ? (
          <>
            <Typography
              family="poppins-medium"
              variant="p"
              className="my-2 border-4 border-black border-double px-2"
            >
              {user.privacy.securityQuiz}
            </Typography>
            <Textfield
              fieldType="text"
              fontFamily="poppins-medium"
              forId="securityAnswer"
              label="Jawaban"
              onChange={(e) => setAnswerInput(e.target.value)}
            />
          </>
        ) : (
          <UnvisibleSecurityQuiz />
        ))}

      {securityOption === "password-option" && isHavePassword && (
        <fetcher.Form method="POST">
          <input type="hidden" name="security-option" readOnly value={securityOption} />
          <input type="hidden" name="password" readOnly value={passwordInput} />
        <Button startIcon={<FaUnlockAlt />} color="success">
          Buka Akses
        </Button>
        </fetcher.Form>
      )}  
      {securityOption === "security-question-option" && isHaveSecurityQuiz && (
        <fetcher.Form method="POST">
        <input type="hidden" name="security-option" readOnly value={securityOption} />
        <input type="hidden" name="securityAnswer" readOnly value={answerInput} />
      <Button startIcon={<FaUnlockAlt />} color="success">
        Buka Akses
      </Button>
      </fetcher.Form>
      )}
    </div>
  );
}
