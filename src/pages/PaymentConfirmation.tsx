
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const PaymentConfirmation = () => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useState(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            navigate("/dashboard");
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <MobileLayout className="p-4">
      <div className="flex justify-center mb-6">
        <Logo size="md" />
      </div>
      
      <div className="text-center space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Verifying Payment</h1>
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-gray-500">
            Please wait while we verify your payment...
          </p>
        </div>
      </div>
    </MobileLayout>
  );
};

export default PaymentConfirmation;
