
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import SignUp from "./pages/SignUp";
import WelcomeMessage from "./pages/WelcomeMessage";
import PurchaseOptions from "./pages/PurchaseOptions";
import PurchaseCode from "./pages/PurchaseCode";
import WhatsAppGroup from "./pages/WhatsAppGroup";
import EnterCode from "./pages/EnterCode";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import HelpMenu from "./components/HelpMenu";
import { AuthProvider } from "./contexts/AuthContext";
import PaymentConfirmation from "./pages/PaymentConfirmation";
import WithdrawalForm from "./pages/WithdrawalForm";
import WithdrawalConfirmation from "./pages/WithdrawalConfirmation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <HelpMenu />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/welcome-message" element={<WelcomeMessage />} />
            <Route path="/purchase-options" element={<PurchaseOptions />} />
            <Route path="/purchase-code" element={<PurchaseCode />} />
            <Route path="/whatsapp-group" element={<WhatsAppGroup />} />
            <Route path="/enter-code" element={<EnterCode />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
            <Route path="/withdrawal" element={<WithdrawalForm />} />
            <Route path="/withdrawal-confirmation" element={<WithdrawalConfirmation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
