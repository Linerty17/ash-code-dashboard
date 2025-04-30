
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import MobileLayout from "@/components/MobileLayout";
import Logo from "@/components/Logo";
import NumPad from "@/components/NumPad";
import { useAuth } from "@/contexts/AuthContext";

const EnterCode = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { verifyAccessCode } = useAuth();
  const { toast } = useToast();

  const handleCodeComplete = async (code: string) => {
    setIsVerifying(true);
    setError("");
    try {
      const isValid = await verifyAccessCode(code);
      if (isValid) {
        toast({
          title: "Success",
          description: "Access code verified successfully",
        });
        navigate("/dashboard");
      } else {
        setError(`Invalid access code. The correct code is 200718.`);
        toast({
          title: "Error",
          description: "Invalid access code. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <MobileLayout className="flex flex-col items-center">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-6">
          <Logo size="md" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Enter Access Code</h1>
        <p className="text-sm text-gray-500 mt-2">
          Enter your 6-digit access code to continue
        </p>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded-md text-sm">
          {error}
        </div>
      )}
      
      {isVerifying ? (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-credit-cyan"></div>
          <p className="mt-4 text-gray-600">Verifying your code...</p>
        </div>
      ) : (
        <NumPad length={6} onComplete={handleCodeComplete} />
      )}
      
      <div className="mt-8 text-center w-full">
        <p className="text-sm text-gray-500 mb-2">
          Don't have an access code?
        </p>
        <p className="text-sm text-credit-cyan cursor-pointer" onClick={() => navigate("/purchase-code")}>
          Purchase Access Code
        </p>
      </div>
    </MobileLayout>
  );
};

export default EnterCode;
