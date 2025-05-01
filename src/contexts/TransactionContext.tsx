import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type TransactionType = "deposit" | "withdrawal";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  date: Date;
  description: string;
}

type TransactionContextType = {
  balance: number;
  transactions: Transaction[];
  addTransaction: (type: TransactionType, amount: number, description: string) => void;
  getFormattedBalance: () => string;
  clearHistory: () => void;
};

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [balance, setBalance] = useState<number>(0); // Start with 0 balance
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Load data from localStorage on initialization
  useEffect(() => {
    const savedBalance = localStorage.getItem("creditProBalance");
    const savedTransactions = localStorage.getItem("creditProTransactions");
    
    if (savedBalance) {
      setBalance(Number(savedBalance));
    }
    
    if (savedTransactions) {
      try {
        const parsedTransactions = JSON.parse(savedTransactions);
        // Convert string dates back to Date objects
        const formattedTransactions = parsedTransactions.map((tx: any) => ({
          ...tx,
          date: new Date(tx.date)
        }));
        setTransactions(formattedTransactions);
      } catch (error) {
        console.error("Failed to parse transactions:", error);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("creditProBalance", balance.toString());
    localStorage.setItem("creditProTransactions", JSON.stringify(transactions));
  }, [balance, transactions]);

  const addTransaction = (type: TransactionType, amount: number, description: string) => {
    const newTransaction: Transaction = {
      id: `tx-${Date.now()}`,
      type,
      amount,
      date: new Date(),
      description
    };

    setTransactions(prev => [newTransaction, ...prev]);
    
    // Update balance
    if (type === "deposit") {
      setBalance(prev => prev + amount);
    } else {
      setBalance(prev => prev - amount);
    }
  };

  const clearHistory = () => {
    setTransactions([]);
    // Keep the balance as is
  };

  const getFormattedBalance = () => {
    return new Intl.NumberFormat('en-NG', { 
      style: 'currency', 
      currency: 'NGN',
      minimumFractionDigits: 2
    }).format(balance);
  };

  return (
    <TransactionContext.Provider
      value={{
        balance,
        transactions,
        addTransaction,
        getFormattedBalance,
        clearHistory
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error("useTransactions must be used within a TransactionProvider");
  }
  return context;
};
