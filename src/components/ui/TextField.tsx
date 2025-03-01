import React from "react";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const TextField: React.FC<TextFieldProps> = ({ ...props }) => {
  return (
    <input
      className={`h-max font-primary w-full p-2 border border-gray-300 rounded-md shadow-sm transition-all duration-250 ease-in-out 
      focus:border-blue-300 focus:ring-2 focus:ring-blue-300 focus:shadow-md focus:outline-none 
      hover:border-blue-200 font-black bg-gray-50 text-gray-900 ${props.className}`}
      {...props}
    />
  );
};

export default TextField;
