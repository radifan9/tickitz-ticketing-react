import React from "react";

function Result() {
  return (
    <div className="flex justify-between bg-stone-200">
      {/* Left Side */}
      <div className="relative z-0 flex flex-col items-start justify-center gap-6 bg-[url('/avengers.png')] px-[124px]">
        {/* Logo */}
        <img src="../assets/images/tickitz-white.png" alt="" />

        {/* Thank */}
        <h1 className="text-5xl font-bold text-white">
          Thankyou For Purchasing
        </h1>

        {/* Paragraf */}
        <p className="text-2xl font-normal text-white/70">
          Lorem ipsum dolor sit amet consectetur. Quam pretium pretium tempor
          integer sed magna et.
        </p>

        {/* Direction */}
        <div className="text-lg font-bold text-white">
          Please Download Your Ticket
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 -z-10 bg-black/80"></div>
      </div>

      {/* Right Side */}
      <div className="mt-[90px] mr-[8%] mb-[90px] ml-[90px] flex flex-col items-center gap-6">
        {/* Ticket Shaped Element */}
        <div className="flex w-[295px] flex-col items-center rounded-lg bg-white">
          {/* QR */}
          <img
            className="mt-8"
            src="/qr-code-1.png"
            alt="QR Code for payment"
          />

          {/* Horizontal line and circles */}
          <div className="relative mb-6 w-full border-b border-[#dedede]">
            {/* Left circle */}
            <div className="absolute -bottom-3 left-0 h-6 w-6 -translate-x-1/2 rounded-full bg-stone-200"></div>
            {/* Right circle */}
            <div className="absolute right-0 -bottom-3 h-6 w-6 translate-x-1/2 rounded-full bg-stone-200"></div>
          </div>

          {/* Ticket Information (Grid) */}
          <div className="mb-5 grid grid-cols-2 gap-x-[60px] gap-y-6">
            {/* Movie */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#aaaaaa]">
                Movie
              </span>
              <span className="text-sm font-semibold text-[#14142b]">
                Spider-Man: ..
              </span>
            </div>

            {/* Category */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#aaaaaa]">
                Category
              </span>
              <span className="text-sm font-semibold text-[#14142b]">
                PG-13
              </span>
            </div>

            {/* Date */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#aaaaaa]">Date</span>
              <span className="text-sm font-semibold text-[#14142b]">
                07 Jul
              </span>
            </div>

            {/* Time */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#aaaaaa]">Time</span>
              <span className="text-sm font-semibold text-[#14142b]">
                2:00pm
              </span>
            </div>

            {/* Count */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#aaaaaa]">
                Count
              </span>
              <span className="text-sm font-semibold text-[#14142b]">
                3 pcs
              </span>
            </div>

            {/* Seats */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#aaaaaa]">
                Seats
              </span>
              <span className="text-sm font-semibold text-[#14142b]">
                C4, C5, C6
              </span>
            </div>
          </div>

          {/* Total Payment */}
          <div className="mb-8 flex w-4/5 justify-between rounded border border-[#dedede] px-[18px] py-3">
            <div>Total</div>
            <div>$30.00</div>
          </div>
        </div>

        {/* Download Button */}
        <button className="flex items-center gap-[14px] rounded-md border border-[#1d4ed8] bg-transparent px-[110px] py-[14px] text-[#1d4ed8]">
          <img src="/download.png" alt="Download Button" />
          <span className="text-base font-semibold">Download</span>
        </button>

        {/* Done */}
        <a
          className="rounded-md bg-[#1d4ed8] px-[148px] py-[15px] text-base font-semibold text-[#f7f7fc] no-underline"
          href="./order-history.html"
        >
          Done
        </a>
      </div>
    </div>
  );
}

export default Result;
