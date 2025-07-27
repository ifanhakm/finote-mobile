import React from "react";

interface ExpenseSuccessProps {
  onBack: () => void;
  onAddMore: () => void;
}

const ExpenseSuccess: React.FC<ExpenseSuccessProps> = ({ onBack, onAddMore }) => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md flex flex-col items-center space-y-4 text-center">
      <h2 className="text-xl font-bold text-[#6d0b24]">New Expense</h2>
      <p className="text-sm text-black font-medium">
        FINOTE, take control of your finances
      </p>

      {/* Check Icon */}
      <div className="w-24 h-24 bg-[#6d0b24] rounded-full flex items-center justify-center">
        <svg
          className="w-12 h-12 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* Confirmation Text */}
      <p className="text-lg font-semibold">Add Expense Done!</p>

      {/* Action Buttons */}
      <div className="w-full space-y-2">
        <p className="text-sm font-medium">Add More expenses?</p>
        <div className="flex justify-between gap-4">
          <button
            onClick={onBack}
            className="flex-1 border border-[#6d0b24] text-[#6d0b24] py-2 rounded-md font-semibold"
          >
            Back
          </button>
          <button
            onClick={onAddMore}
            className="flex-1 bg-[#6d0b24] text-white py-2 rounded-md font-semibold"
          >
            Add More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseSuccess;
