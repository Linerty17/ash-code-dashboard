
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useTransactions } from "@/contexts/TransactionContext";

const NIGERIAN_BANKS = [
  "Access Bank",
  "First Bank",
  "GTBank",
  "UBA",
  "Zenith Bank",
  "Fidelity Bank",
  "Ecobank",
  "FCMB",
  "Sterling Bank",
  "Union Bank",
  "Opay Bank",
  "Palmpay",
  "Sterling Bank",
  "Moniepoint MFB",
  "Kuda Bank",
];

const WithdrawalForm = () => {
  const [fullName, setFullName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bank, setBank] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { balance } = useTransactions();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
    if (!fullName || !accountNumber || !bank || !amount) {
      toast({
        title: "Error",
        description: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }

    if (accountNumber.length !== 10) {
      toast({
        title: "Error",
        description: "Account number must be 10 digits",
        variant: "destructive",
      });
      return;
    }

    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    // Check if withdrawal amount is greater than available balance
    if (Number(amount) > balance) {
      toast({
        title: "Insufficient Balance",
        description: `Your available balance (₦${balance.toLocaleString()}) is less than the withdrawal amount (₦${parseInt(amount).toLocaleString()}).`,
        variant: "destructive",
      });
      return;
    }

    // Store withdrawal details in sessionStorage to pass to next page
    sessionStorage.setItem('withdrawalDetails', JSON.stringify({
      fullName,
      accountNumber,
      bank,
      amount
    }));
    
    // Navigate to confirmation page
    navigate("/withdrawal-confirmation");
  };

  return (
    <MobileLayout>
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Withdrawal</h1>
        <p className="text-sm text-gray-500 mt-1">
          Enter your bank details to proceed
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="border-cyan-200 focus:border-cyan-500"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="accountNumber">Account Number</Label>
          <Input
            id="accountNumber"
            placeholder="Enter your 10-digit account number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
            className="border-cyan-200 focus:border-cyan-500"
            required
            maxLength={10}
            inputMode="numeric"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bank">Bank</Label>
          <Select value={bank} onValueChange={setBank} required>
            <SelectTrigger id="bank" className="w-full border-cyan-200 focus:border-cyan-500">
              <SelectValue placeholder="Select your bank" />
            </SelectTrigger>
            <SelectContent>
              {NIGERIAN_BANKS.map((bankName) => (
                <SelectItem key={bankName} value={bankName}>
                  {bankName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="amount">Amount (₦)</Label>
          <Input
            id="amount"
            placeholder="Enter amount to withdraw"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
            className="border-cyan-200 focus:border-cyan-500"
            required
            inputMode="numeric"
          />
          <p className="text-xs text-cyan-600">Available balance: ₦{balance.toLocaleString()}</p>
        </div>
        
        <Button type="submit" className="w-full bg-credit-cyan hover:bg-cyan-600" size="lg">
          Continue to Verify
        </Button>
      </form>
    </MobileLayout>
  );
};

export default WithdrawalForm;
