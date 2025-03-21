// app/components/ui/card.tsx
import React from "react";

export const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`p-4 bg-white shadow-md rounded-md ${className}`}>
      {children}
    </div>
  );
};
