
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import { TransactionProvider } from "./contexts/TransactionContext";
import PaymentConfirmation from "./pages/PaymentConfirmation";
import WithdrawalForm from "./pages/WithdrawalForm";
import WithdrawalConfirmation from "./pages/WithdrawalConfirmation";
import TransactionHistory from "./pages/TransactionHistory";
import TopUpPage from "./pages/TopUpPage";
import LoanApplicationPage from "./pages/LoanApplicationPage";
import TelegramChannel from "./pages/TelegramChannel";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <TransactionProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <HelpMenu />
            <Routes>
              <Route path="/" element={<Navigate to="/signup" replace />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Welcome />} />
              
              {/* Protected routes - require authentication */}
              <Route path="/welcome-message" element={<ProtectedRoute><WelcomeMessage /></ProtectedRoute>} />
              <Route path="/purchase-options" element={<ProtectedRoute><PurchaseOptions /></ProtectedRoute>} />
              <Route path="/purchase-code" element={<ProtectedRoute><PurchaseCode /></ProtectedRoute>} />
              <Route path="/whatsapp-group" element={<ProtectedRoute><WhatsAppGroup /></ProtectedRoute>} />
              <Route path="/enter-code" element={<ProtectedRoute><EnterCode /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/payment-confirmation" element={<ProtectedRoute><PaymentConfirmation /></ProtectedRoute>} />
              <Route path="/withdrawal" element={<ProtectedRoute><WithdrawalForm /></ProtectedRoute>} />
              <Route path="/withdrawal-confirmation" element={<ProtectedRoute><WithdrawalConfirmation /></ProtectedRoute>} />
              <Route path="/transaction-history" element={<ProtectedRoute><TransactionHistory /></ProtectedRoute>} />
              <Route path="/top-up" element={<ProtectedRoute><TopUpPage /></ProtectedRoute>} />
              <Route path="/loan-application" element={<ProtectedRoute><LoanApplicationPage /></ProtectedRoute>} />
              <Route path="/telegram-channel" element={<ProtectedRoute><TelegramChannel /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TransactionProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
