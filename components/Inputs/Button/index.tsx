import clsx from "clsx";
import React, { ButtonHTMLAttributes } from "react";

type Color = "success" | "error" | "info" | "primary";
type Variant = "contained" | "outlined";

export interface ButtonComponentProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color: Color;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: Variant;
}

const colorClasses = {
  success: "bg-green-600 text-white hover:bg-green-700",
  error: "bg-red-600 text-white hover:bg-red-700",
  info: "bg-blue-600 text-white hover:bg-blue-700",
  primary: "bg-indigo-600 text-white hover:bg-indigo-700",
};

const outlinedColorClasses = {
  success: "border border-green-600 text-green-600 hover:bg-green-100",
  error: "border border-red-600 text-red-600 hover:bg-red-100",
  info: "border border-blue-600 text-blue-600 hover:bg-blue-100",
  primary: "border border-indigo-600 text-indigo-600 hover:bg-indigo-100",
};

export default function Button({
  color,
  children,
  startIcon,
  endIcon,
  variant = "contained",
  className,
  disabled,
  onClick,
  ...props
}: ButtonComponentProps) {
  const classes = clsx(
    "flex gap-1 items-center px-4 py-2 rounded transition duration-200",
    {
      [colorClasses[color]]: variant === "contained" && !disabled,
      [outlinedColorClasses[color]]: variant === "outlined" && !disabled,
      "opacity-50 cursor-not-allowed": disabled,
    },
    className
  );

  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </button>
  );
}
