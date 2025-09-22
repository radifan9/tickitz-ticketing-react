import { useState } from "react";
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";
import apiFetch from "../../utils/apiFetch";
import { toast } from "sonner";
import { useNavigate } from "react-router";

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
  const loggedInState = useSelector((state) => state.loggedIn);
  const navigate = useNavigate();

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Format time for display (remove seconds)
  const formatTime = (timeString) => {
    return timeString.slice(0, 5);
  };

  // Check if ticket is paid - only if paid_at exists and is not null
  const isPaid = ticket.paid_at !== null && ticket.paid_at !== undefined;

  // For demo purposes, assuming active tickets are those with show_date in the future
  // const isActive = new Date(ticket.show_date) > new Date();
  // Combine show_date (date part only) and start_at (HH:mm:ss) for accurate comparison
  const showDate = new Date(ticket.show_date);
  const showDateStr = showDate.toISOString().slice(0, 10); // "YYYY-MM-DD"
  const startTimeStr = ticket.start_at.slice(0, 8); // "HH:MM:SS"
  const showDateTime = new Date(`${showDateStr}T${startTimeStr}`); // local time
  const isActive = showDateTime > new Date();

  // Find cinema info
  const cinemaInfo = CINEMA_LIST.find(
    (cinema) => cinema.name.toLowerCase() === ticket.cinema.toLowerCase(),
  );

  async function handleCheckPayment() {
    const token = loggedInState.token || "";

    console.log("Transaction data: ");
    console.log(ticket);

    // PATCH transaction
    try {
      await apiFetch(
        `/api/v1/orders/transactions/${ticket.id}`,
        "PATCH",
        token,
      );

      toast.success("Transaksi berhasil di bayar!", { duration: 2000 });
    } catch (error) {
      console.log(`error : ${error}`);
    }

    navigate("/result");
  }

  return (
    <div
      className={`flex flex-col gap-3 rounded-2xl bg-white py-8 md:col-start-2 md:mx-0`}
    >
      {/* Title */}
      <div className="flex flex-col items-start gap-3 pl-10 md:px-32">
        <img
          className="max-w-32"
          src={cinemaInfo ? cinemaInfo.src : "/default-cinema.png"}
          alt={ticket.cinema}
        />
        <div className="flex flex-col gap-1">
          <div className="text-sm font-normal text-[#AAAAAA]">
            {formatDate(ticket.show_date)} - {formatTime(ticket.start_at)}
          </div>
          <div className="text-2xl font-medium">{ticket.title}</div>
        </div>
      </div>

      {/* Horizontal */}
      <hr className="text-[#DEDEDE]" />

      {/* Ticket Status*/}
      <div className="flex flex-col items-center gap-4 px-10 md:px-32">
        <div
          className={`flex h-10 w-full items-center justify-center rounded-lg text-center font-semibold md:w-full ${
            isActive
              ? "bg-[#00BA8833] text-[#00BA88]"
              : "bg-[#6E719133] text-[#6E7191]"
          }`}
        >
          {isActive ? "Ticket in active" : "Ticket used"}
        </div>

        <div
          className={`flex h-10 w-full items-center justify-center rounded-lg text-center font-semibold md:w-full ${
            isPaid
              ? "bg-[#1D4ED833] text-[#1D4ED8]"
              : "bg-[#E82C2C33] text-[#E82C2C]"
          }`}
        >
          {isPaid ? "Paid" : "Not Paid"}
        </div>
        <button
          className="flex items-center gap-3 font-normal text-[#AAAAAA]"
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
        // Paid tickets
        isShowDetails && isPaid && (
          <div className="flex flex-col gap-4 px-10 pr-12 md:px-32">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-medium">Ticket Information</h2>
              <QRCode
                className="max-h-30 max-w-30"
                value={`orderId:${ticket.id}`}
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
                    {ticket.age_rating}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-medium text-[#aaa]">
                    Time
                  </span>
                  <span className="text-base font-medium text-[#14142b]">
                    {formatTime(ticket.start_at)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-medium text-[#aaa]">
                    Seats
                  </span>
                  <span className="text-base font-medium text-[#14142b]">
                    {ticket.seats.join(", ")}
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
                    {ticket.title}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-medium text-[#aaa]">
                    Date
                  </span>
                  <span className="text-base font-medium text-[#14142b]">
                    {formatDate(ticket.show_date)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-medium text-[#aaa]">
                    Count
                  </span>
                  <span className="text-base font-medium text-[#14142b]">
                    {ticket.seats.length} pcs
                  </span>
                </div>
              </div>
            </div>

            {/* Total Payment */}
            <div className="flex items-center justify-between rounded border border-[#dedede] px-4 py-3">
              <div className="text-base font-normal">Total</div>
              <div className="text-lg font-medium">
                ${ticket.total_payment}.00
              </div>
            </div>
          </div>
        )
      }

      {
        // Not Paid tickets (this case should be rare since we're showing history)
        isShowDetails && !isPaid && (
          <div className="flex flex-col gap-4 px-10 pr-12 md:px-32">
            <div className="flex flex-col gap-2">
              {/* <h2 className="text-lg font-medium">
                Ticket Information Not Paid
              </h2> */}
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 gap-y-1">
              <div className="text-base font-normal text-[#8692A6]">
                No. Rekening Virtual
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-[#14142B]">
                  8277{loggedInState.phoneNumber}
                </span>
                <button className="rounded-lg border-[1px] border-[#1D4ED8] px-4 py-2 text-[#1D4ED8]">
                  Copy
                </button>
              </div>
              <div className="text-base font-normal text-[#8692A6]">
                Total Payment
              </div>
              <div className="text-lg font-semibold text-[#1D4ED8]">
                ${ticket.total_payment}.00
              </div>
              <div className="mb-2 text-sm font-normal text-[#A0A3BD]">
                Pay this payment bill before it is due. If the bill has not been
                paid by the specified time, it will be forfeited
              </div>

              {/* Button */}
              <button
                className="h-12 w-full rounded-lg bg-[#1D4ED8] text-white"
                onClick={() => {
                  handleCheckPayment();
                }}
              >
                Cek Pembayaran
              </button>
            </div>
          </div>
        )
      }
    </div>
  );
};
