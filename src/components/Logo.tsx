
import React from 'react';

type LogoProps = {
  size?: "sm" | "md" | "lg";
  withText?: boolean;
};

const Logo = ({ size = "md", withText = true }: LogoProps) => {
  const sizes = {
    sm: { container: "h-10 w-10", text: "text-lg" },
    md: { container: "h-16 w-16", text: "text-xl" },
    lg: { container: "h-24 w-24", text: "text-3xl" },
  };

  return (
    <div className="flex items-center gap-4">
      <div className={`${sizes[size].container} flex items-center justify-center`}>
        <img 
          src="/lovable-uploads/db76e032-58b4-4f3a-87af-d43f4ab1a6ea.png" 
          alt="Credit Pro Logo" 
          className="object-contain max-w-full max-h-full"
        />
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
