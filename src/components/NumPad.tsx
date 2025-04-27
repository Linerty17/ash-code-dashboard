
import { useState } from "react";
import CreditButton from "./CreditButton";

type NumPadProps = {
  length?: number;
  onComplete?: (code: string) => void;
  onClear?: () => void;
};

const NumPad = ({ length = 6, onComplete, onClear }: NumPadProps) => {
  const [code, setCode] = useState("");

  const handlePress = (value: string) => {
    if (code.length < length) {
      const newCode = code + value;
      setCode(newCode);
      
      if (newCode.length === length && onComplete) {
        onComplete(newCode);
      }
    }
  };

  const handleClear = () => {
    setCode("");
    if (onClear) {
      onClear();
    }
  };

  const createButtons = () => {
    const buttons = [];
    
    // Numbers 1-9
    for (let i = 1; i <= 9; i++) {
      buttons.push(
        <div key={i} className="w-full">
          <CreditButton 
            variant="numpad" 
            onClick={() => handlePress(i.toString())}
          >
            {i}
          </CreditButton>
        </div>
      );
    }
    
    // Bottom row
    buttons.push(
      <div key="clear" className="w-full">
        <CreditButton 
          variant="numpad" 
          onClick={handleClear}
          className="bg-red-50 text-red-600 hover:bg-red-100"
        >
          Clear
        </CreditButton>
      </div>
    );
    
    buttons.push(
      <div key="0" className="w-full">
        <CreditButton 
          variant="numpad" 
          onClick={() => handlePress("0")}
        >
          0
        </CreditButton>
      </div>
    );
    
    buttons.push(
      <div key="delete" className="w-full">
        <CreditButton 
          variant="numpad" 
          onClick={() => setCode(code.slice(0, -1))}
        >
          ⌫
        </CreditButton>
      </div>
    );
    
    return buttons;
  };

  // Create the dots for code display
  const renderCodeDots = () => {
    const dots = [];
    for (let i = 0; i < length; i++) {
      dots.push(
        <div
          key={i}
          className={`h-4 w-4 rounded-full ${
            i < code.length ? "bg-credit-blue" : "bg-gray-300"
          }`}
        />
      );
    }
    return dots;
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-6 flex justify-center space-x-4">
        {renderCodeDots()}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {createButtons()}
      </div>
    </div>
  );
};

export default NumPad;
