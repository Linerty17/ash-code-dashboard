
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import MobileLayout from "@/components/MobileLayout";
import Logo from "@/components/Logo";
import CreditButton from "@/components/CreditButton";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signup(name, email, password);
      toast({
        title: "Account created",
        description: "Your account has been created successfully",
      });
      navigate("/welcome-message"); // Updated navigation
    } catch (error) {
      toast({
        title: "Sign up failed",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MobileLayout className="flex flex-col items-center justify-center">
      <div className="mb-6 text-center">
        <div className="flex justify-center mb-4">
          <Logo size="lg" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
        <p className="text-sm text-gray-500 mt-1">Sign up to get started</p>
      </div>
      
      <form onSubmit={handleSignup} className="w-full space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="credit-input"
          />
        </div>
        <div>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="credit-input"
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="credit-input"
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="credit-input"
          />
        </div>
        <div>
          <CreditButton 
            type="submit" 
            disabled={isLoading}
            className="rounded-full"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </CreditButton>
        </div>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-gray-500 mb-4">Already have an account?</p>
        <CreditButton 
          variant="secondary" 
          onClick={() => navigate("/")}
          className="rounded-full"
        >
          Sign In
        </CreditButton>
      </div>
    </MobileLayout>
  );
};

export default SignUp;
