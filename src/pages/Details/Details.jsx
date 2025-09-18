import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

// Redux actions
import { movieActions } from "../../redux/slice/movieSlice";
import { addOrder } from "../../redux/slice/orderSlice";

// Components
import Genres from "../../components/Genres";
import Loader from "../../components/Loader";

// Utils
import { getDuration } from "../../utils/getDuration";
import { formatMovieReleaseDate } from "../../utils/formatMovieReleaseDate";

// External lib
import { toast } from "sonner";

// Variables
const orderInputted = {
  isDateChoosed: false,
  isTimeChoosed: false,
  isLocChoosed: false,
  isCinemaChoosed: false,
};
// Collect error messages and show them sequentially
let messages = [];

// Constants
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

const TIME_OPTIONS = ["13:00", "15:00", "18:30", "21:00"];
const LOCATION_OPTIONS = [
  { value: "jakarta", label: "Jakarta" },
  { value: "bogor", label: "Bogor" },
  { value: "depok", label: "Depok" },
  { value: "tangerang", label: "Tangerang" },
  { value: "bekasi", label: "Bekasi" },
];

// MAIN COMPONENT
function Details() {
  // State & Hooks
  const [selectedCinema, setSelectedCinema] = useState();
  const [cinemaPagination, _] = useState(1);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Helper functions
  function checkIsLoggedIn() {
    if (activeUser == false) {
      // There's no active user, navigate to SignIn
      console.log("⚠️ No logged in user");

      toast.error("You must logged in first 🙏🏻");

      setTimeout(() => {
        navigate("/signin");
      }, 700);
    }
  }

  // Get movie ID from search params and redirect if missing
  const id = searchParams.get("id");
  if (id === null) {
    navigate("/movies");
  }

  // Redux state
  const movieState = useSelector((state) => state.movie);
  const loggedInState = useSelector((state) => state.loggedIn);
  const activeUser = loggedInState.email !== null;

  // Effects
  // Fetch movie data when component mounts
  useEffect(() => {
    console.log("getMovieThunk want to run");
    console.log("movie ID : ");
    console.log(id);
    dispatch(movieActions.getMovieThunk({ movieId: id }));
  }, []);

  // Handle form submission for booking tickets

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the value
    const date = e.target.date.value;
    const time = e.target.time.value;
    const cityLocation = e.target.cityLocation.value;
    const cinema = e.target.cinema.value;

    // Validation
    // date
    if (date !== "") {
      // setOrderInputted((prev) => ({ ...prev, isDateChoosed: true }));
      orderInputted.isDateChoosed = true;
    } else {
      // setOrderInputted((prev) => ({ ...prev, isDateChoosed: false }));
      orderInputted.isDateChoosed = false;
      messages.push("Please input 🗓️ date");
    }

    // time
    if (time !== "") {
      // setOrderInputted((prev) => ({ ...prev, isTimeChoosed: true }));
      orderInputted.isTimeChoosed = true;
    } else {
      // setOrderInputted((prev) => ({ ...prev, isTimeChoosed: false }));
      orderInputted.isTimeChoosed = false;
      messages.push("Please input ⌚ time");
    }

    // location
    if (cityLocation !== "") {
      // setOrderInputted((prev) => ({ ...prev, isLocChoosed: true }));
      orderInputted.isLocChoosed = true;
    } else {
      // setOrderInputted((prev) => ({ ...prev, isLocChoosed: false }));
      orderInputted.isLocChoosed = false;
      messages.push("Please input 📍 city location");
    }

    // cinema
    if (cinema !== "") {
      // setOrderInputted((prev) => ({ ...prev, isCinemaChoosed: true }));
      orderInputted.isCinemaChoosed = true;
    } else {
      // setOrderInputted((prev) => ({ ...prev, isCinemaChoosed: false }));
      orderInputted.isCinemaChoosed = false;
      messages.push("Please choose 🎥 cinema");
    }

    if (messages.length) {
      for (const msg of messages) {
        toast.error(msg, { duration: 1500 });
        // Wait slightly longer than duration to avoid overlap
        await new Promise((res) => setTimeout(res, 1800));
      }
      // After showing the error message, empty it
      messages = [];
    }

    // If there's no error
    if (
      orderInputted.isDateChoosed === true &&
      orderInputted.isTimeChoosed === true &&
      orderInputted.isLocChoosed === true &&
      orderInputted.isCinemaChoosed === true
    ) {
      // Check orderInputed
      console.log(orderInputted);

      // Add form data to redux store
      dispatch(
        addOrder({
          movieId: id,
          date,
          time,
          cityLocation,
          cinema,
        }),
      );

      // Navigate to order page
      navigate("/order");
    }
  };

  return (
    <main
      className={`${movieState.isLoading ? "my-12 flex justify-center" : "flex flex-col items-center"}`}
    >
      {movieState.isLoading && <Loader />}

      {/* When movie is loaded */}
      {movieState?.isSuccess && (
        <>
          {/* Header image */}
          <div className="relative w-full md:h-90">
            <img
              className="h-full w-full object-cover"
              src={`${import.meta.env.VITE_BACKDROP_PATH}${movieState.movie.backdrop_img}`}
              alt={movieState.movie?.title || "Movie backdrop"}
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <section className="relative mb-8 flex flex-col gap-8 px-[var(--small-pad)] md:px-[var(--medium-pad)]">
            {/* Movie Poster + Info */}
            <div className="-mt-80 flex flex-col items-center gap-4 md:-mt-80 md:flex-row">
              {/* Movie Image */}
              <img
                className="rounded-lg object-cover md:w-[25%]"
                src={`${import.meta.env.VITE_POSTER_PATH}${movieState.movie.poster_img}`}
                alt={`${movieState.title}`}
              />

              {/* Info */}
              <span className="flex flex-col items-center gap-4 md:mt-75 md:ml-2">
                <h1 className="text-3xl font-medium md:self-start">
                  {movieState.movie.title}
                </h1>

                {/* <!-- Genres --> */}
                <div className="genres md:self-start">
                  <ul className="flex flex-wrap items-center gap-2">
                    <Genres genres={movieState.movie.genres} />
                  </ul>
                </div>

                {/* <!-- About Movie --> */}
                <div className="grid grid-cols-2 gap-y-4">
                  {/* Release Date */}
                  <span>
                    <div className="font-light text-[#8692A6]">
                      Release Date
                    </div>
                    <div className="">
                      {formatMovieReleaseDate(movieState.movie.release_date)}
                    </div>
                  </span>

                  {/* Directed by */}
                  <span>
                    <div className="font-light text-[#8692A6]">Directed by</div>
                    <div className="">{movieState.movie.director}</div>
                  </span>
                  <span>
                    <div className="font-light text-[#8692A6]">Duration</div>
                    <div className="">
                      {getDuration(movieState.movie.duration_minutes)}
                    </div>
                  </span>
                  <span>
                    <div className="font-light text-[#8692A6]">Casts</div>
                    <div className="">
                      {movieState.movie.cast?.map((el, idx) => {
                        if (idx == movieState.movie.cast.length - 1) {
                          return (
                            <React.Fragment key={idx}>{el}</React.Fragment>
                          );
                        }
                        return (
                          <React.Fragment key={idx}>{el}, </React.Fragment>
                        );
                      })}
                    </div>
                  </span>
                </div>
              </span>
            </div>

            {/* Synopsis */}
            <div className="">
              <h3 className="text-xl font-medium">Synopsis</h3>
              <p className="text-base font-light text-[#A0A3BD]">
                {movieState.movie.synopsis}
              </p>
            </div>

            {/* <!-- Book Tickets --> */}
            <form
              className="flex flex-col items-center gap-8"
              onSubmit={handleSubmit}
            >
              <h2 className="text-3xl font-light md:self-start">
                Book Tickets
              </h2>
              <div className="grid w-full grid-cols-2 gap-x-6 gap-y-2 md:grid-cols-4">
                {/* Choose Date */}
                <span className="flex flex-col gap-2">
                  <div className="text-xl font-medium">Choose Date</div>
                  <div className="flex items-center gap-3 rounded-md bg-[#EFF0F6] px-4 py-3">
                    <img src="/calender.png" alt="" />
                    <select
                      className="w-full"
                      name="date"
                      onChange={checkIsLoggedIn}
                    >
                      {/* Disabled default */}
                      <option disabled selected value="">
                        Select date
                      </option>
                      {(() => {
                        const today = new Date();

                        // Option today
                        const option1 = new Date(today);
                        option1.setDate(today.getDate());

                        // Option tommorow
                        const option2 = new Date(today);
                        option2.setDate(today.getDate() + 1);

                        // Option day + 2
                        const option3 = new Date(today);
                        option3.setDate(today.getDate() + 2);

                        // Option day + 3
                        const option4 = new Date(today);
                        option3.setDate(today.getDate() + 3);

                        // Function to format date
                        function formatDate(date) {
                          return date.toISOString().split("T")[0];
                        }

                        return [option1, option2, option3, option4].map(
                          (date, idx) => (
                            <option key={idx} value={formatDate(date)}>
                              {date.toLocaleDateString()}
                            </option>
                          ),
                        );
                      })()}
                    </select>
                  </div>
                </span>

                {/* Choose Time */}
                <span className="flex flex-col gap-2">
                  <div className="text-xl font-medium">Choose Time</div>
                  <div className="flex items-center gap-3 rounded-md bg-[#EFF0F6] px-4 py-3">
                    <img src="/clock.png" alt="clock logo" />
                    <select
                      className="w-full"
                      name="time"
                      id="time"
                      onChange={checkIsLoggedIn}
                    >
                      {/* Disabled default */}
                      <option disabled selected value="">
                        Select time
                      </option>
                      {TIME_OPTIONS.map((time, idx) => {
                        return (
                          <option key={idx} value={time}>
                            {time}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </span>

                {/* Choose Location */}
                <span className="flex flex-col gap-2">
                  <div className="text-xl font-medium">Choose Location</div>
                  <div className="flex items-center gap-3 rounded-md bg-[#EFF0F6] px-4 py-3">
                    <img src="/location.png" alt="" />
                    <select
                      className="w-full"
                      name="cityLocation"
                      id=""
                      onChange={checkIsLoggedIn}
                    >
                      {/* Disabled default */}
                      <option disabled selected value="">
                        Select location
                      </option>
                      {LOCATION_OPTIONS.map((el, idx) => {
                        return (
                          <option key={idx} value={el.value}>
                            {el.label}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </span>
                <span className="flex flex-col gap-2">
                  <div className="invisible text-xl font-medium">
                    Filter Button
                  </div>
                  <button className="w-full gap-3 rounded-md bg-[#1D4ED8] px-4 py-3 text-[#F8FAFC]">
                    Filter
                  </button>
                </span>
              </div>

              {/* <!-- Choose Cinema --> */}
              <div className="flex flex-col items-center gap-3">
                <div className="self-start">
                  <h3 className="text-xl font-medium">Choose Cinema</h3>
                  <span className="font-semibold text-[#8692A6]">
                    39 Result
                  </span>
                </div>

                {/*  Button Choose Cinema   */}
                <div className="mb-3 grid grid-cols-2 items-center gap-8 md:grid-cols-4">
                  {CINEMA_LIST.map((el, idx) => {
                    return (
                      <React.Fragment key={idx}>
                        <input
                          className="hidden"
                          type="radio"
                          id={el.name}
                          name="cinema"
                          value={el.name}
                          checked={selectedCinema === el.name}
                          onChange={() => {
                            checkIsLoggedIn();
                            setSelectedCinema(el.name);
                          }}
                        />
                        <label
                          htmlFor={el.name}
                          className={`flex max-h-18 cursor-pointer items-center justify-center rounded-lg p-5 hover:shadow-md ${
                            selectedCinema === el.name
                              ? "border-2 border-[#1D4ED8] bg-blue-50"
                              : "border-[1px] border-[#DEDEDE] bg-white"
                          }`}
                        >
                          <img
                            className=""
                            src={el.src}
                            alt={`Logo ${el.name}`}
                          />
                        </label>
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* Cinema Pagination */}
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((page) =>
                    page === cinemaPagination ? (
                      <button
                        key={page}
                        className="h-10 w-10 cursor-pointer rounded-lg bg-[#1D4ED8] text-lg text-white shadow"
                      >
                        {page}
                      </button>
                    ) : (
                      <button
                        key={page}
                        className="h-10 w-10 cursor-pointer rounded-lg border-[1px] border-[#DEDEDE] bg-white text-lg text-[#4E4B66]"
                      >
                        {page}
                      </button>
                    ),
                  )}
                </div>
              </div>

              <button
                className="w-1/4 cursor-pointer rounded-sm bg-[#1D4ED8] py-4 text-[#F8FAFC]"
                type="submit"
              >
                Book Now
              </button>
            </form>
          </section>
        </>
      )}
    </main>
  );
}

export default Details;
