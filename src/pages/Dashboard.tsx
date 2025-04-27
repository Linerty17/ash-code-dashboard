
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { CreditCard, User, LayoutDashboard, DollarSign, LogOut } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import CreditButton from "@/components/CreditButton";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    navigate("/");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const dashboardContents = {
    dashboard: (
      <div className="animate-fade-in space-y-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-2">Available Balance</h3>
            <p className="text-3xl font-bold">₦125,000.00</p>
            <div className="flex mt-4 space-x-2">
              <CreditButton variant="primary" className="py-2">
                <DollarSign className="mr-1 h-4 w-4" />
                Withdraw
              </CreditButton>
              <CreditButton variant="secondary" className="py-2">
                History
              </CreditButton>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 flex flex-col items-center">
              <div className="rounded-full bg-blue-100 p-3 mb-2">
                <DollarSign className="h-6 w-6 text-credit-blue" />
              </div>
              <span className="text-sm font-medium">Apply for Loan</span>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center">
              <div className="rounded-full bg-purple-100 p-3 mb-2">
                <CreditCard className="h-6 w-6 text-credit-purple" />
              </div>
              <span className="text-sm font-medium">Top Up</span>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex justify-between pb-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium">Deposit</p>
                    <p className="text-xs text-gray-500">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-green-600 font-medium">+₦20,000.00</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    ),
    profile: (
      <div className="animate-fade-in space-y-6">
        <div className="text-center">
          <div className="h-24 w-24 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center">
            <User className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-xl font-bold">{user?.name || "User"}</h2>
          <p className="text-gray-500">{user?.email || "user@example.com"}</p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <p className="text-gray-500">Full Name</p>
                <p className="font-medium">{user?.name || "User"}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <p className="text-gray-500">Email</p>
                <p className="font-medium">{user?.email || "user@example.com"}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <p className="text-gray-500">Access Code</p>
                <p className="font-medium">******</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="pt-4">
          <CreditButton variant="danger" onClick={handleLogout} className="py-2">
            <LogOut className="mr-2 h-4 w-4" /> Log Out
          </CreditButton>
        </div>
      </div>
    ),
  };

  return (
    <div className="min-h-screen bg-ash flex flex-col">
      {/* Header */}
      <header className="bg-white p-4 shadow sticky top-0 z-10">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Credit Pro</h1>
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="h-4 w-4" />
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 p-4 pb-20">
        <div className="max-w-md mx-auto">
          {activeTab === "dashboard" && dashboardContents.dashboard}
          {activeTab === "profile" && dashboardContents.profile}
        </div>
      </main>
      
      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4">
        <div className="max-w-md mx-auto flex justify-around">
          <button
            className={`flex flex-col items-center p-2 ${
              activeTab === "dashboard" ? "text-credit-blue" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span className="text-xs mt-1">Dashboard</span>
          </button>
          <button
            className={`flex flex-col items-center p-2 ${
              activeTab === "profile" ? "text-credit-blue" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;
