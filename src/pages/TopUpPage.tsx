import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import Logo from "@/components/Logo";
import CreditButton from "@/components/CreditButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TopUpPage = () => {
  const [selectedProvider, setSelectedProvider] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProvider || !phoneNumber || !amount) {
      alert("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate("/payment-confirmation");
    } catch (error) {
      console.error("Top-up failed:", error);
      alert("Top-up failed. Please try again.");
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
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Top Up Account
        </h1>
        <p className="text-sm text-center text-gray-500">
          Enter your details to top up your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="provider">Provider</Label>
          <Select onValueChange={setSelectedProvider}>
            <SelectTrigger className="w-full">
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
          disabled={isSubmitting || selectedProvider === "" || phoneNumber === "" || amount === ""}
          className="w-full rounded-full mt-4"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing...
            </div>
          ) : (
            "Purchase"
          )}
        </CreditButton>
      </form>
    </MobileLayout>
  );
};

export default TopUpPage;
