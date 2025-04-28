
import { useState } from "react";
import { MessageSquare, HelpCircle, PhoneCall, Store } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import AboutCreditPro from "./AboutCreditPro";
import ContactSupport from "./ContactSupport";

const HelpMenu = () => {
  const navigate = useNavigate();
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <NavigationMenu className="fixed top-4 left-4">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-gray-700">
              Help & Info
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[200px] p-2">
                <NavigationMenuLink
                  className="block p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                  onClick={() => setIsAboutOpen(true)}
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>About Credit Pro</span>
                  </div>
                </NavigationMenuLink>
                
                <NavigationMenuLink
                  className="block p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                  onClick={() => navigate("/purchase-options")}
                >
                  <div className="flex items-center gap-2">
                    <Store className="w-4 h-4" />
                    <span>Purchase Options</span>
                  </div>
                </NavigationMenuLink>

                <NavigationMenuLink
                  className="block p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                  onClick={() => window.alert("Telegram Channel Coming Soon")}
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>Join Telegram</span>
                  </div>
                </NavigationMenuLink>
                
                <NavigationMenuLink
                  className="block p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                  onClick={() => setIsContactOpen(true)}
                >
                  <div className="flex items-center gap-2">
                    <PhoneCall className="w-4 h-4" />
                    <span>Contact Support</span>
                  </div>
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <AboutCreditPro 
        isOpen={isAboutOpen} 
        onClose={() => setIsAboutOpen(false)} 
      />

      <ContactSupport
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
};

export default HelpMenu;
