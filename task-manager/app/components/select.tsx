import React from "react";

interface SelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  options: string[]; // Array of options to render in the dropdown
}

export const Select = ({ value, onChange, className, options }: SelectProps) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`mt-2 w-full p-2 rounded-md border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 text-black ${className}`}
    >
      <option value="">Select Status</option> {/* Default prompt */}
      {options.map((opt, i) => (
        <option key={i} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
};

// // Select.tsx
// import React, { ChangeEvent } from 'react';

// interface SelectProps {
//   value: string;
//   onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
//   children: React.ReactNode;
// }

// export const Select: React.FC<SelectProps> = ({ value, onChange, children }) => {
//   return (
//     <select value={value} onChange={onChange}>
//       {children}
//     </select>
//   );
// };

