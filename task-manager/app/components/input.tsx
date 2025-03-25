import React, { ChangeEventHandler } from "react";

interface InputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type?: string;
  className?: string;
  placeholder?: string;
}

export const Input = ({ value, onChange, type = "text", className, placeholder }: InputProps) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`py-2 px-4 border rounded-md ${className}`}
      placeholder={placeholder}
    />
  );
};

