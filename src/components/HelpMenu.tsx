
import { MessageSquare, HelpCircle, PhoneCall } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const HelpMenu = () => {
  return (
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
                onClick={() => window.alert("About Credit Pro clicked")}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>About Credit Pro</span>
                </div>
              </NavigationMenuLink>
              
              <NavigationMenuLink
                className="block p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                onClick={() => window.alert("Need Help clicked")}
              >
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  <span>Need Help</span>
                </div>
              </NavigationMenuLink>
              
              <NavigationMenuLink
                className="block p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                onClick={() => window.alert("Contact Support clicked")}
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
  );
};

export default HelpMenu;
