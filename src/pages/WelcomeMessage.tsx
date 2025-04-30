
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
      
      <div className="relative text-center mb-8 p-6 rounded-xl bg-gradient-to-br from-cyan-50 to-white border border-cyan-100">
        <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-400/10 rounded-full -translate-y-1/4 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-cyan-400/10 rounded-full translate-y-1/4 -translate-x-1/4" />
        
        <MessageSquarePlus className="w-16 h-16 mx-auto mb-4 text-cyan-500" />
        <h1 className="text-2xl font-bold text-gray-800 mb-4 relative z-10">
          Welcome to <span className="text-cyan-600">Credit Pro!</span>
        </h1>
        <p className="text-gray-600 mb-6 relative z-10">
          Thank you for joining us. We're excited to help you on your credit journey.
          To get started, you'll need to purchase an access code.
        </p>
        
        <CreditButton 
          onClick={() => navigate("/purchase-code")}
          className="w-full mb-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
        >
          Get Started
        </CreditButton>
        
        <CreditButton 
          variant="secondary"
          onClick={() => navigate("/enter-code")}
          className="w-full rounded-full"
        >
          Continue to Dashboard
        </CreditButton>
      </div>
    </MobileLayout>
  );
};

export default WelcomeMessage;
