import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import MobileLayout from "@/components/MobileLayout";
import CreditButton from "@/components/CreditButton";
import Logo from "@/components/Logo";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useTransactions } from "@/contexts/TransactionContext";

const Dashboard = () => {
  const [showWithdrawalOptions, setShowWithdrawalOptions] = useState(false);
  const [showTopUpOptions, setShowTopUpOptions] = useState(false);
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState("Day");

  const navigate = useNavigate();
  const { user } = useAuth();
  const { transactions, balance, getFormattedBalance, clearHistory } = useTransactions();

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setTimeOfDay("Morning");
    } else if (currentHour < 18) {
      setTimeOfDay("Afternoon");
    } else {
      setTimeOfDay("Evening");
    }
  }, []);

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  const handleWithdrawalClick = () => {
    setShowWithdrawalOptions(true);
  };

  const handleTopUpClick = () => {
    setShowTopUpOptions(true);
  };

  const navigateToWithdrawal = () => {
    navigate("/withdrawal");
  };

  const navigateToTopUp = () => {
    navigate("/top-up");
  };

  const navigateToLoanApplication = () => {
    navigate("/loan-application");
  };

  const navigateToTransactionHistory = () => {
    navigate("/transaction-history");
  };

  const navigateToProfile = () => {
    navigate("/profile");
  };

  return (
    <MobileLayout className="p-4">
      <div className="flex items-center justify-between mb-6">
        <Logo size="md" />
        <Avatar className="h-10 w-10 cursor-pointer" onClick={navigateToProfile}>
          {user?.profileImage ? (
            <AvatarImage src={user.profileImage} alt={user.name} />
          ) : (
            <AvatarFallback className="bg-sheen-green-100 text-sheen-green-700">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          )}
        </Avatar>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Good {timeOfDay},</h1>
        <p className="text-gray-500">Welcome back to your dashboard</p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Account Balance</h3>
              <p className="text-gray-500">Available to spend</p>
            </div>
            <button onClick={toggleBalanceVisibility} className="focus:outline-none">
              {isBalanceVisible ? (
                <span className="font-semibold text-xl">{getFormattedBalance()}</span>
              ) : (
                <span className="text-xl">••••••••</span>
              )}
            </button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <CreditButton onClick={handleWithdrawalClick} variant="secondary">
          Withdraw
        </CreditButton>
        <CreditButton onClick={handleTopUpClick} variant="sheen">
          Top Up
        </CreditButton>
      </div>

      {showWithdrawalOptions && (
        <Card className="mb-4">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">Withdraw Funds</h3>
            <p className="text-gray-500 mb-4">Choose a withdrawal method:</p>
            <CreditButton onClick={navigateToWithdrawal} className="w-full rounded-full">
              Withdraw to Bank
            </CreditButton>
            <CreditButton onClick={() => setShowWithdrawalOptions(false)} variant="secondary" className="w-full rounded-full mt-2">
              Cancel
            </CreditButton>
          </CardContent>
        </Card>
      )}

      {showTopUpOptions && (
        <Card className="mb-4">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">Top Up Account</h3>
            <p className="text-gray-500 mb-4">Choose a top-up method:</p>
            <CreditButton onClick={navigateToTopUp} className="w-full rounded-full">
              Top Up with Card
            </CreditButton>
            <CreditButton onClick={() => setShowTopUpOptions(false)} variant="secondary" className="w-full rounded-full mt-2">
              Cancel
            </CreditButton>
          </CardContent>
        </Card>
      )}

      <Card className="mb-6">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <CreditButton onClick={navigateToLoanApplication} variant="secondary" className="h-16 rounded-full">
              Apply for Loan
            </CreditButton>
            <CreditButton onClick={navigateToTransactionHistory} variant="secondary" className="h-16 rounded-full">
              Transaction History
            </CreditButton>
          </div>
        </CardContent>
      </Card>
    </MobileLayout>
  );
};

export default Dashboard;
