
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import MobileLayout from "@/components/MobileLayout";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import CreditButton from "@/components/CreditButton";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "@/components/Logo";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  provider: z.string().min(1, { message: "Please select a provider" }),
  phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  amount: z.string().min(1, { message: "Please enter an amount" }),
  accessCode: z.string().length(6, { message: "Access code must be 6 digits" }),
});

const TopUpPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { verifyAccessCode } = useAuth();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      provider: "",
      phoneNumber: "",
      amount: "",
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
          description: "The access code you entered is invalid. input the correct code.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Top-up Successful",
        description: `Your ${values.provider} top-up for ${values.phoneNumber} of amount ₦${values.amount} has been processed.`,
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Top-up Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MobileLayout>
      <div className="flex justify-center mb-6">
        <Logo size="md" />
      </div>
      
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-1">Purchase Airtime/Data</h1>
      <p className="text-center text-gray-500 text-sm mb-6">Top up your phone with airtime or data</p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="provider"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Provider</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="border-cyan-200 focus:border-cyan-500">
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="mtn">MTN</SelectItem>
                    <SelectItem value="airtel">Airtel</SelectItem>
                    <SelectItem value="glo">Glo</SelectItem>
                    <SelectItem value="9mobile">9mobile</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter phone number" 
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
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount (₦)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter amount" 
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
            {isSubmitting ? "Processing..." : "Complete Purchase"}
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

export default TopUpPage;
