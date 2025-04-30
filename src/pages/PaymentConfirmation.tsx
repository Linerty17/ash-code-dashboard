
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, CheckCircle } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const PaymentConfirmation = () => {
  const [progress, setProgress] = useState(0);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Show toast when the access code is displayed
    if (verificationComplete) {
      toast({
        description: "Payment confirmed successfully!",
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

  const handleContinue = () => {
    navigate("/enter-code");
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
            <CheckCircle className="h-16 w-16 text-sheen-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Payment Confirmed!</h1>
          <p className="text-sm text-gray-500">
            Your payment has been successfully verified. Here's your access code:
          </p>
          
          <Card className="bg-sheen-green-50 border-sheen-green-200">
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <h2 className="text-3xl font-bold tracking-wider text-sheen-green-800">200718</h2>
                <p className="text-xs text-gray-500 mt-2">Use this code to access your account</p>
              </div>
            </CardContent>
          </Card>
          
          <Button 
            className="w-full rounded-full mt-4 bg-sheen-green-600 hover:bg-sheen-green-700"
            onClick={handleContinue}
          >
            CONTINUE TO ENTER CODE
          </Button>
        </div>
      )}
    </MobileLayout>
  );
};

export default PaymentConfirmation;
