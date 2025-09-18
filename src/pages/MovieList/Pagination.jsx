import React from "react";

export const Pagination = ({
  searchParams,
  setSearchParams,
}) => {
  const currentPage = parseInt(searchParams.get("page")) || 1;
  
  // Function to generate page numbers to display
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3; // Show 3 page numbers
    
    // Calculate start page based on current page
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    
    for (let i = startPage; i < startPage + maxVisiblePages; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const updatePage = (newPage) => {
    if (newPage >= 1) {
      setSearchParams((searchParams) => {
        if (searchParams.has("page")) {
          searchParams.set("page", newPage);
        } else {
          searchParams.append("page", newPage);
        }
        return searchParams;
      });
    }
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="mb-8 flex gap-2 items-center">
      {/* Left Arrow - Show if current page >= 2 */}
      {currentPage >= 2 && (
        <span
          className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-[#1D4ED8] p-5"
          onClick={() => updatePage(currentPage - 1)}
        >
          <img 
            src="/white-right-arrow.png" 
            alt="Previous" 
            className="absolute h-4 w-4 rotate-180" 
          />
        </span>
      )}

      {/* Page Numbers */}
      {pageNumbers.map((pageNumber, idx) => (
        <span
          key={idx}
          className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded-full p-5 ${
            currentPage === pageNumber
              ? "bg-[#2563EB] text-[#FFFFFF]"
              : "bg-[#F9FAFB] text-[#A0A3BD]"
          }`}
          onClick={() => updatePage(pageNumber)}
        >
          {pageNumber}
        </span>
      ))}

      {/* Right Arrow - Always show for infinite pagination */}
      <span
        className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-[#1D4ED8] p-5"
        onClick={() => updatePage(currentPage + 1)}
      >
        <img 
          src="/white-right-arrow.png" 
          alt="Next" 
          className="absolute h-4 w-4" 
        />
      </span>
    </div>
  );
};