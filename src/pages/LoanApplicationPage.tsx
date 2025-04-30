
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import MobileLayout from "@/components/MobileLayout";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import CreditButton from "@/components/CreditButton";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "@/components/Logo";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  amount: z.number().min(50000).max(140000),
  duration: z.number().min(1).max(12),
  accountNumber: z.string().min(10, { message: "Account number must be at least 10 digits" }),
  bankName: z.string().min(1, { message: "Bank name is required" }),
  accessCode: z.string().length(6, { message: "Access code must be 6 digits" }),
});

const LoanApplicationPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { verifyAccessCode } = useAuth();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 50000,
      duration: 3,
      accountNumber: "",
      bankName: "",
      accessCode: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      const isValid = await verifyAccessCode(values.accessCode);
      
      if (!isValid) {
        toast({
          title: "Invalid Access Code",
          description: "The access code you entered is invalid. The correct code is 200718.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Loan Application Submitted",
        description: "Your loan application has been received and is being processed. You'll receive a notification soon.",
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Application Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const amount = form.watch("amount");
  const duration = form.watch("duration");
  const monthlyPayment = (amount * 1.1) / duration;

  return (
    <MobileLayout>
      <div className="flex justify-center mb-6">
        <Logo size="md" />
      </div>
      
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-1">Apply for Loan</h1>
      <p className="text-center text-gray-500 text-sm mb-6">Borrow between ₦50,000 - ₦140,000</p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loan Amount: ₦{field.value.toLocaleString()}</FormLabel>
                <FormControl>
                  <Slider
                    defaultValue={[field.value]}
                    min={50000}
                    max={140000}
                    step={5000}
                    onValueChange={(value) => field.onChange(value[0])}
                    className="py-4"
                  />
                </FormControl>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>₦50,000</span>
                  <span>₦140,000</span>
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loan Duration: {field.value} month{field.value > 1 ? 's' : ''}</FormLabel>
                <FormControl>
                  <Slider
                    defaultValue={[field.value]}
                    min={1}
                    max={12}
                    step={1}
                    onValueChange={(value) => field.onChange(value[0])}
                    className="py-4"
                  />
                </FormControl>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1 month</span>
                  <span>12 months</span>
                </div>
              </FormItem>
            )}
          />
          
          <div className="p-4 bg-cyan-50 border border-cyan-100 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">Loan Summary</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p className="text-gray-500">Amount:</p>
              <p className="font-semibold text-right">₦{amount.toLocaleString()}</p>
              
              <p className="text-gray-500">Duration:</p>
              <p className="font-semibold text-right">{duration} month{duration > 1 ? 's' : ''}</p>
              
              <p className="text-gray-500">Interest Rate:</p>
              <p className="font-semibold text-right">10%</p>
              
              <p className="text-gray-500">Monthly Payment:</p>
              <p className="font-semibold text-right">₦{monthlyPayment.toFixed(2)}</p>
            </div>
          </div>
          
          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your bank name" 
                    {...field} 
                    className="border-cyan-200 focus:border-cyan-500" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Number</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter account number" 
                    {...field} 
                    className="border-cyan-200 focus:border-cyan-500" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="accessCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Access Code</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter 6-digit access code" 
                    {...field} 
                    className="border-cyan-200 focus:border-cyan-500" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <CreditButton 
            type="submit" 
            disabled={isSubmitting} 
            variant="cyan"
            className="mt-4"
          >
            {isSubmitting ? "Processing Application..." : "Submit Application"}
          </CreditButton>
        </form>
      </Form>
      
      <div className="mt-6 text-center">
        <p 
          className="text-sm text-credit-cyan cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          Cancel and return to Dashboard
        </p>
      </div>
    </MobileLayout>
  );
};

export default LoanApplicationPage;
