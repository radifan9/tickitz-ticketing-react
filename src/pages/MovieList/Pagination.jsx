import React from "react";

export const Pagination = ({
  PAGINATION_ITEMS,
  searchParams,
  setSearchParams,
}) => {
  return (
    <div className="mb-8 flex gap-2">
      {PAGINATION_ITEMS.map((pageNumber, idx) =>
        searchParams.get("page") == pageNumber ? (
          <span
            key={idx}
            className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-[#2563EB] p-5 text-[#FFFFFF]"
            onClick={() => {
              setSearchParams((searchParams) => {
                if (searchParams.has("page")) {
                  searchParams.set("page", pageNumber);
                } else {
                  searchParams.append("page", pageNumber);
                }
                return searchParams;
              });
            }}
          >
            {pageNumber}
          </span>
        ) : typeof pageNumber === "string" ? (
          // If it's a string then show an image
          <span
            key={idx}
            className="relative flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-[#1D4ED8] p-5"
            onClick={() => {
              setSearchParams((now) => {
                if (searchParams.has("page")) {
                  const pageNow = searchParams.get("page");
                  searchParams.set("page", parseInt(pageNow) + 1);
                }
                return searchParams;
              });
            }}
          >
            <img src={pageNumber} alt="Next" className="absolute h-4 w-4" />
          </span>
        ) : (
          <span
            key={idx}
            className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-[#F9FAFB] p-5 text-[#A0A3BD]"
            onClick={() => {
              setSearchParams((searchParams) => {
                if (searchParams.has("page")) {
                  searchParams.set("page", pageNumber);
                } else {
                  searchParams.append("page", pageNumber);
                }
                return searchParams;
              });
            }}
          >
            {pageNumber}
          </span>
        ),
      )}
    </div>
  );
};
