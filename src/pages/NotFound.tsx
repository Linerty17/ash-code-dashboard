
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreditButton from "@/components/CreditButton";
import MobileLayout from "@/components/MobileLayout";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <MobileLayout className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-6xl font-bold text-credit-blue mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Oops! Page not found</p>
      <CreditButton onClick={() => navigate("/")} className="max-w-xs rounded-full">
        Return to Home
      </CreditButton>
    </MobileLayout>
  );
};

export default NotFound;
