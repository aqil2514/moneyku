import { ButtonHTMLAttributes } from "react";

type Color = "success" | "error" | "info" | "primary"
type Variant = "contained" | "outlined";

interface ButtonComponentProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color: Color;
  variant?: Variant;
}

export default function Button({
  color,
  variant="contained",
  children,
  ...props
}: ButtonComponentProps) {
  return (
    <button className={`button-${variant}-${color}`} {...props}>
      {children}
    </button>
  );
}