
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Phone, Key } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import Logo from "@/components/Logo";
import CreditButton from "@/components/CreditButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTransactions } from "@/contexts/TransactionContext";
import { useToast } from "@/components/ui/use-toast";

const TopUpPage = () => {
  const navigate = useNavigate();
  const { addTransaction } = useTransactions();
  const { toast } = useToast();
  
  // Airtime tab
  const [selectedProvider, setSelectedProvider] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [isSubmittingAirtime, setIsSubmittingAirtime] = useState(false);
  
  // Access code tab
  const [accessCode, setAccessCode] = useState("");
  const [isSubmittingCode, setIsSubmittingCode] = useState(false);

  const handleAirtimeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProvider || !phoneNumber || !amount) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmittingAirtime(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Add transaction to history
      addTransaction("withdrawal", parseFloat(amount), `${selectedProvider} airtime for ${phoneNumber}`);
      
      toast({
        title: "Success",
        description: `Successfully purchased ${selectedProvider} airtime worth ₦${amount} for ${phoneNumber}`
      });
      
      navigate("/payment-confirmation");
    } catch (error) {
      console.error("Airtime purchase failed:", error);
      toast({
        title: "Error",
        description: "Airtime purchase failed. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmittingAirtime(false);
    }
  };

  const handleAccessCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!accessCode || accessCode.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter a valid 6-digit access code",
        variant: "destructive"
      });
      return;
    }

    setIsSubmittingCode(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Add transaction to history
      addTransaction("deposit", 5000, `Access code recharge: ${accessCode}`);
      
      toast({
        title: "Success",
        description: "Access code applied successfully. Your account has been credited."
      });
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Access code verification failed:", error);
      toast({
        title: "Error",
        description: "Access code verification failed. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmittingCode(false);
    }
  };

  return (
    <MobileLayout className="p-4">
      <div className="flex justify-center mb-6">
        <Logo size="md" />
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Top Up Account
        </h1>
        <p className="text-sm text-center text-gray-500">
          Purchase airtime or enter your access code
        </p>
      </div>

      <Tabs defaultValue="airtime" className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="airtime">
            <Phone className="mr-2 h-4 w-4" />
            Airtime
          </TabsTrigger>
          <TabsTrigger value="accessCode">
            <Key className="mr-2 h-4 w-4" />
            Access Code
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="airtime">
          <form onSubmit={handleAirtimeSubmit} className="space-y-4">
            <div>
              <Label htmlFor="provider">Provider</Label>
              <Select onValueChange={setSelectedProvider}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MTN">MTN</SelectItem>
                  <SelectItem value="Airtel">Airtel</SelectItem>
                  <SelectItem value="Glo">Glo</SelectItem>
                  <SelectItem value="9mobile">9mobile</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                type="tel"
                id="phoneNumber"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="credit-input"
              />
            </div>

            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                type="number"
                id="amount"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="credit-input"
              />
            </div>

            <CreditButton 
              type="submit"
              variant="sheen"
              disabled={isSubmittingAirtime || selectedProvider === "" || phoneNumber === "" || amount === ""}
              className="w-full rounded-full mt-4"
            >
              {isSubmittingAirtime ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </div>
              ) : (
                "Purchase Airtime"
              )}
            </CreditButton>
          </form>
        </TabsContent>
        
        <TabsContent value="accessCode">
          <form onSubmit={handleAccessCodeSubmit} className="space-y-4">
            <div>
              <Label htmlFor="accessCode">6-Digit Access Code</Label>
              <Input
                type="text"
                id="accessCode"
                placeholder="Enter 6-digit code"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value.slice(0, 6))}
                maxLength={6}
                className="credit-input text-center text-lg tracking-widest"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter the 6-digit code you received from your vendor
              </p>
            </div>

            <CreditButton 
              type="submit"
              variant="sheen"
              disabled={isSubmittingCode || accessCode.length !== 6}
              className="w-full rounded-full mt-4"
            >
              {isSubmittingCode ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Verifying...
                </div>
              ) : (
                "Apply Access Code"
              )}
            </CreditButton>
          </form>
        </TabsContent>
      </Tabs>
    </MobileLayout>
  );
};

export default TopUpPage;
