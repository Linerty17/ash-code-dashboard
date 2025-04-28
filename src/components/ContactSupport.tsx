
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, Send } from "lucide-react";

interface ContactSupportProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactSupport = ({ isOpen, onClose }: ContactSupportProps) => {
  const handleEmailSupport = () => {
    window.location.href = "mailto:paycustomerservice7@gmail.com";
  };

  const handleTelegramSupport = () => {
    window.open("https://t.me/Creditprovendor", "_blank");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">Contact Support</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-4">
          <Button
            variant="outline"
            className="flex items-center gap-2 py-6"
            onClick={handleEmailSupport}
          >
            <Mail className="w-5 h-5" />
            <span>Contact Email Support</span>
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 py-6"
            onClick={handleTelegramSupport}
          >
            <Send className="w-5 h-5" />
            <span>Contact Telegram Support</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactSupport;
