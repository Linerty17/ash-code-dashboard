
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import Logo from "@/components/Logo";
import CreditButton from "@/components/CreditButton";

type PlanOption = {
  amount: number;
  fee: number;
  id: string;
};

const PurchaseCode = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const planOptions: PlanOption[] = [
    { amount: 50000, fee: 6000, id: "plan1" },
    { amount: 100000, fee: 10000, id: "plan2" },
    { amount: 120000, fee: 12000, id: "plan3" },
    { amount: 150000, fee: 15000, id: "plan4" },
    { amount: 180000, fee: 18000, id: "plan5" },
    { amount: 200000, fee: 20000, id: "plan6" },
  ];
  
  const handleProceedToPayment = () => {
    navigate("/enter-code");
  };
  
  return (
    <MobileLayout className="p-4">
      <div className="flex justify-center mb-6">
        <Logo size="md" />
      </div>
      
      <div className="mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-purple-700 rounded-full p-4">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M19 7h-1V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v1H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM8 6h8v1H8V6zm10 12H6v-4h12v4zm0-6H6V9h12v3z" fill="currentColor" />
              <circle cx="8" cy="11" r="1" fill="currentColor" />
              <circle cx="16" cy="11" r="1" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="space-y-4 mb-8">
        {planOptions.map((plan, index) => (
          <div 
            key={plan.id}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              selectedPlan === plan.id ? "border-credit-blue bg-blue-50" : "border-gray-200"
            }`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Get {plan.amount.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Pay {plan.fee.toLocaleString()}</p>
              </div>
              <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                {selectedPlan === plan.id && (
                  <div className="h-3 w-3 rounded-full bg-credit-blue"></div>
                )}
              </div>
            </div>
            {plan.id === "plan6" && (
              <p className="mt-2 text-xs text-gray-500">Note that our account number changes from time to time</p>
            )}
          </div>
        ))}
      </div>
      
      <div>
        <CreditButton 
          onClick={handleProceedToPayment}
          disabled={!selectedPlan}
          className="rounded-full"
        >
          PROCEED TO PAYMENTS
        </CreditButton>
      </div>
    </MobileLayout>
  );
};

export default PurchaseCode;
