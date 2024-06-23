import clsx from "clsx";
import React from "react";

interface AlertProps {
  type?: "success" | "error" | "warning" | "info";
  className?: string;
  children: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({ type = "info", children, className }) => {
  const getAlertClass = () => {
    switch (type) {
      case "success":
        return "alert-success";
      case "error":
        return "alert-error";
      case "warning":
        return "alert-warning";
      case "info":
      default:
        return "alert-info";
    }
  };

  return <div className={clsx(`alert ${getAlertClass()}`, className)}>{children}</div>;
};

export default Alert;
