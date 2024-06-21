import React from "react";
import { Color, FontFamily, FontSize } from "../interface";
import clsx from "clsx";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "p"
  | "subtitle1"
  | "subtitle2"
  | "str";
// type TextAlign = "left" | "center" | "right" | "justify";
// type TextColor =
//   | "primary"
//   | "secondary"
//   | "error"
//   | "warning"
//   | "info"
//   | "success";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant: TypographyVariant;
  family: FontFamily;
  children: React.ReactNode;
  fontSize?: FontSize;
  color?: Color;
  align?: "left" | "right" | "center" | "justify";
}

const variantMap: Record<TypographyVariant, React.ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  p: "p",
  subtitle1: "h4",
  subtitle2: "h5",
  str: "strong",
};

export default function Typography({
  variant,
  family,
  children,
  fontSize,
  color,
  align,
  className,
  ...props
}: TypographyProps) {
  const Component = variantMap[variant];
  const finalStyle = clsx(
    `font-${family}`,
    fontSize && `font-${fontSize}`,
    color && `text-${color}`,
    align && `text-${align}`,
    'bg-inherit'
  );

  return (
    <Component className={clsx(`${finalStyle} bg-inherit`, className)} {...props}>
      {children}
    </Component>
  );
}
