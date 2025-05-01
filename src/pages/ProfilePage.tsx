
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import MobileLayout from "@/components/MobileLayout";
import Logo from "@/components/Logo";
import CreditButton from "@/components/CreditButton";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const ProfilePage = () => {
  const { user, updateProfileImage, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      // In a real app, you would upload the file to a server
      // Here we're creating a data URL as a placeholder
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          updateProfileImage(reader.result);
          toast({
            title: "Profile Updated",
            description: "Your profile image has been updated successfully",
          });
        }
        setUploading(false);
      };
      reader.readAsDataURL(file);
    }, 1500);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
    navigate("/login");
  };

  return (
    <MobileLayout>
      <div className="flex justify-center mb-6">
        <Logo size="md" />
      </div>
      
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">My Profile</h1>
      
      <div className="flex flex-col items-center mb-6">
        <Avatar className="w-24 h-24 border-4 border-sheen-green-200">
          {user?.profileImage ? (
            <AvatarImage src={user.profileImage} alt={user.name} />
          ) : (
            <AvatarFallback className="bg-sheen-green-100 text-sheen-green-700 text-xl">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          )}
        </Avatar>
        
        <div className="mt-4 text-center">
          <h2 className="font-semibold text-lg">{user?.name}</h2>
          <p className="text-gray-500 text-sm">{user?.email}</p>
        </div>
        
        <div className="mt-4 w-full max-w-xs">
          <label 
            htmlFor="profileImage" 
            className="cursor-pointer block text-center p-2 bg-sheen-green-50 border border-sheen-green-200 rounded-md text-sheen-green-700 hover:bg-sheen-green-100 transition"
          >
            {uploading ? "Uploading..." : "Upload Profile Picture"}
          </label>
          <Input 
            id="profileImage"
            type="file" 
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
            disabled={uploading}
          />
        </div>
      </div>
      
      <Card className="mb-6">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2">Account Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Name:</span>
              <span>{user?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Email:</span>
              <span>{user?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Access Code:</span>
              <span>{user?.hasAccessCode ? "Verified" : "Not Verified"}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-4">
        <CreditButton onClick={() => navigate("/dashboard")} variant="secondary">
          Back to Dashboard
        </CreditButton>
        <CreditButton onClick={handleLogout} variant="sheen">
          Logout
        </CreditButton>
      </div>
    </MobileLayout>
  );
};

export default ProfilePage;
