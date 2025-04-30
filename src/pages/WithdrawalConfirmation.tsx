
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import NumPad from "@/components/NumPad";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useTransactions } from "@/contexts/TransactionContext";

type WithdrawalDetailsType = {
  fullName: string;
  accountNumber: string;
  bank: string;
  amount: string;
};

const WithdrawalConfirmation = () => {
  const [withdrawalDetails, setWithdrawalDetails] = useState<WithdrawalDetailsType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addTransaction, balance } = useTransactions();
  
  useEffect(() => {
    // Get withdrawal details from sessionStorage
    const detailsStr = sessionStorage.getItem('withdrawalDetails');
    if (!detailsStr) {
      toast({
        title: "Error",
        description: "Withdrawal details not found. Please start again.",
        variant: "destructive",
      });
      navigate('/withdrawal');
      return;
    }
    
    try {
      const details = JSON.parse(detailsStr);
      setWithdrawalDetails(details);
      
      // Validate if there's enough balance
      if (Number(details.amount) > balance) {
        toast({
          title: "Insufficient Balance",
          description: `Your available balance (₦${balance.toLocaleString()}) is less than the withdrawal amount (₦${parseInt(details.amount).toLocaleString()}).`,
          variant: "destructive",
        });
        navigate('/withdrawal');
      }
    } catch (e) {
      toast({
        title: "Error",
        description: "Invalid withdrawal details. Please start again.",
        variant: "destructive",
      });
      navigate('/withdrawal');
    }
  }, [navigate, toast, balance]);
  
  const handleCodeComplete = async (code: string) => {
    setVerificationError("");
    
    // Verify the 6-digit code (200718)
    if (code === "200718") {
      setIsVerified(true);
      toast({
        title: "Success",
        description: "Access code verified successfully",
      });
    } else {
      setVerificationError("Invalid access code. input the correct code.");
      toast({
        title: "Error",
        description: "Invalid access code. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleSubmit = () => {
    if (!isVerified) {
      toast({
        title: "Error",
        description: "Please verify your access code first",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Process the withdrawal
    const withdrawalAmount = Number(withdrawalDetails?.amount || 0);
    
    setTimeout(() => {
      // Add the withdrawal transaction
      addTransaction("withdrawal", withdrawalAmount, `Withdrawal to ${withdrawalDetails?.bank} - ${withdrawalDetails?.accountNumber}`);
      
      // Clear the withdrawal details from sessionStorage
      sessionStorage.removeItem('withdrawalDetails');
      
      toast({
        title: "Success",
        description: `Withdrawal of ₦${withdrawalAmount.toLocaleString()} has been processed successfully.`,
      });
      
      navigate('/dashboard');
    }, 2000);
  };
  
  if (!withdrawalDetails) return null;
  
  return (
    <MobileLayout>
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Confirm Withdrawal</h1>
        <p className="text-sm text-gray-500 mt-1">
          Enter your access code to confirm your withdrawal
        </p>
      </div>
      
      <div className="mb-8 p-4 bg-cyan-50 rounded-lg border border-cyan-100">
        <h3 className="font-medium text-cyan-800 mb-3">Withdrawal Details</h3>
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <p className="text-gray-600">Name:</p>
          <p className="font-medium">{withdrawalDetails.fullName}</p>
          
          <p className="text-gray-600">Bank:</p>
          <p className="font-medium">{withdrawalDetails.bank}</p>
          
          <p className="text-gray-600">Account Number:</p>
          <p className="font-medium">{withdrawalDetails.accountNumber}</p>
          
          <p className="text-gray-600">Amount:</p>
          <p className="font-medium">₦{parseInt(withdrawalDetails.amount).toLocaleString()}</p>
        </div>
      </div>
      
      {verificationError && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
          {verificationError}
        </div>
      )}
      
      {isVerified ? (
        <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-md text-sm">
          Access code verified successfully.
        </div>
      ) : (
        <>
          <p className="text-center mb-4 text-gray-700">Enter your 6-digit access code</p>
          <NumPad length={6} onComplete={handleCodeComplete} />
        </>
      )}
      
      <div className="mt-8">
        <Button 
          onClick={handleSubmit}
          disabled={!isVerified || isSubmitting}
          className="w-full bg-credit-cyan hover:bg-cyan-600"
          size="lg"
        >
          {isSubmitting ? "Processing..." : "Complete Withdrawal"}
        </Button>
      </div>
    </MobileLayout>
  );
};

export default WithdrawalConfirmation;
