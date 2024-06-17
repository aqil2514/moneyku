import { FontFamily } from "components/General/interface";

interface TextfieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  forId: string;
  fontFamily: FontFamily;
  label: string;
  fieldType: "email" | "password" | "text";
}

export default function Textfield({
  forId,
  fontFamily,
  label,
  fieldType,
  ...props
}: TextfieldProps) {
  return (
    <div className="flex flex-column form-input-basic">
      <label htmlFor={forId} className={`font-${fontFamily}`}>
        {label}:
      </label>
      <input type={fieldType} name={forId} id={forId} {...props} className={`font-${fontFamily}`}/>
    </div>
  );
}
