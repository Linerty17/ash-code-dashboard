
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import MobileLayout from "@/components/MobileLayout";
import Logo from "@/components/Logo";
import CreditButton from "@/components/CreditButton";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

const Welcome = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(email, password);
      navigate("/enter-code");
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MobileLayout className="flex flex-col items-center justify-center">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <Logo size="lg" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
        <p className="text-sm text-gray-500 mt-1">Sign in to access your account</p>
      </div>
      
      <form onSubmit={handleLogin} className="w-full space-y-4">
        <div>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="credit-input border-sheen-green-200 focus:border-sheen-green-500"
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="credit-input border-sheen-green-200 focus:border-sheen-green-500"
          />
        </div>
        <div>
          <CreditButton 
            type="submit" 
            disabled={isLoading}
            className="rounded-full"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </CreditButton>
        </div>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-gray-500 mb-4">Don't have an account?</p>
        <CreditButton 
          variant="secondary" 
          onClick={() => navigate("/signup")}
          className="rounded-full"
        >
          Create Account
        </CreditButton>
      </div>
    </MobileLayout>
  );
};

export default Welcome;
