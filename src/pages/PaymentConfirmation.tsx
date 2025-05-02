
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, XCircle } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const PaymentConfirmation = () => {
  const [progress, setProgress] = useState(0);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Show toast when verification is complete
    if (verificationComplete) {
      toast({
        description: "Payment verification failed!",
        duration: 5000,
      });
    }
  }, [verificationComplete, toast]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setVerificationComplete(true);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleRetry = () => {
    navigate("/purchase-code");
  };

  const handleGoBack = () => {
    navigate("/dashboard");
  };

  return (
    <MobileLayout className="p-4">
      <div className="flex justify-center mb-6">
        <Logo size="md" />
      </div>
      
      {!verificationComplete ? (
        <div className="text-center space-y-6">
          <h1 className="text-2xl font-bold text-gray-800">Verifying Payment</h1>
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-sheen-green-600" />
            <Progress value={progress} className="w-full bg-sheen-green-100" />
            <p className="text-sm text-gray-500">
              Please wait while we verify your payment...
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <XCircle className="h-16 w-16 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Payment Not Confirmed!</h1>
          <p className="text-sm text-gray-500">
            We couldn't verify your payment at this time. Please try again or contact support if the issue persists.
          </p>
          
          <div className="flex flex-col gap-3 mt-6">
            <Button 
              className="w-full rounded-full bg-sheen-green-600 hover:bg-sheen-green-700"
              onClick={handleRetry}
            >
              TRY AGAIN
            </Button>
            
            <Button 
              variant="outline"
              className="w-full rounded-full border-sheen-green-600 text-sheen-green-600 hover:bg-sheen-green-50"
              onClick={handleGoBack}
            >
              RETURN TO DASHBOARD
            </Button>
          </div>
        </div>
      )}
    </MobileLayout>
  );
};

export default PaymentConfirmation;
