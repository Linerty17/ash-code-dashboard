
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MobileLayoutProps = {
  children: ReactNode;
  className?: string;
};

const MobileLayout = ({ children, className }: MobileLayoutProps) => {
  return (
    <div 
      className="min-h-screen p-4 bg-gradient-to-b from-sheen-green-600/90 to-sheen-green-700/90"
    >
      <div 
        className={cn(
          "mx-auto w-full max-w-md bg-white/95 backdrop-blur-sm p-6",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default MobileLayout;
