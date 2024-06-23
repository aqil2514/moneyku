import Textfield from "components/Inputs/Textfield";
import Alert from "components/Feedback/Alert";
import { PiNoteDuotone } from "react-icons/pi";
import Button from "components/Inputs/Button";
import { FaUnlockAlt } from "react-icons/fa";
import { useFetcher } from "@remix-run/react";
import { useSettingData } from "../_setting/route";
import { useState } from "react";
import Typography from "components/General/Typography";

type securityOptionState = "password" | "security-question";

export default function UnvisibleData(){
  const { user } = useSettingData();
  const fetcher = useFetcher();
  const [securityOption, setSecurityOption] =
    useState<securityOptionState>("password");

    return(
        <fetcher.Form method="POST">
        <Alert type="info" className="flex items-center gap-1">
          {" "}
          <PiNoteDuotone /> Beritahu kami bahwa ini memang Anda
        </Alert>
        <div className="flex gap-4">
          <div>
            <input
              type="radio"
              value={"password-option"}
              checked={securityOption === "password"}
              name="security-option"
              id="password-option"
              onChange={() => setSecurityOption("password")}
            />
            <label htmlFor="password-option">Password</label>
          </div>
          <div>
            <input
              type="radio"
              name="security-option"
              id="security-question-option"
              value={"security-question-option"}
              checked={securityOption === "security-question"}
              onChange={() => setSecurityOption("security-question")}
            />
            <label htmlFor="security-question-option">
              Pertanyaan Keamanan
            </label>
          </div>
        </div>
        {securityOption === "password" && (
          <Textfield
            fieldType="password"
            fontFamily="poppins-medium"
            forId="password"
            label="Password"
          />
        )}
        {securityOption === "security-question" && (
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
            />
          </>
        )}

        <Button startIcon={<FaUnlockAlt />} color="success">
          Buka Akses
        </Button>
      </fetcher.Form>
    )
}