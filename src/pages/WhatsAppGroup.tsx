
import { WhatsApp } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import Logo from "@/components/Logo";
import CreditButton from "@/components/CreditButton";

const WhatsAppGroup = () => {
  const handleJoinGroup = () => {
    window.open("https://whatsapp.com/group-link", "_blank");
  };

  return (
    <MobileLayout className="p-4">
      <div className="flex justify-center mb-6">
        <Logo size="md" />
      </div>
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Join Our WhatsApp Group
        </h1>
        <p className="text-sm text-center text-gray-500">
          Connect with our community and purchase your access code through WhatsApp
        </p>
      </div>
      
      <CreditButton 
        onClick={handleJoinGroup}
        className="w-full flex items-center justify-center gap-2 rounded-full"
      >
        <WhatsApp className="w-5 h-5" />
        Join WhatsApp Group
      </CreditButton>
    </MobileLayout>
  );
};

export default WhatsAppGroup;
