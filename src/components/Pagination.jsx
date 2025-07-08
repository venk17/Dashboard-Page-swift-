import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  pageSize, 
  totalItems, 
  onPageChange, 
  onPageSizeChange 
}) => {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 3; // Show fewer pages on mobile
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      // Show current page and neighbors
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      // Always show last page if more than 1 page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-end px-0 py-3 space-y-3 sm:space-y-0">
      {/* Items info - Left side */}
      <div className="flex items-center order-2 sm:order-1">
        <span className="text-xs sm:text-sm text-gray-700">
          {startItem}-{endItem} of {totalItems} items
        </span>
      </div>
      
      {/* Navigation and Page Size - Right side */}
      <div className="flex items-center space-x-1 sm:space-x-2 order-1 sm:order-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1.5 sm:p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={14} className="sm:w-4 sm:h-4 text-gray-600" />
        </button>
        
        {/* Page Numbers */}
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === '...'}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded text-xs sm:text-sm font-medium transition-colors ${
              page === currentPage
                ? 'bg-blue-600 text-white'
                : page === '...'
                ? 'text-gray-400 cursor-default'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ))}
        
        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-1.5 sm:p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight size={14} className="sm:w-4 sm:h-4 text-gray-600" />
        </button>

        {/* Separator */}
        <div className="w-px h-6 bg-gray-300 mx-1 sm:mx-2"></div>

        {/* Page Size Dropdown */}
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="px-2 py-1 sm:px-3 sm:py-1.5 border border-gray-300 rounded text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
        >
          <option value={10}>10 / Page</option>
          <option value={50}>50 / Page</option>
          <option value={100}>100 / Page</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;