
import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CreditButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success" | "numpad";
  fullWidth?: boolean;
}

const CreditButton = ({
  children,
  className,
  variant = "primary",
  fullWidth = true,
  ...props
}: CreditButtonProps) => {
  const baseStyles = "rounded-md py-3 px-4 font-medium transition-all duration-200 focus:outline-none";
  
  const variantStyles = {
    primary: "bg-credit-blue text-white hover:bg-blue-700 active:bg-blue-800",
    secondary: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 active:bg-gray-200",
    danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
    success: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800",
    numpad: "flex h-16 items-center justify-center border border-gray-200 bg-white text-2xl font-semibold text-gray-800 shadow-sm hover:bg-gray-50 active:bg-gray-100",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        fullWidth ? "w-full" : "",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default CreditButton;
