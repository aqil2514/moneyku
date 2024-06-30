import { FontFamily } from "components/General/interface";
import React from "react";

interface TextfieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  forId: string;
  fontFamily: FontFamily;
  label: string;
  fieldType: "email" | "password" | "text" | "number";
  errorMessage?: React.JSX.Element;
}

export default function Textfield({
  forId,
  fontFamily,
  label,
  fieldType,
  errorMessage,
  ...props
}: TextfieldProps) {
  return (
    <div className="flex flex-col form-input-basic">
      <label htmlFor={forId} className={`font-${fontFamily}`}>
        {label}:
      </label>
      <input type={fieldType} name={forId} id={forId} {...props} className={`font-${fontFamily}`}/>
      {errorMessage ? errorMessage : <></>}
    </div>
  );
}

