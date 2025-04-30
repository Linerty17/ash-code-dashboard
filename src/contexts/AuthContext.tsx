import { createContext, useContext, useState, ReactNode } from "react";

type User = {
  id: string;
  email: string;
  name: string;
  hasAccessCode: boolean;
};

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  verifyAccessCode: (code: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Mock login functionality
  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call to validate credentials
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUser({
          id: "user-1",
          email,
          name: "John Doe",
          hasAccessCode: false,
        });
        resolve();
      }, 1000);
    });
  };

  // Mock signup functionality
  const signup = async (name: string, email: string, password: string) => {
    // In a real app, this would make an API call to create an account
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUser({
          id: "user-" + Math.random().toString(36).substr(2, 9),
          email,
          name,
          hasAccessCode: false,
        });
        resolve();
      }, 1000);
    });
  };

  // Verify access code - only accept "432025"
  const verifyAccessCode = async (code: string) => {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        if (code === "432025") {
          setUser((prev) => prev ? { ...prev, hasAccessCode: true } : null);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        signup,
        logout,
        verifyAccessCode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
