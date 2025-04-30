
import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CreditButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success" | "numpad" | "sheen";
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
    primary: "bg-sheen-green-600 text-white hover:bg-sheen-green-700 active:bg-sheen-green-800",
    secondary: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 active:bg-gray-200",
    danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
    success: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800",
    numpad: "flex h-16 items-center justify-center border border-gray-200 bg-white text-2xl font-semibold text-gray-800 shadow-sm hover:bg-gray-50 active:bg-gray-100",
    sheen: "bg-gradient-to-r from-sheen-green-600 to-sheen-green-700 text-white hover:from-sheen-green-700 hover:to-sheen-green-800 active:from-sheen-green-800 active:to-sheen-green-800",
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
