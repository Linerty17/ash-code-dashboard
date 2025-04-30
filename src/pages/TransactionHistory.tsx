
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { useTransactions, TransactionType } from "@/contexts/TransactionContext";
import { Button } from "@/components/ui/button";

const TransactionHistory = () => {
  const { transactions } = useTransactions();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<TransactionType | "all">("all");
  
  // Filter transactions based on selection
  const filteredTransactions = transactions.filter(tx => 
    filter === "all" ? true : tx.type === filter
  );

  // Format date to be more readable
  const formatDate = (date: Date) => {
    return date.toLocaleString('en-NG', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-ash flex flex-col">
      {/* Header */}
      <header className="bg-white p-4 shadow sticky top-0 z-10">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate(-1)}
              className="mr-2"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">Transaction History</h1>
          </div>
        </div>
      </header>
      
      {/* Filter tabs */}
      <div className="bg-white p-2 shadow-sm">
        <div className="max-w-md mx-auto flex space-x-2">
          <Button 
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className={filter === "all" ? "bg-credit-cyan text-white" : ""}
            size="sm"
          >
            All
          </Button>
          <Button 
            variant={filter === "deposit" ? "default" : "outline"}
            onClick={() => setFilter("deposit")}
            className={filter === "deposit" ? "bg-credit-cyan text-white" : ""}
            size="sm"
          >
            Deposits
          </Button>
          <Button 
            variant={filter === "withdrawal" ? "default" : "outline"}
            onClick={() => setFilter("withdrawal")}
            className={filter === "withdrawal" ? "bg-credit-cyan text-white" : ""}
            size="sm"
          >
            Withdrawals
          </Button>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 p-4">
        <div className="max-w-md mx-auto">
          {filteredTransactions.length > 0 ? (
            <div className="space-y-3">
              {filteredTransactions.map((tx) => (
                <div 
                  key={tx.id} 
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center"
                >
                  <div className={`rounded-full p-2 mr-3 ${
                    tx.type === "deposit" 
                      ? "bg-green-100 text-green-600" 
                      : "bg-red-100 text-red-600"
                  }`}>
                    {tx.type === "deposit" 
                      ? <ArrowDownCircle className="h-6 w-6" /> 
                      : <ArrowUpCircle className="h-6 w-6" />
                    }
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">
                      {tx.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(tx.date)}
                    </p>
                  </div>
                  <div className={`font-medium ${
                    tx.type === "deposit" 
                      ? "text-green-600" 
                      : "text-red-600"
                  }`}>
                    {tx.type === "deposit" ? "+" : "-"}₦{tx.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No transactions found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TransactionHistory;
