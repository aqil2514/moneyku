import { ButtonHTMLAttributes } from "react";

interface ButtonComponentProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: "success" | "error" | "info" | "warn";
}

interface ColorStyleState {
  success: React.CSSProperties;
  error: React.CSSProperties;
  info: React.CSSProperties;
  warn: React.CSSProperties;
}

const colorStyle: ColorStyleState = {
  success: {
    backgroundColor: "rgb(46, 125, 50)",
    color: "#fff",
  },
  error: {
    backgroundColor: "rgb(220, 53, 69)",
    color: "#fff",
  },
  info: {
    backgroundColor: "rgb(0, 123, 255)",
    color: "#fff",
  },
  warn: {
    backgroundColor: "rgb(255, 193, 7)",
    color: "#000",
  },
};

// TODO : Kerjain nanti ajah, jangan sekarang

export default function Button({
  color,
  children,
  ...props
}: ButtonComponentProps) {
  return (
    <button style={color && colorStyle[color]} {...props}>
      {children}
    </button>
  );
}

// rgb(46, 125, 50)
