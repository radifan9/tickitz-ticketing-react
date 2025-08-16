import { useState } from "react";
import QRCode from "react-qr-code";

// --- Constants
const CINEMA_LIST = [
  {
    name: "ebv",
    src: "/ebv-id.png",
  },
  {
    name: "hiflix",
    src: "/hiflix-red.png",
  },
  {
    name: "CineOne21",
    src: "/CineOne21-fitted.png",
  },
  {
    name: "Cinepolis",
    src: "/cinepolis.png",
  },
];

export const OneTicket = ({ ticket }) => {
  const [isShowDetails, setIsShowDetails] = useState(false);

  return (
    <div
      className={`flex flex-col gap-3 rounded-2xl bg-white pt-8 pb-4 md:col-start-2 md:mx-0`}
    >
      {/* Title */}
      <div className="flex flex-col items-start gap-3 pl-6">
        <img
          className="max-w-32"
          src={
            CINEMA_LIST.find(
              (el) => el.name.toLowerCase() == ticket.cinema.toLowerCase(),
            ).src
          }
          alt="CineOne21"
        />
        <div className="flex flex-col gap-1">
          <div className="text-sm font-normal text-[#AAAAAA]">
            {ticket.date} - {ticket.time}
          </div>
          <div className="text-2xl font-medium">{ticket.originalTitle}</div>
        </div>
      </div>

      {/* Horizontal */}
      <hr className="text-[#DEDEDE]" />

      {/* Ticket Status*/}
      <div className="flex flex-col items-center gap-3 px-6">
        <div
          className={`flex h-10 w-full items-center justify-center rounded-lg text-center font-semibold md:w-3/4 ${
            ticket.ticketStatus.isActive
              ? "bg-[#00BA8833] text-[#00BA88]"
              : "bg-[#6E719133] text-[#6E7191]"
          }`}
        >
          {ticket.ticketStatus.isActive ? "Ticket in active" : "Ticket used"}
        </div>

        <div
          className={`flex h-10 w-full items-center justify-center rounded-lg text-center font-semibold md:w-3/4 ${
            ticket.ticketStatus.isPaid
              ? "bg-[#1D4ED833] text-[#1D4ED8]"
              : "bg-[#E82C2C33] text-[#E82C2C]"
          }`}
        >
          {ticket.ticketStatus.isPaid ? "Paid" : "Not Paid"}
        </div>
        <button
          className="flex items-center gap-3 text-lg font-normal text-[#AAAAAA]"
          onClick={() => {
            setIsShowDetails((prev) => {
              return !prev;
            });
          }}
        >
          Show Details{" "}
          {isShowDetails ? (
            <img src="/arrow-up.png" alt="arrow up" />
          ) : (
            <img src="/arrow-down.png" alt="arrow down" />
          )}
        </button>
      </div>

      {/* Show Details */}
      {
        // Paid
        isShowDetails && ticket.ticketStatus.isPaid && (
          <div className="flex flex-col gap-4 px-6 pr-12">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-medium">Ticket Information</h2>
              <QRCode
                className="max-h-30 max-w-30"
                value={`orderId:${ticket.orderId}`}
              />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-4">
              {/* 1st row */}
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <span className="text-base font-medium text-[#aaa]">
                    Category
                  </span>
                  <span className="text-base font-medium text-[#14142b]">
                    {ticket.cat}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-medium text-[#aaa]">
                    Time
                  </span>
                  <span className="text-base font-medium text-[#14142b]">
                    {ticket.time}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-medium text-[#aaa]">
                    Seats
                  </span>
                  <span className="text-base font-medium text-[#14142b]">
                    {ticket.seats.map((el, idx) => {
                      if (idx !== ticket.seats.length - 1) {
                        return `${el}, `;
                      }
                      return `${el}`;
                    })}
                  </span>
                </div>
              </div>

              {/* 2nd row */}
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <span className="text-base font-medium text-[#aaa]">
                    Movie
                  </span>
                  <span className="text-base font-medium text-[#14142b]">
                    {ticket.originalTitle}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-medium text-[#aaa]">
                    Date
                  </span>
                  <span className="text-base font-medium text-[#14142b]">
                    {ticket.date}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-medium text-[#aaa]">
                    Count
                  </span>
                  <span className="text-base font-medium text-[#14142b]">
                    {ticket.seats.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Total Payment */}
            <div>
              <div className="text-base font-normal">Total</div>
              <div className="text-2xl font-medium">
                ${ticket.totalPayment}.00
              </div>
            </div>
          </div>
        )
      }

      {
        // Not Paid
        isShowDetails && ticket.ticketStatus.isPaid == false && (
          <div className="flex flex-col gap-4 px-6 pr-12">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-medium">
                Ticket Information Not Paid
              </h2>
            </div>

            {/* Info Grid */}
            <div className="grid-cols-1">
              <div className="text-base font-normal text-[#8692A6]">
                No. Rekening Virtual
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-[#14142B]">
                  123123123123
                </span>
                <button className="rounded-lg border-[1px] border-[#1D4ED8] px-4 py-2 text-[#1D4ED8]">
                  Copy
                </button>
              </div>
              <div className="text-base font-normal text-[#8692A6]">
                Total Payment
              </div>
              <div className="text-lg font-semibold text-[#1D4ED8]">$30</div>
              <div className="text-sm font-normal text-[#A0A3BD]">
                Pay this payment bill before it is due, on June 23, 2023. If the
                bill has not been paid by the specified time, it will be
                forfeited
              </div>

              {/* Button */}
              <button className="h-12 w-full rounded-lg bg-[#1D4ED8] text-white">
                Cek Pembayaran
              </button>
            </div>
          </div>
        )
      }
    </div>
  );
};
