import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import Genres from "../../components/Genres";

/**
 *
 * @param {Object} props
 * @param {any} props.id
 * @param {string} props.name
 * @param {(e: Event) => void} props.onChange
 * @param {string[]} props.selectedSeats
 * @returns
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

function seatConverter(id) {
  // id: "seat-0" to "seat-97"
  const seatNum = parseInt(id.replace("seat-", ""), 10);
  const rows = ["A", "B", "C", "D", "E", "F", "G"];
  let row, col;

  if (seatNum >= 0 && seatNum < 49) {
    // First grid: A1 to G7
    row = rows[Math.floor(seatNum / 7)];
    col = (seatNum % 7) + 1;
  } else if (seatNum >= 49 && seatNum < 98) {
    // Second grid: A8 to G14
    row = rows[Math.floor((seatNum - 49) / 7)];
    col = ((seatNum - 49) % 7) + 8;
  } else {
    return null;
  }

  return `${row}${col}`;
}

const seatingKey = [
  { text: "Available", color: "#D6D8E7" },
  { text: "Selected", color: "#1D4ED8" },
  { text: "Love nest", color: "#F589D7" },
  { text: "Sold", color: "#6E7191" },
];

function Order() {
  const genres = ["Drama", "Thriller"];
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState([
    ["Movie selected", "Spider-Man: Homecoming"],
    ["Tuesday, 07 July 2020", "13:00pm"],
    ["One ticket price", "$10"],
    ["Seat choosed", "C4, C5, C6"],
  ]);
  let navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const convertedSeats = selectedSeats.map((seat) => seatConverter(seat));
    const seatString = convertedSeats.join(", ");

    // Update paymentInfo with the new seat information
    setPaymentInfo((prevInfo) => {
      return prevInfo.map((item) =>
        item[0] === "Seat choosed" ? ["Seat choosed", seatString] : item,
      );
    });

    console.log(convertedSeats);
    navigate("/payment");
  }

  const location = useLocation();
  const data = location.state;
  console.log(`Data yang ditangkap : `);
  console.log(data);

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
      <section className="mb-8 flex flex-col gap-8">
        {/* <!-- Left Side --> */}
        <span className="flex flex-col items-center gap-8">
          {/* <!-- Top Information --> */}
          <div className="flex flex-col items-center gap-5 rounded-lg border-[1px] border-[#DEDEDE] px-3.5 py-8">
            {/*  Movie Poster  */}
            <img
              className="aspect-[1.6/1] w-full rounded-lg object-cover object-bottom"
              src="src/assets/images/dune.jpg"
              alt=""
            />
            {/*  Information  */}
            <span className="flex flex-col items-center gap-4">
              <div className="text-xl font-semibold">
                Spider-Man: Homecoming
              </div>
              {/*  Genres  */}
              <ul className="flex gap-2.5">{<Genres genres={genres} />}</ul>

              <div className="font-normal text-[#121212]">
                Regular - {data.time}
              </div>
            </span>

            {/* <!-- Change Button --> */}
            <button className="rounded-2xl bg-[#1D4ED833] px-6 py-1 text-[#1D4ED8]">
              Change
            </button>
          </div>

          <div className="self-start text-xl font-medium text-[#14142B]">
            Choose Your Seat
          </div>

          {/*  Choose seat buttons  */}
          <div className="flex w-5/6 flex-col items-center gap-8">
            <div>Screen</div>
            <div className="h-1.5 w-2/3 rounded-md bg-[#9570FE]"></div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              <div className="">
                <div className="flex gap-12">
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

                {/* Seating key */}
                <h3 className="self-start text-lg font-semibold">
                  Seating key
                </h3>
                <div className="grid grid-cols-2 gap-x-14 gap-y-4">
                  <div className="flex items-center gap-6">
                    <img src="/down-arrow.png" alt="" />
                    <div className="text-xl font-normal text-[#4E4B66]">
                      A - G
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <img src="/right-arrow.png" alt="" />
                    <div className="text-xl font-normal text-[#4E4B66]">
                      1 - 14
                    </div>
                  </div>
                  {seatingKey.map((key, idx) => {
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

                <button className="h-14 w-full rounded-2xl border-[1px] border-[#1D4ED8] text-lg font-medium text-[#1D4ED8]">
                  Add new seat
                </button>
              </div>

              {/*  Right Side  */}
              <span className="flex flex-col items-center">
                <div className="flex w-4/5 flex-col gap-3 rounded-lg border-[1px] p-6">
                  <img
                    className="self-center"
                    src="/CineOne21-fitted.png"
                    alt=""
                  />
                  <h2 className="self-center text-2xl font-medium text-[#14142B]">
                    CineOne21 Cinema
                  </h2>
                  <div className="flex flex-col gap-2">
                    {paymentInfo.map((el, idx) => (
                      <div className="flex justify-between" key={idx}>
                        <span className="font-light text-[#6B6B6B]">
                          {el[0]}
                        </span>
                        <span className="font-medium">{el[1]}</span>
                      </div>
                    ))}

                    <div className="full-hr-line"></div>
                    <div className="flex justify-between">
                      <span className="text-lg font-medium">Total Payment</span>
                      <span className="text-xl font-medium text-[#1D4ED8]">
                        $30
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  className="h-14 w-full rounded-md bg-[#1D4ED8] font-bold text-[#F7F7FC]"
                  type="submit"
                >
                  Checkout now
                </button>
              </span>
            </form>
          </div>
        </span>
      </section>
    </main>
  );
}

export default Order;
