
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
          <DialogTitle className="text-2xl font-bold text-primary">About Credit Pro</DialogTitle>
          <DialogDescription className="mt-4 space-y-4 text-left">
            <p>
              Credit Pro is your trusted companion for managing and improving your credit score. Our platform provides comprehensive tools and insights to help you make informed financial decisions.
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
              <h3 className="font-semibold text-primary">Why Choose Credit Pro?</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Expert guidance from financial professionals</li>
                <li>User-friendly interface and tools</li>
                <li>Regular updates and notifications</li>
                <li>Dedicated customer support</li>
              </ul>
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              Join thousands of satisfied users who have improved their credit scores with Credit Pro.
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AboutCreditPro;
