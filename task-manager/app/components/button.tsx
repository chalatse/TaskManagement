// app/components/ui/button.tsx
import React from "react";

export const Button = ({ onClick, children, className }: { onClick: () => void, children: React.ReactNode, className?: string }) => {
  return (
    <button onClick={onClick} className={`py-2 px-4 rounded-md ${className}`}>
      {children}
    </button>
  );
};
