import React from "react";

const seatingKey = [
  { text: "Available", color: "#D6D8E7" },
  { text: "Selected", color: "#1D4ED8" },
  { text: "Love nest", color: "#F589D7" },
  { text: "Sold", color: "#6E7191" },
];

function Order() {
  const genres = ["Drama", "Thriller"];

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
      <section className="flex flex-col gap-8 mb-8">
        {/* <!-- Left Side --> */}
        <span className="left-side">
          {/* <!-- Top Information --> */}
          <div className="border-[1px] border-[#DEDEDE] rounded-lg flex flex-col gap-5 items-center px-3.5 py-8">
            {/*  Movie Poster  */}
            <img
              className="w-full aspect-[1.6/1] object-cover object-bottom rounded-lg"
              src="src/assets/images/dune.jpg"
              alt=""
            />
            {/*  Information  */}
            <span className="flex flex-col items-center gap-4">
              <div className="font-semibold text-xl">
                Spider-Man: Homecoming
              </div>
              {/*  Genres  */}
              <ul className="flex gap-2.5 ">
                {genres.map((genre) => {
                  return (
                    <li className="rounded-2xl px-6 py-1 text-[#A0A3BD] bg-[#A0A3BD1A]">
                      {genre}
                    </li>
                  );
                })}
              </ul>

              <div className="font-normal  text-[#121212]  ">
                Regular - 13:00 PM
              </div>
            </span>

            {/* <!-- Change Button --> */}
            <button className="bg-[#1D4ED833] rounded-2xl px-6 py-1 text-[#1D4ED8]">
              Change
            </button>
          </div>

          <div className="font-medium text-xl text-[#14142B]">
            Choose Your Seat
          </div>
          <div className="text-center">Screen</div>
          <div className="w-full h-1.5 bg-[#9570FE] rounded-md"></div>

          {/*  Choose seat buttons  */}

          {/* Seating key */}
          <h3 className="font-semibold text-lg">Seating key</h3>
          <div className="grid grid-cols-2 gap-y-4">
            <div className="flex items-center  gap-6">
              {/* <div className="w-8 h-8 rounded-md"></div> */}
              <img src="/down-arrow.png" alt="" />
              <div className="font-normal text-[#4E4B66] text-xl">A - G</div>
            </div>
            <div className="flex items-center  gap-6">
              {/* <div className="w-8 h-8 rounded-md"></div> */}
              <img src="/right-arrow.png" alt="" />
              <div className="font-normal text-[#4E4B66] text-xl">1 - 14</div>
            </div>
            {seatingKey.map((key) => {
              return (
                <div className="flex items-center  gap-6">
                  <div
                    className="w-8 h-8 rounded-md"
                    style={{ backgroundColor: key.color }}
                  ></div>
                  <div className="font-normal text-[#4E4B66] text-xl">
                    {key.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Choose */}
          <div>
            <div className="flex justify-between">
              <span className="font-medium text-[#4E4B66] text-lg">
                Choosed
              </span>
              <span className="font-medium  text-lg">C4</span>
            </div>
            <div>
              <select
                className="ml-2 py-7 px-14 bg-[#EFF0F6] rounded-lg text-[#14142B]"
                name="seatRow"
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
          </div>

          <button className="h-14 w-full border-[1px] border-[#1D4ED8] text-[#1D4ED8] rounded-2xl font-medium text-lg">
            Add new seat
          </button>
        </span>

        <button className="h-14 w-full text-[#F7F7FC] bg-[#1D4ED8] font-bold rounded-md">
          Submit
        </button>

        <span className="right-side hidden">
          {/* <!-- Right Side --> */}
          <div className="right-side-info">
            <img src="../assets/images/CineOne21.png" alt="" />
            <h2>CineOne21 Cinema</h2>
            <div>
              <div>
                <span>Movie selected</span>
                <span>Dune</span>
              </div>
              <div>
                <span>Tuesday, 07 July 2020</span>
                <span>13:00pm</span>
              </div>
              <div>
                <span>One ticket price</span>
                <span>$10</span>
              </div>
              <div>
                <span>Seat choosed</span>
                <span>C4, C5, C6</span>
              </div>
              <div className="full-hr-line"></div>
              <div>
                <span className="total-text">Total Payment</span>
                <span className="total-amount">$30</span>
              </div>
            </div>
          </div>

          <a href="./payment.html" className="btn">
            Checkout Now
          </a>
        </span>
      </section>
    </main>
  );
}

export default Order;
