import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useSelector, useDispatch } from "react-redux";
import { historyActions } from "../../redux/slice/historySlice";

// Component
import Loader from "../../components/Loader.jsx";

//  MAIN COMPONENTS
function Result() {
  const [ticketHistory, setTicketHistory] = useState([]);
  const lastTicket = ticketHistory[ticketHistory.length - 1];

  // Hooks
  const dispatch = useDispatch();

  // LoggedIn
  const { token } = useSelector((state) => state.loggedIn);

  const { isLoading} = useSelector(
    (state) => state.history,
  );
  const historyState = useSelector((state) => state.history.history);
  console.log("History State");
  console.log(historyState);

  useEffect(() => {
    // Get user transaction history
    dispatch(historyActions.getHistoriesThunk({ token }));

    console.log("History State :");
    console.log(historyState);
  }, []);

  // Update ticketHistory when historyState changes
  useEffect(() => {
    if (historyState && historyState.length > 0) {
      setTicketHistory(historyState);
    }
  }, [historyState]);

  if (isLoading) return <Loader />;
  if (!lastTicket) return <div>No ticket found</div>;

  return (
    <div className="flex flex-col justify-between bg-[#f5f5f5] md:flex-row">
      {/* Left Side */}
      <div className="relative z-0 flex flex-col items-center justify-center gap-6 bg-[url('/avengers.png')] px-[124px] py-40 md:items-start">
        {/* Logo */}
        <img className="h-16" src="/tickitz-white.png" alt="" />

        {/* Thank */}
        <h1 className="text-center text-5xl font-bold text-white md:text-left">
          Thankyou For Purchasing
        </h1>

        {/* Paragraf */}
        <p className="text-center text-2xl font-normal text-white/70 md:text-left">
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

          <QRCode
            className="p-10"
            value={`orderId:${lastTicket.id}`}
          />

          {/* Horizontal line and circles */}
          <div className="relative mb-6 w-full border-b border-[#dedede]">
            {/* Left circle */}
            <div className="absolute -bottom-3 left-0 h-6 w-6 -translate-x-1/2 rounded-full bg-[#f5f5f5]"></div>
            {/* Right circle */}
            <div className="absolute right-0 -bottom-3 h-6 w-6 translate-x-1/2 rounded-full bg-[#f5f5f5]"></div>
          </div>

          {/* Ticket Information (Grid) */}
          <div className="mb-5 ml-5 grid grid-cols-2 gap-x-[60px] gap-y-6">
            {/* Movie */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#aaaaaa]">
                Movie
              </span>
              <span className="text-sm font-semibold text-[#14142b]">
                {lastTicket.title}
              </span>
            </div>

            {/* Category */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#aaaaaa]">
                Category
              </span>
              <span className="text-sm font-semibold text-[#14142b]">
                {lastTicket.age_rating}
              </span>
            </div>

            {/* Date */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#aaaaaa]">Date</span>
              <span className="text-sm font-semibold text-[#14142b]">
                {new Date(lastTicket.show_date).toLocaleDateString('en-US', { 
                  day: '2-digit', 
                  month: 'short' 
                })}
              </span>
            </div>

            {/* Time */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#aaaaaa]">Time</span>
              <span className="text-sm font-semibold text-[#14142b]">
                {lastTicket.start_at.slice(0, 5)}
              </span>
            </div>

            {/* Count */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#aaaaaa]">
                Count
              </span>
              <span className="text-sm font-semibold text-[#14142b]">
                {lastTicket.seats.length} pcs
              </span>
            </div>

            {/* Seats */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#aaaaaa]">
                Seats
              </span>
              <span className="text-sm font-semibold text-[#14142b]">
                {lastTicket.seats.join(', ')}
              </span>
            </div>
          </div>

          {/* Total Payment */}
          <div className="mb-8 flex w-4/5 justify-between rounded border border-[#dedede] px-[18px] py-3">
            <div>Total</div>
            <div>
              ${lastTicket.total_payment}.00
            </div>
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