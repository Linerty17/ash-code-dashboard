
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
        backgroundImage: `linear-gradient(rgba(0, 194, 255, 0.6), rgba(14, 165, 233, 0.7)), url('/lovable-uploads/9a1cfdeb-a05d-4ff4-9ed2-f31903fbd067.png')` 
      }}
    >
      <div 
        className={cn(
          "mx-auto w-full max-w-md rounded-xl bg-white/95 backdrop-blur-sm p-6 shadow-lg border-t-4 border-t-cyan-400 border-r border-l border-b border-cyan-100",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default MobileLayout;
