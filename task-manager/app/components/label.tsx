// app/components/ui/label.tsx
import React from "react";

const Label = ({ children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label className="block text-sm font-semibold text-gray-700" {...props}>
      {children}
    </label>
  );
};

export { Label };
