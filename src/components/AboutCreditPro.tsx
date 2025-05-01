
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AboutCreditProProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutCreditPro = ({ isOpen, onClose }: AboutCreditProProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">About CreditPro</DialogTitle>
          <DialogDescription className="mt-4 space-y-4 text-left">
            <p>
              We're excited to introduce you to the ultimate platform of earning opportunities.
            </p>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-primary">Key Features:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Real-time credit score monitoring</li>
                <li>Personalized credit improvement recommendations</li>
                <li>24/7 access to financial experts</li>
                <li>Secure and encrypted data protection</li>
                <li>Monthly credit reports and analyses</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-primary">How to get your 6-digit access code.</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Sign up with a valid email address</li>
                <li>Purchase your access code for #6,950 on our website or from app vendor</li>
                <li>verification to your payment will be done.</li>
                <li>Dedicated customer support</li>
              </ul>
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              Get started with a generous bonus of 130,000 naira with loan and credit source of creditPro.
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AboutCreditPro;
