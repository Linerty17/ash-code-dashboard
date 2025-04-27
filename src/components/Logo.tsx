
import { DollarSign } from "lucide-react";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  withText?: boolean;
};

const Logo = ({ size = "md", withText = true }: LogoProps) => {
  const sizes = {
    sm: { icon: 24, text: "text-lg" },
    md: { icon: 32, text: "text-xl" },
    lg: { icon: 48, text: "text-3xl" },
  };

  return (
    <div className="flex items-center gap-2">
      <div className="rounded-full bg-credit-pink p-2 flex items-center justify-center">
        <DollarSign size={sizes[size].icon} className="text-white" />
      </div>
      {withText && (
        <h1 className={`font-bold ${sizes[size].text} text-gray-800`}>
          Credit Pro
        </h1>
      )}
    </div>
  );
};

export default Logo;
