
import { useNavigate } from "react-router-dom";
import { ShoppingCart, MessageSquare } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import Logo from "@/components/Logo";
import CreditButton from "@/components/CreditButton";

const PurchaseOptions = () => {
  const navigate = useNavigate();

  return (
    <MobileLayout className="p-4">
      <div className="flex justify-center mb-6">
        <Logo size="md" />
      </div>
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Choose Purchase Option
        </h1>
        <p className="text-sm text-center text-gray-500">
          Select how you would like to purchase your access code
        </p>
      </div>
      
      <div className="space-y-4">
        <CreditButton 
          onClick={() => navigate("/purchase-code")}
          className="w-full flex items-center justify-center gap-2 rounded-full"
        >
          <ShoppingCart className="w-5 h-5" />
          Purchase from Vendor
          Open telegram
        </CreditButton>
        
        <CreditButton 
          variant="secondary"
          onClick={() => navigate("/whatsapp-group")}
          className="w-full flex items-center justify-center gap-2 rounded-full"
        >
          <MessageSquare className="w-5 h-5" />
          Join WhatsApp Group
        </CreditButton>
      </div>
    </MobileLayout>
  );
};

export default PurchaseOptions;

