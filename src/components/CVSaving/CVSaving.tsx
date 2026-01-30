import React from 'react';

interface CVSavingProps {
  isVisible: boolean;
}

const CVSaving: React.FC<CVSavingProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinning loader */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
        
        {/* Loading text */}
        <div className="text-white text-xl font-semibold">
          Exporting CV to PDF...
        </div>
        
        {/* Optional subtitle */}
        <div className="text-gray-300 text-sm">
          Please wait a moment
        </div>
      </div>
    </div>
  );
};

export default CVSaving;