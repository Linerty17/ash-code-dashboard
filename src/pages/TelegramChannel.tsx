
import { MessageSquare } from "lucide-react";
import { useEffect } from "react";
import MobileLayout from "@/components/MobileLayout";
import Logo from "@/components/Logo";
import CreditButton from "@/components/CreditButton";

const TelegramChannel = () => {
  useEffect(() => {
    // Automatically open the Telegram channel when the page loads
    window.open("https://t.me/Officialpaygo2025", "_blank");
  }, []);

  const handleJoinChannel = () => {
    window.open("https://t.me/Officialpaygo2025", "_blank");
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <MobileLayout className="p-4">
      <div className="flex justify-center mb-6">
        <Logo size="md" />
      </div>
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Join Our Telegram Channel
        </h1>
        <p className="text-sm text-center text-gray-500 mb-6">
          Connect with our community for updates, support, and exclusive offers
        </p>
        
        <div className="flex justify-center mb-6">
          <img 
            src="/lovable-uploads/db76e032-58b4-4f3a-87af-d43f4ab1a6ea.png" 
            alt="Telegram Logo" 
            className="w-24 h-24 object-contain"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <CreditButton 
          onClick={handleJoinChannel}
          className="w-full flex items-center justify-center gap-2 rounded-full"
        >
          <MessageSquare className="w-5 h-5" />
          Join Telegram Channel
        </CreditButton>
        
        <CreditButton 
          variant="secondary"
          onClick={handleGoBack}
          className="w-full rounded-full"
        >
          Go Back
        </CreditButton>
      </div>
    </MobileLayout>
  );
};

export default TelegramChannel;
