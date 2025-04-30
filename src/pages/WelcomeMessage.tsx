
import { MessageSquarePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import Logo from "@/components/Logo";
import CreditButton from "@/components/CreditButton";

const WelcomeMessage = () => {
  const navigate = useNavigate();

  return (
    <MobileLayout className="p-4">
      <div className="flex justify-center mb-6">
        <Logo size="md" />
      </div>
      
      <div className="text-center mb-8">
        <MessageSquarePlus className="w-16 h-16 mx-auto mb-4 text-credit-blue" />
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome to Credit Pro!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for joining us. We're excited to help you on your credit journey.
          To get started, you'll need to purchase an access code.
        </p>
      </div>
      
      <CreditButton 
        onClick={() => navigate("/purchase-code")}
        className="w-full rounded-full"
      >
        Get Started
      </CreditButton>
    </MobileLayout>
  );
};

export default WelcomeMessage;
