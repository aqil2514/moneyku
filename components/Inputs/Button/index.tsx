import clsx from "clsx";
import React, { ButtonHTMLAttributes } from "react";

type Color = "success" | "error" | "info" | "primary";
type Variant = "contained" | "outlined";

export interface ButtonComponentProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color: Color;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: Variant;
}

export default function Button({
  color,
  variant = "contained",
  children,
  startIcon,
  endIcon,
  className,
  ...props
}: ButtonComponentProps) {
  return (
    <button className={clsx(`button-${variant}-${color} flex gap-1 items-center`, className)} {...props}>
    {startIcon} {children} {endIcon}
    </button>
  );
}
