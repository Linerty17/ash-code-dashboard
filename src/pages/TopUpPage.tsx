
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, WifiHigh, CreditCard } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import Logo from "@/components/Logo";
import CreditButton from "@/components/CreditButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const TopUpPage = () => {
  const [selectedProvider, setSelectedProvider] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAirtimeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProvider || !phoneNumber || !amount) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate("/payment-confirmation");
    } catch (error) {
      console.error("Top-up failed:", error);
      toast({
        title: "Error",
        description: "Top-up failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAccessCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!accessCode) {
      toast({
        title: "Error",
        description: "Please enter your access code.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate("/enter-code");
    } catch (error) {
      console.error("Access code processing failed:", error);
      toast({
        title: "Error",
        description: "Failed to process access code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MobileLayout className="p-4">
      <div className="flex justify-center mb-6">
        <Logo size="md" />
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-center text-white mb-2">
          Account Services
        </h1>
        <p className="text-sm text-center text-white/80">
          Purchase airtime or enter your access code
        </p>
      </div>

      <Tabs defaultValue="airtime" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="airtime" className="flex items-center gap-2">
            <WifiHigh className="h-4 w-4" />
            Airtime
          </TabsTrigger>
          <TabsTrigger value="accessCode" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Access Code
          </TabsTrigger>
        </TabsList>

        <TabsContent value="airtime" className="mt-0">
          <form onSubmit={handleAirtimeSubmit} className="space-y-5">
            <div>
              <Label htmlFor="provider" className="text-white">Provider</Label>
              <Select onValueChange={setSelectedProvider}>
                <SelectTrigger className="w-full bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select Provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MTN">MTN</SelectItem>
                  <SelectItem value="Vodafone">Vodafone</SelectItem>
                  <SelectItem value="AirtelTigo">AirtelTigo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="phoneNumber" className="text-white">Phone Number</Label>
              <Input
                type="tel"
                id="phoneNumber"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="credit-input bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>

            <div>
              <Label htmlFor="amount" className="text-white">Amount</Label>
              <Input
                type="number"
                id="amount"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="credit-input bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>

            <CreditButton 
              type="submit"
              variant="sheen"
              disabled={isSubmitting || selectedProvider === "" || phoneNumber === "" || amount === ""}
              className="w-full rounded-full mt-6"
            >
              {isSubmitting ? (
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

        <TabsContent value="accessCode" className="mt-0">
          <form onSubmit={handleAccessCodeSubmit} className="space-y-5">
            <div>
              <Label htmlFor="accessCode" className="text-white">6-Digit Access Code</Label>
              <Input
                type="text"
                id="accessCode"
                placeholder="Enter your 6-digit access code"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="credit-input bg-white/10 border-white/20 text-white placeholder:text-white/60"
                maxLength={6}
              />
            </div>

            <CreditButton 
              type="submit"
              variant="sheen"
              disabled={isSubmitting || accessCode.length !== 6}
              className="w-full rounded-full mt-6"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </div>
              ) : (
                "Submit Access Code"
              )}
            </CreditButton>
          </form>
        </TabsContent>
      </Tabs>
    </MobileLayout>
  );
};

export default TopUpPage;
