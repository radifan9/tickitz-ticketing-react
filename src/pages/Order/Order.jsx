import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

// Utils
import { convertDate } from "../../utils/convertDate";

// --- Components
import Genres from "../../components/Genres";

// --- Redux actions
import { addSeats, addTotalPayment } from "../../redux/slice/orderSlice";
import { toast } from "sonner";

// --- CONSTANTS
const TICKET_PRICE = 10;

const SEATING_KEY = [
  { text: "Available", color: "#D6D8E7" },
  { text: "Selected", color: "#1D4ED8" },
  { text: "Love nest", color: "#F589D7" },
  { text: "Sold", color: "#6E7191" },
];

const SEAT_ROWS = ["A", "B", "C", "D", "E", "F", "G"];

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

// --- Utility functions

/**
 * Convert seat ID to readable seat notation ("seat-0" -> "A1")
 * @param {string} id - Seat ID in format "seat-X"
 * @returns {string|null} - Seat notation like "A1" or null if invalid
 */
function seatConverter(id) {
  // id: "seat-0" to "seat-97"
  const seatNum = parseInt(id.replace("seat-", ""), 10);
  let row, col;

  if (seatNum >= 0 && seatNum < 49) {
    // First grid: A1 to G7
    row = SEAT_ROWS[Math.floor(seatNum / 7)];
    col = (seatNum % 7) + 1;
  } else if (seatNum >= 49 && seatNum < 98) {
    // Second grid: A8 to G14
    row = SEAT_ROWS[Math.floor((seatNum - 49) / 7)];
    col = ((seatNum - 49) % 7) + 8;
  } else {
    return null;
  }

  return `${row}${col}`;
}

// --- Components

/**
 * Individual seat component with selection functionality
 * @param {Object} props
 * @param {string} props.id - Unique identifier for the seat
 * @param {string} props.name - Name attribute for the seat input
 * @param {string[]} props.selectedSeats - Array of currently selected seats
 * @param {Function} props.onChange - Callback function when seat selection changes
 */
function Seat({ id, name, selectedSeats, onChange }) {
  return (
    <div className="h-8 w-8">
      <label
        htmlFor={id}
        className={`block h-full ${
          selectedSeats.includes(name) ? "bg-[#1D4ED8]" : "bg-[#D6D8E7]"
        } cursor-pointer rounded-md`}
      ></label>
      <input
        type="checkbox"
        name={name}
        id={id}
        onChange={onChange}
        className="hidden"
      />
    </div>
  );
}

