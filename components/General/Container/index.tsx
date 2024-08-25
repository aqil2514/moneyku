import clsx from "clsx";
import React from "react";

export default function MainWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "w-full min-h-screen bg-sky-200 overflow-y-scroll",
        className
      )}
    >
      {children}
    </div>
  );
}
