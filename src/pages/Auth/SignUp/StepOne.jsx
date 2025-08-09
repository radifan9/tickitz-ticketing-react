import React from "react";

export const StepOne = () => {
  return (
    <div className="my-8 hidden items-center justify-center gap-6 md:flex">
      {/* Fill Form */}
      <span className="flex flex-col items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-700 text-white">
          1
        </div>
        <p className="whitespace-nowrap text-[#4E4B66]">Fill Form</p>
      </span>

      {/* Dashed */}
      <span className="w-16 -translate-y-4 border-b border-dashed border-[#a0a3bd]"></span>

      {/* Activate */}
      <span className="flex flex-col items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#a0a3bd] text-white">
          2
        </div>
        <p className="whitespace-nowrap text-[#a0a3bd]">Activate</p>
      </span>

      {/* Dashed */}
      <span className="w-16 -translate-y-4 border-b border-dashed border-[#a0a3bd]"></span>

      {/* Done */}
      <span className="flex flex-col items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#a0a3bd] text-white">
          3
        </div>
        <p className="whitespace-nowrap text-[#a0a3bd]">Done</p>
      </span>
    </div>
  );
};
