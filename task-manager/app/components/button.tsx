import React from 'react';

interface ButtonProps {
  onClick?: () => void;  // Made onClick optional
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
}

export const Button: React.FC<ButtonProps> = ({ onClick, children, className, type = "button" }) => {
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
};



// app/components/ui/button.tsx
// import React from "react";

// export const Button = ({ onClick, children, className }: { onClick: () => void, children: React.ReactNode, className?: string }) => {
//   return (
//     <button onClick={onClick} className={`py-2 px-4 rounded-md ${className}`}>
//       {children}
//     </button>
//   );
// };


// import React from 'react';

// interface ButtonProps {
//   onClick: () => void;
//   children: React.ReactNode;
//   className?: string;
//   type?: "button" | "submit";  // Add 'type' prop here
// }

// export const Button: React.FC<ButtonProps> = ({ onClick, children, className, type = "button" }) => {
//   return (
//     <button type={type} onClick={onClick} className={className}>
//       {children}
//     </button>
//   );
// };


