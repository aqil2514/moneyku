import React from "react";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "p"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2";
// type TextAlign = "left" | "center" | "right" | "justify";
// type TextColor =
//   | "primary"
//   | "secondary"
//   | "error"
//   | "warning"
//   | "info"
//   | "success";

type FontFamily =
  | "merriweather-light"
  | "merriweather-light-italic"
  | "merriweather-medium"
  | "merriweather-medium-italic"
  | "merriweather-bold"
  | "merriweather-bold-italic"
  | "merriweather-black"
  | "merriweather-black-italic"
  | "playfair-light"
  | "playfair-light-italic"
  | "playfair-medium"
  | "playfair-medium-italic"
  | "playfair-bold"
  | "playfair-bold-italic"
  | "playfair-black"
  | "playfair-black-italic"
  | "poppins-light"
  | "poppins-light-italic"
  | "poppins-extralight"
  | "poppins-extralight-italic"
  | "poppins-regular"
  | "poppins-regular-italic"
  | "poppins-medium"
  | "poppins-medium-italic"
  | "poppins-semibold"
  | "poppins-semibold-italic"
  | "poppins-bold"
  | "poppins-bold-italic"
  | "poppins-extrabold"
  | "poppins-extrabold-italic"
  | "poppins-black"
  | "poppins-black-italic"
  | "ubuntu-light"
  | "ubuntu-light-italic"
  | "ubuntu-regular"
  | "ubuntu-regular-italic"
  | "ubuntu-medium"
  | "ubuntu-medium-italic"
  | "ubuntu-bold"
  | "ubuntu-bold-italic";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant: TypographyVariant;
  family: FontFamily;
  children: React.ReactNode;
}

const variantMap: Record<TypographyVariant, React.ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  p: "p",
  subtitle1: "h4",
  subtitle2: "h5",
  body1: "p",
  body2: "p",
};

export default function Typography({
  variant,
  family,
  children,
  ...props
}: TypographyProps) {
  const Component = variantMap[variant];

  return (
    <Component className={`font-${family}`} {...props}>
      {children}
    </Component>
  );
}
