
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const AccountDetails = () => {
  const { toast } = useToast();
  
  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    toast({
      description: `${field} copied to clipboard!`,
      duration: 2000,
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Bank Account Details</h2>
        <p className="text-sm text-gray-500">Please make a transfer of ₦7,650</p>
      </div>
      
      <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Bank Name</p>
            <p className="font-medium">Guaranty Trust Bank</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard("Guaranty Trust Bank", "Bank name")}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Account Number</p>
            <p className="font-medium">0123456789</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard("0123456789", "Account number")}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Account Name</p>
            <p className="font-medium">Credit Pro Services</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard("Credit Pro Services", "Account name")}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
