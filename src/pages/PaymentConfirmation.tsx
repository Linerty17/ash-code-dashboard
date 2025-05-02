
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, AlertCircle } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import AccountDetails from "@/components/AccountDetails";

const PaymentConfirmation = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCheckStatus = () => {
    setIsProcessing(true);
    
    // Show processing for a short time
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        description: "Payment verification is still in progress. Please check back later.",
        duration: 5000,
      });
    }, 2000);
  };

  const handleReturnToPayment = () => {
    navigate("/purchase-code");
  };

  return (
    <MobileLayout className="p-4">
      <div className="flex justify-center mb-6">
        <Logo size="md" />
      </div>
      
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <Clock className="h-16 w-16 text-amber-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Payment Pending</h1>
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
              <p className="text-sm text-gray-700">
                Your payment is being processed. This may take some time to verify. 
                Please check back later or contact support if it's taking too long.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-4 pt-4">
          <Button 
            className="w-full rounded-full"
            onClick={handleCheckStatus}
            disabled={isProcessing}
          >
            {isProcessing ? "Checking..." : "CHECK PAYMENT STATUS"}
          </Button>
          
          <Button 
            variant="outline"
            className="w-full rounded-full"
            onClick={handleReturnToPayment}
          >
            BACK TO PAYMENT PAGE
          </Button>
        </div>
      </div>
      
      <div className="mt-8">
        <p className="text-center text-sm font-medium text-gray-700 mb-4">
          Payment Details
        </p>
        <AccountDetails />
      </div>
    </MobileLayout>
  );
};

export default PaymentConfirmation;
