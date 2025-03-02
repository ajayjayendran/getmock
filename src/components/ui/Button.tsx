import clsx from "clsx";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ className, ...props }) => {
  return (
    <button
      className={clsx(
        "rounded font-semibold",
        "font-primary shadow-sm transition-all duration-200 ease-in-out",
        "focus:border-blue-300 focus:ring-2 focus:ring-blue-300 focus:shadow-md focus:outline-none",
        "hover:border-blue-200 font-black bg-gray-50",
        className
      )}
      {...props}
    />
  );
};

export default Button;
