import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const SortButton = ({ column, currentSort, onSort }) => {
  const getSortIcon = () => {
    if (currentSort.column !== column) {
      return (
        <div className="flex flex-col">
          <ChevronUp size={12} className="text-gray-400 -mb-1" />
          <ChevronDown size={12} className="text-gray-400" />
        </div>
      );
    }
    
    if (currentSort.direction === 'asc') {
      return (
        <div className="flex flex-col">
          <ChevronUp size={12} className="text-blue-600 -mb-1" />
          <ChevronDown size={12} className="text-gray-300" />
        </div>
      );
    } else if (currentSort.direction === 'desc') {
      return (
        <div className="flex flex-col">
          <ChevronUp size={12} className="text-gray-300 -mb-1" />
          <ChevronDown size={12} className="text-blue-600" />
        </div>
      );
    }
    
    return (
      <div className="flex flex-col">
        <ChevronUp size={12} className="text-gray-400 -mb-1" />
        <ChevronDown size={12} className="text-gray-400" />
      </div>
    );
  };

  return (
    <button
      onClick={() => onSort(column)}
      className="flex items-center justify-center space-x-1 sm:space-x-2 px-2 py-1 sm:px-3 sm:py-2 border border-gray-300 rounded-md hover:bg-gray-50 hover:border-blue-500 transition-colors bg-white"
    >
      <span className="text-xs sm:text-sm font-medium">Sort {column}</span>
      {getSortIcon()}
    </button>
  );
};

export default SortButton;