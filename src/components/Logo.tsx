
import React from 'react';

type LogoProps = {
  size?: "sm" | "md" | "lg";
  withText?: boolean;
};

const Logo = ({ size = "md", withText = true }: LogoProps) => {
  const sizes = {
    sm: { container: "h-10 w-10", text: "text-xs" },
    md: { container: "h-16 w-16", text: "text-sm" },
    lg: { container: "h-24 w-24", text: "text-base" },
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`${sizes[size].container} rounded-full overflow-hidden flex items-center justify-center bg-credit-blue shadow-md border-2 border-white`}>
        <img 
          src="/lovable-uploads/db76e032-58b4-4f3a-87af-d43f4ab1a6ea.png" 
          alt="Credit Pro Logo" 
          className="object-contain max-w-full max-h-full"
        />
      </div>
      {withText && (
        <h1 className={`font-bold ${sizes[size].text} tracking-wider uppercase text-credit-blue`}>
          <span className="font-light">Credit</span>Pro
        </h1>
      )}
    </div>
  );
};

export default Logo;
