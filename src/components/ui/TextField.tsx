import React from "react";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  error,
  className,
  ...props
}) => {
  return (
    <div className="h-max w-full flex flex-col gap-2">
      <input
        className={`h-max font-primary w-full p-2 border border-border rounded-md shadow-sm transition-all duration-250 ease-in-out 
      focus:border-blue-300 focus:ring-2 focus:ring-blue-300 focus:shadow-md focus:outline-none 
      hover:border-blue-200 bg-neutral-90 text-font-primary-100 ${className} ${
          error ? "border-red-500" : ""
        }`}
        {...props}
      />
      {error && <div className="text-red-500 font-primary">{error}</div>}
    </div>
  );
};

export default TextField;
