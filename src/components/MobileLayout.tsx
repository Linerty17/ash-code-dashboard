
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MobileLayoutProps = {
  children: ReactNode;
  className?: string;
};

const MobileLayout = ({ children, className }: MobileLayoutProps) => {
  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <div 
        className={cn(
          "mx-auto w-full max-w-md rounded-xl bg-white p-6 shadow-lg",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default MobileLayout;
