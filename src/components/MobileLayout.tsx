
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MobileLayoutProps = {
  children: ReactNode;
  className?: string;
};

const MobileLayout = ({ children, className }: MobileLayoutProps) => {
  return (
    <div 
      className="min-h-screen p-4 bg-cover bg-center bg-fixed"
      style={{ 
        backgroundImage: `linear-gradient(rgba(143, 212, 0, 0.8), rgba(123, 181, 1, 0.9))` 
      }}
    >
      <div 
        className={cn(
          "mx-auto w-full max-w-md rounded-xl bg-white/95 backdrop-blur-sm p-6 shadow-lg",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default MobileLayout;