// --- MAIN COMPONENTS
function Order() {
  // --- --- State
  const genres = ["Drama", "Thriller"];
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState([
    ["Movie selected", ""],
    ["Tuesday, 07 July 2020", "13:00pm"],
    ["One ticket price", `$${TICKET_PRICE}`],
    ["Seat choosed", ""],
  ]);
  const [totalPayment, setTotalPayment] = useState("0");

  // --- --- Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --- --- Redux state
  const movieState = useSelector((state) => state.movie);
  const orderState = useSelector((state) => state.order);

  /*
   *  Update movie information in payment details
   */
  function updateOrderMovie() {
    setPaymentInfo((prevInfo) => {
      return prevInfo.map((item) =>
        item[0] === "Movie selected"
          ? ["Movie selected", movieState.movie.originalTitle]
          : item,
      );
    });
  }

  /*
   * Update selected seats information in payment details
   */
  function updateSeatInfo() {
    const convertedSeats = selectedSeats.map((seat) => seatConverter(seat));
    const seatString = convertedSeats.sort().join(", ");

    setPaymentInfo((prevInfo) => {
      return prevInfo.map((item) =>
        item[0] === "Seat choosed" ? ["Seat choosed", seatString] : item,
      );
    });
  }

  // --- --- Event Handlers

  /**
   * Handle form submission for checkout
   * @param {Event} event - Form submit event
   */
  function handleSubmit(event) {
    event.preventDefault();

    // Validation, if there's no seat choosed
    if (selectedSeats.length == 0) {
      toast.error("Please choose a 💺 seat");
      return;
    }

    const convertedSeats = selectedSeats.map((seat) => seatConverter(seat));

    dispatch(addSeats({ seats: convertedSeats }));
    dispatch(addTotalPayment({ totalPayment }));

    console.log("--- Order State di Order");
    console.log(orderState);

    // Navigate to payment page
    navigate("/payment");
  }

  // --- --- Effects
  // Effect when component is loaded
  useEffect(() => {
    const formattedDate = convertDate(orderState.order.date);

    setPaymentInfo((prev) =>
      prev.map((item, idx) =>
        idx === 1 ? [formattedDate, orderState?.order?.time] : item,
      ),
    );
  }, []);

  // Effect when selectedSeats changed
  useEffect(() => {
    updateOrderMovie();
    updateSeatInfo();

    // Update total price
    setTotalPayment(() => {
      return selectedSeats.length * 10;
    });
  }, [selectedSeats]);

  return (
    <main>
      {/*  Step  */}
      <div className="hidden">
        <span className="outer-steps">
          <div className="steps-num steps-green">
            <img src="../assets/icons/check-small.png" alt="" />
          </div>
          <p className="steps-text">Dates And Time</p>
        </span>
        <span></span>
        <span className="outer-steps">
          <div className="steps-num steps-num-off steps-blue">2</div>
          <p className="steps-text">Seat</p>
        </span>
        <span></span>
        <span className="outer-steps">
          <div className="steps-num steps-num-off">3</div>
          <p className="steps-text steps-text-off">Payment</p>
        </span>
      </div>

      {/* <!-- Order Page --> */}
      <form
        onSubmit={handleSubmit}
        className="mb-8 grid gap-8 md:grid-cols-[3fr_2fr]"
      >
        {/* <!-- Left Side --> */}
        <span className="flex w-full flex-col items-center gap-8 rounded-md bg-white px-20 py-8">
          {/* <!-- Top Information --> */}
          <div className="grid items-center gap-5 rounded-lg border-[1px] border-[#DEDEDE] px-3.5 py-8 md:grid-cols-[2fr_3fr_1fr]">
            {/*  Movie Poster  */}
            <img
              className="aspect-[2/1.5] w-full rounded-lg object-cover object-center md:aspect-[1/1.25]"
              src={`https://image.tmdb.org/t/p/w500/${movieState.movie.posterPath}`}
              alt=""
            />
            {/*  Information  */}
            <span className="flex flex-col items-center gap-4 md:items-start">
              <div className="text-xl font-semibold">
                {movieState.movie.originalTitle}
              </div>
              {/*  Genres  */}
              <ul className="flex gap-2.5">{<Genres genres={genres} />}</ul>

              <div className="font-normal text-[#121212]">
                Regular - {orderState.order.time}
              </div>
            </span>

            {/* <!-- Change Button --> */}
            <button className="rounded-md bg-[#1D4ED8] px-6 py-1 text-white md:w-fit md:self-end">
              Change
            </button>
          </div>

          {/* Choose Your Seat Text */}
          <div className="self-start text-xl font-medium text-[#14142B]">
            Choose Your Seat
          </div>

          {/*  Choose seat buttons  */}
          {/* Seat left and right side */}
          <div className="flex w-full flex-col items-center gap-4 md:w-8/10">
            <div>Screen</div>
            <div className="h-1.5 w-97/100 rounded-md bg-[#9570FE]"></div>
            <div className="flex w-full flex-col gap-10">
              <div className="flex justify-between">
                <div className="grid grid-cols-7 grid-rows-3 gap-1">
                  {(function () {
                    const result = [];
                    for (let i = 0; i < 49; i++) {
                      result.push(
                        <Seat
                          key={`seat-${i}`}
                          id={`seat-${i}`}
                          name={`seat-${i}`}
                          selectedSeats={selectedSeats}
                          onChange={(e) => {
                            setSelectedSeats((selectedSeats) => {
                              // Cek apakah selectedSeat sudah terpilih
                              if (selectedSeats.includes(e.target.name)) {
                                return selectedSeats.filter(
                                  (seat) => seat !== e.target.name,
                                );
                              }
                              return [...selectedSeats, e.target.name];
                            });
                            updateSeatInfo();
                          }}
                        />,
                      );
                    }
                    return result;
                  })()}
                </div>
                <div className="grid grid-cols-7 grid-rows-3 gap-1">
                  {(function () {
                    const result = [];
                    for (let i = 49; i < 98; i++) {
                      result.push(
                        <Seat
                          key={i}
                          id={i}
                          name={`seat-${i}`}
                          selectedSeats={selectedSeats}
                          onChange={(e) => {
                            setSelectedSeats((selectedSeats) => {
                              // Cek apakah selectedSeat sudah terpilih
                              if (selectedSeats.includes(e.target.name)) {
                                return selectedSeats.filter(
                                  (seat) => seat !== e.target.name,
                                );
                              }
                              return [...selectedSeats, e.target.name];
                            });
                          }}
                        />,
                      );
                    }
                    return result;
                  })()}
                </div>
              </div>
            </div>
          </div>

          {/* Seating key */}
          <div className="self-stretch flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Seating key</h3>
            <div className="grid grid-cols-2 gap-x-14 gap-y-4">
              <div className="flex items-center gap-6 md:hidden">
                <img src="/down-arrow.png" alt="" />
                <div className="text-xl font-normal text-[#4E4B66]">A - G</div>
              </div>
              <div className="flex items-center gap-6 md:hidden">
                <img src="/right-arrow.png" alt="" />
                <div className="text-xl font-normal text-[#4E4B66]">1 - 14</div>
              </div>
              {SEATING_KEY.map((key, idx) => {
                return (
                  <div key={idx} className="flex items-center gap-6">
                    <div
                      className="h-8 w-8 rounded-md"
                      style={{ backgroundColor: key.color }}
                    ></div>
                    <div className="text-xl font-normal text-[#4E4B66]">
                      {key.text}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </span>

        {/*  Right Side (desktop)  */}
        <span className="flex flex-col items-center gap-4">
          <div className="flex w-full flex-col gap-3 rounded-md bg-white p-6 shadow-md">
            <img
              className="self-center"
              src={
                CINEMA_LIST.find(
                  (el) =>
                    el.name.toLowerCase() ===
                    String(orderState.order.cinema).toLowerCase(),
                )?.src
              }
              alt=""
            />
            <h2 className="self-center text-2xl font-medium text-[#14142B]">
              {orderState.order.cinema}
            </h2>
            <div className="flex flex-col gap-2">
              {paymentInfo.map((el, idx) => (
                <div className="flex justify-between" key={idx}>
                  <span className="font-light text-[#6B6B6B]">{el[0]}</span>
                  <span className="font-medium">{el[1]}</span>
                </div>
              ))}

              <div className="full-hr-line"></div>
              <div className="flex justify-between">
                <span className="text-lg font-medium">Total Payment</span>
                <span className="text-xl font-medium text-[#1D4ED8]">
                  ${totalPayment}
                </span>
              </div>
            </div>
          </div>

          <button
            className="h-14 w-full rounded-md bg-[#1D4ED8] font-bold text-[#F7F7FC] shadow-md"
            type="submit"
          >
            Checkout now
          </button>
        </span>
      </form>
    </main>
  );
}

export default Order;
